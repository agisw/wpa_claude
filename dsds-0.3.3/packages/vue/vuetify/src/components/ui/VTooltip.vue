<template>
  <VTooltipPrimitive v-model="model"
                     v-bind="$attrs"
                     :disabled="props.disabled"
                     :open-delay="openDelay || 100"
                     :close-delay="closeDelay || 0"
                     :location="props.location"
                     :transition="transition || 'fast-fade'"
                     :offset="4"
                     :content-class="['dsds-v-tooltip', showArrow && `arrow-${normalizedLocation}`, contentClass]"
                     class="dsds-v-tooltip-root">
    <!-- activator slot 전달 -->
    <template v-if="$slots.activator"
              #activator="slotProps">
      <slot name="activator"
            v-bind="slotProps" />
    </template>

    <!-- default slot (tooltip content) 전달 -->
    <template #default>
      <div class="tooltip-content-wrapper">
        <slot />
      </div>
    </template>
  </VTooltipPrimitive>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Anchor } from 'vuetify'
import { VTooltip as VTooltipPrimitive } from 'vuetify/components'

defineOptions({
  name: "VTooltip",
  inheritAttrs: false
})

interface Props {
  // 기본 props
  text?: string
  location?: Anchor
  disabled?: boolean

  // 지연시간 관련
  openDelay?: number | string
  closeDelay?: number | string

  // 스타일 관련
  contentClass?: string
  transition?: string
  offset?: number | string

  // 화살표 관련
  showArrow?: boolean
  arrowSize?: number

  // 위치 조정
  nudgeTop?: number | string
  nudgeBottom?: number | string
  nudgeLeft?: number | string
  nudgeRight?: number | string

  // 기타
  eager?: boolean
  attach?: string | Element
  zIndex?: number | string
  maxWidth?: number | string
  minWidth?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  text: undefined,
  location: undefined,
  disabled: false,
  openDelay: 100,
  closeDelay: 0,
  contentClass: '',
  transition: 'fast-fade',
  offset: undefined,
  showArrow: true,
  arrowSize: 6,
  nudgeTop: undefined,
  nudgeBottom: undefined,
  nudgeLeft: undefined,
  nudgeRight: undefined,
  eager: false,
  attach: undefined,
  zIndex: undefined,
  maxWidth: undefined,
  minWidth: undefined
})

// v-model 지원 (tooltip의 표시/숨김 제어)
const model = defineModel<boolean>({
  default: false
})

//const tooltipOpen = ref(true)

// location을 정규화 (복합 위치를 기본 위치로 변환)
const normalizedLocation = computed(() => {
  const loc = props.location || 'top'
  if (loc.includes('top')) return 'top'
  if (loc.includes('bottom')) return 'bottom'
  if (loc.includes('left')) return 'left'
  if (loc.includes('right')) return 'right'
  return loc as string
})

</script>
