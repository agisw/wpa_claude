<template>
  <div :class="['dsds-icon', 'with-default-color', props.onClick && 'cursor-pointer']"
       @click="onClick">
    <svg viewBox="0 0 14 14"
         fill="none"
         style="width: 14px; height: 14px;">
      <path d="M1.5 3.5C1.5 2.94772 1.94772 2.5 2.5 2.5H11.5C12.0523 2.5 12.5 2.94772 12.5 3.5V10.5C12.5 11.0523 12.0523 11.5 11.5 11.5H2.5C1.94771 11.5 1.5 11.0523 1.5 10.5V3.5Z"
            fill="none"
            stroke-width="1.001"></path>
      <rect x="2"
            y="5"
            width="10"
            height="1"
            stroke="none"
            stroke-width="1.001"></rect>
      <rect x="4"
            y="1"
            width="1"
            height="1"
            stroke="none"
            stroke-width="1.001"></rect>
      <rect x="9"
            y="1"
            width="1"
            height="1"
            stroke="none"
            stroke-width="1.001"></rect>
    </svg>
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
  size?: number
  strokeColor?: string
  onClick?: (e: Event) => void
}>(), {
  size: 14,
});
const emit = defineEmits(['click'])

function onClick(e: Event) { emit('click', e) }
</script>
