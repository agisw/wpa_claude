<template>
  <PageTabs v-if="props.variant === 'compact'"
            :modelValue="props.modelValue"
            :items="props.items as PageTabItem[]"
            @update:model-value="setActiveTab"
            density="compact" />
  <div :class="tabsClasses"
       data-slot="tabs"
       v-else>
    <div class="dsds-tabs-list"
         data-slot="tabs-list"
         role="tablist"
         @keydown="handleKeydown">
      <template v-if="shouldRenderItems">
        <VTab v-for="item in normalizedItems"
              :key="item.value"
              :value="item.value"
              :href="item.href"
              :disabled="item.disabled">
          <RenderFunction :render="item.render" />
        </VTab>
      </template>
      <template v-else>
        <slot />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, defineComponent, inject, provide, ref, useSlots, watch, type ComputedRef, type PropType, type Ref, type VNodeChild } from 'vue'
import PageTabs, { type PageTabItem } from './PageTabs.vue'
import type { TabItemProps, TabSize, TabsProps, TabVariant } from './types'
import VTab from './VTab.vue'

  interface Props extends TabsProps { }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'medium',
    modelValue: undefined,
    items: undefined,
  })

  const slots = useSlots()

  const RenderFunction = defineComponent({
    name: 'VTabsItemRender',
    props: {
      render: {
        type: Function as PropType<() => VNodeChild>,
        required: true,
      },
    },
    setup(renderProps) {
      return () => renderProps.render()
    },
  })

  type NormalizedTabItem = TabItemProps & {
    value: string
    label: string
    render: () => VNodeChild
  }

  const normalizeHrefValue = (href?: string) => {
    if (!href) return undefined
    return href.startsWith('#') ? href.slice(1) : href
  }

  const normalizedItems = computed<NormalizedTabItem[]>(() => {
    return (props.items ?? []).map((item, index) => {
      const normalizedValue = item.value ?? normalizeHrefValue(item.href) ?? `tab-${index + 1}`
      const resolvedLabel = item.label ?? item.title ?? item.text ?? normalizedValue
      const render = (() => {
        if (typeof item.content === 'function') {
          return item.content as () => VNodeChild
        }
        if (item.content != null) {
          return () => item.content as VNodeChild
        }
        return () => resolvedLabel
      })()

      return {
        ...item,
        value: normalizedValue,
        label: resolvedLabel,
        render,
      }
    })
  })

  const hasSlotContent = computed(() => {
    const slot = slots.default?.(undefined)
    return Boolean(slot && slot.length)
  })

  const shouldRenderItems = computed(() => !hasSlotContent.value && normalizedItems.value.length > 0)

  const emit = defineEmits<{
    'update:modelValue': [value: string]
  }>()

  // 반응형 상태
  const activeTab: Ref<string | undefined> = ref(props.modelValue)

  // 변형 설정
  const tabsVariantsConfig = {
    variant: {
      default: 'dsds-tab-underline',
      button: 'dsds-tab-button',
      compact: 'dsds-tab-compact',
    },
    size: {
      small: '',
      medium: '',
    },
  }

  // 계산된 클래스
  const tabsClasses = computed(() => {
    const baseClasses = 'flex flex-col gap-2'
    const variantClass = tabsVariantsConfig.variant[props.variant]
    const sizeClass = tabsVariantsConfig.size[props.size]

    // 복합 변형
    let compoundClass = ''
    if (props.variant === 'default') {
      compoundClass = props.size === 'small' ? 'dsds-tab-underline-small' : 'dsds-tab-underline-medium'
    } else if (props.variant === 'button') {
      compoundClass = props.size === 'small' ? 'dsds-tab-button-small' : 'dsds-tab-button-medium'
    }

    return [
      baseClasses,
      variantClass,
      sizeClass,
      compoundClass,
      props.class
    ].filter(Boolean).join(' ')
  })

  // 메서드
  const setActiveTab = (value: string) => {
    activeTab.value = value
    emit('update:modelValue', value)
  }

  // 외부 modelValue 변경 감시
  watch(() => props.modelValue, (newValue: string | undefined) => {
    activeTab.value = newValue
  })

  // VTabsContainer의 컨텍스트 확인 (우선순위)
  const containerContext = inject<{
    activeTab: ComputedRef<string>
    setActiveTab: (value: string) => void
    variant: ComputedRef<TabVariant>
    size: ComputedRef<TabSize>
    contextKey: symbol
  } | null>(Symbol.for('tabsContainer'), null)

  // 컨테이너가 있으면 컨테이너의 상태 사용, 없으면 자체 상태 사용
  const currentActiveTab = containerContext?.activeTab || activeTab
  const currentSetActiveTab = containerContext?.setActiveTab || setActiveTab
  const currentVariant = containerContext?.variant || computed(() => props.variant)
  const currentSize = containerContext?.size || computed(() => props.size)

  // 자식 컴포넌트에 컨텍스트 제공 (하위 호환성 유지)
  provide('tabsContext', {
    activeTab: currentActiveTab,
    setActiveTab: currentSetActiveTab,
    variant: currentVariant,
    size: currentSize
  })

  const ensureActiveTabForItems = () => {
    if (!shouldRenderItems.value || normalizedItems.value.length === 0) {
      return
    }

    const currentValue = currentActiveTab.value
    const hasActive = currentValue ? normalizedItems.value.some(item => item.value === currentValue && !item.disabled) : false

    if (hasActive) {
      return
    }

    const fallback = normalizedItems.value.find(item => !item.disabled)
    if (fallback && fallback.value !== currentValue) {
      currentSetActiveTab(fallback.value)
    }
  }

  watch(
    () => [normalizedItems.value, shouldRenderItems.value, currentActiveTab.value],
    () => {
      ensureActiveTabForItems()
    },
    { immediate: true, deep: true }
  )

  // 키보드 내비게이션
  const handleKeydown = (event: KeyboardEvent) => {
    const tabs = document.querySelectorAll('[role="tab"]:not([disabled])')
    const currentTab = document.activeElement as HTMLElement
    let currentIndex = Array.prototype.indexOf.call(tabs, currentTab)

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        currentIndex = (currentIndex + 1) % tabs.length
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        currentIndex = (currentIndex - 1 + tabs.length) % tabs.length
        break
      case 'Home':
        event.preventDefault()
        currentIndex = 0
        break
      case 'End':
        event.preventDefault()
        currentIndex = tabs.length - 1
        break
      case ' ':
      case 'Enter':
        event.preventDefault()
        if (currentIndex !== -1) {
          const tabElement = tabs[currentIndex] as HTMLElement
          const tabValue = tabElement.getAttribute('data-tab-value')
          if (tabValue) {
            currentSetActiveTab(tabValue)
          }
        }
        return
      default:
        return
    }

    if (currentIndex !== -1 && tabs[currentIndex]) {
      (tabs[currentIndex] as HTMLElement).focus()
    }
  }
</script>
