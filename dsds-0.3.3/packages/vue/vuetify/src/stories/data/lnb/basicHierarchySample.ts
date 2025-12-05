import LNBUnionIcon from "@/components/ui/lnb/LNBUnionIcon.vue"
import type { LNBInputItem } from "@/components/ui"

/**
 * LNB 기본 계층 구조 예제 - 아코디언 포함 버전
 *
 * 주요 특징:
 * - 아이콘이 포함된 헤더
 * - 대그룹 아코디언과 중그룹 트리의 복합 구조
 * - 최대 4단계 깊이의 계층 구조
 * - 선택된 항목과 비활성화된 항목 예시 포함
 */
export const basicHierarchySample: LNBInputItem = {
  icon: LNBUnionIcon,
  title: "LNB Header Title",
  items: [
    {
      id: "1",
      content: "대그룹 아코디언(Accordion)",
      items: [
        {
          id: "1-1",
          content: "중그룹 트리(Tree)",
          items: [
            {
              type: "item",
              id: "1-1-1",
              content: "항목(Item)",
            },
            {
              type: "item",
              id: "1-1-2",
              content: "항목(Item)",
            },
          ],
        },
        {
          id: "1-2",
          content: "중그룹 트리(Tree)",
          items: [
            {
              id: "1-2-1",
              content: "중그룹 트리(Tree)",
              items: [
                {
                  id: "1-2-1-1",
                  content: "중그룹 트리(Tree)",
                  items: [
                    {
                      type: "item",
                      id: "1-2-1-1-1",
                      content: "항목(Item)",
                    },
                    {
                      type: "item",
                      id: "1-2-1-1-2",
                      content: "항목(Item)",
                    },
                    {
                      type: "item",
                      id: "1-2-1-1-3",
                      content: "항목(Item)",
                      disabled: true,
                    },
                  ],
                },
                {
                  id: "1-2-1-2",
                  content: "중그룹 트리(Tree)",
                  items: [
                    {
                      type: "item",
                      id: "1-2-1-2-1",
                      content: "항목(Item)",
                    },
                    {
                      type: "item",
                      id: "1-2-1-2-2",
                      content: "항목(Item)",
                    },
                    {
                      type: "item",
                      id: "1-2-1-2-3",
                      content: "항목(Item)",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const basicHierarchyDescription = {
  title: "Basic Hierarchy Structure",
  description:
    "LNB의 기본 계층 구조를 보여주는 예제입니다. 아코디언과 트리가 결합된 복합 구조로 다단계 메뉴를 효과적으로 표현합니다. selectedItemId prop으로 선택 상태를 외부에서 제어할 수 있습니다.",
  features: [
    "아이콘이 포함된 헤더",
    "대그룹 아코디언과 중그룹 트리의 복합 구조",
    "최대 4단계 깊이의 계층 구조",
    "selectedItemId prop을 통한 외부 선택 상태 제어",
    "비활성화된 항목 예시",
  ],
}
