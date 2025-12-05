<template>
  <div :class="['dsds-icon', props.className]"
       @click="onClick">
    <div class="p-px">
      <svg :width="size"
           :height="size"
           viewBox="0 0 20 20"
           fill="none">
        <path d="M2 9.5C2 5.35786 5.35786 2 9.5 2C13.6421 2 17 5.35786 17 9.5C17 13.6421 13.6421 17 9.5 17C5.35786 17 2 13.6421 2 9.5Z"
              fill="#767D84"
              stroke="#767D84" />
        <path d="M10.6999 6.49999C10.6999 7.16273 10.1627 7.69999 9.49992 7.69999C8.83718 7.69999 8.29992 7.16273 8.29992 6.49999C8.29992 5.83725 8.83718 5.29999 9.49992 5.29999C10.1627 5.29999 10.6999 5.83725 10.6999 6.49999Z"
              fill="white" />
        <path d="M8.5 8.5H10.5V13.5H8.5V8.5Z"
              fill="white" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  size: { type: Number, default: 20 },
  className: { type: String, default: undefined },
  strokeColor: { type: String, default: undefined },
})
const emit = defineEmits(['click'])

function onClick(e: Event) { emit('click', e) }
</script>