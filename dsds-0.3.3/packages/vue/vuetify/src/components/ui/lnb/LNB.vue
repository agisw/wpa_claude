<template>
  <div v-if="!lnbHidden"
       class="dsds-lnb lnb-root"
       :data-disable-animation="disableAnimation"
       v-bind="$attrs">
    <div class="lnb-sidebar"
         :style="{ width: `${width}px` }">
      <div v-if="hasTitle"
           class="lnb-header">
        <div class="lnb-header-bar">
          <div role="lnb-title"
               class="lnb-title">
            <div v-if="hasIcon"
                 class="lnb-title-icon pr-2.5">
              <slot name="icon">
                <component v-if="resolvedIconComponent"
                           :is="resolvedIconComponent" />
                <span v-else-if="resolvedIconText">
                  {{ resolvedIconText }}
                </span>
              </slot>
            </div>
            <slot name="title">
              <component v-if="resolvedTitleComponent"
                         :is="resolvedTitleComponent" />
              <span v-else-if="resolvedTitleText"
                    class="truncate">
                {{ resolvedTitleText }}
              </span>
            </slot>
          </div>
          <button type="button"
                  class="lnb-toggle"
                  @click="toggleHidden">
            <TriangleLeftIcon class="lnb-toggle-icon" />
          </button>
        </div>
        <div class="lnb-header-divider" />
      </div>

      <ScrollArea :class="[
        'lnb-scroll flex-1 overflow-hidden min-h-0',
        hasTitle && 'with-title',
        { 'pointer-events-none': isDragging }
      ]">
        <div class="h-4px"
             v-if="isFlat" />
        <template v-for="(item, index) in itemsWithTypeAndDepth"
                  :key="`${item.id}-${index}`">
          <LNBAccordion v-if="item.type === 'accordion'"
                        :items="[item as LNBAccordionItem]" />
          <LNBTree v-else-if="item.type === 'tree'"
                   :items="[item as LNBTreeItem]" />
          <LNBContent v-else
                      :items="[item as LNBContentItem]" />
        </template>
        <div v-if="isFlat"
             class="mt-4px h-[1px] bg-button-2nd-border" />
      </ScrollArea>
    </div>

    <div class="lnb-resizer group"
         @mousedown="handleMouseDown">
      <div class="lnb-resizer-line" />
      <div class="lnb-resizer-hitarea"
           aria-label="Resize handle"
           @mousedown="handleMouseDown" />
    </div>
  </div>
  <div v-else
       class="lnb-collapsed"
       v-bind="$attrs">
    <button type="button"
            class="lnb-collapsed-button"
            @click="toggleHidden">
      <TriangleRightIcon class="lnb-collapsed-icon" />
    </button>
    <div class="lnb-collapsed-track">
    </div>
  </div>
</template>

<script setup lang="ts">
import { TriangleLeftIcon, TriangleRightIcon } from "@/components/icons"
import { ScrollArea } from "@/components/ui"
import { computed, defineComponent, isVNode, onBeforeUnmount, onMounted, provide, ref, useSlots, watch, type Ref } from "vue"
import {
  MAX_WIDTH,
  MIN_WIDTH,
  addTypeAndDepthToHierarchy,
  findSearchMatchParentPaths,
  findSelectedItemPaths,
  getLNBItemById,
  getMaxDepth,
  isArrayShallowEqual,
  isFlatStructure,
  uniqueValues,
} from "./helpers"
import LNBAccordion from "./LNBAccordion.vue"
import LNBContent from "./LNBContent.vue"
import LNBTree from "./LNBTree.vue"
import {
  LNBContextKey,
  type LNBAccordionItem,
  type LNBContentItem,
  type LNBItem,
  type LNBProps,
  type LNBTreeItem
} from "./types"


defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<LNBProps>(), {
  hidden: false,
  withoutAccordion: false,
})

const emit = defineEmits<{
  (
    event: "selectionChange",
    selectedItemId: string,
    selectedItem: LNBContentItem
  ): void; (event: "update:selectedItemId", value: string | undefined): void; (event: "update:searchText", value: string): void
}>()

