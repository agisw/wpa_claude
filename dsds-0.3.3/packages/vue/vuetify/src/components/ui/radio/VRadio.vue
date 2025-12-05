<template>
  <VRadioPrimitive class="dsds-v-radio"
                   v-bind="filteredAttrs">
    <slot />
    <template v-if="$slots.label"
              #label>
      <slot name="label" />
    </template>
  </VRadioPrimitive>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { VRadio as VRadioPrimitive } from "vuetify/components"

interface VRadioProps {
  /** 라디오 버튼의 라벨 텍스트 */
  label?: string
  /** 라디오 버튼의 값 */
  value?: any
  /** 라디오 버튼 비활성화 상태 */
  disabled?: boolean
  /** 읽기 전용 상태 */
  readonly?: boolean
}

const props = defineProps<VRadioProps>()

/**
 * attrs에서 color를 제거하고 나머지만 전달
 */
const attrs = useAttrs()
const filteredAttrs = computed(() => {
  const {
    color,
    label,
    value,
    disabled,
    density,
    readonly,
    ripple,
    ...rest
  } = attrs

  return {
    ...rest,
    ...props
  }
})
</script>
