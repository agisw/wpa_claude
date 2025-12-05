<template>
  <main class="dsds-page"
       v-bind="$attrs">
    <slot />
  </main>
</template>

<script setup lang="ts">

defineOptions({
  inheritAttrs: false
})

</script>