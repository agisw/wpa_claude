<template>
  <div ref="containerRef"
       class="dsds-splitter-container">
    <SplitterGroup data-slot="splitter-group"
                   @layout="handleLayout"
                   class="dsds-splitter"
                   v-bind="forwardedProps">
      <slot />
    </SplitterGroup>
  </div>
</template>

<script setup lang="ts">
import type { SplitterGroupProps } from "reka-ui"
import { SplitterGroup } from "reka-ui"
import { computed, onBeforeUnmount, onMounted, ref } from "vue"

import { provideSplitterContainer } from "./context"

// layout 이벤트를 과도하게 발생시키지 않기 위한 기본 지연(ms)
const DEFAULT_DEBOUNCE_MS = 500

const props = withDefaults(defineProps<SplitterGroupProps & {
  /** layout 이벤트를 상위로 전달하기 전 지연시킬 시간(밀리초) */
  layoutDebounce?: number
}>(), {
  layoutDebounce: DEFAULT_DEBOUNCE_MS,
})

const forwardedProps = computed<SplitterGroupProps>(() => {
  const { layoutDebounce, ...rest } = props
  return rest
})

// SplitterGroup에서 발생하는 layout 이벤트를 상위 컴포넌트로 전달
// (Splitter가 컨테이너 측정을 도와주므로 레이아웃 변화를 직접 구독할 수 있도록 노출)
const emit = defineEmits<{
  /** 레이아웃 변경 이벤트 */
  layout: [sizes: number[]]
}>()

const containerRef = ref<HTMLElement | null>(null)
const containerWidth = ref(0)
const containerHeight = ref(0)

provideSplitterContainer({
  width: containerWidth,
  height: containerHeight,
})

let layoutTimer: ReturnType<typeof setTimeout> | null = null

// layout 이벤트는 드래그 중에 수십 회 이상 발생하므로 디바운스를 적용해 상위 컴포넌트의 부하를 줄입니다.
const handleLayout = (sizes: number[]) => {
  if (layoutTimer) clearTimeout(layoutTimer)

  const rawDelay = Number(props.layoutDebounce)
  const normalizedDelay = Number.isFinite(rawDelay) ? Math.max(0, rawDelay) : DEFAULT_DEBOUNCE_MS

  layoutTimer = setTimeout(() => {
    emit("layout", sizes)
    layoutTimer = null
  }, normalizedDelay)
}

let resizeObserver: ResizeObserver | null = null

const observeContainer = () => {
  if (!containerRef.value) return

  resizeObserver = new ResizeObserver(([entry]) => {
    if (!entry) return

    containerWidth.value = entry.contentRect.width
    containerHeight.value = entry.contentRect.height
  })

  resizeObserver.observe(containerRef.value)
}

onMounted(() => {
  observeContainer()
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
  // 컴포넌트가 언마운트될 때 대기 중인 layout emit을 정리해 메모리 누수와 지연 호출을 방지합니다.
  if (layoutTimer) {
    clearTimeout(layoutTimer)
    layoutTimer = null
  }
})

</script>

<style>
.dsds-splitter-container {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
