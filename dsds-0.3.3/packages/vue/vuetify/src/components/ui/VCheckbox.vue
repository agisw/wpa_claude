<template>
  <div class="dsds-v-checkbox"
    :tabindex="tabindex"
       :class="[{
        'dsds-v-checkbox--disabled': disabled,
        'dsds-v-checkbox--readonly': readonly,
        'dsds-v-checkbox--checked': internalValue,
        'dsds-v-checkbox--unchecked': !internalValue && !isIndeterminate,
        'dsds-v-checkbox--indeterminate': isIndeterminate,
        'dsds-v-checkbox--required': required,
      }]"
       @click="handleClick"
       v-bind="$attrs">
    <!-- 체크박스 컨테이너 -->
    <div class="dsds-v-checkbox-container">
      <!-- 커스텀 아이콘 렌더링 -->
      <div class="dsds-v-checkbox-icon">
        <!-- Indeterminate 상태 -->
        <template v-if="isIndeterminate">
          <div class="px-0.5 py-[5px]!">
            <svg width="8"
                 height="2"
                 viewBox="0 0 8 2"
                 class="checkbox-svg"
                 aria-hidden="true"
                 focusable="false">
              <rect width="8"
                    height="2"
                    fill="white" />
            </svg>
          </div>
        </template>
        <!-- 체크된 상태 -->
        <template v-else-if="internalValue">
          <div class="px-px! py-0.5">
            <svg width="10"
                 height="8"
                 viewBox="0 0 10 8"
                 fill="none">
              <path d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    stroke-width="1.8" />
            </svg>
          </div>
        </template>
      </div>

      <!-- 히든 input (접근성) -->
      <input :id="id"
        v-if="tabindex != -1"
        type="checkbox"
        :checked="internalValue"
        :disabled="disabled"
        :required="required"
        :readonly="readonly"
        class="sr-only"
        @change="handleNativeChange" />

    </div>

    <!-- 라벨 -->
    <label v-if="label"
           :for="id"
           class="dsds-v-checkbox-label"
           :class="{
            'dsds-v-checkbox-label--disabled': disabled,
            'dsds-v-checkbox-label--checked': internalValue,
            'dsds-v-checkbox-label--unchecked': !internalValue && !isIndeterminate,
            'dsds-v-checkbox-label--indeterminate': isIndeterminate
          }">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * VCheckbox 컴포넌트의 Props 인터페이스
 */
interface Props {
  // 기본 props
  /** 체크박스 옆에 표시할 라벨 텍스트 */
  label?: string
  /** 체크박스의 값 (배열 기반 v-model에서 사용) */
  value?: any
  /** 체크박스 비활성화 상태 */
  disabled?: boolean
  /** 읽기 전용 상태 */
  readonly?: boolean
  /** 필수 입력 표시 */
  required?: boolean

  // 상태 관련
  /** 중간 상태 표시 */
  indeterminate?: boolean

  /** 체크된 상태의 값 */
  trueValue?: any
  /** 체크 해제된 상태의 값 */
  falseValue?: any

  // HTML 속성
  /** HTML id 속성 */
  id?: string

  // 추가적인 클래스
  /** 추가 CSS 클래스 */
  /** 탭 인덱스 */
  tabindex?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  value: undefined,
  disabled: false,
  readonly: false,
  required: false,
  indeterminate: false,
  trueValue: true,
  falseValue: false,
  id: undefined,
  tabIndex: undefined
})

// v-model 지원
const model = defineModel<any>({ required: true })

// change 이벤트 emit
const emit = defineEmits<{ (e: 'change', value: any): void }>()

/**
 * 내부 값 계산 - v-model 값에 따른 체크박스 상태 결정
 */
const internalValue = computed(() => {
  // 배열 기반 v-model 지원: value가 배열에 포함되어 있는지 확인
  if (Array.isArray(model.value) && props.value !== undefined) {
    return model.value.includes(props.value)
  }
  // 단일 값 기반 (기존 로직 유지)
  if (props.value !== undefined) {
    return model.value === props.value
  }
  if (props.trueValue !== true || props.falseValue !== false) {
    return model.value === props.trueValue
  }
  return Boolean(model.value)
})

/**
 * indeterminate 상태인지 확인
 */
const isIndeterminate = computed(() => props.indeterminate)

// 메서드
/**
 * 체크박스 클릭 이벤트 핸들러
 * v-model 값을 토글합니다.
 */
const handleClick = () => {
  if (props.disabled || props.readonly) return

  let newValue: any
  if (Array.isArray(model.value) && props.value !== undefined) {
    // 배열 기반: value를 추가/제거
    const currentArray = [...model.value]
    if (internalValue.value) {
      // 체크 해제: 배열에서 제거
      const index = currentArray.indexOf(props.value)
      if (index > -1) currentArray.splice(index, 1)
    } else {
      // 체크: 배열에 추가
      currentArray.push(props.value)
    }
    newValue = currentArray
  } else if (props.value !== undefined) {
    // 단일 값 기반 (기존 로직 유지)
    newValue = internalValue.value ? props.falseValue : props.value
  } else {
    // 기본 토글
    newValue = internalValue.value ? props.falseValue : props.trueValue
  }
  model.value = newValue
  // 외부 리스너에 변경 사항을 알리기 위해 change 이벤트를 발생시킵니다.
  emit('change', newValue)
}

/**
 * 숨겨진 native input의 change 핸들러 - 래퍼 클릭 동작과 동일하게 유지합니다.
 */
const handleNativeChange = (e: Event) => {
  // native input을 클릭했을 때도 동일한 토글 로직이 실행되도록 합니다.
  handleClick()
  // handleClick 이후 갱신된 model 값을 change 이벤트로 전달합니다.
  emit('change', model.value)
}

/**
 * 컴포넌트 옵션 정의
 */
defineOptions({
  name: 'VCheckbox',
  inheritAttrs: false
})
</script>
