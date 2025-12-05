<template>
  <div class="dsds-page-tabs"
       :class="{ 'dsds-page-tabs-compact': props.density === 'compact' }">
    <div class="buttons-area">
      <div ref="buttonsScrollRef"
           class="page-tabs-scroll"
           role="tablist"
           aria-label="Page tabs">
        <button v-for="(tab, index) in tabs"
                :key="tab.value"
                :data-active="tab.value === props.modelValue ? 'true' : 'false'"
                class="tab-button group/tab page-button flex items-center"
                :class="{ 'active': tab.value === props.modelValue, 'disabled': tab.disabled }"
                data-role="page-tab-main"
                :disabled="tab.disabled"
                :aria-selected="tab.value === props.modelValue"
                role="tab"
                :tabindex="tab.value === props.modelValue ? 0 : -1"
                :title="tab.label"
                @click="setActiveTab(tab.value)"
                @keydown="handleKeydown($event, tab, index)">
          <span class="truncate text-left flex-1">{{ tab.label }}</span>

          <button v-if="tab.closable !== false"
                  type="button"
                  :tabindex="tab.value === props.modelValue ? undefined : -1"
                  class="tab-close-icon ml-auto"
                  :aria-label="`Close ${tab.label}`"
                  :disabled="tab.disabled"
                  @click="onCloseClick(tab)">
            <CloseIcon />
          </button>
        </button>
      </div>
    </div>
    <div class="padding-area">
    </div>
    <div class="controls-area">
      <button type="button"
              class="tab-button control-button"
              v-if="isOverflowing"
              :disabled="isPrevDisabled"
              aria-label="Previous tab"
              @click="goPrev">
        <ChevronLeftIcon class="h-4 w-4" />
      </button>
      <button type="button"
              class="tab-button control-button"
              v-if="isOverflowing"
              :disabled="isNextDisabled"
              aria-label="Next tab"
              @click="goNext">
        <ChevronRightIcon class="h-4 w-4" />
      </button>
      <DropdownMenu v-model:selected="dropdownSelected"
                    :items="dropdownItems"
                    position="top left"
                    :close-on-content-click="true">
        <template #activator="{ props: activatorProps }">
          <button type="button"
                  class="tab-button control-button"
                  :disabled="!hasAnyTabs"
                  aria-label="Select Specific Tab"
                  title="Select specific tab"
                  v-bind="activatorProps"
                  @click="handleEllipsisActivatorClick($event as MouseEvent, activatorProps)">
            <EllipsisIcon class="h-4 w-4" />
          </button>
        </template>
      </DropdownMenu>
      <button v-if="hasClosableTabs"
              type="button"
              class="tab-button control-button"
              aria-label="Close tabs"
              title="Close tabs"
              @click="handleControlClose">
        <CloseIcon class="h-4 w-4" />
      </button>
      <button v-if="hasOptionsListener"
              type="button"
              class="tab-button control-button"
              aria-label="Tab options"
              title="Open tab options"
              @click="handleOptionsClick">
        <SettingsIcon class="h-4 w-4" />
      </button>
    </div>

    <Modal v-model="confirmModalOpen"
             size="xs"
             persistent>
      <VCard>
        <VCardTitle>
          <ModalHeader v-model="confirmModalOpen" />
        </VCardTitle>
        <VCardText>
          <p>모든 탭을 닫으시겠습니까?</p>
          <br />
          <p>[확인]버튼을 누르면 고정탭을 제외한 모든 탭이 닫힙니다.</p>
        </VCardText>
        <VCardActions class="justify-end gap-2">
          <VBtn variant="secondary"
                @click="confirmModalOpen = false">취소</VBtn>
          <VBtn @click="handleConfirmCloseAll">확인</VBtn>
        </VCardActions>
      </VCard>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { VCard, VCardActions, VCardText } from "vuetify/components"

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  EllipsisIcon,
  SettingsIcon,
} from "@/components/icons"
import {
  DropdownMenu,
  ModalHeader,
  VBtn
} from "@/components/ui"

/**
 * 페이지 하단 탭 네비게이션을 구성하는 컴포넌트입니다.
 *
 * @prop {PageTabItem[]} modelValue - 탭 목록과 각 탭의 상태를 표현하는 배열입니다.
 * @event update:modelValue - 탭 배열이 업데이트될 때 방출됩니다.
 * @event change - 활성 탭이 변경될 때 방출됩니다.
 * @event close - 개별 탭이 닫힐 때 방출됩니다.
 * @event ellipsis - 탭 드롭다운(…) 버튼을 클릭했을 때 방출됩니다.
 * @event controlsClose - 컨트롤 영역의 Close 버튼을 클릭했을 때 방출됩니다.
 * @event options - 옵션 버튼을 클릭했을 때 방출됩니다. 리스너가 존재할 때만 버튼이 노출됩니다.
 */
