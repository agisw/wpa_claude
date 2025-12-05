<template>
  <VRadioGroupPrimitive v-model="model"
                        class="dsds-v-radio-group"
                        v-bind="filteredAttrs">
    <slot />
  </VRadioGroupPrimitive>
</template>

<script setup lang="ts">
  import { computed, useAttrs } from 'vue'
  import { VRadioGroup as VRadioGroupPrimitive } from "vuetify/components"

  const model = defineModel<any>()

  interface VRadioGroupProps {
    /** 라디오 그룹을 가로 방향으로 배치 */
    row?: boolean
    /** 라디오 그룹을 세로 방향으로 배치 */
    column?: boolean
    /** 필수 선택 여부 (기본값: true) */
    mandatory?: boolean
    /** 전체 라디오 그룹 비활성화 */
    disabled?: boolean
    /** 인라인 스타일 적용 */
    inline?: boolean
  }

  const props = defineProps<VRadioGroupProps>()

  /**
   * attrs에서 color와 정의된 props를 제외하고 전달
   */
  const attrs = useAttrs()
  const filteredAttrs = computed(() => {
    const {
      color,
      row,
      column,
      mandatory,
      disabled,
      density,
      ...rest
    } = attrs

    return {
      ...rest,
      ...props
    }
  })
</script>