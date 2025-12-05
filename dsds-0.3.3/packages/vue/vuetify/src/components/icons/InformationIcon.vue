<template>
  <div v-bind="attrs"
       :class="['dsds-icon', { 'cursor-pointer': props.onClick }]"
       role="img"
       :aria-label="ariaLabel"
       @click="handleClick">
    <svg xmlns="http://www.w3.org/2000/svg"
         width="14"
         height="14"
         viewBox="0 0 14 14"
         fill="none">
      <path d="M0.5 1.5C0.5 0.947715 0.947715 0.5 1.5 0.5H12.5C13.0523 0.5 13.5 0.947715 13.5 1.5V12.5C13.5 13.0523 13.0523 13.5 12.5 13.5H1.5C0.947715 13.5 0.5 13.0523 0.5 12.5V1.5Z"
            fill="white"
            stroke="#EDF2F4" />
      <path d="M8.19992 4.00078C8.19992 4.66352 7.66266 5.20078 6.99992 5.20078C6.33718 5.20078 5.79992 4.66352 5.79992 4.00078C5.79992 3.33804 6.33718 2.80078 6.99992 2.80078C7.66266 2.80078 8.19992 3.33804 8.19992 4.00078Z"
            fill="#767D84" />
      <path d="M6 6H8V11H6V6Z"
            fill="#767D84" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useAttrs } from "vue"

const props = defineProps<{
  onClick?: (e: MouseEvent) => void
}>()

const attrs = useAttrs()
const ariaLabel = (attrs['aria-label'] as string) ?? "information"

function handleClick(e: MouseEvent) {
  props.onClick?.(e)
}
</script>