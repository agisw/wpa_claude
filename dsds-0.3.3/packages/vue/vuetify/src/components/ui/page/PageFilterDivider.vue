<template>
  <div class="dsds-panel-divider"
       :class="{
        'dsds-panel-divider--double': props.doubleLine,
      }"
       v-bind="attrs"
       aria-hidden="true"
       :style="{ minHeight: props.size + 'px' }"></div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

const props = withDefaults(defineProps<{
  size?: number
  doubleLine?: boolean
}>(), {
  size: 12,
  doubleLine: false
})

const attrs = useAttrs()
</script>

<style scoped>
/* no local styles; styling is handled via utility classes */
</style>