defineOptions({ name: "PageTabs" })

export type PageTabItem = {
  value: string
  label: string
  closable?: boolean
  disabled?: boolean
  isFavorite?: boolean
}

type Props = {
  modelValue?: string
  items?: PageTabItem[]
  density?: "compact"
}

// 스크롤 시 활성 탭이 컨테이너 모서리에 밀착되지 않도록 여유 공간을 둡니다.
const SCROLL_EDGE_PADDING = 8

type BulkCloseState = {
  closableTargets: PageTabItem[]
  nextValue: string | undefined
  nextActive: PageTabItem | undefined
  remainingTabs: PageTabItem[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  items: () => [],
  density: undefined,
})

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
  (event: "update:items", value: PageTabItem[]): void
  (event: "change", tab: PageTabItem | undefined): void
  (event: "close", tab: PageTabItem): void
  (event: "ellipsis"): void
  (event: "controlsClose", tab: PageTabItem | undefined): void
  (event: "options", tab: PageTabItem | undefined): void
}>()

const instance = getCurrentInstance()

const buttonsScrollRef = ref<HTMLDivElement | null>(null)
const isOverflowing = ref(false)
const shouldFocusActive = ref(false)
const resizeObserver = ref<ResizeObserver | null>(null)
const dropdownSelected = ref<string | undefined>()
const confirmModalOpen = ref(false)

const itemsModel = defineModel<PageTabItem[] | undefined>("items")

const tabs = computed(() => itemsModel.value ?? props.items ?? [])
const activeIndex = computed(() => {
  const currentValue = props.modelValue
  if (!currentValue) return -1
  return tabs.value.findIndex(tab => tab.value === currentValue)
})

const hasPrev = computed(() => {
  const index = activeIndex.value
  if (index <= 0) return false
  return Boolean(findPrevAvailable(index))
})

const hasNext = computed(() => {
  const index = activeIndex.value
  if (index === -1) return false
  return Boolean(findNextAvailable(index))
})

const activeTab = computed(() => tabs.value[activeIndex.value] ?? undefined)
const isPrevDisabled = computed(() => !isOverflowing.value || !hasPrev.value)
const isNextDisabled = computed(() => !isOverflowing.value || !hasNext.value)
const dropdownItems = computed(() =>
  tabs.value.map(tab => ({
    content: tab.label,
    value: tab.value,
    disabled: tab.disabled,
  }))
)
const hasAnyTabs = computed(() => tabs.value.length > 0)
const closableTabs = computed(() => tabs.value.filter(tab => tab.closable !== false))
const hasClosableTabs = computed(() => closableTabs.value.length > 0)
// 이벤트 리스너는 attrs에서 제거되므로 vnode props를 통해 존재 여부를 확인합니다.
const hasControlsCloseListener = computed(() => {
  const vnodeProps = (instance?.vnode.props ?? {}) as Record<string, unknown>
  return Boolean(vnodeProps.onControlsClose || vnodeProps.onControlsCloseOnce)
})
// 옵션 버튼도 동일한 방식으로 리스너 존재 여부를 판단합니다.
const hasOptionsListener = computed(() => {
  const vnodeProps = (instance?.vnode.props ?? {}) as Record<string, unknown>
  return Boolean(vnodeProps.onOptions || vnodeProps.onOptionsOnce)
})
const hasItemsBinding = computed(() => {
  const vnodeProps = (instance?.vnode.props ?? {}) as Record<string, unknown>
  return Boolean(vnodeProps["onUpdate:items"] || vnodeProps.onUpdateItems || vnodeProps["onUpdate:itemsOnce"])
})

const updateItemsModel = (nextItems: PageTabItem[]) => {
  if (!hasItemsBinding.value) return
  itemsModel.value = nextItems
}

/**
 * 닫을 수 있는 모든 탭을 제거했을 때의 최종 탭 상태를 계산합니다.
 * 닫을 수 없는 탭은 유지하며 필요한 경우 활성 탭을 다시 지정합니다.
 */
const computeBulkCloseState = (): BulkCloseState => {
  const allTabs = tabs.value
  const closable = allTabs.filter(tab => tab.closable !== false)
  const persistent = allTabs.filter(tab => tab.closable === false)
  const remainingTabs = allTabs.filter(tab => tab.closable === false)

  let nextValue: string | undefined
  let nextActive: PageTabItem | undefined

  if (persistent.length > 0) {
    // 지속적 탭 중 현재 활성 탭이 있으면 유지, 없으면 첫 번째 활성화 가능한 탭
    nextActive = persistent.find(tab => tab.value === props.modelValue && !tab.disabled)
    if (!nextActive) {
      nextActive = persistent.find(tab => !tab.disabled)
    }
    nextValue = nextActive?.value
  }

  return {
    closableTargets: closable,
    nextValue,
    nextActive,
    remainingTabs,
  }
}

