import React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Toggle, type ToggleProps } from "@/components/ui"

import { booleanControl, hideOnControls, selectControl } from "./utils"

type ToggleStoryArgs = Pick<ToggleProps, "checked" | "disabled" | "size" | "className">

const meta: Meta<ToggleStoryArgs> = {
  title: "Components/Toggle",
  tags: ["autodocs"],
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  args: {
    checked: false,
    disabled: false,
    size: "medium",
  },
  argTypes: {
    checked: booleanControl,
    disabled: booleanControl,
    size: selectControl(["large", "medium", "small"]),
    className: hideOnControls,
  },
}
export default meta

type Story = StoryObj<ToggleStoryArgs>

const defaultArgs = {
  checked: false,
  disabled: false,
  size: "medium",
} as ToggleStoryArgs

const ToggleStoryDecorator = (_: unknown, context: { args: ToggleStoryArgs }) => {
  const { checked, disabled, size = "medium", className } = context.args

  return <Toggle checked={checked} disabled={disabled} size={size} className={className} />
}

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  parameters: {
    docs: {
      description: {
        story: "기본 Toggle 컴포넌트입니다. 선택되지 않은 기본 상태입니다.",
      },
    },
  },
}

export const Checked: Story = {
  args: {
    ...defaultArgs,
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: "선택된 상태의 Toggle 컴포넌트입니다. 활성화된 모습을 보여줍니다.",
      },
    },
  },
}

export const Sizes: Story = {
  args: {
    ...defaultArgs,
  },
  argTypes: {
    size: hideOnControls, // Controls에서 size 숨김
  },
  decorators: [
    ToggleStoryDecorator,
    (Story: React.ComponentType<Story>, context) => {
      const { checked, disabled, className } = context.args
      return (
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(3, 80px)" }}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-marker text-xs">Small</span>
            <Story args={{ checked, disabled, size: "small", className }} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-marker text-xs">Medium</span>
            <Story args={{ checked, disabled, size: "medium", className }} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-marker text-xs">Large</span>
            <Story args={{ checked, disabled, size: "large", className }} />
          </div>
        </div>
      )
    },
  ],
  parameters: {
    docs: {
      source: {
        code: `
<div className="grid gap-6" style={{ gridTemplateColumns: "repeat(3, 80px)" }}>
  <div className="flex flex-col items-center gap-2">
    <span>Small</span>
    <Toggle size="small" />
  </div>
  <div className="flex flex-col items-center gap-2">
    <span>Medium</span>
    <Toggle size="medium" />
  </div>
  <div className="flex flex-col items-center gap-2">
    <span>Large</span>
    <Toggle size="large" />
  </div>
</div>
        `.trim(),
      },
      description: {
        story: "다양한 크기의 Toggle 컴포넌트입니다. Small, Medium, Large 세 가지 크기를 비교할 수 있습니다.",
      },
    },
  },
}

/**
 * useState로 체크 상태 추적 예제
 */
export const WithStateTracking: Story = {
  name: "State Tracking",
  decorators: [],
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isChecked, setIsChecked] = React.useState<boolean>(false)

    return (
      <div className="space-y-4">
        <h3 className="mb-2 text-sm font-semibold">토글 상태: {isChecked ? "ON" : "OFF"}</h3>
        <Toggle {...args} checked={isChecked} onCheckedChange={setIsChecked} />
        <p className="text-sm text-gray-600">클릭하여 토글 상태를 변경해보세요.</p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "상태 관리가 포함된 Toggle 컴포넌트입니다. 체크 상태를 추적하고 표시하는 실제 사용 예제입니다.",
      },
    },
  },
}

/**
 * [QA] Default States
 */
export const DefaultStates: Story = {
  tags: ["!dev"],
  args: {
    ...defaultArgs,
  },
  argTypes: {
    checked: hideOnControls,
    disabled: hideOnControls,
    size: hideOnControls,
  },
  parameters: {
    docs: {
      description: {
        story:
          "QA용 상태 테스트입니다. 다양한 상태(활성화, 호버, 포커스, 비활성화)의 Toggle 표시를 확인할 수 있습니다.",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType<Story>, context) => {
      return (
        <div className="grid gap-4" style={{ gridTemplateColumns: "50px 80px 80px 80px 80px" }}>
          {/* Header row */}
          <div>&nbsp;</div>
          <h3 className="text-marker">Enabled</h3>
          <h3 className="text-marker">Hover</h3>
          <h3 className="text-marker">Focus</h3>
          <h3 className="text-marker">Disabled</h3>

          {/* Off row */}
          <h3 className="text-marker font-bold">Off</h3>
          <Story args={{ ...context.args, checked: false, disabled: false }} />
          <Story
            args={{
              ...context.args,
              checked: false,
              disabled: false,
              className: "dsds-toggle-unchecked-hover!",
            }}
          />
          <Story args={{ ...context.args, checked: false, className: "dsds-toggle-unchecked-focus!" }} />
          <Story
            args={{
              ...context.args,
              checked: false,
              disabled: true,
            }}
          />

          {/* On row */}
          <h3 className="text-marker font-bold">On</h3>
          <Story args={{ ...context.args, checked: true, disabled: false }} />
          <Story
            args={{
              ...context.args,
              checked: true,
              disabled: false,
              className: "dsds-toggle-checked-hover!",
            }}
          />
          <Story args={{ ...context.args, checked: true, className: "dsds-toggle-checked-focus!" }} />
          <Story args={{ ...context.args, checked: true, disabled: true }} />
        </div>
      )
    },
  ],
}
