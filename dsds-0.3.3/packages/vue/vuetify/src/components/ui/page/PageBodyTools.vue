<template>
  <div class="dsds-page-body-tools"
       v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">

defineOptions({
  inheritAttrs: false
})

</script>