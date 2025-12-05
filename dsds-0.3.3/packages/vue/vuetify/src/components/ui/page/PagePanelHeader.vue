<template>
  <div class="dsds-page-panel-header"
       v-bind="$attrs">
    <slot />
    <template v-if="hasTitleToolsSlot">
      <VDivider vertical
                class="mx-0" />
      <slot name="title-tools" />
    </template>

    <template v-if="hasToolsSlot">
      <div class="dsds-page-panel-header--tools">
        <slot name="tools" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue"

defineOptions({
  inheritAttrs: false
})

const slots = useSlots()
const hasTitleToolsSlot = computed(() => Boolean(slots['title-tools']))
const hasToolsSlot = computed(() => Boolean(slots.tools))
</script>