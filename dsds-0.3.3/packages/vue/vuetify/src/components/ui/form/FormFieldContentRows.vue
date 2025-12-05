<template>
  <div class="dsds-form-field-content-rows"
       v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
}>(), {
})

defineOptions({
  inheritAttrs: false
})
</script>
