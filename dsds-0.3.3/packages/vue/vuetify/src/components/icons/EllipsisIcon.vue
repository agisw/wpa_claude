<template>
  <div :class="['dsds-icon', 'with-default-fill', props.className]"
       @click="onClick">
    <svg width="14"
         height="14"
         viewBox="0 0 14 14"
         xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3 6C2.44772 6 2 6.44772 2 7C2 7.55228 2.44772 8 3 8C3.55228 8 4 7.55228 4 7C4 6.44772 3.55228 6 3 6ZM6 7C6 6.44772 6.44772 6 7 6C7.55228 6 8 6.44772 8 7C8 7.55228 7.55228 8 7 8C6.44772 8 6 7.55228 6 7ZM10 7C10 6.44772 10.4477 6 11 6C11.5523 6 12 6.44772 12 7C12 7.55228 11.5523 8 11 8C10.4477 8 10 7.55228 10 7Z" />
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
