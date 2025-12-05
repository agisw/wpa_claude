<template>
  <div :class="['dsds-icon', props.className]"
       @click="onClick">
    <div class="p-px">
      <svg :width="size"
           :height="size"
           viewBox="0 0 16 16"
           fill="none">
        <circle cx="8"
                cy="8"
                r="8"
                fill="#FFB546" />
        <path d="M9.20071 11.2C9.20071 11.8627 8.66346 12.4 8.00071 12.4C7.33797 12.4 6.80071 11.8627 6.80071 11.2C6.80071 10.5373 7.33797 10 8.00071 10C8.66346 10 9.20071 10.5373 9.20071 11.2Z"
              fill="white" />
        <path d="M7 4H9V9H7V4Z"
              fill="white" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  size: { type: Number, default: 16 },
  className: { type: String, default: undefined },
  strokeColor: { type: String, default: undefined },
})
const emit = defineEmits(['click'])

function onClick(e: Event) { emit('click', e) }
</script>