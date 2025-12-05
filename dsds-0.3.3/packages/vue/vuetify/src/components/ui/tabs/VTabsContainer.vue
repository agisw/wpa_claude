<template>
  <slot v-if="asChild"
    v-bind="slotContext" />
  <div v-else class="dsds-tabs-container">
    <slot v-bind="slotContext" />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import type { TabSize, TabVariant } from './types'

interface VTabsContainerProps {
  /** 기본 활성 탭 값 */
  defaultValue?: string
  /** 탭 변형 (default | button) */
  variant?: TabVariant
  /** 탭 크기 (small | medium) */
  size?: TabSize
  /** 컨테이너 래퍼 없이 직접 슬롯 랜더링 */
  asChild?: boolean
}

const props = withDefaults(defineProps<VTabsContainerProps>(), {
  variant: 'default',
  size: 'medium',
  asChild: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// 컨테이너별 고유 컨텍스트 키 생성
const contextKey = Symbol.for('tabsContainer')

// 내부 상태 관리 (defaultValue 사용)
const internalValue = ref(props.defaultValue || '')

// 현재 활성 탭 값
const activeTab = computed({
  get: () => internalValue.value,
  set: (value: string) => {
    internalValue.value = value
    emit('update:modelValue', value)
  }
})

// 자식 컴포넌트들에게 컨텍스트 제공
const slotContext = {
  activeTab,
  setActiveTab: (value: string) => {
    activeTab.value = value
  },
  variant: computed(() => props.variant),
  size: computed(() => props.size),
  contextKey,
  asChild: computed(() => props.asChild === true)
}

provide(contextKey, slotContext)

// 외부에서 defaultValue 변경 시 내부 상태 업데이트
watch(() => props.defaultValue, (newValue) => {
  if (newValue && internalValue.value === '') {
    internalValue.value = newValue
  }
})
</script>
