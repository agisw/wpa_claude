<template>
  <div class="dsds-form-contents"
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
