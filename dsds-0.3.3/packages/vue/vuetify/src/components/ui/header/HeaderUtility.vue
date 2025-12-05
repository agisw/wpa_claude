<template>
  <div class="dsds-header-utility ml-auto"
       v-bind="$attrs">
    <slot />
  </div>
</template>

<script lang="ts" setup>

defineOptions({
  inheritAttrs: false
})

</script>
