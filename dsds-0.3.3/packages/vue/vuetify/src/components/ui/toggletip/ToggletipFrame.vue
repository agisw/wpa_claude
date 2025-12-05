<template>
  <div :class="[
    'dsds-toggletip-frame',
    'rounded-xs',
    'px-4',
    'py-3',
    'outline-hidden',
    'shadow-dropdown',
    'bg-dropdown-bg',
    'text-dropdown-text',
    'flex',
    'flex-col',
    'gap-2',
    size === 'small' ? 'w-[256px]' : 'w-[320px]',
  ]"
       :data-size="size">
    <div v-if="hasTitle"
         class="dsds-toggletip-title typo-sok-h6-14-700 min-h-5">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="dsds-toggletip-body">
      <slot />
    </div>
    <div v-if="$slots.footer"
         class="dsds-toggletip-footer mt-2 flex items-center justify-between">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue"

defineOptions({ name: "ToggletipFrame" })

const props = withDefaults(defineProps<{
  size?: "small" | "medium"
  title?: string
}>(), {
  size: "medium",
  title: undefined,
})

const slots = useSlots()

const hasTitle = computed(() => Boolean(props.title) || Boolean(slots.title))
</script>
