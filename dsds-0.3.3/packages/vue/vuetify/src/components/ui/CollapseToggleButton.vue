<template>
  <v-btn variant="secondary"
         :class="`z-index-0! rounded-0! hover:shadow-sm! hover:bg-[var(--colors-neutral-neutral-03)]! shadow-sm! pb-[3px]! ${props.direction === 'horizontal' ? 'min-w-3! px-0! h-[60px]!' : 'w-[60px]! h-3!'} `"
         @click="toggle"
         :aria-expanded="!collapsed">
    <TriangleUpIcon v-if="!collapsed && !isHorizontal" />
    <TriangleDownIcon v-if="collapsed && !isHorizontal" />
    <TriangleRightIcon v-if="!collapsed && isHorizontal" />
    <TriangleLeftIcon v-if="collapsed && isHorizontal" />
    <!-- {{ collapsed ? '펼치기' : '접기' }} -->
  </v-btn>
</template>

<script setup lang="ts">
import {
  TriangleDownIcon,
  TriangleLeftIcon,
  TriangleRightIcon,
  TriangleUpIcon,
} from "@/components/icons"
import { VBtn } from "@/components/ui"
import { computed } from "vue"

// Vue 3.4+ defineModel for simpler two-way binding
const collapsed = defineModel<boolean>("collapsed", { default: false })

const props = withDefaults(
  defineProps<{
    direction?: "vertical" | "horizontal",
  }>(),
  { direction: "vertical" }
)

const isHorizontal = computed(() => props.direction === "horizontal")

function toggle() {
  collapsed.value = !collapsed.value
}
</script>