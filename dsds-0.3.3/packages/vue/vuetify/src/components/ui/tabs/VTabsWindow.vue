<template>
  <slot v-if="asChild"
        v-bind="slotContext" />
  <div v-else
       :class="tabsWindowClasses"
       data-slot="dsds-tabs-window">
    <slot v-bind="slotContext" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, provide, ref, watch, type ComputedRef } from 'vue'
import type { TabSize, TabVariant } from './types'

// 독립 사용을 위한 Props
interface Props {
  modelValue?: string
  asChild?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// 부모 VTabs에서 컨텍스트 주입 (선택사항)
const tabsContext = inject<{
  activeTab: ComputedRef<string | undefined>
  setActiveTab: (value: string) => void
  variant: ComputedRef<string>
  size: ComputedRef<string>
} | null>('tabsContext', null)

// VTabsContainer의 컨텍스트 확인 (우선순위)
const containerContext = inject<{
  activeTab: ComputedRef<string>
  setActiveTab: (value: string) => void
  variant: ComputedRef<TabVariant>
  size: ComputedRef<TabSize>
  contextKey: symbol
} | null>(Symbol.for('tabsContainer'), null)

// 컨테이너가 우선, 없으면 VTabs 컨텍스트, 없으면 자체 모델 사용
const internalActiveTab = ref(props.modelValue)
const activeTab = containerContext?.activeTab || tabsContext?.activeTab || computed(() => internalActiveTab.value)
const setActiveTab = containerContext?.setActiveTab || tabsContext?.setActiveTab || ((value: string) => {
  internalActiveTab.value = value
  emit('update:modelValue', value)
})

// 외부 modelValue 변경 감시
watch(() => props.modelValue, (newValue: string | undefined) => {
  if (!tabsContext) {
    internalActiveTab.value = newValue
  }
})

// VTabsWindowItem 자식들에게 컨텍스트 제공
provide('tabsWindowContext', {
  activeTab,
  setActiveTab,
  renderAsChild: computed(() => props.asChild === true)
})

const slotContext = computed(() => ({
  activeTab,
  setActiveTab,
  renderAsChild: props.asChild === true,
}))

// 계산된 클래스
const tabsWindowClasses = computed(() => {
  return 'relative overflow-hidden'
})
</script>