<template>
  <div class="dsds-icon dsds-icon-5x5 with-default-fill dsds-icon-size-undefined"
       @click="handleClick"
       v-bind="$attrs">
    <svg width="5"
         height="5"
         viewBox="0 0 5 5"
         fill="none">
      <path d="M0 3.5L2.5 0L5 3.5V4H0V3.5Z" />
    </svg>
  </div>
</template>

<script setup lang="ts">

defineOptions({
  inheritAttrs: false  // 필수!
})

const props = defineProps<{
  size?: number
  onClick?: (e: MouseEvent) => void
}>()

function handleClick(e: MouseEvent) {
  props.onClick?.(e)
}
</script>