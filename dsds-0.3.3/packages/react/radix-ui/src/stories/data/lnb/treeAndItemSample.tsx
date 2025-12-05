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
export const treeAndItemSample: LNBInputItem = {
  items: [
    {
      id: "1",
      content: "DQSOD(DESSC)",
      items: [],
    },
    {
      id: "2",
      content: "생산계획(DSDA34)",
      items: [
        {
          id: "2-1",
          type: "item",
          content: "DSARV 1차",
        },
        {
          id: "2-2",
          type: "item",
          content: "DSARV 2차",
        },
        {
          id: "2-3",
          type: "item",
          content: "DSARV 3차",
        },
      ],
    },
    {
      id: "3",
      content: "EBS_Transfer의뢰 보관",
      items: [
        {
          id: "3-1",
          type: "item",
          content: "Transfer_의뢰-A1",
        },
        {
          id: "3-2",
          type: "item",
          content: "Transfer_의뢰-B1",
        },
        {
          id: "3-3",
          type: "item",
          content: "Transfer_의뢰-C1",
        },
        {
          id: "3-4",
          content: "Transfer_의뢰-G1",
          items: [
            {
              id: "3-4-1",
              content: "2021-AVS항목",
              items: [],
            },
            {
              id: "3-4-2",
              content: "2026-AVS항목",
              items: [
                {
                  id: "3-4-2-1",
                  type: "item", // item type is optional, but it's recommended to specify
                  content: "AVS항목-V1",
                },
                {
                  id: "3-4-2-2",
                  type: "item", // item type is optional, but it's recommended to specify
                  content: "AVS항목-V2",
                },
                {
                  id: "3-4-2-3",
                  type: "item", // item type is optional, but it's recommended to specify
                  content: "AVS항목-V3",
                },
              ],
            },
          ],
        },
        {
          id: "3-5",
          content: "Transfer_의뢰-H1",
          items: [
            {
              id: "3-5-1",
              content: "DDDSSDVP-DSSD1",
              items: [
                {
                  id: "3-5-1-1",
                  content: "OCS1-2QSIDU",
                  items: [
                    {
                      id: "3-5-1-1-1",
                      type: "item", // item type is optional, but it's recommended to specify
                      content: "2QSIDU-221",
                    },
                  ],
                },
              ],
            },
            {
              id: "3-5-2",
              content: "DDDSSDVP-DSSD2",
              items: [],
            },
          ],
        },
      ],
    },
    {
      id: "4",
      content: "DQSOD(DESSC)",
      items: [],
    },
    {
      id: "5",
      content: "DQSOD(DESSC)",
      items: [],
    },
  ],
}

export const treeAndItemDescription = {
  title: "Tree Only Structure",
  description: "트리와 항목이 같은 계층에 존재하는 LNB 예제입니다.",
  features: ["복잡한 구조에 대한 예시"],
}
