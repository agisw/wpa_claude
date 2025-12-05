<template>
  <div :class="['dsds-dialog-header', {
    'dsds-dialog-header-title': hasTitle,
    'dsds-dialog-header-no-title': !hasTitle,
  }]"
       v-bind="$attrs">
    <div class="flex w-full flex-row items-center">
      <div class="flex flex-shrink-0 flex-row items-center">
        <slot v-if="$slots.default" />
        <span v-else-if="title">{{ title }}</span>
      </div>

      <!-- tools slot: place right-aligned tools (e.g., buttons) here -->
      <div class="dsds-dialog-close-icon">
        <VBtn variant="ghost"
              size="small"
              iconOnly
              @click="handleClose">
          <CloseIcon :size="18" />
        </VBtn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CloseIcon } from "@/components/icons"
import { VBtn } from "@/components/ui"
import { computed, useSlots } from "vue"

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<{
  title?: string
  size?: "compact" | "cozy"
}>(), {
  size: "cozy",
})

const slots = useSlots()

const hasTitle = computed(() => props.title || (slots.default && slots.default(undefined).length > 0))

const modelValue = defineModel<boolean>()

const emit = defineEmits<{
  close: []
}>()

const handleClose = () => {
  emit('close')
  if (modelValue.value !== undefined) {
    modelValue.value = false
  }
}
</script>

<style scoped>
/* 필요 시 추가적인 스타일 보완*/
</style>