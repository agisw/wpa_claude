<template>
  <div :class="['dsds-page-header-filter', {
    'collapsed': internalCollapsed,
    'expanded': !internalCollapsed,
  }]"
       v-bind="$attrs">
    <template v-if="!internalCollapsed">
      <div class="dsds-page-header-filter-divider"></div>
      <slot />
    </template>
    <div :class="['dsds-page-header-filter-footer', {
      'collapsed': internalCollapsed,
      'expanded': !internalCollapsed,
    }]"
         v-if="collapseButtonPosition === 'center'">
      <CollapseToggleButton v-model:collapsed="internalCollapsed" />
    </div>
    <div :class="['dsds-page-header-filter-footer justify-end', {
      'collapsed': internalCollapsed,
      'expanded': !internalCollapsed,
    }]"
         v-else-if="collapseButtonPosition === 'right'">
      <CollapseToggleButton v-model:collapsed="internalCollapsed"
                            :class="internalCollapsed ? 'mr-3' : undefined" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CollapseToggleButton } from "@/components/ui"

defineOptions({
  inheritAttrs: false
})

withDefaults(defineProps<{
  /**
   * 페이지 헤더 필터의 접힘 상태를 제어합니다.
   * @default false
   */
  collapseButtonPosition?: "center" | "right"
}>(), {
  collapseButtonPosition: "center",
})

// 내부 접힘 상태 관리
const internalCollapsed = defineModel<boolean>("collapsed", { default: false })
</script>