const slots = useSlots()

const width = ref(MIN_WIDTH)
const isDragging = ref(false)
const resizing = ref(false)
const startX = ref(0)
const startWidth = ref(width.value)

const disableAnimation = ref(false)
const animationTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const internalSearchText = ref("")
const internalSelectedItemId = ref<string | undefined>(props.defaultSelectedItemId)

const searchText = computed(() => (props.searchText !== undefined ? props.searchText : internalSearchText.value))
const setSearchText = (value: string) => {
  if (props.searchText !== undefined) {
    emit("update:searchText", value)
  } else {
    internalSearchText.value = value
  }
}

const isControlled = computed(() => props.selectedItemId !== undefined)
const currentSelectedItemId = computed(() => (isControlled.value ? props.selectedItemId : internalSelectedItemId.value))

const itemsWithTypeAndDepth = computed(() =>
  addTypeAndDepthToHierarchy(props.data.items as unknown as LNBItem[], 0, props.withoutAccordion)
)

const isFlat = computed(() => isFlatStructure(itemsWithTypeAndDepth.value))

const maxDepth = ref<number | null>(0)
const selectedItem = ref<LNBContentItem | null>(null)

const defaultExpandedValues = computed(() =>
  findSelectedItemPaths(itemsWithTypeAndDepth.value as unknown as LNBItem[], currentSelectedItemId.value)
)

const openPath = ref<string[]>(uniqueValues([...defaultExpandedValues.value, ...(props.defaultOpenPath ?? [])]))

const prevSearchOpenPath = ref<string[] | null>(null)
const onlyTree = computed(() => props.withoutAccordion)

const lnbHidden = ref(Boolean(props.hidden))

const resolvedIcon = computed(() => {
  if (slots.icon) return null
  return props.data.icon ?? null
})

const resolvedIconComponent = computed(() => {
  const icon = resolvedIcon.value
  if (!icon || typeof icon === "string") return null
  return icon
})

const resolvedIconText = computed(() => {
  const icon = resolvedIcon.value
  return typeof icon === "string" ? icon : ""
})

const resolvedTitle = computed(() => {
  if (slots.title) return null
  if (props.title !== undefined) return props.title
  return props.data.title ?? null
})

const resolvedTitleComponent = computed(() => {
  const title = resolvedTitle.value
  if (!title || typeof title === "string") return null

  if (isVNode(title)) {
    return defineComponent({
      name: "LNBTitleVNodeWrapper",
      setup: () => () => title,
    })
  }

  return title
})

const resolvedTitleText = computed(() => {
  const title = resolvedTitle.value
  return typeof title === "string" ? title : ""
})

const hasTitle = computed(() => Boolean(slots.title) || Boolean(resolvedTitle.value))
const hasIcon = computed(() => Boolean(slots.icon) || Boolean(resolvedIcon.value))

const setOpenPath = (value: string[]) => {
  openPath.value = uniqueValues(value)
}

const setMaxDepth = (value: number | null) => {
  maxDepth.value = value
}

const setSelectedItem = (value: LNBContentItem | null) => {
  selectedItem.value = value
}

const handleSelectionChange = (item: LNBContentItem) => {
  if (!isControlled.value) {
    internalSelectedItemId.value = item.id
  }
  selectedItem.value = item
  emit("update:selectedItemId", item.id)
  emit("selectionChange", item.id, item)
}

const toggleHidden = () => {
  lnbHidden.value = !lnbHidden.value
}

const handleMouseDown = (event: MouseEvent) => {
  resizing.value = true
  isDragging.value = true
  startX.value = event.clientX
  startWidth.value = width.value
  document.body.style.cursor = "ew-resize"
  document.body.style.userSelect = "none"
}

const handleMouseMove = (event: MouseEvent) => {
  if (!resizing.value) return
  event.preventDefault()
  const delta = event.clientX - startX.value
  const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth.value + delta))
  width.value = newWidth
}

