<template>
  <div class="dsds-icon dsds-icon-5x5 with-default-fill dsds-icon-size-undefined"
       @click="handleClick"
       v-bind="$attrs">
    <svg width="5"
         height="5"
         viewBox="0 0 5 5">
      <path d="M3.5 0H4V5H3.5L0 2.5L3.5 0Z" />
    </svg>
  </div>
</template>

<script setup lang="ts">

defineOptions({
  inheritAttrs: false  // 필수!
})

const props = defineProps<{
  size?: number
  ariaLabel?: string
  fillColor?: string;
  onClick?: (e: MouseEvent) => void
}>()

function handleClick(e: MouseEvent) {
  props.onClick?.(e)
}

</script>