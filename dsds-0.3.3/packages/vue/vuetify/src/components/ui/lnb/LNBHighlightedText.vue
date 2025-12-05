<template>
  <span>
    <template v-for="(segment, index) in segments"
              :key="`${segment.text}-${index}`">
      <span v-if="segment.matched"
            class="bg-marker-highlight-bg text-black">{{ segment.text }}</span>
      <span v-else>{{ segment.text }}</span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue"

interface HighlightedTextProps {
  text: string
  searchText: string
}

const props = defineProps<HighlightedTextProps>()

const segments = computed(() => {
  const source = props.text ?? ""
  const query = props.searchText?.trim()

  if (!query) {
    return [{ text: source, matched: false }]
  }

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const regex = new RegExp(`(${escaped})`, "gi")
  const parts = source.split(regex)

  return parts
    .filter((part) => part.length > 0)
    .map((part) => ({
      text: part,
      matched: part.toLowerCase() === query.toLowerCase(),
    }))
})
</script>
