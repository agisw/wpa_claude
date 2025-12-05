<template>
  <svg v-if="size === 'small'"
       xmlns="http://www.w3.org/2000/svg"
       width="12"
       height="13"
       viewBox="0 0 12 13"
       fill="none">
    <path d="M7.26953 4.95532L7.40234 5.25024H10.6094L8.23145 7.21411L7.96484 7.43481L8.07715 7.76294L9.21875 11.0852L6.29102 8.99341L6 8.7854L5.70898 8.99341L2.78027 11.0852L3.92285 7.76294L4.03516 7.43481L3.76855 7.21411L1.39062 5.25024H4.59766L4.73047 4.95532L6 2.14087L7.26953 4.95532Z"
          :fill="props.fill"
          :stroke="props.stroke" />
  </svg>
  <svg width="16"
       height="17"
       viewBox="0 0 16 17"
       fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <path d="M9.84375 6.20557L9.97656 6.49951H14.6104L11.082 9.41455L10.8145 9.63525L10.9268 9.9624L12.6182 14.8843L8.29102 11.7935L8 11.5854L7.70898 11.7935L3.38086 14.8843L5.07324 9.9624L5.18555 9.63525L4.91797 9.41455L1.38965 6.49951H6.02344L6.15625 6.20557L8 2.11572L9.84375 6.20557Z"
          :fill="props.fill"
          :stroke="props.stroke" />
  </svg>


</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  fill?: string
  stroke?: string
  size?: 'small' | 'medium'
}>(), {
  fill: 'white',
  stroke: '#ccd1d6',
  size: 'medium'
});
</script>