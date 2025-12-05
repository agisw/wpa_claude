<template>
  <div class="flex h-4 w-4 items-center justify-center">
    <button :aria-current="isSelected ? 'page' : undefined"
            data-slot="pagination-link"
            :data-active="isSelected"
            :disabled="disabled"
            :class="[
              'flex h-2 w-2 items-center justify-center rounded-full bg-[var(--colors-neutral-neutral-08)]!',
              isSelected ? 'text-brand bg-brand!' : '',
              !isSelected ? 'not-[:disabled]:hover:border! not-[:disabled]:hover:border-[var(--colors-neutral-neutral-11)]!' : '',
              'not-[:disabled]:focus-visible:outline-ring not-[:disabled]:focus-visible:bg-[var(--colors-neutral-neutral-08)]',
              'disabled:text-[var(--color-text-on-btn-ghost-on-ghost-disabled)]!',
            ].filter(Boolean).join(' ')"
            v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">

defineOptions({
  inheritAttrs: false
})

defineProps<{
  disabled?: boolean
  isSelected?: boolean
}>()
</script>
