<template>
  <div :class="['dsds-icon', 'with-default-stroke', props.className]"
       @click="onClick">
    <svg :width="size"
         :height="size"
         viewBox="0 0 14 14"
         fill="none">
      <path d="M3 3L7 7L3 11"
            :stroke="strokeColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round" />
      <path d="M8 3L12 7L8 11"
            :stroke="strokeColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round" />
    </svg>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  size: { type: Number, default: 14 },
  className: { type: String, default: undefined },
  strokeColor: { type: String, default: undefined },
})
const emit = defineEmits(['click'])

function onClick(e: Event) { emit('click', e) }
</script>
