<template>
  <div :class="calloutClasses">
    <div class="flex flex-col items-start gap-2 px-4 w-full">
      <div :class="[
        'gap-md text-neutral-1st flex items-center font-bold w-full typo-sok-h6-14-700',
        {
          'text-success': kind === 'success',
          'text-error': kind === 'error',
          'text-warning': kind === 'warning',
          'text-info': kind === 'info'
        }
      ]">
        <WarningIcon v-if="kind === 'warning'" />
        <span v-if="kind === 'warning'">주의</span>
      </div>
      <div class="text-neutral-1st typo-sok-body-14-400 w-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WarningIcon } from '@/components/icons'
import { computed } from 'vue'

type CalloutKind = 'success' | 'error' | 'warning' | 'info'
type MarginSize = 'small' | 'medium' | 'large'

interface CalloutProps {
  /** 콜아웃 종류 */
  kind?: CalloutKind
  /** 상하 마진 */
  marginY?: MarginSize
  /** 상단 마진 */
  marginTop?: MarginSize
  /** 하단 마진 */
  marginBottom?: MarginSize
}

const props = withDefaults(defineProps<CalloutProps>(), {
  kind: 'info'
})

// 스타일 계산
const calloutClasses = computed(() => {
  const baseClasses = ['sb-unstyled px-1 py-3 border-l-[4px] default:border-neutral']

  // 마진 관련 클래스
  if (props.marginY) {
    const marginClass = {
      small: 'my-1',
      medium: 'my-2',
      large: 'my-4'
    }[props.marginY]
    baseClasses.push(marginClass)
  }

  if (props.marginTop) {
    const marginClass = {
      small: 'mt-1',
      medium: 'mt-2',
      large: 'mt-4'
    }[props.marginTop]
    baseClasses.push(marginClass)
  }

  if (props.marginBottom) {
    const marginClass = {
      small: 'mb-1',
      medium: 'mb-2',
      large: 'mb-4'
    }[props.marginBottom]
    baseClasses.push(marginClass)
  }

  // kind에 따른 border 클래스
  const kindClass = {
    success: 'border-success',
    error: 'border-error',
    warning: 'border-warning',
    info: 'border-info'
  }[props.kind]
  baseClasses.push(kindClass)

  return baseClasses
})
</script>

<style scoped></style>