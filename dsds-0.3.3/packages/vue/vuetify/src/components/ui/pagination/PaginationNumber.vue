<script setup lang="ts">
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from "@/components/icons"
import { computed, useAttrs } from 'vue'

const props = defineProps({
  className: { type: String, default: '' },
  isSelected: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  page: { type: Number as () => number | undefined, default: undefined },
  chevron: { type: String as () => 'left' | 'right' | 'first' | 'last' | undefined, default: undefined },
})
const attrs = useAttrs()

const pageLen = computed(() => (props.page ? String(props.page).length : 0))
const classes = computed(() => [
  'select-none typo-button-label-medium! flex h-6 w-6 items-center justify-center rounded-xs text-[var(--color-text-on-btn-ghost-on-ghost-default)] tabular-nums',
  pageLen.value > 1 ? 'w-8' : '',
  pageLen.value == 1 ? 'pl-[1.5px]' : '',
  props.isSelected ? 'text-brand! bg-[var(--color-bg-on-ghost-button-ghostbtn-activated)]!' : '',
  'not-[:disabled]:hover:bg-[var(--color-bg-on-ghost-button-ghostbtn-hover)]!',
  'not-[:disabled]:focus-visible:outline-ring-0 not-[:disabled]:focus-visible:text-brand not-[:disabled]:focus-visible:bg-[var(--color-bg-on-ghost-button-ghostbtn-hover)]!',
  'disabled:text-[var(--color-text-on-btn-ghost-on-ghost-disabled)]!',
  'disabled:[&>div>svg>path]:stroke-[var(--color-text-on-btn-ghost-on-ghost-disabled)]!',
  props.chevron == 'left' ? 'mr-[5.5px]' : '',
  props.chevron == 'right' ? 'ml-[5.5px]' : '',
  props.className,
  (attrs && (attrs as any).class) || '',
].filter(Boolean).join(' '))
</script>

<template>
  <button v-bind="attrs"
          :aria-current="props.isSelected ? 'page' : undefined"
          :disabled="props.disabled"
          data-slot="pagination-link"
          :data-active="props.isSelected"
          :class="classes">
    <template v-if="props.page">{{ props.page }}</template>
    <ChevronDoubleLeftIcon v-if="props.chevron === 'first'" />
    <ChevronDoubleRightIcon v-if="props.chevron === 'last'" />
    <ChevronLeftIcon v-if="props.chevron === 'left'" />
    <ChevronRightIcon v-if="props.chevron === 'right'" />
    <slot />
  </button>
</template>
