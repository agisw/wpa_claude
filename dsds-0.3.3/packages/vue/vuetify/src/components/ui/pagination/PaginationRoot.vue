<script setup lang="ts">
  import { useAttrs } from 'vue'

  const props = defineProps({ className: { type: String, default: '' } })
  const attrs = useAttrs()
</script>

<template>
  <nav role="navigation"
       aria-label="pagination"
       data-slot="pagination"
       :class="['mx-auto flex w-full justify-center', props.className, attrs.class]
        .filter(Boolean)
        .join(' ')"
       v-bind="attrs">
    <slot />
  </nav>
</template>
