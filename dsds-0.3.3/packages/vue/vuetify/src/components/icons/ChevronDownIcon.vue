<template>
  <div :class="['dsds-icon', 'with-default-stroke', props.className]"
       @click="onClick">
    <svg :width="size"
         :height="size"
         viewBox="0 0 14.24 14"
         fill="none">
      <path d="M11.0001 4.99997L7.00002 8.99999L3.00012 4.99997"
            :stroke="strokeColor"
            stroke-width="1.2" />
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