const handleMouseUp = () => {
  if (!resizing.value) return
  resizing.value = false
  isDragging.value = false
  document.body.style.cursor = "default"
  document.body.style.userSelect = ""
}

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove)
  window.addEventListener("mouseup", handleMouseUp)
})

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", handleMouseMove)
  window.removeEventListener("mouseup", handleMouseUp)
  const timer = animationTimer.value
  if (timer) {
    clearTimeout(timer)
  }
})

watch(
  () => props.hidden,
  (value) => {
    lnbHidden.value = Boolean(value)
  }
)

watch(
  () => props.defaultOpenPath,
  (value) => {
    if (value && value.length) {
      setOpenPath(uniqueValues([...openPath.value, ...value]))
    }
  },
  { deep: true }
)

watch(
  () => props.data,
  (newValue, oldValue) => {
    if (!oldValue) return
    disableAnimation.value = true
    if (animationTimer.value) {
      clearTimeout(animationTimer.value)
    }
    animationTimer.value = setTimeout(() => {
      disableAnimation.value = false
      animationTimer.value = null
    }, 100)
  },
  { deep: true }
)

watch(
  itemsWithTypeAndDepth,
  (items) => {
    maxDepth.value = getMaxDepth(items as unknown as LNBItem[])
  },
  { immediate: true, deep: true }
)

watch(
  defaultExpandedValues,
  (values) => {
    if (!values.length) return
    setOpenPath(uniqueValues([...openPath.value, ...values]))
  },
  { immediate: true }
)

watch(
  () => currentSelectedItemId.value,
  (newId) => {
    if (!newId) {
      selectedItem.value = null
      return
    }
    const found = getLNBItemById(itemsWithTypeAndDepth.value as unknown as LNBItem[], newId)
    if (found && (found as LNBContentItem).type === "item") {
      if (!selectedItem.value || selectedItem.value.id !== found.id) {
        selectedItem.value = found as LNBContentItem
      }
    }
    const selectedPaths = findSelectedItemPaths(itemsWithTypeAndDepth.value as unknown as LNBItem[], newId)
    setOpenPath(uniqueValues([...openPath.value, ...selectedPaths]))
  },
  { immediate: true }
)

watch(
  () => props.defaultSelectedItemId,
  (value) => {
    if (!value || isControlled.value) return
    if (internalSelectedItemId.value === value) return
    const found = getLNBItemById(itemsWithTypeAndDepth.value as unknown as LNBItem[], value)
    if (found && (found as LNBContentItem).type === "item") {
      internalSelectedItemId.value = value
      selectedItem.value = found as LNBContentItem
      emit("update:selectedItemId", value)
      emit("selectionChange", value, found as LNBContentItem)
    }
  },
  { immediate: true }
)

watch(
  () => searchText.value,
  (newSearch, oldSearch) => {
    const next = (newSearch ?? "").trim()
    const prev = (oldSearch ?? "").trim()

    if (!prev && next) {
      if (!prevSearchOpenPath.value) {
        prevSearchOpenPath.value = [...openPath.value]
      }
      const searchMatchPaths = findSearchMatchParentPaths(
        itemsWithTypeAndDepth.value as unknown as LNBItem[],
        next,
        currentSelectedItemId.value
      )
      const combinedPaths = uniqueValues([
        ...openPath.value,
        ...defaultExpandedValues.value,
        ...searchMatchPaths,
      ])
      if (!isArrayShallowEqual(combinedPaths, openPath.value)) {
        openPath.value = combinedPaths
      }
    }

    if (prev && !next && prevSearchOpenPath.value) {
      openPath.value = [...prevSearchOpenPath.value]
      prevSearchOpenPath.value = null
    }
  }
)

provide(LNBContextKey, {
  maxDepth,
  setMaxDepth,
  selectedItem: selectedItem as Ref<LNBContentItem | null>,
  setSelectedItem,
  selectedItemId: currentSelectedItemId,
  handleSelectionChange,
  openPath,
  setOpenPath,
  onlyTree,
  disableAnimation,
  searchText: computed(() => searchText.value ?? ""),
  setSearchText,
  isDragging,
})
</script>
