<template>
  <div class="dsds-page-header-filter-row"
       v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">

defineOptions({
  inheritAttrs: false
})

</script>