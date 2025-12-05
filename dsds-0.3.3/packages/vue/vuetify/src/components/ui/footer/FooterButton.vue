<template>
  <VBtn :variant="variant"
        :size="size"
        :disabled="disabled"
        :active="active"
        :selected="selected"
        :icon="icon"
        :icon-option="iconOption"
        :icon-only="iconOnly"
        :loading="loading"
        class="dsds-footer-button">
    <slot />
  </VBtn>
</template>

<script setup lang="ts">
import { VBtn, type VBtnProps } from "@/components/ui"
import { toRefs } from "vue"

export type FooterButtonProps = Omit<VBtnProps, "class">

const props = withDefaults(defineProps<FooterButtonProps>(), {
  variant: "ghost",
  size: "small",
  disabled: false,
  active: false,
  selected: false,
  iconOption: "before",
  iconOnly: false,
  loading: false,
})

const {
  variant,
  size,
  disabled,
  active,
  selected,
  icon,
  iconOption,
  iconOnly,
  loading,
} = toRefs(props)
</script>
