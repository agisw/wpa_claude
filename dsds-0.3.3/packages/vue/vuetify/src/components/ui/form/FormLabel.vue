<template>
  <div class="dsds-form-label"
       v-bind="$attrs">
    <slot />
    <span v-if="required"
          class="text-danger"
          aria-hidden="true">*</span>
  </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  /** 레이블이 필수 필드인지 여부  */
  required?: boolean
}>(), {
  required: false,
})

defineOptions({
  inheritAttrs: false
})
</script>
