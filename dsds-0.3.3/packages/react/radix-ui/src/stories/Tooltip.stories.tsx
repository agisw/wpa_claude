import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button, Tooltip, TooltipContent, TooltipTrigger, type TooltipProps } from "@/components/ui"

import { TooltipTemplate } from "./templates/TooltipTemplate"
import { selectControl } from "./utils"

type TooltipStoryArgs = Pick<TooltipProps, "place" | "defaultOpen" | "delayDuration"> & {
  content?: string
  triggerText?: string
}

const TooltipDecorator = (_: unknown, context: { args: TooltipStoryArgs }) => {
  const {
    place = "top",
    defaultOpen,
    delayDuration = 0,
    content: title = "툴팁입니다",
    triggerText = "마우스를 올려보세요",
  } = context.args

  return (
    <div className="flex h-32 w-full items-center justify-center">
      <Tooltip place={place} defaultOpen={defaultOpen} delayDuration={delayDuration}>
        <TooltipTrigger asChild>
          <Button variant="secondary">{triggerText}</Button>
        </TooltipTrigger>
        <TooltipContent title={title} />
      </Tooltip>
    </div>
  )
}

const meta: Meta<TooltipStoryArgs> = {
  title: "Components/Tooltip",
  tags: ["autodocs"],
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  args: {
    place: "top",
    defaultOpen: false,
    delayDuration: 0,
    content: "툴팁입니다",
    triggerText: "마우스를 올려보세요",
  },
  argTypes: {
    place: selectControl([
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end",
      "right",
      "right-start",
      "right-end",
    ]),
    defaultOpen: {
      control: { type: "boolean" },
    },
    delayDuration: {
      control: { type: "number" },
      min: 0,
      max: 2000,
      step: 100,
    },
    content: {
      control: { type: "text" },
    },
    triggerText: {
      control: { type: "text" },
    },
  },
}
export default meta

type Story = StoryObj<TooltipStoryArgs>

const defaultArgs = {
  place: "top" as const,
  defaultOpen: false,
  delayDuration: 0,
  content: "툴팁입니다",
  triggerText: "마우스를 올려보세요",
}

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  decorators: [TooltipDecorator],
  parameters: {
    docs: {
      source: {
        code: `
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="secondary">마우스를 올려보세요</Button>
  </TooltipTrigger>
  <TooltipContent>
    툴팁입니다
  </TooltipContent>
</Tooltip>
        `.trim(),
      },
    },
  },
}

export const Positions: Story = {
  args: {
    ...defaultArgs,
    defaultOpen: true,
  },
  decorators: [TooltipDecorator],
  argTypes: {
    place: selectControl([
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end",
      "right",
      "right-start",
      "right-end",
    ]),
  },
  parameters: {
    docs: {
      source: {
        code: `
<Tooltip place="top">
  <TooltipTrigger asChild>
    <Button variant="secondary">마우스를 올려보세요</Button>
  </TooltipTrigger>
  <TooltipContent>
    툴팁입니다
  </TooltipContent>
</Tooltip>
        `.trim(),
      },
    },
  },
}

export const WithDelay: Story = {
  args: {
    ...defaultArgs,
    delayDuration: 500,
  },
  decorators: [TooltipDecorator],
  parameters: {
    docs: {
      source: {
        code: `
<Tooltip delayDuration={500}>
  <TooltipTrigger asChild>
    <Button variant="secondary">마우스를 올려보세요</Button>
  </TooltipTrigger>
  <TooltipContent>
    툴팁입니다
  </TooltipContent>
</Tooltip>
        `.trim(),
      },
    },
  },
}

/**
 * [QA] All Positions
 */
export const AllPositions: Story = {
  tags: ["!dev"],
  decorators: [],
  render: () => {
    return <TooltipTemplate persistent />
  },
}

export const TitleOnly: Story = {
  args: {
    ...defaultArgs,
    defaultOpen: true,
  },
  decorators: [
    () => (
      <div className="flex h-32 w-full items-center justify-center">
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="secondary">제목만</Button>
          </TooltipTrigger>
          <TooltipContent title="툴팁 제목입니다" />
        </Tooltip>
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: `
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="secondary">제목만</Button>
  </TooltipTrigger>
  <TooltipContent title="툴팁 제목입니다" />
</Tooltip>
        `.trim(),
      },
    },
  },
}

export const ChildrenOnly: Story = {
  args: {
    ...defaultArgs,
    defaultOpen: true,
  },
  decorators: [
    () => (
      <div className="flex h-32 w-full items-center justify-center">
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="secondary">내용만</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>툴팁 내용입니다</p>
          </TooltipContent>
        </Tooltip>
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: `
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="secondary">내용만</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>툴팁 내용입니다</p>
  </TooltipContent>
</Tooltip>
        `.trim(),
      },
    },
  },
}

export const TitleAndChildren: Story = {
  args: {
    ...defaultArgs,
    defaultOpen: true,
  },
  decorators: [
    () => (
      <div className="flex h-32 w-full items-center justify-center">
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="secondary">제목 + 내용</Button>
          </TooltipTrigger>
          <TooltipContent title="툴팁 제목">
            <p>툴팁 본문 내용입니다</p>
          </TooltipContent>
        </Tooltip>
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: `
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="secondary">제목 + 내용</Button>
  </TooltipTrigger>
  <TooltipContent title="툴팁 제목">
    <p>툴팁 본문 내용입니다</p>
  </TooltipContent>
</Tooltip>
        `.trim(),
      },
    },
  },
}

/**
 * [QA] Content Variations
 */
export const ContentVariations: Story = {
  tags: ["!dev"],
  decorators: [],
  render: () => (
    <div className="flex items-center justify-center gap-30 p-8">
      <Tooltip persistent>
        <TooltipTrigger asChild>
          <Button variant="secondary">제목만</Button>
        </TooltipTrigger>
        <TooltipContent title="툴팁 제목입니다" />
      </Tooltip>

      <Tooltip persistent>
        <TooltipTrigger asChild>
          <Button variant="secondary">내용만</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>툴팁 내용입니다</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip persistent>
        <TooltipTrigger asChild>
          <Button variant="secondary">제목 + 내용</Button>
        </TooltipTrigger>
        <TooltipContent title="툴팁 제목">
          <p>툴팁 본문 내용입니다</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}
