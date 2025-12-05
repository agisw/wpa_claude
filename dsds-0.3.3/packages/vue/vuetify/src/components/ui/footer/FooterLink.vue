<template>
  <a :href="props.href"
     :target="props.target"
     :rel="computedRel"
     class="dsds-footer-link">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue"

interface FooterLinkProps {
  href?: string
  target?: string
  rel?: string
}

const props = withDefaults(defineProps<FooterLinkProps>(), {
  href: "#",
  target: undefined,
  rel: undefined,
})

const computedRel = computed(() => {
  if (props.rel) return props.rel
  if (props.target === "_blank") return "noopener noreferrer"
  return undefined
})

</script>
