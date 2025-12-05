<template>
  <div :class="['dsds-icon', 'with-default-fill', props.onClick && 'cursor-pointer', props.className]"
       @click="onClick">
    <svg viewBox="0 0 14 14"
         data-testid="hamburger-icon">
      <rect x="1"
            y="2"
            width="12"
            height="2"
            stroke="none" />
      <rect x="1"
            y="6"
            width="12"
            height="2"
            stroke="none" />
      <rect x="1"
            y="10"
            width="12"
            height="2"
            stroke="none" />
    </svg>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  size: { type: Number, default: 14 },
  className: { type: String, default: undefined },
  strokeColor: { type: String, default: undefined },
  onClick: { type: Function, default: undefined },
})
const emit = defineEmits(['click'])

function onClick(e: Event) { emit('click', e) }
</script>
