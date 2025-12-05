<template>
  <nav data-slot="pagination-content"
       :class="['dsds-pagination-content', !isDot && 'is-dot']"
       v-bind="$attrs">
    <slot />
  </nav>
</template>

<script setup lang="ts">

defineOptions({
  inheritAttrs: false
})

defineProps<{
  isDot?: boolean
}>();
</script>
