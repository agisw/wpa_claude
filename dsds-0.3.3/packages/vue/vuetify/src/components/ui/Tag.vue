<template>
  <div :class="[
    'dsds-tag',
    { 'dsds-tag-round': round },
    { 'dsds-tag-hashtag': hashtag },
    { 'dsds-tag-disabled': disabled }
  ]">
    <div v-if="hasIcon"
         class="dsds-tag-icon">
      <slot name="icon" />
    </div>
    <div v-if="hashtag"
         class="dsds-tag-hashtag-symbol">#</div>
    <div class="dsds-tag-title">{{ title }}</div>
    <button v-if="closeIcon"
            class="dsds-tag-close"
            @click="handleClose">
      <CloseIcon class="p-[-1px]" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { CloseIcon } from '@/components/icons'
import { computed, useSlots } from 'vue'

/**
 * Tag 컴포넌트의 Props 인터페이스
 */
interface TagProps {
  /** 태그에 표시될 텍스트 */
  title: string
  /** 둥근 모양의 태그로 표시할지 여부 */
  round?: boolean
  /** 해시태그 스타일로 표시할지 여부 (# 기호 추가) */
  hashtag?: boolean
  /** 닫기 버튼을 표시할지 여부 */
  closeIcon?: boolean
  /** 비활성화 상태로 표시할지 여부 */
  disabled?: boolean
}

/**
 * Tag 컴포넌트의 Emits 인터페이스
 */
interface TagEmits {
  /** 닫기 버튼 클릭 시 발생하는 이벤트 */
  close: []
}

/**
 * Tag 컴포넌트는 콘텐츠를 분류하거나 강조하기 위한 작은 라벨 컴포넌트입니다.
 *
 * - **기본 태그**: 간단한 텍스트 라벨
 * - **아이콘 태그**: 아이콘과 텍스트 조합
 * - **해시태그**: # 기호가 포함된 태그
 * - **닫기 버튼**: 제거 가능한 태그
 * - **둥근 태그**: 완전히 둥근 모양의 태그
 * - **비활성화 태그**: 회색으로 표시된 비활성 상태
 *
 * @example
 * ```html
 * <!-- 기본 태그 -->
 * <Tag title="기본 태그" />
 *
 * <!-- 아이콘과 함께 -->
 * <Tag title="아이콘 태그">
 *   <template #icon>
 *     <StarIcon />
 *   </template>
 * </Tag>
 *
 * <!-- 해시태그 스타일 -->
 * <Tag title="해시태그" :hashtag="true" />
 *
 * <!-- 닫기 버튼 포함 -->
 * <Tag title="닫기 가능" :close-icon="true" @close="handleClose" />
 *
 * <!-- 둥근 모양 -->
 * <Tag title="둥근 태그" :round="true" />
 *
 * <!-- 비활성화 상태 -->
 * <Tag title="비활성 태그" :disabled="true" />
 * ```
 */
const props = withDefaults(defineProps<TagProps>(), {
  round: false,
  hashtag: false,
  closeIcon: false,
  disabled: false,
})

const emit = defineEmits<TagEmits>()

const slots = useSlots()

// 아이콘 슬롯이 있는지 확인
const hasIcon = computed(() => !!slots.icon)

// 닫기 버튼 클릭 핸들러
const handleClose = () => {
  emit('close')
}
</script>
