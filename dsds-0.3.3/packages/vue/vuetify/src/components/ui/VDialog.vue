<template>
  <VDialogPrimitive v-model="open"
                    :class="['dsds-v-dialog', dialogClasses]"
                    :content-class="contentClasses"
                    :content-props="contentProps"
                    :overlay-color="overlayColor"
                    :overlay-opacity="overlayOpacity"
                    v-bind="$attrs">
    <slot />
  </VDialogPrimitive>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VDialog as VDialogPrimitive } from 'vuetify/components'

defineOptions({
  inheritAttrs: false
})

/** 단일 모델은 defineModel 사용 */
const open = defineModel<boolean>({ default: false })  // v-model과 동기화되는 로컬 ref 생성[4][2]

interface VDialogProps {
  variant?: 'default' | 'modal' | 'fullscreen'
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  overlayColor?: string
  overlayOpacity?: number
  customContentClass?: string
  contentProps?: any,
}

const props = withDefaults(defineProps<VDialogProps>(), {
  variant: 'default',
  overlayColor: 'rgba(0, 0, 0, 0.5)',
  overlayOpacity: 1,
})

/** 래퍼/콘텐츠 클래스 */
const dialogClasses = computed(() => [
  `dsds-dialog-${props.variant}`,
  `dsds-dialog-${props.size}`,
])  // 래퍼 클래스는 전역 Tailwind 유틸리티 스타일과 결합됨[12][13]

const contentClasses = computed(() =>
  [
    'dsds-dialog-content',
    `dsds-dialog-content-${props.variant}`,
    `dsds-dialog-content-${props.size}`,
    props.customContentClass,
  ]
)  // content-class는 v-overlay__content에 적용되어 크기/변형 스타일에 사용됨[11]
</script>
