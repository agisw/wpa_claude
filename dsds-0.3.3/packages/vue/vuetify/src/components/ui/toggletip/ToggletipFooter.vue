<template>
  <div class="dsds-toggletip-footer mt-2 flex h-8 w-full items-center justify-between">
    <PaginationContent v-if="page && page > 1"
                       :is-dot="true"
                       class-name="bg-transparent!">
      <PaginationDot v-for="p in page"
                     :key="p"
                     :is-selected="p === currentPage"
                     @click="emit('change', p)" />
    </PaginationContent>
    <div class="flex flex-row gap-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PaginationContent, PaginationDot } from "@/components/ui/pagination"

defineOptions({ name: "ToggletipFooter" })

const props = withDefaults(defineProps<{
  page?: number
  currentPage?: number
}>(), {
  page: undefined,
  currentPage: 1,
})

const emit = defineEmits<{
  change: [page: number]
}>()
</script>
