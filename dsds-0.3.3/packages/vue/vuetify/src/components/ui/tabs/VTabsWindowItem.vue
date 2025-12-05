<template>
  <slot v-if="renderAsChild && isActive"
        v-bind="slotProps" />
  <div v-else
       v-show="isActive"
       :class="tabsWindowItemClasses"
       :aria-labelledby="labelledBy"
       role="tabpanel"
       data-slot="tabs-window-item">
    <slot v-bind="slotProps" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, type ComputedRef } from 'vue'
import type { TabItemProps } from './types'

interface Props extends TabItemProps { }

const props = defineProps<Props>()

// 부모 VTabsWindow에서 컨텍스트 주입
const tabsWindowContext = inject<{
  activeTab: ComputedRef<string | undefined>
  setActiveTab: (value: string) => void
  renderAsChild?: ComputedRef<boolean>
} | null>('tabsWindowContext', null)

if (!tabsWindowContext) {
  throw new Error('VTabsWindowItem must be used within VTabsWindow')
}

const { activeTab } = tabsWindowContext
const renderAsChild = tabsWindowContext.renderAsChild ?? computed(() => false)

// 이 탭 윈도우 아이템이 활성화되었는지 확인
const isActive = computed(() => {
  return activeTab.value === props.value
})

// 탭패널에 대한 aria-labelledby 생성
const labelledBy = computed(() => {
  return `tab-${props.value}`
})

const slotProps = computed(() => ({
  isActive: isActive.value,
  labelledBy: labelledBy.value,
}))

// 계산된 클래스
const tabsWindowItemClasses = computed(() => {
  return 'flex-1 outline-none'
})
</script>

<style scoped>
/* Vue scoped styles will be handled by the global CSS */
</style>