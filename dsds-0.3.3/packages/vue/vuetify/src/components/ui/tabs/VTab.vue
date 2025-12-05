<template>
  <button :class="tabClasses"
          :disabled="disabled"
          :aria-selected="isActive"
          :tabindex="isActive ? 0 : -1"
          :id="tabId"
          :data-tab-value="tabValue"
          :data-state="isActive ? 'active' : 'inactive'"
          role="tab"
          data-slot="tabs-trigger"
          @click="handleClick"
          @focus="handleFocus"
          @blur="handleBlur">
    <div class="label">
      <slot />
    </div>
    <div class="line"></div>
    <u class="absolute bottom-px h-[3px]"></u>
  </button>
</template>

<script setup lang="ts">
import { computed, inject, type ComputedRef } from 'vue'
import type { TabProps } from './types'

interface Props extends TabProps { }

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

// 부모 VTabs에서 컨텍스트 주입
const tabsContext = inject<{
  activeTab: ComputedRef<string | undefined>
  setActiveTab: (value: string) => void
  variant: ComputedRef<string>
  size: ComputedRef<string>
}>('tabsContext')

if (!tabsContext) {
  throw new Error('VTab must be used within VTabs')
}

const { activeTab, setActiveTab } = tabsContext

// 탭 값 가져오기 (Vuetify 호환성을 위해 href를 value보다 우선)
const tabValue = computed(() => {
  if (props.href) {
    // href에서 값 추출 (예: "#tab-1" -> "tab-1")
    return props.href.startsWith('#') ? props.href.slice(1) : props.href
  }
  return props.value || ''
})

// 이 탭이 활성화되었는지 확인
const isActive = computed(() => {
  return activeTab.value === tabValue.value
})

// 탭에 대한 고유 ID 생성
const tabId = computed(() => {
  return `tab-${tabValue.value}`
})

// 계산된 클래스
const tabClasses = computed(() => {
  const baseClasses = 'relative inline-flex items-center'
  const disabledClass = props.disabled ? 'dsds-tab-trigger-disabled' : ''

  return [baseClasses, disabledClass].filter(Boolean).join(' ')
})

// 클릭 이벤트 처리
const handleClick = () => {
  if (!props.disabled && tabValue.value) {
    setActiveTab(tabValue.value)
  }
}

// 포커스 이벤트 처리
const handleFocus = () => {
  // 포커스가 이동할 때 해당 탭을 활성화 (선택사항)
  // 필요에 따라 활성화 여부를 결정할 수 있음
}

// 블러 이벤트 처리
const handleBlur = () => {
  // 포커스가 벗어날 때의 처리 (필요시 구현)
}
</script>

<style scoped>
/* Vue scoped styles will be handled by the global CSS */
</style>