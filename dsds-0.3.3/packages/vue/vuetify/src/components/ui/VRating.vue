<template>
  <VRatingsPrimitive v-model="model"
                     :class="[
                      'dsds-v-ratings',
                      `dsds-v-ratings--size-${size}`,
                      {
                        'dsds-v-ratings--disabled': disabled,
                        'dsds-v-ratings--readonly': readonly,
                      },
                    ]"
                     :length="Number(length) || 5"
                     :hover="hover"
                     :clearable="clearable"
                     :disabled="disabled"
                     :readonly="readonly"
                     :half-increments="halfIncrements"
                     :size="mappedSize">
    <template #item="slotProps">
      <StarIcon :fill="slotProps.isFilled || slotProps.isHovered ? '#FFE87E' : undefined"
                :stroke="slotProps.isFilled ? '#FFC836' : undefined" />
    </template>
  </VRatingsPrimitive>
</template>

<script setup lang="ts">
  import { computed, useSlots } from 'vue'
  import { VRating as VRatingsPrimitive } from 'vuetify/components'
  import StarIcon from "./_components/StarIcon.vue"

  export interface VRatingsProps {
    /** 컴포넌트 크기 */
    size?: 'small' | 'medium' | 'large'
    /** 표시할 아이콘 개수 */
    length?: number | string
    /** 비활성화 여부 */
    disabled?: boolean
    /** 읽기 전용 여부 */
    readonly?: boolean
    /** 다시 0점으로 초기화 가능 여부 */
    clearable?: boolean
    /** 마우스 오버 시 미리보기 */
    hover?: boolean
    /** 절반 단위 선택 허용 */
    halfIncrements?: boolean
  }

  const props = withDefaults(defineProps<VRatingsProps>(), {
    size: 'medium',
    length: 5,
    disabled: false,
    readonly: false,
    clearable: false,
    hover: false,
    halfIncrements: false,
  })

  const model = defineModel<number | string>({
    default: 0,
  })

  const sizeMap: Record<'small' | 'medium' | 'large', string | number | undefined> = {
    small: 'small',
    medium: undefined,
    large: 'large',
  }

  const mappedSize = computed(() => sizeMap[props.size])

  const slots = useSlots()
  if (slots['item-label']) {
    console.warn('[DSDS][VRatings] `item-label` 슬롯은 지원되지 않습니다. 기본 스타일이 적용됩니다.')
  }

  defineOptions({
    name: 'VRatings',
  })
</script>
