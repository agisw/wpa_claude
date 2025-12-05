<template>
  <svg
    :width="config.size"
    :height="config.size"
    :stroke="color"
    :viewBox="`0 0 ${config.size} ${config.size}`"
    class="dsds-spinner">
    <g class="dsds-spinner-animation" :class="`dsds-spinner-${size}`">
      <circle
        :cx="center"
        :cy="center"
        :r="config.r"
        fill="none"
        :stroke-width="config.stroke">
      </circle>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type SpinnerSize = 'xs' | 'small' | 'medium' | 'large' | 'xl'

interface Props {
  size?: SpinnerSize
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
})

const SPINNER_CONFIG = {
  xs: {
    size: 8,
    r: 2.0,
    stroke: 1.5,
  },
  small: {
    size: 16,
    r: 6.0,
    stroke: 1.5,
  },
  medium: {
    size: 24,
    r: 9.5,
    stroke: 3,
  },
  large: {
    size: 48,
    r: 20.0,
    stroke: 4,
  },
  xl: {
    size: 96,
    r: 40.0,
    stroke: 8,
  }
} as const

const config = computed(() => SPINNER_CONFIG[props.size])
const center = computed(() => config.value.size / 2)
</script>
