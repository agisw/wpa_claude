<template>
  <BaseSplitterPanel ref="panelRef"
                     v-bind="panelProps"
                     @collapse="handleCollapse"
                     @expand="handleExpand"
                     @resize="handleResize">
    <template #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
  </BaseSplitterPanel>
</template>

<script setup lang="ts">
import {
  SplitterPanel as BaseSplitterPanel,
  injectSplitterGroupContext,
  type SplitterPanelProps as BaseSplitterPanelProps,
  type SplitterPanelEmits,
} from "reka-ui"
import { computed, isRef, ref, useAttrs } from "vue"

import { useSplitterContainer } from "./context"

export type SplitterPanelPixelProps = {
  /** Horizontal layout: pixel-based default width */
  defaultWidth?: number
  /** Horizontal layout: pixel-based minimum width */
  minWidth?: number
  /** Horizontal layout: pixel-based maximum width */
  maxWidth?: number
  /** Vertical layout: pixel-based default height */
  defaultHeight?: number
  /** Vertical layout: pixel-based minimum height */
  minHeight?: number
  /** Vertical layout: pixel-based maximum height */
  maxHeight?: number
}

export type SplitterPanelProps = BaseSplitterPanelProps & SplitterPanelPixelProps

defineOptions({ inheritAttrs: false })

const props = defineProps<SplitterPanelProps>()
const emit = defineEmits<SplitterPanelEmits>()
const attrs = useAttrs()

const splitterGroup = injectSplitterGroupContext()
const container = useSplitterContainer()

const orientation = computed(() => splitterGroup?.direction?.value ?? "horizontal")
const containerSize = computed(() => {
  const width = container?.width.value ?? 0
  const height = container?.height.value ?? 0
  return orientation.value === "horizontal" ? width : height
})

const clampPercent = (value: number) => Math.min(100, Math.max(0, Number(value.toFixed(2))))
const normalize = (percent?: number, pixels?: number) => {
  if (typeof pixels === "number" && containerSize.value > 0) {
    return clampPercent((pixels / containerSize.value) * 100)
  }

  if (percent !== undefined) {
    return percent
  }

  return undefined
}

const resolvedDefaultSize = computed(() => {
  const pixelValue = orientation.value === "horizontal" ? props.defaultWidth : props.defaultHeight
  return normalize(props.defaultSize, pixelValue)
})

const resolvedMinSize = computed(() => {
  const pixelValue = orientation.value === "horizontal" ? props.minWidth : props.minHeight
  return normalize(props.minSize, pixelValue)
})

const resolvedMaxSize = computed(() => {
  const pixelValue = orientation.value === "horizontal" ? props.maxWidth : props.maxHeight
  return normalize(props.maxSize, pixelValue)
})

const panelProps = computed(() => ({
  ...attrs,
  collapsedSize: props.collapsedSize,
  collapsible: props.collapsible,
  defaultSize: resolvedDefaultSize.value,
  id: props.id,
  maxSize: resolvedMaxSize.value,
  minSize: resolvedMinSize.value,
  order: props.order,
}))

const panelRef = ref<InstanceType<typeof BaseSplitterPanel> | null>(null)

const exposedIsCollapsed = computed(() => {
  const target = panelRef.value
  if (!target) return false
  const state = target.isCollapsed
  if (isRef(state)) {
    return state.value
  }
  return Boolean(state)
})
const exposedIsExpanded = computed(() => {
  const target = panelRef.value
  if (!target) return false
  const state = target.isExpanded
  if (isRef(state)) {
    return state.value
  }
  return Boolean(state)
})

defineExpose({
  collapse: () => panelRef.value?.collapse(),
  expand: () => panelRef.value?.expand(),
  getSize: () => panelRef.value?.getSize(),
  resize: (size: number) => panelRef.value?.resize(size),
  isCollapsed: exposedIsCollapsed,
  isExpanded: exposedIsExpanded,
})

const handleCollapse = () => emit("collapse")
const handleExpand = () => emit("expand")
const handleResize = (size: number, prevSize: number | undefined) => emit("resize", size, prevSize)
</script>
