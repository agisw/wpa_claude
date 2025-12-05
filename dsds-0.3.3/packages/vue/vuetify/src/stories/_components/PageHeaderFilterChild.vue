<template>
  <div class="flex items-center gap-2 px-3">
    <div class="flex flex-col">
      <FormLabel required>Label</FormLabel>
      <input v-model="text"
             class="input text-xs px-2 py-1 border rounded" />
    </div>
    <v-btn variant="secondary"
           @click="onClick">Action</v-btn>
  </div>
</template>

<script setup lang="ts">
import { FormLabel, VBtn } from "@/components/ui"
import { ref } from "vue"

const props = defineProps<{ initialText?: string }>()
const emit = defineEmits<{
  (e: "action", payload?: { message: string }): void
}>()

const text = ref(props.initialText ?? "Hello")

function onClick() {
  emit("action", { message: "PageHeaderFilterChild action clicked" })
}
</script>
