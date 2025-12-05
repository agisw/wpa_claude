import type { LNBAccordionItem, LNBInputItem } from "@/components/ui"
import { LNB, LNBUnionIcon, Markdown, Searchbox } from "@/components/ui"
import { filterMenuItems } from "@/components/ui/lnb/helpers"
import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { computed, ref } from "vue"
import { booleanControl } from "@/stories/utils"
import {
  basicHierarchySample,
  basicHierarchyDescription,
  treeOnlySample,
  treeOnlyDescription,
  newTreeOnlySample,
  newTreeOnlyDescription,
  treeAndItemSample,
  treeAndItemDescription,
  flatMenuSample,
  flatMenuDescription,
  bulletRulesSample,
  bulletRulesDescription,
  selectionCallbackSample,
  selectionCallbackDescription,
  withoutHeaderSample,
  withoutHeaderDescription,
} from "../data/lnb"

interface StoryDescription {
  title: string
  description: string
  features?: string[]
  codeExample?: string
}

const getStoryContainerClass = (viewMode?: string) => (viewMode === "docs" ? "h-[480px]" : "h-screen")

const BASIC_TEMPLATE = `
<LNB v-bind="args" :title="basicData.title" :data="basicData" class="h-full" />
`.trim()

// 공통 유틸리티 함수들
const createStoryDescription = (content: { description: string; features?: string[] }) => {
  return `${content.description}\n\n**주요 특징:**\n${content.features?.map((feature) => `- ${feature}`).join("\n") || ""}`
}

const createMarkdownContent = (content: { description: string; features?: string[]; examples?: string[] }) => {
  const markdownContents = [content.description]
  if (content.features?.length) {
    markdownContents.push("\n\n**주요 특징:**\n")
    markdownContents.push(content.features.map((feature) => `- ${feature}`).join("\n"))
  }
  return markdownContents.join("\n")
}

const withDescription = (content: StoryDescription) => {
  return (Story: any, context: any) => ({
    components: { Story, Markdown },
    setup() {
      const markdownContent = createMarkdownContent(content)
      const containerClass = getStoryContainerClass(context.viewMode)
      return { markdownContent, containerClass }
    },
    template: `
      <div class="gap-md flex w-full flex-row min-h-0" :class="containerClass">
        <story />
        <div class="flex flex-1 flex-col max-h-0">
          <Markdown class="px-lg py-lg" :content="markdownContent"/>
        </div>
      </div>
    `,
  })
}

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

const searchboxTitleSample: LNBInputItem = {
  title: "검색박스 타이틀",
  items: allMenuItems,
}

const searchboxTitleCodeExample = `
<template>
  <LNB
    :data="lnbData"
    :default-selected-item-id="defaultSelectedItemId"
    v-model:search-text="searchValue"
  >
    <template #title>
      <Searchbox
        v-model="searchValue"
        placeholder="메뉴명 검색"
        size="large"
        class="lnb-title-searchbox"
        @update:model-value="handleSearchChange"
        @search="handleSearchChange"
      />
    </template>
  </LNB>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { LNB, Searchbox } from "@/components/ui"
import { filterMenuItems } from "@/components/ui/lnb/helpers"
import type { LNBAccordionItem } from "@/components/ui/lnb"

const allMenuItems: LNBAccordionItem[] = [...]
const defaultSelectedItemId = "4-2"

const searchValue = ref("")

const handleSearchChange = (value: string | number | undefined) => {
  if (typeof value === "number") {
    searchValue.value = String(value)
    return
  }
  searchValue.value = value ?? ""
}

const filteredMenuItems = computed(() =>
  filterMenuItems(allMenuItems, searchValue.value, defaultSelectedItemId)
)

const lnbData = computed(() => ({
  title: "검색박스 타이틀",
  items: filteredMenuItems.value,
}))
</script>
`.trim()

