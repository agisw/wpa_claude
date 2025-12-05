<!-- VBtn 컴포넌트 템플릿입니다.
     Vuetify의 VBtn을 DSDS 디자인 시스템 스타일로 래핑합니다.

     슬롯 설명:
     - default: 버튼의 기본 콘텐츠를 위한 슬롯입니다. 텍스트나 다른 요소를 포함할 수 있습니다.
-->
<template>
  <VBtnPrimitive :color="mappedColor"
                 :size="mappedSize"
                 :variant="mappedVariant"
                 :disabled="disabled"
                 :class="[
                  'dsds-v-btn',
                  `dsds-v-btn--variant-${props.variant}`,
                  `dsds-v-btn--size-${props.size || 'medium'}`,
                  `dsds-size-${props.size || 'medium'}`,
                  props.iconOnly && 'dsds-v-btn--icon-only',
                  props.icon && props.iconOnly && 'dsds-v-btn--with-icon',
                  props.iconOption === 'before' && 'dsds-v-btn--icon-pos-before',
                  props.iconOption === 'after' && 'dsds-v-btn--icon-pos-after',
                  props.loading && 'dsds-v-btn--loading',
                  props.disabled && 'dsds-v-btn--disabled',
                  props.active && 'dsds-v-btn--active',
                  props.selected && 'dsds-v-btn--selected'
                ]"
                 :data-active="active"
                 :data-selected="selected"
                 v-bind="$attrs">
    <template v-if="!iconOnly && iconOption === 'before' && icon">
      <component :is="icon"
                 class="button-icon mr-1" />
    </template>

    <SpinnerIcon size="small" v-if="loading" />
    <slot v-else></slot>

    <template v-if="!iconOnly && iconOption === 'after' && icon">
      <component :is="icon"
                 class="button-icon" />
    </template>

    <template v-if="iconOnly && icon">
      <component :is="icon"
                 class="button-icon" />
    </template>
  </VBtnPrimitive>
</template>

<script setup lang="ts">
import type { Component, VNode } from "vue"
import { computed } from "vue"
import { VBtn as VBtnPrimitive } from "vuetify/components"
import SpinnerIcon from "../icons/SpinnerIcon.vue"

defineOptions({
  name: "VBtn",
  inheritAttrs: false
})

/**
 * VBtn 컴포넌트의 Props 인터페이스입니다.
 */
export interface VBtnProps {
  /** 버튼의 스타일 변형 */
  variant?: "primary" | "secondary" | "warning" | "danger" | "ghost" | "ghostLink"
  /** 버튼의 크기 */
  size?: "small" | "medium" | "large"
  /** 버튼 비활성화 상태 */
  disabled?: boolean
  /** 버튼 활성화 상태 */
  active?: boolean
  /** 버튼 선택 상태 */
  selected?: boolean
  /** 버튼에 표시할 아이콘 컴포넌트 */
  icon?: Component | string
  /** 아이콘의 위치 (기본값: "before") */
  iconOption?: "before" | "after"
  /** 아이콘만 표시할지 여부 */
  iconOnly?: boolean
  /** 로딩 상태 표시 */
  loading?: boolean
}

/**
 * VBtn 컴포넌트의 Props 정의입니다.
 * DSDS 디자인 시스템의 버튼 스타일을 Vuetify v-btn에 적용합니다.
 */
const props = withDefaults(defineProps<VBtnProps>(), {
  variant: "primary",
  size: "medium",
  disabled: false,
  active: false,
  selected: false,
  iconOption: "before"
})

/**
 * VBtn 컴포넌트의 슬롯 정의입니다.
 */
const slots = defineSlots<{
  /** 버튼의 기본 콘텐츠 슬롯 */
  default: (props: {}) => VNode[]
}>()


// Map DSDS variants to Vuetify colors
/**
 * DSDS variant를 Vuetify 색상으로 매핑
 */
const mappedColor = computed(() => {
  const colorMap = {
    primary: "primary",
    secondary: "secondary",
    warning: "warning",
    danger: "error",
    ghost: "surface",
    ghostLink: "surface"
  }
  return colorMap[props.variant] || "primary"
})


// Map DSDS sizes to Vuetify sizes
/**
 * DSDS 크기를 Vuetify 크기로 매핑
 */
const mappedSize = computed(() => {
  const sizeMap = {
    small: "small",
    medium: "default",
    large: "large"
  }
  return sizeMap[props.size || "medium"]
})

// Map DSDS styles to Vuetify variants
type VuetifyVariant = "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain" | undefined
/**
 * DSDS 스타일을 Vuetify variant로 매핑
 */
const mappedVariant = computed<VuetifyVariant>(() => {
  return "flat"
})
</script>
