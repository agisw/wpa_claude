<template>
  <div class="flex items-center gap-4 mb-2">
    <h2 class="min-w-30 text-marker">Variants</h2>
    <div class="min-w-[60px] text-marker">default</div>
    <div class="min-w-[60px] text-marker">disabled</div>
    <div class="min-w-[60px] text-marker">selected</div>
    <div class="min-w-[60px] text-marker">active</div>
  </div>
  <div class="flex flex-col gap-4">
    <template v-for="variant in variants">
      <div class="flex items-center">
        <div class="flex flex-wrap gap-4">
          <h3 class="typo-sok-h5-16-700 capitalize min-w-30">{{ variant }}</h3>
          <VBtn :variant="variant"
                :width="60">button</VBtn>
          <VBtn :variant="variant"
                :width="60"
                disabled>button</VBtn>
        </div>
      </div>
    </template>
    <template v-for="variant in selectableVariants">
      <div class="flex items-center">
        <div class="flex flex-wrap gap-4">
          <h3 class="typo-sok-h5-16-700 capitalize min-w-30">{{ variant }}</h3>
          <VBtn :variant="variant"
                :width="60">button</VBtn>
          <VBtn :variant="variant"
                :width="60"
                disabled>button</VBtn>
          <VBtn :variant="variant"
                :width="60"
                selected>button</VBtn>
          <VBtn :variant="variant"
                :width="60"
                active>button</VBtn>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { VBtn } from '@/components/ui'

const variants = ['primary', 'warning', 'danger', 'ghostLink'] as const
const selectableVariants = ['secondary', 'ghost'] as const
</script>
