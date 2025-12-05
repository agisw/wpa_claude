<template>
  <div :class="['dsds-icon', 'with-default-stroke', props.className]"
       @click="onClick">
    <svg :width="size"
         :height="size"
         viewBox="0 0 14 14"
         fill="none">
      <g clip-path="url(#clip0_11104_53232)">
        <path d="M1.5 8.5V4.5H8.5L12.5 0.5V12.5H12.4L8.5 8.5H6.5V13.5H3.5V8.5H1.5Z"
              fill="#FBFBFB"
              stroke="var(--color-icon-default)" />
        <rect x="4"
              y="8.5"
              width="2"
              height="0.01"
              fill="var(--color-icon-default)" />
      </g>
      <defs>
        <clipPath id="clip0_11104_53232">
          <rect width="14"
                height="14"
                fill="white" />
        </clipPath>
      </defs>
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
