<template>
  <HamburgerIcon @click="onClick"
                 class="dsds-header-icon-button dsds-header-hamburger"
                 v-bind="$attrs" />
</template>

<script setup lang="ts">
import { HamburgerIcon } from '@/components/icons'

defineOptions({
  inheritAttrs: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function onClick(e: MouseEvent) { emit('click', e) }
</script>

<style>
.dsds-header-dark {
  .dsds-header-hamburger {
    &.dsds-icon.with-default-stroke {
      stroke: white !important;
    }
  }
}
</style>