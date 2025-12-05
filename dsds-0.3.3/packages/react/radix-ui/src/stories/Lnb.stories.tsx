import { useCallback, useState } from "react"
import {
  basicHierarchyDescription,
  basicHierarchySample,
  bulletRulesDescription,
  bulletRulesSample,
  flatMenuDescription,
  flatMenuSample,
  newTreeOnlyDescription,
  newTreeOnlySample,
  searchboxTitleDescription,
  searchboxTitleSample,
  SearchboxTitleStory,
  selectionCallbackDescription,
  selectionCallbackSample,
  tabsTitleDescription,
  tabsTitleSample,
  TabsTitleStory,
  treeAndItemDescription,
  treeAndItemSample,
  treeOnlyDescription,
  treeOnlySample,
  withoutHeaderDescription,
  withoutHeaderSample,
} from "@/stories/data/lnb"
import { Markdown, Source } from "@storybook/addon-docs/blocks"
import type { Decorator, Meta, StoryObj } from "@storybook/react-vite"
import { ThemeProvider } from "storybook/theming"

import { cn } from "@/lib/utils"
import { Lnb, LNBContentItem } from "@/components/ui"

import { selectionCallbackExample } from "./data/lnb/selectionCallbackSample"
import { hideOnControls, theme } from "./utils"

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

const getStoryContainerClass = (viewMode?: string) => (viewMode === "docs" ? "h-[480px]" : "h-screen")

const meta: Meta<typeof Lnb> = {
  title: "Layouts/LNB",
  component: Lnb,
  parameters: {
    layout: "fullscreen",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "LNB의 타이틀 영역에 표시할 컴포넌트",
    },
    data: {
      description: "LNB 메뉴 구조 데이터",
    },
    selectedItemId: {
      description: "현재 선택된 항목의 ID (controlled)",
    },
    defaultSelectedItemId: {
      description: "기본으로 선택될 항목의 ID (uncontrolled)",
    },
    defaultOpenPath: {
      description: "초기 열려있는 경로 (uncontrolled)",
    },
    searchText: {
      description: "검색어 입력 시 LNB 메뉴를 필터링하는 데 사용되는 텍스트",
    },
    hidden: {
      description: "LNB를 숨길지 여부",
      control: "boolean",
    },
    withoutAccordion: {
      description: "아코디언 없이 트리 구조만 사용할지 여부",
      control: "boolean",
    },
    onSelectionChange: {
      description: "선택된 항목이 변경될 때 호출되는 콜백",
    },
    onSearchTextChange: {
      description: "검색어가 변경될 때 호출되는 콜백",
    },
  },
}

export default meta

type Story = StoryObj<typeof Lnb>

