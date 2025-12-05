<template>
  <div class="dsds-page-header-divider"
       v-bind="$attrs"
       aria-hidden="true"
       :style="{ minHeight: size + 'px' }"></div>
</template>

<script setup lang="ts">

defineOptions({
  inheritAttrs: false
})

withDefaults(defineProps<{
  size?: number
}>(), {
  size: 12
})
</script>