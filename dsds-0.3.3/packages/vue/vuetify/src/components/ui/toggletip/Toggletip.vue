<template>
  <VMenu v-model:model-value="open"
         v-bind="$attrs"
         :close-on-content-click="false"
         :content-class="['dsds-dropdown-content-base', props.contentClass].filter(Boolean).join(' ')"
         :origin="origin"
         :transition="transition"
         :offset="offset"
         :location="location"
         class="dsds-toggletip">
    <template #activator="{ props: activatorProps }">
      <slot name="trigger"
            :props="activatorProps">
        <VBtn variant="secondary"
              size="small"
              v-bind="activatorProps">
          {{ triggerLabel }}
        </VBtn>
      </slot>
    </template>

    <slot :close="close" />
  </VMenu>
</template>

<script setup lang="ts">
import { computed, watch } from "vue"
import { VMenu } from "vuetify/components"
import type { Anchor } from "vuetify/lib/util/index.mjs"
import VBtn from "../VBtn.vue"

defineOptions({
  inheritAttrs: false
})

interface Props {
  triggerLabel?: string
  origin?: "auto" | Anchor | "overlap"
  transition?: string
  offset?: number | string | number[]
  location?: Anchor
  contentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  triggerLabel: "Open toggletip",
  origin: "auto",
  transition: "scale-transition",
  offset: 4,
  location: "top",
  contentClass: "",
})

const emit = defineEmits<{
  "open-change": [open: boolean]
}>()

const open = defineModel<boolean>("open", { default: false })

const close = () => {
  if (!open.value) return
  open.value = false
}

const origin = computed(() => props.origin)
const transition = computed(() => props.transition)
const offset = computed(() => props.offset)
const location = computed(() => props.location)

watch(open, (value) => {
  emit("open-change", value)
})

const triggerLabel = computed(() => props.triggerLabel)
</script>
