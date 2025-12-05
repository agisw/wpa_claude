<template>
  <div :class="['dsds-icon', 'with-default-stroke', props.class]"
       @click="onClick">
    <div class="px-0.5! py-1!">
      <svg width="10"
           height="6"
           viewBox="0 0 10 6"
           fill="none">
        <path d="M9.00012 0.999969L5.00002 4.99999L1.00012 0.999969"
              stroke-width="1.2" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  size: { type: Number, default: 14 },
  class: { type: String, default: undefined },
  strokeColor: { type: String, default: undefined },
})
const emit = defineEmits(['click'])

function onClick(e: Event) { emit('click', e) }
</script>
