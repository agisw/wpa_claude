<template>
  <VTextField v-model="modelValue"
              :placeholder="placeholder"
              :class="['dsds-searchbox', { 'dsds-searchbox--dense': attrs.density === 'compact' }, $attrs.class]"
              :clearable="clearable"
              :disabled="disabled"
              :size="size"
              :variant="variant"
              :width="width"
              :max-width="maxWidth"
              v-bind="forwardedAttrs"
              @keydown.enter="handleEnter">
    <template #append-inner>
      <VBtn variant="ghost"
            size="small"
            iconOnly
            :disabled="disabled || searchButtonDisabled"
            :aria-label="searchButtonAriaLabel"
            @click="handleSearchButtonClick">
        <component :is="resolvedIcon" />
      </VBtn>
    </template>
  </VTextField>
</template>

<script setup lang="ts">
import { MagnifyIcon } from "@/components/icons"
import { computed, toRef, toRefs, useAttrs } from "vue"
import VBtn from "./VBtn.vue"
import VTextField from "./VTextField.vue"

import type { Component } from "vue"
import type { VTextFieldProps } from "./VTextField.vue"

defineOptions({ inheritAttrs: false })

type AllowedProps = Omit<VTextFieldProps, "modelValue"> & {
  searchButtonAriaLabel?: string
  searchButtonDisabled?: boolean
  searchIcon?: Component
  emitSearchOnEnter?: boolean
}

const props = withDefaults(defineProps<AllowedProps>(), {
  placeholder: "Search",
  size: "medium",
  variant: "default",
  clearable: true,
  disabled: false,
  searchButtonAriaLabel: "검색",
  searchButtonDisabled: false,
  emitSearchOnEnter: true,
})

type SearchValue = VTextFieldProps["modelValue"] | undefined

const emit = defineEmits<{
  search: [value: SearchValue]
}>()

const modelValue = defineModel<SearchValue>()

const attrs = useAttrs()

const forwardedAttrs = computed(() => {
  const entries = Object.entries(attrs).filter(
    ([key]) => !["append-inner", "appendInner"].includes(key)
  )
  return Object.fromEntries(entries)
})

const { placeholder, clearable, disabled, size, variant, width, maxWidth } = toRefs(props)
const searchButtonAriaLabel = toRef(props, "searchButtonAriaLabel")
const searchButtonDisabled = toRef(props, "searchButtonDisabled")
const emitSearchOnEnter = toRef(props, "emitSearchOnEnter")

const resolvedIcon = computed(() => props.searchIcon ?? MagnifyIcon)

const handleSearch = () => {
  emit("search", modelValue.value)
}

const handleSearchButtonClick = () => {
  handleSearch()
}

const handleEnter = () => {
  if (emitSearchOnEnter.value) {
    handleSearch()
  }
}
</script>
