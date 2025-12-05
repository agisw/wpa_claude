<template>
  <ScrollAreaRoot v-bind="rootProps"
                  class="relative"
                  :type="type"
                  data-slot="scroll-area">
    <ScrollAreaViewport data-slot="scroll-area-viewport" :style="$attrs.style"
                        class="focus-visible:outline-ring-inner size-full rounded-[inherit] transition-[color,box-shadow] outline-none">
      <slot />
    </ScrollAreaViewport>
    <ScrollAreaScrollbar data-slot="scroll-area-scrollbar"
                         orientation="vertical"
                         :class="verticalScrollbarClasses">
      <ScrollAreaThumb data-slot="scroll-area-thumb"
                       class="bg-scrollbar hover:bg-scrollbar-hover relative flex-1 rounded-full" />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar v-if="horizontal"
                         data-slot="scroll-area-scrollbar"
                         orientation="horizontal"
                         :class="horizontalScrollbarClasses">
      <ScrollAreaThumb data-slot="scroll-area-thumb"
                       class="bg-scrollbar hover:bg-scrollbar-hover relative flex-1 rounded-full" />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner data-slot="scroll-area-corner" />
  </ScrollAreaRoot>
</template>

<script setup lang="ts">
import type { ScrollAreaRootProps } from "reka-ui"
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "reka-ui"
import { computed, toRef } from "vue"


export interface ScrollAreaProps extends ScrollAreaRootProps {
  horizontal?: boolean
}

const props = withDefaults(defineProps<ScrollAreaProps>(), {
  horizontal: false,
  scrollHideDelay: 0,
})

const rootProps = computed<ScrollAreaRootProps>(() => {
  const rest = { ...props } as ScrollAreaProps
  delete rest.horizontal
  return rest as ScrollAreaRootProps
})

const horizontal = toRef(props, "horizontal")

const verticalScrollbarClasses = "flex touch-none p-px transition-colors select-none h-full w-2 border-l border-l-transparent hover:w-2.5 z-100"
const horizontalScrollbarClasses = "flex touch-none p-px transition-colors select-none h-2 flex-col border-t border-t-transparent hover:h-2.5 z-100"
</script>
