/* eslint-disable react-refresh/only-export-components */
import { useCallback, useState } from "react"

import { LNBInputItem, LnbProps, Tabs, TabsList, TabsTrigger } from "@/components/ui"
import type { LNBAccordionItem } from "@/components/ui"

const tabItems = ["전체 메뉴", "나의 메뉴"]

// 전체 메뉴 데이터
const allMenuItems = [
  {
    id: "1",
    content: "즐겨찾기",
    items: [],
  },
  {
    id: "2",
    content: "업무함",
    items: [],
  },
  {
    id: "3",
    content: "제조 기준정보",
    items: [],
  },
  {
    id: "4",
    content: "설비 기준정보",
    items: [
      {
        id: "4-1",
        content: "제조설비",
        items: [],
      },
      {
        id: "4-2",
        content: "물류설비",
        items: [
          {
            id: "4-2-1",
            content: "AMHS STK_ID",
          },
          {
            id: "4-2-2",
            content: "AMHS STG_GROUP_PLD",
          },
          {
            id: "4-2-3",
            content: "AMHS STG_HOLDLOT_STK",
          },
          {
            id: "4-2-4",
            content: "AMHS.FOUP_CHG_ASSIGN_STK",
          },
          {
            id: "4-2-5",
            content: "AMHS EXTENSION",
          },
          {
            id: "4-2-6",
            content: "AMHS NRFC_ID",
          },
          {
            id: "4-2-7",
            content: "CMCS PARAMETER",
          },
        ],
      },
      {
        id: "4-3",
        content: "분석설비",
        items: [],
      },
    ],
  },
  {
    id: "5",
    content: "원부자재 기준정보",
    items: [],
  },
  {
    id: "6",
    content: "일반 기준정보",
    items: [],
  },
  {
    id: "7",
    content: "APC 기준정보",
    items: [],
  },
  {
    id: "8",
    content: "타 시스템 자동발의 메뉴",
    items: [],
  },
]

// 나의 메뉴 데이터 (즐겨찾기, 최근 사용 항목 등)
const myMenuItems = [
  {
    id: "my-1",
    content: "즐겨찾기",
    items: [
      {
        id: "my-1-1",
        content: "AMHS STG_GROUP_PLD",
      },
      {
        id: "my-1-2",
        content: "제조설비",
      },
      {
        id: "my-1-3",
        content: "업무함",
      },
    ],
  },
  {
    id: "my-2",
    content: "최근 사용",
    items: [
      {
        id: "my-2-1",
        content: "AMHS STK_ID",
      },
      {
        id: "my-2-2",
        content: "CMCS PARAMETER",
      },
      {
        id: "my-2-3",
        content: "일반 기준정보",
      },
    ],
  },
  {
    id: "my-3",
    content: "자주 사용하는 메뉴",
    items: [
      {
        id: "my-3-1",
        content: "설비 기준정보",
      },
      {
        id: "my-3-2",
        content: "제조 기준정보",
      },
    ],
  },
]

/**
 * 탭을 타이틀로 사용하는 LNB 예제
 *
 * 주요 특징:
 * - 탭 컴포넌트를 타이틀로 사용 (전체 메뉴, 나의 메뉴)
 * - 탭 전환 시 메뉴 항목이 동적으로 변경
 * - 전체 메뉴: 제조/설비/원부자재 등 다양한 기준정보 카테고리
 * - 나의 메뉴: 즐겨찾기, 최근 사용, 자주 사용하는 메뉴로 구성
 * - 설비 기준정보 하위에 상세한 AMHS 관련 메뉴들
 * - 선택된 항목 (AMHS STG_GROUP_PLD) 예시 포함
 */

// 기본 샘플 데이터 (스토리북에서 사용)
export const tabsTitleSample: LNBInputItem = {
  title: "탭 타이틀",
  items: allMenuItems,
}

// 메뉴 데이터를 외부에서 접근할 수 있도록 export
export const menuData = {
  "전체 메뉴": allMenuItems,
  "나의 메뉴": myMenuItems,
}