const setActiveTab = (value: string, options: { focus?: boolean; emitChange?: boolean } = {}) => {
  const { focus = true, emitChange = true } = options
  const target = tabs.value.find(tab => tab.value === value)
  if (!target || target.disabled) return

  if (props.modelValue === value) return

  emit("update:modelValue", value)

  if (emitChange) {
    emit("change", target)
  }

  if (focus) {
    shouldFocusActive.value = true
  }
}

const goPrev = () => {
  const index = activeIndex.value
  if (index <= 0) return
  const prev = findPrevAvailable(index)
  if (prev) {
    setActiveTab(prev.value)
  }
}

const goNext = () => {
  const index = activeIndex.value
  if (index === -1) return
  const next = findNextAvailable(index)
  if (next) {
    setActiveTab(next.value)
  }
}

const onCloseClick = (tab: PageTabItem) => {
  if (tab.closable === false) return
  closeTab(tab)
}

const handleEllipsisActivatorClick = (
  event: MouseEvent,
  activatorProps: Record<string, unknown>
) => {
  if (!hasAnyTabs.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit("ellipsis")
  const onClick = activatorProps.onClick as ((event: MouseEvent) => void) | undefined
  onClick?.(event)
}

const handleControlClose = () => {
  const { closableTargets } = computeBulkCloseState()
  if (!closableTargets.length) return

  emit("controlsClose", undefined)

  if (hasControlsCloseListener.value) {
    return
  }

  confirmModalOpen.value = true
}

const handleOptionsClick = () => {
  emit("options", activeTab.value)
}

const handleConfirmCloseAll = () => {
  const { closableTargets, nextValue, nextActive, remainingTabs } = computeBulkCloseState()
  if (!closableTargets.length) {
    confirmModalOpen.value = false
    return
  }

  if (nextValue !== undefined) {
    emit("update:modelValue", nextValue)
  } else {
    emit("update:modelValue", "")
  }
  emit("change", nextActive)

  updateItemsModel(remainingTabs)

  closableTargets.forEach(tab => emit("close", tab))

  confirmModalOpen.value = false
  shouldFocusActive.value = Boolean(nextActive)
}

const closeTab = (tab: PageTabItem) => {
  if (tab.closable === false) return

  const allTabs = tabs.value
  const remainingTabs = allTabs.filter(item => item.value !== tab.value)

  if (!remainingTabs.length) {
    emit("update:modelValue", "")
    emit("close", tab)
    emit("change", undefined)
    shouldFocusActive.value = false
    updateItemsModel(remainingTabs)
    return
  }

  const wasActive = props.modelValue === tab.value
  let nextValue = props.modelValue
  let nextActive: PageTabItem | undefined = undefined

  if (wasActive) {
    // 활성 탭이 닫혔으므로 다음 활성 탭을 찾아야 함
    nextActive = findNextActiveAfterClose(remainingTabs, allTabs.indexOf(tab))
    nextValue = nextActive?.value ?? ""
  } else {
    // 활성 탭이 아니면 현재 활성 탭 유지
    nextValue = props.modelValue ?? ""
    nextActive = remainingTabs.find(item => item.value === nextValue)
  }

  emit("update:modelValue", nextValue)

  if (wasActive) {
    emit("change", nextActive)
    shouldFocusActive.value = true
  }

  updateItemsModel(remainingTabs)

  emit("close", tab)
}

const findPrevAvailable = (fromIndex: number) => {
  for (let i = fromIndex - 1; i >= 0; i -= 1) {
    const candidate = tabs.value[i]
    if (candidate && !candidate.disabled) {
      return candidate
    }
  }
  return undefined
}

const findNextAvailable = (fromIndex: number) => {
  for (let i = fromIndex + 1; i < tabs.value.length; i += 1) {
    const candidate = tabs.value[i]
    if (candidate && !candidate.disabled) {
      return candidate
    }
  }
  return undefined
}

const findNextActiveAfterClose = (candidateTabs: PageTabItem[], previousIndex: number) => {
  const forward = candidateTabs.slice(previousIndex).find(item => !item.disabled)
  if (forward) return forward

  for (let i = previousIndex - 1; i >= 0; i -= 1) {
    const candidate = candidateTabs[i]
    if (candidate && !candidate.disabled) {
      return candidate
    }
  }

  return candidateTabs.find(item => !item.disabled)
}

const ensureActiveTab = () => {
  if (!tabs.value.length) return

  const currentValue = props.modelValue
  const hasActive = currentValue ? tabs.value.some(item => item.value === currentValue && !item.disabled) : false

  if (hasActive) return

  const fallback = tabs.value.find(item => !item.disabled) ?? tabs.value[0]
  if (fallback) {
    setActiveTab(fallback.value, { focus: false })
  }
}

/**
 * 오버플로우 상태 플래그를 갱신합니다. 오버플로우가 발생하면 컨트롤 버튼이 약 48px을 차지하므로
 * 레이아웃이 안정된 뒤 한 번 더 계산이 필요합니다.
 */
const updateOverflow = () => {
  const el = buttonsScrollRef.value
  if (!el) {
    isOverflowing.value = false
    return
  }
  isOverflowing.value = el.scrollWidth - el.clientWidth > 1
}

/**
 * 스크롤 컨테이너 내에서 활성 탭이 항상 보이도록 조정합니다.
 */
const scrollActiveIntoView = () => {
  const container = buttonsScrollRef.value
  if (!container) return

  const activeEl = container.querySelector<HTMLElement>("[data-active='true']")
  if (!activeEl) return

  const containerRect = container.getBoundingClientRect()
  const activeRect = activeEl.getBoundingClientRect()

  if (activeRect.left < containerRect.left) {
    container.scrollLeft -= containerRect.left - activeRect.left + SCROLL_EDGE_PADDING
  } else if (activeRect.right > containerRect.right) {
    container.scrollLeft += activeRect.right - containerRect.right + SCROLL_EDGE_PADDING
  }
}

// 프로그래밍 방식으로 이동했을 때 활성 탭에 키보드 포커스를 돌려줍니다.
const focusActiveButton = () => {
  const container = buttonsScrollRef.value
  if (!container) return
  const activeButton = container.querySelector<HTMLButtonElement>(
    "button[data-role='page-tab-main'][data-active='true']"
  )
  activeButton?.focus({ preventScroll: true })
}

const handleKeydown = (event: KeyboardEvent, tab: PageTabItem, index: number) => {
  switch (event.key) {
    case "ArrowLeft":
    case "ArrowUp": {
      event.preventDefault()
      const prev = findPrevAvailable(index)
      if (prev) {
        setActiveTab(prev.value)
      }
      break
    }
    case "ArrowRight":
    case "ArrowDown": {
      event.preventDefault()
      const next = findNextAvailable(index)
      if (next) {
        setActiveTab(next.value)
      }
      break
    }
    case "Home": {
      event.preventDefault()
      const first = tabs.value.find(item => !item.disabled)
      if (first) {
        setActiveTab(first.value)
      }
      break
    }
    case "End": {
      event.preventDefault()
      for (let i = tabs.value.length - 1; i >= 0; i -= 1) {
        const candidate = tabs.value[i]
        if (candidate && !candidate.disabled) {
          setActiveTab(candidate.value)
          break
        }
      }
      break
    }
    case "Delete":
    case "Backspace": {
      if (tab.closable === false) return
      event.preventDefault()
      closeTab(tab)
      break
    }
    default:
      break
  }
}

// 드롭다운 선택값을 활성 탭과 동일하게 유지합니다.
watch(
  activeTab,
  tab => {
    dropdownSelected.value = tab?.value
  },
  { immediate: true }
)

// 드롭다운에서 탭을 선택하면 포커스 흐름을 깨지 않고 해당 탭을 활성화합니다.
watch(dropdownSelected, value => {
  if (!value) return
  if (value === activeTab.value?.value) return
  setActiveTab(value)
})

// 외부에서 탭 목록이 갱신되면 오버플로우를 재평가하고 활성 탭을 다시 보여주며,
// 필요 시 포커스를 활성 탭으로 되돌립니다.
watch(
  () => props.modelValue,
  () => {
    ensureActiveTab()
    nextTick(() => {
      updateOverflow()
      scrollActiveIntoView()
      if (shouldFocusActive.value) {
        focusActiveButton()
        shouldFocusActive.value = false
      }
    })
  },
  { deep: true, immediate: true }
)

// 오버플로우가 새로 발생하면 컨트롤 버튼이 등장하며 영역이 줄어드므로
// 활성 탭 정렬을 맞추기 위해 다시 측정합니다.
watch(
  isOverflowing,
  (value, previous) => {
    if (value && !previous) {
      nextTick(() => {
        updateOverflow()
        scrollActiveIntoView()
      })
    }
  }
)

onMounted(() => {
  nextTick(() => {
    updateOverflow()
    scrollActiveIntoView()
  })

  if (buttonsScrollRef.value) {
    resizeObserver.value = new ResizeObserver(() => {
      updateOverflow()
    })
    resizeObserver.value.observe(buttonsScrollRef.value)
  }

  window.addEventListener("resize", updateOverflow)
})

onBeforeUnmount(() => {
  resizeObserver.value?.disconnect()
  resizeObserver.value = null
  window.removeEventListener("resize", updateOverflow)
})
</script>
