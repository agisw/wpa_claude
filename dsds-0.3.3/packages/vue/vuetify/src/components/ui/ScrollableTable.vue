<template>
  <div
    ref="containerRef"
    v-bind="rootAttrs"
    :class="wrapperClass"
  >
    <div class="dsds-scrollable-table-header" :style="tableHeaderWrapperStyle">
      <table v-if="theadVNode" :class="headerTableClass">
        <component :is="theadVNode" />
      </table>
    </div>
    <ScrollArea
      v-if="shouldShowScrollArea"
      type="auto"
      :class="bodyWrapperClass"
      :style="scrollAreaInlineStyle"
    >
      <Loader size="medium" hideMessage :modelValue="loading" contained style="margin-top: -30px"/>
      <table :class="bodyTableClass" :style="bodyTableStyle">
        <component v-if="tbodyVNode" :is="tbodyVNode" />
        <component v-if="tfootVNode" :is="tfootVNode" />
      </table>
      <div aria-hidden="true" :class="footerLineClass" />
    </ScrollArea>
    <div v-else :class="emptyStateClass" class="dsds-scrollable-table-empty" :style="emptyStatusInlineStyle">
      <slot v-if="!hasEmptySlot" />
      <slot v-else name="empty" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Comment,
  Fragment,
  computed,
  isVNode,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  useSlots,
  watch,
  type HTMLAttributes,
  type StyleValue,
} from "vue"

import { Loader, ScrollArea } from "@/components/ui"

defineOptions({ inheritAttrs: false })

export interface ScrollableTableProps {
  wrapperClass?: HTMLAttributes["class"]
  headerClass?: HTMLAttributes["class"]
  bodyClass?: HTMLAttributes["class"]
  headerStyle?: StyleValue
  bodyStyle?: StyleValue
  scrollAreaClass?: HTMLAttributes["class"]
  scrollAreaStyle?: StyleValue
  bodyWrapperClass?: HTMLAttributes["class"]
  footerLineClass?: HTMLAttributes["class"]
  hideFooterLine?: boolean
  fluid?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<ScrollableTableProps>(), {
  loading: false
})

const attrs = useAttrs()
const slots = useSlots()

const rawAttrs = computed(() => ({ ...attrs }))

const baseTableClass = computed<HTMLAttributes["class"] | undefined>(
  () => rawAttrs.value.class as HTMLAttributes["class"] | undefined,
)
const baseTableStyle = computed<StyleValue | undefined>(() => rawAttrs.value.style as StyleValue | undefined)

const rootAttrs = computed(() => {
  const {
    class: _classAttr,
    style: _styleAttr,
    ...rest
  } = rawAttrs.value
  return rest
})

const theadVNode = computed(() => findSection("thead"))
const tbodyVNode = computed(() => findSection("tbody"))
const tfootVNode = computed(() => findSection("tfoot"))

const wrapperClass = computed(() => [
  "dsds-scrollable-table",
  props.wrapperClass,
])

const bodyWrapperClass = computed(() => [
  "dsds-scrollable-table-body",
  props.bodyWrapperClass,
  props.scrollAreaClass,
])

const emptyStateClass = computed(() => [
  "dsds-scrollable-table__empty flex-1",
  props.bodyWrapperClass,
])

const headerTableClass = computed(() => ['dsds-table grid border-r-0!', baseTableClass.value, props.headerClass])
const bodyTableClass = computed(() => ['dsds-table grid border-t-0 border-r-0!',
  props.fluid && "border-b-0",
  !props.fluid && "border-x-0",
  baseTableClass.value, props.bodyClass])

const tableHeaderWrapperStyle = computed(() => {
  const widthStyle =
    containerWidth.value !== null
      ? { maxWidth: `${Math.max(containerWidth.value, 0)}px` }
      : undefined

  return combineStyles(widthStyle, baseTableStyle.value, props.headerStyle)
})
const bodyTableStyle = computed(() => combineStyles(baseTableStyle.value, props.bodyStyle))

const footerLineClass = computed(() => [
  "dsds-scrollable-table__footer pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-outer",
  props.hideFooterLine && "hidden",
  props.footerLineClass,
])

const hasBodyContent = computed(() => {
  const section = tbodyVNode.value
  if (!section) return false
  return hasRenderableContent(section.children)
})

const hasEmptySlot = computed(() => {
  const emptySlotContent = slots.empty?.(undefined)
  if (!emptySlotContent) return false
  return hasRenderableContent(emptySlotContent)
})

const shouldShowScrollArea = computed(() => {
  if (!tbodyVNode.value) return false
  if (hasBodyContent.value) return true
  return !hasEmptySlot.value
})

