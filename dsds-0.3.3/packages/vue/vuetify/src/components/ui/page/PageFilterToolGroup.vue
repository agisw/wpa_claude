<template>
  <div class="dsds-panel-tool-group"
       v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">

defineOptions({
  inheritAttrs: false
})

</script>