const searchboxTitleDescription: StoryDescription = {
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

const meta: Meta<typeof LNB> = {
  title: "Layouts/LNB",
  component: LNB,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
DSDS 디자인 시스템의 LNB(Left Navigation Bar) 컴포넌트로, 좌측 사이드바에 계층화된 메뉴 구조를 표시합니다.

## 주요 특징

- **계층적 메뉴**: 아코디언과 트리 구조가 결합된 다단계 메뉴
- **아이콘 지원**: 헤더에 커스텀 아이콘 표시 가능
- **검색 기능**: 메뉴 검색으로 항목 필터링
- **선택 상태 관리**: defaultSelectedItemId로 초기 선택 항목 지정
- **자동 경로 확장**: defaultOpenPath로 기본 열림 경로 설정
- **비활성화 상태**: 개별 항목 비활성화 지원
- **검색 타이틀**: #title slot으로 검색박스 등 커스텀 헤더 구성

## 사용 시나리오

- 애플리케이션 좌측 사이드 네비게이션
- 계층화된 메뉴 구조 표현
- 카테고리별 항목 그룹화
- 메뉴 검색 기능이 필요한 경우

## Props

### data
- **타입**: LNBInputItem
- **설명**: LNB 데이터 구조 (icon, title, items 포함)

### defaultSelectedItemId
- **타입**: string
- **설명**: 초기에 선택될 항목의 ID

### defaultOpenPath
- **타입**: string[]
- **설명**: 초기에 열려있을 아코디언 경로의 ID 배열

### searchText
- **타입**: string
- **설명**: 검색 필터링에 사용될 텍스트 (v-model)

### hidden
- **타입**: boolean
- **기본값**: false
- **설명**: LNB 전체 숨김 여부

### withoutAccordion
- **타입**: boolean
- **기본값**: false
- **설명**: 아코디언 기능 비활성화 (모든 항목 항상 펼침)

## LNBInputItem 타입

\`\`\`typescript
interface LNBInputItem {
  icon?: Component
  title: string
  items: LNBAccordionItem[]
}

interface LNBAccordionItem {
  id: string
  content: string
  items?: (LNBAccordionItem | LNBItemType)[]
  disabled?: boolean
}

interface LNBItemType {
  type: 'item'
  id: string
  content: string
  disabled?: boolean
}
\`\`\`

## Events

- **update:search-text**: 검색 텍스트 변경 시 발생
- **select**: 메뉴 항목 선택 시 발생

## Slots

- **title**: 헤더 영역 커스터마이징 (검색박스 등)

## Helper 함수

### filterMenuItems(items, searchText, selectedId)
메뉴 항목을 검색 텍스트로 필터링하고 선택된 항목의 경로를 자동 확장합니다.

\`\`\`typescript
const filteredItems = filterMenuItems(allMenuItems, searchValue, selectedItemId)
\`\`\`
        `,
      },
      source: {
        code: BASIC_TEMPLATE,
      },
    },
  },
  argTypes: {
    data: {
      description: "LNB 데이터 구조",
      table: { disable: true },
    },
    title: {
      description: "LNB 타이틀",
      table: { disable: true },
    },
    searchText: {
      description: "검색 필터링 텍스트 (v-model)",
    },
    hidden: booleanControl,
    withoutAccordion: booleanControl,
    defaultSelectedItemId: {
      table: { disable: true },
    },
    defaultOpenPath: {
      table: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<typeof LNB>

export const BasicHierarchy: Story = {
  name: "기본 구조",
  args: {
    defaultSelectedItemId: "1-2-1-1-2",
    defaultOpenPath: ["1-1"],
  },
  render: (args, { viewMode }) => ({
    components: { LNB },
    setup() {
      return {
        args,
        basicData: basicHierarchySample,
      }
    },
    template: BASIC_TEMPLATE,
  }),
  decorators: [withDescription(basicHierarchyDescription)],
  parameters: {
    docs: {
      description: {
        story: createStoryDescription(basicHierarchyDescription),
      },
    },
  },
}

export const WithoutAccordion: Story = {
  name: "트리만",
  args: {
    withoutAccordion: true,
    defaultSelectedItemId: "1-2-1-1-2",
    defaultOpenPath: ["1-1"],
  },
  render: (args, { viewMode }) => ({
    components: { LNB },
    setup() {
      return {
        args,
        basicData: treeOnlySample,
      }
    },
    template: BASIC_TEMPLATE,
  }),
  decorators: [withDescription(treeOnlyDescription)],
  parameters: {
    docs: {
      description: {
        story: createStoryDescription(treeOnlyDescription),
      },
    },
  },
}

export const NewTreeOnly: Story = {
  name: "트리 변경점",
  args: {
    withoutAccordion: true,
    defaultSelectedItemId: "1-2-1-1-2",
    defaultOpenPath: ["1", "1-1", "1-3"],
  },
  render: (args, { viewMode }) => ({
    components: { LNB },
    setup() {
      return {
        args,
        basicData: newTreeOnlySample,
      }
    },
    template: BASIC_TEMPLATE,
  }),
  decorators: [withDescription(newTreeOnlyDescription)],
  parameters: {
    docs: {
      description: {
        story: createStoryDescription(newTreeOnlyDescription),
      },
    },
  },
}

export const TreeAndItem: Story = {
  name: "트리와 항목 동일 계층",
  args: {
    withoutAccordion: true,
    defaultSelectedItemId: "1-2-1-1-2", // 기본 선택된 항목 ID 지정
    defaultOpenPath: ["2", "3", "3-4", "3-4-2", "3-5", "3-5-1", "3-5-1-1"],
  },
  render: (args, { viewMode }) => ({
    components: { LNB },
    setup() {
      return {
        args,
        basicData: treeAndItemSample,
      }
    },
    template: BASIC_TEMPLATE,
  }),
  decorators: [withDescription(treeAndItemDescription)],
  parameters: {
    docs: {
      description: {
        story: createStoryDescription(treeAndItemDescription),
      },
    },
  },
}

export const SearchboxTitle: Story = {
  name: "검색 타이틀",
  args: {
    data: searchboxTitleSample,
    defaultSelectedItemId: "4-2",
  },
  render: (args, context) => ({
    components: { LNB, Markdown, Searchbox },
    setup() {
      const defaultSelectedItemId = computed(() => args.defaultSelectedItemId ?? "4-2")
      const searchValue = ref(args.searchText ?? "")

      const baseItems = computed<LNBAccordionItem[]>(() => {
        if (args.data?.items?.length) {
          return args.data.items as LNBAccordionItem[]
        }
        return allMenuItems
      })

      const filteredMenuItems = computed(() =>
        filterMenuItems(baseItems.value, searchValue.value, defaultSelectedItemId.value)
      )

      const resolvedData = computed<LNBInputItem>(() => ({
        ...searchboxTitleSample,
        ...args.data,
        items: filteredMenuItems.value,
      }))

      const handleSearchChange = (value: string | number | undefined) => {
        if (typeof value === "number") {
          searchValue.value = String(value)
          return
        }

        searchValue.value = value ?? ""
      }

      const containerClass = getStoryContainerClass(context.viewMode)
      const markdownContent = computed(() => {
        const base = createMarkdownContent(searchboxTitleDescription)
        const searchInfo = searchValue.value ? `\n\n**현재 검색어:** "${searchValue.value}"` : ""
        const codeBlock = searchboxTitleDescription.codeExample
          ? `\n\n**예제 코드:**\n\n\`\`\`vue\n${searchboxTitleDescription.codeExample}\n\`\`\``
          : ""
        return `${base}${searchInfo}${codeBlock}`
      })

      return {
        args,
        resolvedData,
        defaultSelectedItemId,
        searchValue,
        markdownContent,
        containerClass,
        handleSearchChange,
      }
    },
    template: `
      <div class="gap-md flex w-full flex-row" :class="containerClass">
        <LNB
          v-bind="args"
          :data="resolvedData"
          :default-selected-item-id="defaultSelectedItemId"
          v-model:search-text="searchValue"
        >
          <template #title>
            <Searchbox
              v-model="searchValue"
              placeholder="메뉴명 검색"
              size="large"
              class="lnb-title-searchbox"
              @update:model-value="handleSearchChange"
              @search="handleSearchChange"
            />
          </template>
        </LNB>
        <div class="scrollbar-thin flex max-h-screen flex-1 flex-col overflow-y-auto">
          <Markdown class="px-lg py-lg" :content="markdownContent" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: createStoryDescription(searchboxTitleDescription),
      },
      source: {
        code: searchboxTitleDescription.codeExample,
        language: "vue",
      },
    },
  },
}

export const FlatMenuStructure: Story = {
  name: "평면 메뉴",
  args: {
    defaultSelectedItemId: "1", // 기본 선택된 항목 ID 지정
  },
  render: (args, { viewMode }) => ({
    components: { LNB },
    setup() {
      return {
        args,
        basicData: flatMenuSample,
      }
    },
    template: BASIC_TEMPLATE,
  }),
  decorators: [withDescription(flatMenuDescription)],
  parameters: {
    docs: {
      description: {
        story: createStoryDescription(flatMenuDescription),
      },
    },
  },
}

export const BulletDisplayRule: Story = {
  name: "불릿 규칙",
  args: {
    defaultSelectedItemId: "4-2-3", // 기본 선택된 항목 ID 지정
  },
  render: (args, { viewMode }) => ({
    components: { LNB },
    setup() {
      return {
        args,
        basicData: bulletRulesSample,
      }
    },
    template: BASIC_TEMPLATE,
  }),
  decorators: [withDescription(bulletRulesDescription)],
  parameters: {
    docs: {
      description: {
        story: createStoryDescription(bulletRulesDescription),
      },
    },
  },
}

export const SelectionCallback: Story = {
  name: "선택 콜백",
  args: {
    defaultSelectedItemId: "4-2-2", // 기본 선택된 항목 ID 지정
  },
  render: (args, { viewMode }) => ({
    components: { LNB },
    setup() {
      return {
        args,
        basicData: selectionCallbackSample,
      }
    },
    template: BASIC_TEMPLATE,
  }),
  decorators: [withDescription(selectionCallbackDescription)],
  parameters: {
    docs: {
      description: {
        story: createStoryDescription(selectionCallbackDescription),
      },
    },
  },
}

export const WithoutHeader: Story = {
  name: "헤더 없음",
  args: {
    defaultSelectedItemId: "1-2-1-1-2", // 기본 선택된 항목 ID 지정
    defaultOpenPath: ["2", "3", "3-4", "3-4-2", "3-5", "3-5-1", "3-5-1-1"],
  },
  render: (args, { viewMode }) => ({
    components: { LNB },
    setup() {
      return {
        args,
        basicData: withoutHeaderSample,
      }
    },
    template: BASIC_TEMPLATE,
  }),
  decorators: [withDescription(withoutHeaderDescription)],
  parameters: {
    docs: {
      description: {
        story: createStoryDescription(withoutHeaderDescription),
      },
    },
  },
}

export const HiddenState: Story = {
  name: "숨김 상태",
  args: {
    defaultSelectedItemId: "1-2-1-2-1",
    hidden: true,
  },
  render: (args, { viewMode }) => ({
    components: { LNB },
    setup() {
      return {
        args,
        basicData: basicHierarchySample,
      }
    },
    template: BASIC_TEMPLATE,
  }),
  decorators: [
    withDescription({
      title: "",
      description: "LNB를 숨긴 상태로 표시하는 예시입니다. 'hidden' prop을 'true'로 설정하여 LNB를 숨길 수 있습니다.",
    }),
  ],
  parameters: {
    docs: {
      description: {
        story: createStoryDescription({
          description:
            "LNB를 숨긴 상태로 표시하는 예시입니다. 'hidden' prop을 'true'로 설정하여 LNB를 숨길 수 있습니다.",
        }),
      },
    },
  },
}