// 일반화된 설명 Decorator
const withDescription = (content: { description: string; features?: string[]; examples?: string[] }): Decorator => {
  return (Story, context) => {
    const markdownContent = createMarkdownContent(content)
    const containerClass = getStoryContainerClass(context.viewMode)

    return (
      <div className={cn("gap-md flex w-full flex-row", containerClass)}>
        <Story {...context} />
        <div className="flex flex-1 flex-col">
          <Markdown className="markdown px-lg py-lg font-sans text-sm">{markdownContent}</Markdown>
        </div>
      </div>
    )
  }
}
const withSelectionCallback = (content: { description: string; features: string[] }): Decorator => {
  return (Story, context) => {
    const [selectedItem, setSelectedItem] = useState<LNBContentItem | null>(null)

    const handleSelectionChange = useCallback(
      (_selectedItemId: string, item: LNBContentItem) => {
        setSelectedItem(item)
      },
      [setSelectedItem]
    )
    const markdownContent = createMarkdownContent(content)
    const containerClass = getStoryContainerClass(context.viewMode)

    return (
      <ThemeProvider theme={theme}>
        <div className={cn("gap-md flex w-full flex-row", containerClass)}>
          <div>
            <Story args={{ ...context.args, onSelectionChange: handleSelectionChange }} />
          </div>
          <div className="px-lg py-lg scrollbar-thin flex max-h-screen flex-1 flex-col overflow-y-auto">
            <Markdown className="markdown font-sans text-sm">{markdownContent}</Markdown>
            <p className="flex flex-1 flex-col">
              <strong className="text-sm">선택된 항목:</strong>
              <Source language="json" code={selectedItem ? JSON.stringify(selectedItem, null, 2) : "없음"} />
              <strong className="text-sm">예제 코드:</strong>
              <Source language="tsx" code={selectionCallbackExample} />
            </p>
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

export const Default: Story = {
  name: "기본 구조",
  args: {
    data: basicHierarchySample,
    defaultSelectedItemId: "1-2-1-1-2", // 기본 선택된 항목 ID 지정
    defaultOpenPath: ["1-1"], // "1-1" 노드를 펼쳐진 상태로 시작
  },
  decorators: [withDescription(basicHierarchyDescription)],
  parameters: {
    docs: {
      description: {
        story: createStoryDescription(basicHierarchyDescription),
      },
    },
  },
}

const argTypes: Story["argTypes"] = {
  title: hideOnControls,
  onSelectionChange: hideOnControls,
  onSearchTextChange: hideOnControls,
}

export const WithoutAccordion: Story = {
  name: "트리만",
  argTypes,
  args: {
    data: treeOnlySample,
    withoutAccordion: true,
    defaultSelectedItemId: "1-2-1-1-2", // 기본 선택된 항목 ID 지정
  },
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
  argTypes,
  args: {
    data: newTreeOnlySample,
    withoutAccordion: true,
    defaultSelectedItemId: "1-2-1-1-2", // 기본 선택된 항목 ID 지정
    defaultOpenPath: ["1", "1-1", "1-3"],
  },
  decorators: [withDescription(newTreeOnlyDescription)],
  parameters: {
    docs: {
      description: {
        story: createStoryDescription(newTreeOnlyDescription),
      },
    },
  },
}

export const treeAndItem: Story = {
  name: "트리와 항목 동일 계층",
  argTypes,
  args: {
    data: treeAndItemSample,
    withoutAccordion: true,
    defaultSelectedItemId: "1-2-1-1-2", // 기본 선택된 항목 ID 지정
    defaultOpenPath: ["2", "3", "3-4", "3-4-2", "3-5", "3-5-1", "3-5-1-1"],
  },
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
  argTypes,
  args: {
    data: searchboxTitleSample,
    defaultSelectedItemId: "4-2",
  },
  render: (args, context) => {
    const storyData = SearchboxTitleStory(args)
    const containerClass = getStoryContainerClass(context.viewMode)

    return (
      <ThemeProvider theme={theme}>
        <div className={cn("gap-md flex w-full flex-row", containerClass)}>
          <Lnb
            {...args}
            data={storyData.updatedData}
            title={storyData.title}
            defaultSelectedItemId={args.defaultSelectedItemId || storyData.defaultSelectedItemId}
            searchText={storyData.searchValue}
          />
          <div className="px-lg py-lg scrollbar-thin flex max-h-screen flex-1 flex-col overflow-y-auto">
            <Markdown className="markdown font-sans text-sm">{storyData.markdownContent}</Markdown>
            <p className="flex flex-1 flex-col">
              <strong className="text-sm">예제 코드:</strong>
              <Source language="tsx" code={searchboxTitleDescription.codeExample} />
            </p>
          </div>
        </div>
      </ThemeProvider>
    )
  },
  parameters: {
    docs: {
      description: {
        story: createStoryDescription(searchboxTitleDescription),
      },
      source: {
        code: searchboxTitleDescription.codeExample,
        language: "tsx",
      },
    },
  },
}

export const FlatMenuStructure: Story = {
  name: "평면 메뉴",
  argTypes,
  args: {
    data: flatMenuSample,
    defaultSelectedItemId: "1", // 기본 선택된 항목 ID 지정
  },
  decorators: [withDescription(flatMenuDescription)],
  parameters: {
    docs: {
      description: {
        story: createStoryDescription(flatMenuDescription),
      },
    },
  },
}

export const BulletDisplayRules: Story = {
  name: "불릿 규칙",
  argTypes,
  args: {
    data: bulletRulesSample,
    defaultSelectedItemId: "4-2-3", // 기본 선택된 항목 ID 지정
  },
  decorators: [withDescription(bulletRulesDescription)],
  parameters: {
    docs: {
      description: {
        story: createStoryDescription(bulletRulesDescription),
      },
    },
  },
}

export const TabsTitle: Story = {
  name: "탭 타이틀",
  argTypes,
  args: {
    data: tabsTitleSample,
  },
  render: (args, context) => {
    const storyData = TabsTitleStory(args)
    const containerClass = getStoryContainerClass(context.viewMode)

    return (
      <ThemeProvider theme={theme}>
        <div className={cn("gap-md flex w-full flex-row", containerClass)}>
          <Lnb
            {...args}
            className="lnb-title-tabs"
            data={storyData.updatedData}
            title={storyData.title}
            defaultSelectedItemId={args.defaultSelectedItemId || storyData.defaultSelectedItemId}
          />
          <div className="px-lg py-lg scrollbar-thin flex max-h-screen flex-1 flex-col overflow-y-auto">
            <Markdown className="markdown font-sans text-sm">{storyData.markdownContent}</Markdown>
            <p className="flex flex-1 flex-col">
              <strong className="text-sm">예제 코드:</strong>
              <Source language="tsx" code={tabsTitleDescription.codeExample} />
            </p>
          </div>
        </div>
      </ThemeProvider>
    )
  },
  parameters: {
    docs: {
      description: {
        story: createStoryDescription(tabsTitleDescription),
      },
      source: {
        code: tabsTitleDescription.codeExample,
        language: "tsx",
      },
    },
  },
}

export const SelectionCallback: Story = {
  name: "선택 콜백",
  argTypes,
  args: {
    data: selectionCallbackSample,
    defaultSelectedItemId: "4-2-2", // 기본 선택된 항목 ID 지정
  },
  decorators: [withSelectionCallback(selectionCallbackDescription)],
  parameters: {
    docs: {
      source: {
        code: selectionCallbackExample,
      },
      description: {
        story: createStoryDescription(selectionCallbackDescription),
      },
    },
  },
}

export const withoutHeader: Story = {
  name: "헤더 없음",
  argTypes,
  args: {
    data: withoutHeaderSample,
    defaultSelectedItemId: "1-2-1-1-2", // 기본 선택된 항목 ID 지정
    defaultOpenPath: ["2", "3", "3-4", "3-4-2", "3-5", "3-5-1", "3-5-1-1"],
  },
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
  argTypes,
  args: {
    data: basicHierarchySample,
    defaultSelectedItemId: "1-2-1-2-1",
    hidden: true,
  },
  decorators: [
    withDescription({
      description: "LNB를 숨긴 상태로 표시하는 예시입니다. 'hidden' prop을 'true'로 설정하여 LNB를 숨길 수 있습니다.",
    }),
  ],
  parameters: {
    docs: {
      description: {
        story: "LNB를 숨긴 상태로 표시하는 예시입니다. `hidden` prop을 `true`로 설정하여 LNB를 숨길 수 있습니다.",
      },
    },
  },
}

export const SearchboxTitleWithoutDecorator: Story = {
  name: "검색 타이틀 (QA)",
  tags: ["!dev"],
  argTypes,
  args: {
    data: searchboxTitleSample,
    defaultSelectedItemId: "4-2",
  },
  render: (args) => {
    const storyData = SearchboxTitleStory(args)

    return (
      <ThemeProvider theme={theme}>
        <div className={cn("gap-md flex w-full flex-row")}>
          <Lnb
            {...args}
            className="h-[700px]"
            data={storyData.updatedData}
            title={storyData.title}
            defaultSelectedItemId={args.defaultSelectedItemId || storyData.defaultSelectedItemId}
            searchText={storyData.searchValue}
          />
        </div>
      </ThemeProvider>
    )
  },
}

export const TabsTitleWithoutDecorator: Story = {
  name: "탭 타이틀 (QA)",
  tags: ["!dev"],
  argTypes,
  args: {
    data: tabsTitleSample,
  },
  render: (args) => {
    const storyData = TabsTitleStory(args)

    return (
      <Lnb
        {...args}
        className="lnb-title-tabs h-[700px]"
        data={storyData.updatedData}
        title={storyData.title}
        defaultSelectedItemId={args.defaultSelectedItemId || storyData.defaultSelectedItemId}
      />
    )
  },
}
