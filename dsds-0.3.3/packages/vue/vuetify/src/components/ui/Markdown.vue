<template>
  <VueMarkdown class="dsds-markdown markdown typo-body"
               :markdown="resolvedMarkdown">
    <template #code="{ children, ...markdownProps }">
      <CodeBlock :code="markdownProps.content"
                 :inline="markdownProps.inline"
                 :lang="markdownProps.language || 'text'"
                 :theme="props.theme + '-plus'" />
    </template>
  </VueMarkdown>
</template>

<script setup lang="ts">
import { CodeBlock } from "@/components/ui"
import { VueMarkdown } from "@crazydos/vue-markdown"
import { computed, useSlots } from "vue"

const props = withDefaults(defineProps<{
  content?: string,
  theme?: "dark" | "light"
}>(), {
  content: "",
  theme: "dark",
})

const slots = useSlots()

const slotMarkdown = computed(() => {
  const slotContent = slots.default?.(undefined)
  if (!slotContent) return ""

  const extractText = (nodes: unknown): string => {
    if (!nodes) return ""
    if (Array.isArray(nodes)) {
      return nodes.map(extractText).join("")
    }
    if (typeof nodes === "string" || typeof nodes === "number") {
      return String(nodes)
    }

    if (typeof nodes === "object") {
      const vnode = nodes as { children?: unknown }
      if (typeof vnode.children === "string" || typeof vnode.children === "number") {
        return String(vnode.children)
      }
      if (Array.isArray(vnode.children)) {
        return extractText(vnode.children)
      }
    }

    return ""
  }

  return extractText(slotContent)
})

const resolvedMarkdown = computed(() => {
  if (props.content && props.content.trim().length > 0) {
    return props.content
  }
  if (slotMarkdown.value.trim().length > 0) {
    return slotMarkdown.value
  }
  return ""
})

</script>
