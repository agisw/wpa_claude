// src/composables/useScrollbarWidth.ts
import { ref, computed, onMounted } from "vue"

/**
 * 스크롤바 너비를 감지하는 composable
 * - Windows Chrome/Edge: thin scrollbar 8px 적용
 * - Mac: overlay scrollbar로 0px (보정 불필요)
 * - 기타 브라우저: 0px (scrollbar-thin 미지원)
 */
export function useScrollbarWidth() {
  const browserInfo = ref({
    isChrome: false,
    isEdge: false,
    isMac: false,
    isWindows: false,
  })

  // 브라우저 감지
  const detectBrowser = () => {
    const ua = navigator.userAgent

    return {
      isChrome: /Chrome/.test(ua) && !/Edg|OPR/.test(ua),
      isEdge: /Edg/.test(ua),
      isMac: /(Mac|iPod|iPhone|iPad)/.test(navigator.platform),
      isWindows: /Win/.test(navigator.platform),
    }
  }

  // thin scrollbar 지원 브라우저 확인
  const supportsThinScrollbar = computed(() => {
    return browserInfo.value.isChrome || browserInfo.value.isEdge
  })

  // 스크롤바 너비 계산
  const scrollbarWidth = computed(() => {
    // Mac은 overlay scrollbar이므로 보정 불필요
    if (browserInfo.value.isMac) {
      return 0
    }

    // Windows에서 Chrome/Edge만 thin scrollbar 적용
    if (browserInfo.value.isWindows && supportsThinScrollbar.value) {
      return 10 // scrollbar-thin의 일반적인 너비
    }

    // 기타 경우는 보정하지 않음
    return 0
  })

  // 스크롤바 보정이 필요한지 여부
  const needsScrollbarAdjustment = computed(() => {
    return scrollbarWidth.value > 0
  })

  onMounted(() => {
    browserInfo.value = detectBrowser()
  })

  return {
    scrollbarWidth,
    needsScrollbarAdjustment,
    supportsThinScrollbar,
    browserInfo: computed(() => browserInfo.value),
  }
}