const containerRef = ref<HTMLElement | null>(null)
const containerHeight = ref<number | null>(null)
const containerWidth = ref<number | null>(null)
const bodyAvailableHeight = ref<number | null>(null)

let containerObserver: ResizeObserver | undefined
let parentObserver: ResizeObserver | undefined

const scrollAreaInlineStyle = computed<StyleValue | undefined>(() => {
  const heightStyle =
    bodyAvailableHeight.value !== null
      ? { height: `${Math.max(bodyAvailableHeight.value, 0)}px` }
      : undefined

  return combineStyles(heightStyle, props.scrollAreaStyle)
})

const emptyStatusInlineStyle = computed<StyleValue | undefined>(() => {
  const heightStyle =
    bodyAvailableHeight.value !== null
      ? { height: `${Math.max(bodyAvailableHeight.value, 0)}px` }
      : undefined

  return combineStyles(heightStyle, props.scrollAreaStyle)
})


onMounted(() => {
  setupParentObserver()
  nextTick(updateMeasurements)

  if (containerRef.value) {
    containerObserver = new ResizeObserver(() => updateMeasurements())
    containerObserver.observe(containerRef.value)
  }
})

onBeforeUnmount(() => {
  containerObserver?.disconnect()
  parentObserver?.disconnect()
})

watch([theadVNode, tbodyVNode], () => {
  nextTick(updateMeasurements)
})

function updateMeasurements() {
  const container = containerRef.value
  if (!container) return

  const containerRect = container.getBoundingClientRect()
  containerWidth.value = Number.isFinite(containerRect.width)
    ? containerRect.width
    : null

  const nextContainerHeight = calculateAvailableContainerHeight(container)
  if (nextContainerHeight === null) {
    containerHeight.value = null
    bodyAvailableHeight.value = null
    return
  }

  containerHeight.value = nextContainerHeight
  bodyAvailableHeight.value = nextContainerHeight - 24 // 헤더 높이 24px 고정
}

function findSection(tag: string) {
  const content = slots.default?.(undefined)
  if (!content) return null

  for (const node of content) {
    const found = resolveSection(node, tag)
    if (found) {
      return found
    }
  }

  return null
}

function resolveSection(node: unknown, tag: string): any {
  if (!isVNode(node)) {
    if (Array.isArray(node)) {
      for (const child of node) {
        const found = resolveSection(child, tag)
        if (found) return found
      }
    }
    return null
  }

  if (node.type === Comment) {
    return null
  }

  if (node.type === Fragment) {
    const children = node.children
    if (Array.isArray(children)) {
      for (const child of children) {
        const found = resolveSection(child, tag)
        if (found) return found
      }
    }
    return null
  }

  if (typeof node.type === "string" && node.type.toLowerCase() === tag) {
    return node
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      const found = resolveSection(child, tag)
      if (found) return found
    }
  }

  return null
}

function setupParentObserver() {
  parentObserver?.disconnect()

  const parent = containerRef.value?.parentElement
  if (!parent) {
    parentObserver = undefined
    return
  }

  parentObserver = new ResizeObserver(() => updateMeasurements())
  parentObserver.observe(parent)
}

function calculateAvailableContainerHeight(container: HTMLElement) {
  const parent = container.parentElement
  if (!parent) return null

  const parentRect = parent.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  const offsetFromParentTop = containerRect.top - parentRect.top

  if (!Number.isFinite(offsetFromParentTop)) {
    return null
  }

  const parentStyle = getComputedStyle(parent)
  const paddingBottom = Number.parseFloat(parentStyle.paddingBottom) || 0
  const borderBottom = Number.parseFloat(parentStyle.borderBottomWidth) || 0

  const available = parentRect.height - offsetFromParentTop - paddingBottom - borderBottom

  if (!Number.isFinite(available)) {
    return null
  }

  return Math.max(available, 0)
}

function combineStyles(
  ...styles: (StyleValue | null | undefined)[]
): StyleValue | undefined {
  const defined = styles.filter(
    (style): style is StyleValue => style !== undefined && style !== null,
  )

  if (defined.length === 0) return undefined
  if (defined.length === 1) return defined[0]
  return defined
}

function hasRenderableContent(content: unknown): boolean {
  if (content === null || content === undefined || content === false) {
    return false
  }

  if (Array.isArray(content)) {
    return content.some((child) => hasRenderableContent(child))
  }

  if (isVNode(content)) {
    if (content.type === Comment) {
      return false
    }

    if (content.type === Fragment) {
      return hasRenderableContent(content.children)
    }

    if (Array.isArray(content.children)) {
      return hasRenderableContent(content.children)
    }

    if (typeof content.children === "string") {
      return content.children.trim().length > 0
    }

    return true
  }

  if (typeof content === "string") {
    return content.trim().length > 0
  }

  return true
}
</script>
