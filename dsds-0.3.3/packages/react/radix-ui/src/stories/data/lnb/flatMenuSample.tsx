import { LNBInputItem } from "@/components/ui"

/**
 * 평면 메뉴 구조를 보여주는 LNB 예제
 *
 * 주요 특징:
 * - 단순한 평면 메뉴 구조
 * - 설비 관련 주요 기능들
 * - 선택된 항목 (설비 Master) 예시 포함
 * - 아코디언이나 트리 구조 없이 항목들만 나열
 */
export const flatMenuSample: LNBInputItem = {
  title: "Equipment",
  items: [
    {
      type: "item",
      id: "1",
      content: "설비 Master",
    },
    {
      type: "item",
      id: "2",
      content: "N2 설비 상태 조회",
    },
    {
      type: "item",
      id: "3",
      content: "이상 설비 Lot Hold",
    },
    {
      type: "item",
      id: "4",
      content: "EARS 연동 설비 제어",
    },
  ],
}

export const flatMenuDescription = {
  title: "Flat Menu Structure",
  description:
    "평면 메뉴 구조를 보여주는 LNB 예제입니다. 계층 없이 단순한 메뉴 항목들을 나열하여 직관적인 네비게이션을 제공합니다.",
  features: [
    "단순한 평면 메뉴 구조",
    "설비 관련 핵심 기능들",
    "선택된 항목 표시",
    "아코디언/트리 구조 없는 직관적 배치",
  ],
}
