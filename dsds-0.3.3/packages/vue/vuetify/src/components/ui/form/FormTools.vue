<template>
  <div class="dsds-form-tools"
       v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">

defineOptions({
  inheritAttrs: false
})
</script>
