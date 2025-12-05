import { LNBInputItem } from "@/components/ui"

/**
 * LNB 불릿 표시 규칙을 보여주는 샘플 데이터
 *
 * 주요 특징:
 * - 최대 3단계 계층 구조 (아코디언 > 트리 > 항목)
 * - 손자 메뉴(3단계 항목)에서는 왼쪽 불릿이 표시되지 않음
 * - MSS(EDSS) 하위에 Reporting, Analysis, Wafer Segister 그룹
 * - Analysis 그룹에 여러 손자 항목들이 있어 불릿 숨김 규칙 확인 가능
 * - 선택된 항목 (요청서 이력관리) 예시 포함
 */
export const bulletRulesSample: LNBInputItem = {
  title: "업무함",
  items: [
    {
      id: "1",
      content: "작성중",
      items: [],
    },
    {
      id: "2",
      content: "미결함",
      items: [],
    },
    {
      id: "3",
      content: "상신함",
      items: [],
    },
    {
      id: "4",
      content: "MSS(EDSS)",
      items: [
        {
          id: "4-1",
          content: "Reporting",
          items: [
            {
              type: "item",
              id: "4-1-1",
              content: "Change Report",
            },
          ],
        },
        {
          id: "4-2",
          content: "Analysis",
          items: [
            {
              type: "item",
              id: "4-2-1",
              content: "Change Report",
            },
            {
              type: "item",
              id: "4-2-2",
              content: "Manual Change",
            },
            {
              type: "item",
              id: "4-2-3",
              content: "요청서 이력관리",
            },
            {
              type: "item",
              id: "4-2-4",
              content: "Hourus Limit 조정",
            },
            {
              type: "item",
              id: "4-2-5",
              content: "SSM 기본 Para 조정",
            },
          ],
        },
        {
          id: "4-3",
          content: "Wafer Segister",
          items: [
            {
              type: "item",
              id: "4-3-1",
              content: "eSpec",
            },
          ],
        },
      ],
    },
  ],
}

export const bulletRulesDescription = {
  title: "LNB Bullet Display Rules",
  description:
    "LNB 컴포넌트의 불릿 표시 규칙을 보여주는 샘플입니다. 최대 3단계 계층에서 손자 메뉴(3단계 항목)의 왼쪽 불릿이 숨겨지는 규칙을 확인할 수 있습니다.",
  features: [
    "최대 3단계 계층 구조 (아코디언 > 트리 > 항목)",
    "손자 메뉴(3단계)에서 왼쪽 불릿 숨김 규칙",
    "Analysis 그룹의 여러 손자 항목으로 규칙 확인",
    "선택된 항목 표시 예시",
  ],
}
