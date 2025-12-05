<template>
  <div class="dsds-icon dsds-icon-5x5 with-default-fill dsds-icon-size-undefined"
       @click="handleClick"
       v-bind="$attrs">
    <svg width="5"
         height="5"
         viewBox="0 0 5 5">
      <path d="M1 0H1.5L5 2.5L1.5 5H1V0Z" />
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