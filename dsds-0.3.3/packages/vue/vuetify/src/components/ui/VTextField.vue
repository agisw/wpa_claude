<template>
  <VTextFieldPrimitive ref="textFieldRef"
                       :variant="mappedVariant"
                       :disabled="disabled"
                       :class="['dsds-v-text-field', ...textFieldClasses]"
                       :model-value="modelValue"
                       :placeholder="placeholder"
                       :clearable="clearable"
                       :maxWidth="maxWidth || width ? width + 'px' : undefined"
                       :width="width ? width + 'px' : undefined"
                       v-bind="$attrs"
                       @update:modelValue="$emit('update:modelValue', $event)">
    <!-- 커스텀 Clear 아이콘 -->
    <template #append-inner>
      <CloseIcon class="clear-button"
                 @click="handleClear"
                 @mousedown.prevent
                 v-if="clearable && modelValue" />

      <slot name="append-inner">
      </slot>
    </template>
  </VTextFieldPrimitive>
</template>

<script setup lang="ts">
import { CloseIcon } from '@/components/icons'
import { computed, ref, useAttrs } from 'vue'
import { VTextField as VTextFieldPrimitive } from "vuetify/components"

defineOptions({
  name: "VTextField",
  inheritAttrs: false
})

/**
 * VTextField 컴포넌트의 Props 인터페이스
 * DSDS 디자인 시스템 스타일의 텍스트 입력 컴포넌트 설정을 정의합니다.
 */
export interface VTextFieldProps {
  /** TextField의 변형 스타일 - 'default'는 아웃라인 스타일, 'ghost'는 채워진 스타일 */
  variant?: "default" | "ghost"
  /** TextField의 크기 - small, medium, large 중 선택 */
  size?: "small" | "medium" | "large"
  /** 컴포넌트 비활성화 상태 */
  disabled?: boolean
  /** 입력된 값 (v-model) */
  modelValue?: string | number
  /** 플레이스홀더 텍스트 */
  placeholder?: string
  /** 클리어 버튼 표시 여부 */
  clearable?: boolean
  /** TextField의 너비 (px 단위) */
  width?: number
  /** TextField의 최대 너비 */
  maxWidth?: number
}

const props = withDefaults(defineProps<VTextFieldProps>(), {
  variant: "default",
  size: "medium",
  disabled: false,
  clearable: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | undefined]
}>()

const textFieldRef = ref()

// Variant 매핑
const mappedVariant = computed(() => {
  const variantMap = {
    default: "outlined",
    ghost: "filled"
  } as const

  return variantMap[props.variant] || "outlined"
})

// CSS 클래스
const textFieldClasses = computed(() => [
  {
    '!dsds-v-text-field-small': props.size === 'small',
    '!dsds-v-text-field-medium': props.size === 'medium',
    '!dsds-v-text-field-large': props.size === 'large',
    '!text-field-outlined': props.variant === 'default',
    '!text-field-ghost': props.variant === 'ghost'
  }
])

const attrs = useAttrs()

// Clear 버튼 핸들러
/**
 * 클리어 버튼 클릭 핸들러
 * 클리어 버튼을 클릭하면 입력값을 빈 문자열로 설정하고 입력상자로 포커스를 이동합니다.
 */
const handleClear = () => {
  emit('update:modelValue', '')
  textFieldRef.value?.focus()
  if (typeof attrs['onClick:clear'] === 'function') {
    attrs['onClick:clear']()
  }
}
</script>

<style scoped>
.clear-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 2px;
  transition: background-color 0.1s ease;
}

.clear-button:hover {
  background-color: rgba(0, 0, 0, 0.08);
}

.clear-button:active {
  background-color: rgba(0, 0, 0, 0.12);
}

.clear-icon {
  width: 14px;
  height: 14px;
}
</style>