// 코드 예제
export const tabsTitleCodeExample = `
import { useCallback, useState } from "react"
import { Lnb, Tabs, TabsList, TabsTrigger, type LNBAccordionItem } from "@/components/ui"

const tabItems = ["전체 메뉴", "나의 메뉴"]

const App = () => {
  const [currentMenuItems, setCurrentMenuItems] = useState<LNBAccordionItem[]>(menuData["전체 메뉴"])
  const [currentTab, setCurrentTab] = useState("전체 메뉴")

  const handleTabChange = useCallback(
    (value: string) => {
      setCurrentTab(value)
      const newItems = menuData[value as keyof typeof menuData] || menuData["전체 메뉴"]
      setCurrentMenuItems(newItems)
    },
    [setCurrentTab, setCurrentMenuItems]
  )

  return (
    <Lnb className="lnb-title-tabs"
      data={{
        items: currentMenuItems
      }}
      title={
        <Tabs onValueChange={handleTabChange} defaultValue={currentTab} defaultSelectedItemId="4-2-2">
          <TabsList>
            {tabItems.map((title, i) => (
              <TabsTrigger key={i} value={title}>
                {title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      }
    />
  )
}

// 메뉴 데이터 구조 예시
const menuData = {
  "전체 메뉴": ${JSON.stringify(allMenuItems, null, 2).replace(/\n/g, "\n  ")},
  "나의 메뉴": ${JSON.stringify(myMenuItems, null, 2).replace(/\n/g, "\n  ")}
}`

export const tabsTitleDescription = {
  title: "Tabs Title Example",
  description:
    "탭을 타이틀로 사용하는 LNB 예제입니다. 타이틀 영역에 탭을 통합하여 메뉴 전환과 네비게이션을 동시에 제공합니다. 탭을 클릭하면 해당하는 메뉴 구조로 동적으로 변경됩니다.",
  features: [
    "탭 컴포넌트를 활용한 타이틀 (전체 메뉴, 나의 메뉴)",
    "탭 전환 시 메뉴 항목이 실시간으로 변경",
    "전체 메뉴: 제조/설비/원부자재 등 시스템 전체 기준정보 카테고리",
    "나의 메뉴: 즐겨찾기, 최근 사용, 자주 사용하는 메뉴로 개인화된 구성",
    "물류설비 하위의 상세한 AMHS 관련 메뉴",
    "선택된 항목 표시 및 상태 유지",
    "동적 메뉴 구조 변경을 통한 사용자 경험 향상",
  ],
  codeExample: tabsTitleCodeExample,
}

// 공통 마크다운 콘텐츠 생성 함수 (스토리에서 사용)
const createMarkdownContent = (content: { description: string; features?: string[]; examples?: string[] }) => {
  const markdownContents = [content.description]
  if (content.features?.length) {
    markdownContents.push("\n\n**주요 특징:**\n")
    markdownContents.push(content.features.map((feature) => `- ${feature}`).join("\n"))
  }
  return markdownContents.join("\n")
}

// TabsTitle 전용 스토리 컴포넌트
export const TabsTitleStory = (args: LnbProps) => {
  const [currentMenuItems, setCurrentMenuItems] = useState<LNBAccordionItem[]>(menuData["전체 메뉴"])
  const [currentTab, setCurrentTab] = useState("전체 메뉴")

  const handleTabChange = useCallback(
    (value: string) => {
      setCurrentTab(value)
      const newItems = menuData[value as keyof typeof menuData] || menuData["전체 메뉴"]
      setCurrentMenuItems(newItems)
    },
    [setCurrentTab, setCurrentMenuItems]
  )

  const updatedData = {
    ...args.data,
    items: currentMenuItems,
  }

  // 스토리에서 사용할 데이터와 함수들을 반환
  return {
    updatedData,
    defaultSelectedItemId: "4-2-2", // 기본 선택된 항목 ID 지정
    title: (
      <Tabs onValueChange={handleTabChange} defaultValue={currentTab}>
        <TabsList>
          {tabItems.map((title, i) => (
            <TabsTrigger key={i} value={title}>
              {title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    ),
    currentTab,
    markdownContent: createMarkdownContent(tabsTitleDescription) + `\n\n**현재 선택된 탭:** ${currentTab}`,
  }
}
