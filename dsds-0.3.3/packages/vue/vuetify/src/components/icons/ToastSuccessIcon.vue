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
                fill="#239B2F" />
        <path d="M4 8L6.5 10.5L12 5"
              stroke="white"
              stroke-width="1.8" />
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