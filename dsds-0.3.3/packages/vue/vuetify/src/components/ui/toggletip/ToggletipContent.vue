<template>
  <div class="dsds-toggletip-page flex flex-col gap-2">
    <div v-if="!unstyled"
         class="dsds-toggletip-section-content typo-sok-body-14-400 mt-1 break-all">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue"

const props = withDefaults(defineProps<{
  unstyled?: boolean
}>(), {
  unstyled: false,
})

defineOptions({ name: "ToggletipContent" })

const { unstyled } = toRefs(props)
</script>
