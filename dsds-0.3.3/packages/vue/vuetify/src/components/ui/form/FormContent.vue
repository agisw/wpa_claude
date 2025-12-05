<template>
  <div class="dsds-form-content"
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
