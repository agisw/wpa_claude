import React from "react"
import type { Decorator, Meta, StoryObj } from "@storybook/react"

import { SplitterGroup, SplitterHandle, SplitterPanel } from "@/components/ui/Splitter"

const withDocsHeight =
  (height = 250): Decorator =>
  (Story, context) =>
    context.viewMode === "docs" ? (
      <div style={{ height, overflow: "hidden" }}>
        <Story />
      </div>
    ) : (
      <Story />
    )

type StoryArgs = {
  minSize: number
}

const meta: Meta<StoryArgs> = {
  title: "Components/Splitter",
  tags: ["autodocs"],
  component: undefined,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: { type: "void" },
      description: {
        component: "Splitter는 화면을 두 영역으로 나누고 드래그로 너비를 조절하는 컴포넌트입니다.",
      },
    },
  },
  decorators: [withDocsHeight(220)],
  argTypes: {
    minSize: {
      control: { type: "number", min: 0, max: 50, step: 1 },
      description: "최소 영역 지정 (px)",
      defaultValue: 20,
    },
  },
}

export default meta
type Story = StoryObj<StoryArgs>

/** 세로 분할선으로 페이지 내 영역을 구분하는 Splitter 컴포넌트입니다. */
export const Horizontal: Story = {
  name: "Horizontal",
  args: { minSize: 20 },
  render: ({ minSize }, { viewMode }) => (
    <div className={viewMode === "docs" ? "h-[220px] w-full" : "h-screen w-full"}>
      <SplitterGroup direction="horizontal">
        <SplitterPanel minSize={minSize}>
          <div className="h-full w-full bg-[var(--colors-neutral-neutral-01)]" />
        </SplitterPanel>

        <SplitterHandle direction="horizontal" />

        <SplitterPanel minSize={minSize}>
          <div className="h-full w-full bg-[var(--colors-neutral-neutral-01)]" />
        </SplitterPanel>
      </SplitterGroup>
    </div>
  ),
}

/** 가로 분할선으로 페이지 내 영역을 구분하는 Splitter 컴포넌트입니다. */
export const Vertical: Story = {
  name: "Vertical",
  args: { minSize: 20 },
  render: ({ minSize }, { viewMode }) => (
    <div className={viewMode === "docs" ? "h-[220px] w-full" : "h-screen w-full"}>
      <SplitterGroup direction="vertical">
        <SplitterPanel minSize={minSize}>
          <div className="h-full w-full bg-[var(--colors-neutral-neutral-01)]" />
        </SplitterPanel>

        <SplitterHandle direction="vertical" />

        <SplitterPanel minSize={minSize}>
          <div className="h-full w-full bg-[var(--colors-neutral-neutral-01)]" />
        </SplitterPanel>
      </SplitterGroup>
    </div>
  ),
}
