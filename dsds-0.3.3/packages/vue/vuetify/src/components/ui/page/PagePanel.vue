<template>
  <section class="dsds-page-panel"
       v-bind="$attrs">
    <slot />
  </section>
</template>

<script setup lang="ts">

defineOptions({
  inheritAttrs: false
})

</script>