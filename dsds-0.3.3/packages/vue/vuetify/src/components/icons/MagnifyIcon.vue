<template>
  <div class="dsds-icon with-default-stroke"
       @click="onClick">
    <div style="padding: 1px">
      <svg width="12"
           height="12"
           viewBox="0 0 13 13"
           fill="none">
        <path d="M8 8L12 12"
              stroke-width="1.2" />
        <circle cx="5"
                cy="5"
                r="4.4"
                stroke-width="1.2" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  size: { type: Number, default: 14 },
  strokeColor: { type: String, default: undefined },
})
const emit = defineEmits(['click'])

function onClick(e: Event) { emit('click', e) }
</script>
