<template>
      <div :class="['dsds-icon', 'with-default-stroke', props.className]"
           @click="onClick">
            <svg v-if="size === 18"
                 width="14"
                 height="14"
                 viewBox="0 0 14 14"
                 fill="none">
                  <path d="M2 12L12 2"
                        stroke-width="1.2" />
                  <path d="M2 2L12 12"
                        stroke-width="1.2" />
            </svg>
            <svg v-else
                 :width="size"
                 :height="size"
                 :viewBox="`0 0 14 14`"
                 fill="none">
                  <path d="M3.5 3.5L10.5 10.5"
                        stroke-width="1.2" />
                  <path d="M10.5 3.5L3.5 10.5"
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
