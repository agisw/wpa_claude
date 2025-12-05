<template>
  <div class="dsds-page-panel-tools"
       v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">

defineOptions({
  inheritAttrs: false
})

</script>