/* eslint-disable react-refresh/only-export-components */
import { useCallback, useState } from "react"

import { filterMenuItems, LNBAccordionItem, LNBInputItem, LnbProps, Searchbox } from "@/components/ui"

/**
 * 검색박스를 타이틀로 사용하는 LNB 예제
 *
 * 주요 특징:
 * - 검색박스를 타이틀로 사용
 * - 즐겨찾기, FDC View, EPT 등의 주요 메뉴
 * - Interlock, Preference 하위에 다양한 기능 메뉴 포함
 * - 선택된 항목 (Stricke Out Lot Filter) 예시 포함
 * - 검색어 입력 시 메뉴 동적 필터링
 */

// 전체 메뉴 데이터 (검색 대상)
const allMenuItems: LNBAccordionItem[] = [
  {
    id: "1",
    content: "즐겨찾기",
    items: [],
  },
  {
    id: "2",
    content: "FDC View",
    items: [],
  },
  {
    id: "3",
    content: "EPT",
    items: [],
  },
  {
    id: "4",
    content: "Interlock",
    items: [
      {
        type: "item",
        id: "4-1",
        content: "Lot List(ERD/TSUM)(Modeling)(Lightning)",
      },
      {
        type: "item",
        id: "4-2",
        content: "Fault Summary",
      },
      {
        type: "item",
        id: "4-3",
        content: "Interlock Summary",
      },
      {
        type: "item",
        id: "4-4",
        content: "Fault Summary(Multi)",
      },
      {
        type: "item",
        id: "4-5",
        content: "Interlock Summary(Multi)",
      },
    ],
  },
  {
    id: "5",
    content: "Preference",
    items: [
      {
        id: "5-1",
        content: "물류설비",
        items: [
          {
            type: "item",
            id: "5-1-1",
            content: "Tool(General)",
          },
          {
            type: "item",
            id: "5-1-2",
            content: "MDM Tool(General)",
          },
          {
            type: "item",
            id: "5-1-3",
            content: "Lot Filter Info(General)",
          },
          {
            type: "item",
            id: "5-1-4",
            content: "Stricke Out Lot Filter(General)",
          },
        ],
      },
      {
        id: "5-2",
        content: "Tool",
        items: [],
      },
      {
        id: "5-3",
        content: "PM Reg",
        items: [],
      },
      {
        id: "5-4",
        content: "Alarm",
        items: [],
      },
      {
        id: "5-5",
        content: "MCC Spec",
        items: [],
      },
      {
        id: "5-6",
        content: "DCP",
        items: [],
      },
      {
        id: "5-7",
        content: "SPEC Reg",
        items: [],
      },
    ],
  },
  {
    id: "6",
    content: "EDA",
    items: [
      {
        id: "6-1",
        content: "물류설비",
        items: [
          {
            type: "item",
            id: "6-1-1",
            content: "Tool(General)",
          },
        ],
      },
    ],
  },
  {
    id: "7",
    content: "Report",
    items: [],
  },
  {
    id: "8",
    content: "ARG",
    items: [],
  },
  {
    id: "9",
    content: "FPA",
    items: [],
  },
]

// 기본 샘플 데이터 (스토리북에서 사용)
export const searchboxTitleSample: LNBInputItem = {
  title: "검색박스 타이틀",
  items: allMenuItems,
}

// 검색 필터링을 위한 데이터 export
export { allMenuItems }

// 코드 예제
export const searchboxTitleCodeExample = `
import { useCallback, useState } from "react"
import { Lnb, Searchbox, filterMenuItems } from "@/components/ui"

const App = () => {
  const [filteredMenuItems, setFilteredMenuItems] = useState(allMenuItems)
  const [searchValue, setSearchValue] = useState("")
  const defaultSelectedItemId = "4-2" // 기본 선택된 항목 ID 지정

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value)
      const filtered = filterMenuItems(allMenuItems, value, defaultSelectedItemId)
      setFilteredMenuItems(filtered)
    },
    [setSearchValue, setFilteredMenuItems]
  )

  return (
    <Lnb className="lnb-title-searchbox"
      data={{
        items: filteredMenuItems
      }}
      defaultSelectedItemId={defaultSelectedItemId}
      title={
        <Searchbox
          value={searchValue}
          placeholder="메뉴명 검색"
          onChange={(e) => handleSearchChange(e.target.value)}
          onClear={() => handleSearchChange("")}
        />
      )}
      searchText={searchValue}
      onSearchTextChange={setSearchValue}
    />
  )
}

// 메뉴 데이터 구조 예시
const allMenuItems = ${JSON.stringify(allMenuItems, null, 2).replace(/\n/g, "\n")}`

export const searchboxTitleDescription = {
  title: "Searchbox Title Example",
  description:
    "검색박스를 타이틀로 사용하는 LNB 예제입니다. 타이틀 영역에 검색 기능을 통합하여 사용자 편의성을 높이며, 검색어 입력 시 메뉴가 동적으로 필터링됩니다.",
  features: [
    "검색박스가 포함된 타이틀",
    "검색어 입력 시 실시간 메뉴 필터링",
    "계층 구조를 유지한 검색 결과 표시",
    "선택된 항목 표시 예시",
  ],
  codeExample: searchboxTitleCodeExample,
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

// SearchboxTitle 전용 스토리 컴포넌트
export const SearchboxTitleStory = (args: LnbProps) => {
  const [filteredMenuItems, setFilteredMenuItems] = useState(allMenuItems)
  const [searchValue, setSearchValue] = useState("")
  const defaultSelectedItemId = "4-2" // 기본 선택된 항목 ID 지정ult

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value)
      const filtered = filterMenuItems(allMenuItems, value, defaultSelectedItemId)
      setFilteredMenuItems(filtered)
    },
    [setSearchValue, setFilteredMenuItems]
  )

  const updatedData = {
    ...args.data,
    items: filteredMenuItems,
  }

  // 스토리에서 사용할 데이터와 함수들을 반환
  return {
    updatedData,
    title: (
      <Searchbox
        size="large"
        value={searchValue}
        placeholder="메뉴명 검색"
        onChange={(e) => handleSearchChange(e.target.value)}
        onClear={() => handleSearchChange("")}
      />
    ),
    searchValue,
    defaultSelectedItemId,
    markdownContent:
      createMarkdownContent(searchboxTitleDescription) + (searchValue ? `\n\n**현재 검색어:** "${searchValue}"` : ""),
  }
}
