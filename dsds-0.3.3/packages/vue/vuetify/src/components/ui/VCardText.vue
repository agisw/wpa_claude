<template>
  <VCardTextPrimitive ref="cardTextRef"
                      :class="['dsds-v-card-text', {
                        'has-scrollbar': hasScrollbar && needsScrollbarAdjustment,
                        'overflow-hidden!': props.noScrollbar,
                      }]"
                      :style="dynamicStyles"
                      v-bind="$attrs">
    <slot />
  </VCardTextPrimitive>
</template>

<script setup lang="ts">
import { useScrollbarWidth } from '@/components/ui/composables/useScrollbarWidth'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { VCardText as VCardTextPrimitive } from 'vuetify/components'

defineOptions({
  name: "VCardText",
  inheritAttrs: false
})

interface VCardTextProps {
  scrollPaddingAdjust?: boolean
  paddingRight?: number
  noScrollbar?: boolean
}

const props = withDefaults(defineProps<VCardTextProps>(), {
  scrollPaddingAdjust: true,
  paddingRight: 20
})

const cardTextRef = ref<InstanceType<typeof VCardTextPrimitive> | null>(null)
const hasScrollbar = ref(false)

// Composable 사용
const { scrollbarWidth, needsScrollbarAdjustment } = useScrollbarWidth()

// DOM 요소 안전하게 가져오는 헬퍼 함수
const getElement = (): HTMLElement | null => {
  if (!cardTextRef.value) return null

  // Vuetify 컴포넌트는 $el 속성을 통해 실제 DOM에 접근
  const el = (cardTextRef.value as any)?.$el || cardTextRef.value

  return el instanceof HTMLElement ? el : null
}

// 스크롤바 존재 여부 확인 (간소화)
const checkScrollbar = () => {
  if (props.noScrollbar) return;
  if (!props.scrollPaddingAdjust) return

  const element = getElement()
  if (!element) return

  hasScrollbar.value = element.scrollHeight > element.clientHeight
}

// 동적 스타일
const dynamicStyles = computed(() => {
  if (props.noScrollbar) {
    return undefined;
  }

  const baseStyles = {
    paddingRight: `${props.paddingRight}px`
  }

  // 스크롤바 보정이 필요하고 실제로 스크롤바가 있을 때만 적용
  if (props.scrollPaddingAdjust &&
    needsScrollbarAdjustment.value &&
    hasScrollbar.value) {

    baseStyles.paddingRight = `${props.paddingRight - scrollbarWidth.value}px`
  }

  return baseStyles
})

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (props.noScrollbar) return;
  nextTick(() => {
    checkScrollbar()

    if (cardTextRef.value && props.scrollPaddingAdjust) {
      const elem = getElement()
      if (!elem) return
      resizeObserver = new ResizeObserver(checkScrollbar)
      resizeObserver.observe(elem)
    }
  })
})

onUnmounted(() => {
  if (props.noScrollbar) return;
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>
