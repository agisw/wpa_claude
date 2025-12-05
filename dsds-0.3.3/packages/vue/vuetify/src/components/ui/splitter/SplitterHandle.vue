<template>
  <SplitterResizeHandle class="dsds-splitter-handle"
                        v-bind="props">
    <svg v-if="!isVertical"
         width="2"
         height="11"
         viewBox="0 0 2 11"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M2 8.5V10.5H0V8.5H2ZM2 4.5V6.5H0V4.5H2ZM2 0.5V2.5H0V0.5H2Z"
            fill="#B2B6BB" />
    </svg>
    <svg v-else
         width="11"
         height="2"
         viewBox="0 0 11 2"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 2H0.5V0L2.5 0V2ZM6.5 2H4.5V0L6.5 0V2ZM10.5 2H8.5V0L10.5 0V2Z"
            fill="#B2B6BB" />
    </svg>
  </SplitterResizeHandle>
</template>

<script setup lang="ts">
  import { computed } from "vue"

  import { SplitterResizeHandle, type SplitterResizeHandleProps, injectSplitterGroupContext } from "reka-ui"

  const props = defineProps<SplitterResizeHandleProps>()

  const groupContext = injectSplitterGroupContext()
  const isVertical = computed(() => groupContext?.direction?.value === "vertical")

</script>


<style>
.dsds-splitter-handle {
  &[data-orientation="horizontal"] {
    @apply relative flex flex-col items-center justify-center;
    border-left: 1px solid var(--color-border-border-2-outer);
    border-right: 1px solid var(--color-border-border-2-outer);
    width: 8px;

    &:focus-visible {
      border-left-color: var(--color-brand);
      border-right-color: var(--color-brand);
    }
  }

  &[data-orientation="vertical"] {
    @apply relative flex items-center justify-center;
    border-top: 1px solid var(--color-border-border-2-outer);
    border-bottom: 1px solid var(--color-border-border-2-outer);
    height: 8px;

    &:focus-visible {
      border-top-color: var(--color-brand);
      border-bottom-color: var(--color-brand);
    }
  }
}
</style>