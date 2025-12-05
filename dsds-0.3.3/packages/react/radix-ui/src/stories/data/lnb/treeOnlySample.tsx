import { LnbUnionIcon } from "@/components/icons/LnbIcon"
import { LNBInputItem } from "@/components/ui"

/**
 * 트리만 사용하는 LNB 예제 - 아코디언 없는 버전
 *
 * 주요 특징:
 * - 아이콘이 포함된 헤더
 * - 아코디언 없이 트리 구조만 사용
 * - 최대 4단계 깊이의 계층 구조
 * - 선택된 항목과 비활성화된 항목 예시 포함
 * - withoutAccordion 옵션과 함께 사용
 */
export const treeOnlySample: LNBInputItem = {
  icon: <LnbUnionIcon />,
  title: "LNB Header Title",
  items: [
    {
      id: "1",
      content: "중그룹 트리(Tree)",
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

export const treeOnlyDescription = {
  title: "Tree Only Structure",
  description:
    "트리만 사용하는 LNB 예제입니다. 아코디언 없이 트리 구조만으로 계층적 메뉴를 구성하여 더 간결한 인터페이스를 제공합니다.",
  features: [
    "아이콘이 포함된 헤더",
    "아코디언 없이 트리 구조만 사용",
    "최대 4단계 깊이의 계층 구조",
    "선택된 항목과 비활성화된 항목 예시",
    "withoutAccordion 옵션 사용 예시",
  ],
}
