<template>
  <div :class="['dsds-icon', 'dsds-icon-5x5', 'with-default-fill', 'dsds-icon-size-undefined']"
       @click="handleClick">
    <svg width="5"
         height="5"
         viewBox="0 0 5 5"
         fill="none">
      <path d="M0 1H5V1.5L2.5 5L0 1.5V1Z" />
    </svg>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  size?: number
  onClick?: (e: MouseEvent) => void
}>()

function handleClick(e: MouseEvent) {
  props.onClick?.(e)
}
</script>