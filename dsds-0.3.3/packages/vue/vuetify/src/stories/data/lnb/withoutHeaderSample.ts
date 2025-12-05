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
export const withoutHeaderSample: LNBInputItem = {
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

export const withoutHeaderDescription = {
  title: "Basic Hierarchy Structure",
  description: "title과 icon이 모두 없을 경우, Header가 없는 상태로 제공됩니다.",
  features: ["헤더 없이 목록만 제공되는 구조"],
}
