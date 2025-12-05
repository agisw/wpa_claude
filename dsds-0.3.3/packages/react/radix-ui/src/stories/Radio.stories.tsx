import React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Radio, RadioItem, type RadioItemProps, type RadioProps } from "@/components/ui"

import { booleanControl, hideOnControls, radioControl } from "./utils"

type RadioStoryArgs = Pick<RadioProps, "orientation"> &
  Pick<RadioItemProps, "checked" | "disabled" | "className"> & {
    itemCount?: number
  }

const RadioDecorator = (_: unknown, context: { args: RadioStoryArgs }) => {
  const { orientation = "vertical", itemCount = 1, checked, disabled, className } = context.args
  const radioItems = Array.from({ length: itemCount }, (_, i) => `Radio_${i + 1}`)

  return (
    <Radio orientation={orientation}>
      {radioItems.map((item, i) => (
        <RadioItem
          key={i}
          value={item}
          label={item}
          className={className}
          {...(itemCount === 1 ? { checked, disabled } : {})}
          id={`option${i + 1}`}
        />
      ))}
    </Radio>
  )
}

const meta: Meta<RadioStoryArgs> = {
  title: "Components/Radio",
  tags: ["autodocs"],
  component: Radio,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  args: {
    checked: false,
    disabled: false,
  },
  argTypes: {
    checked: booleanControl,
    disabled: booleanControl,
    itemCount: hideOnControls,
    className: hideOnControls,
  },
}
export default meta

type Story = StoryObj<RadioStoryArgs>

const defaultItemArgs = {
  checked: false,
  disabled: false,
  orientation: "vertical",
  itemCount: 1,
} as RadioStoryArgs

export const Default: Story = {
  args: {
    ...defaultItemArgs,
  },
  argTypes: {
    orientation: hideOnControls,
  },
  decorators: [RadioDecorator],
  parameters: {
    docs: {
      source: {
        code: `
<Radio orientation={orientation}>
  <RadioItem value="Radio_1" label="Radio_1" id="option1" />
</Radio>
        `.trim(),
      },
      description: {
        story: "기본 Radio 컴포넌트입니다. 단일 RadioItem이 포함된 기본 형태입니다.",
      },
    },
  },
}

export const Checked: Story = {
  args: {
    ...defaultItemArgs,
    checked: true,
  },
  decorators: [RadioDecorator],
  argTypes: {
    orientation: hideOnControls,
  },
  parameters: {
    docs: {
      source: {
        code: `
<Radio orientation={orientation}>
  <RadioItem value="Radio_1" label="Radio_1" id="option1" checked />
</Radio>
        `.trim(),
      },
      description: {
        story: "선택된 상태의 Radio 컴포넌트입니다. RadioItem이 선택된 모습을 보여줍니다.",
      },
    },
  },
}

export const Orientation: Story = {
  args: {
    ...defaultItemArgs,
    itemCount: 3,
    orientation: "vertical",
  },
  decorators: [RadioDecorator],
  argTypes: {
    checked: hideOnControls,
    disabled: hideOnControls,
    orientation: radioControl(["horizontal", "vertical"]),
  },
  parameters: {
    docs: {
      source: {
        code: `
<Radio orientation={orientation}>
  <RadioItem value="Radio_1" label="Radio_1" id="option0" />
  <RadioItem value="Radio_2" label="Radio_2" id="option1" />
  <RadioItem value="Radio_3" label="Radio_3" id="option2" />
</Radio>
        `.trim(),
      },
      description: {
        story: "여러 RadioItem이 포함된 Radio 그룹입니다. 수직/수평 방향을 변경할 수 있습니다.",
      },
    },
  },
}

/**
 * useState로 선택된 값 추적 예제
 */
export const WithStateTracking: Story = {
  name: "State Tracking",
  render: () => {
    const radioItems = Array.from({ length: 3 }, (_, i) => ({ label: `Radio_${i + 1}`, value: `radio_${i + 1}` }))
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedValue, setSelectedValue] = React.useState<string>(radioItems[0].value)

    return (
      <div className="space-y-4">
        <h3 className="mb-2 text-sm font-semibold">선택된 값: {selectedValue}</h3>
        <Radio value={selectedValue} onValueChange={setSelectedValue}>
          {radioItems.map((option) => (
            <RadioItem key={option.value} value={option.value} label={option.label} id={option.value} />
          ))}
        </Radio>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "상태 관리가 포함된 Radio 그룹입니다. 선택된 값을 추적하고 표시하는 실제 사용 예제입니다.",
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
    ...defaultItemArgs,
  },
  argTypes: {
    orientation: hideOnControls,
    checked: hideOnControls,
    disabled: hideOnControls,
  },
  parameters: {
    docs: {
      codePanel: false,
      description: {
        story: "QA용 상태 테스트입니다. 다양한 상태(활성화, 호버, 포커스, 비활성화)의 Radio 표시를 확인할 수 있습니다.",
      },
    },
  },
  decorators: [
    RadioDecorator,
    (Story: React.ComponentType<Story>, context) => {
      return (
        <div className="grid gap-4" style={{ gridTemplateColumns: "80px 100px 100px 100px 100px" }}>
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
              className: "dsds-radio-item-hover!",
            }}
          />
          <Story args={{ ...context.args, checked: false, className: "dsds-radio-item-focus!" }} />
          <Story args={{ ...context.args, checked: false, disabled: true }} />

          {/* On row */}
          <h3 className="text-marker font-bold">On</h3>
          <Story args={{ ...context.args, checked: true, disabled: false }} />
          <Story
            args={{
              ...context.args,
              checked: true,
              disabled: false,
              className: "dsds-radio-item-checked-hover!",
            }}
          />
          <Story args={{ ...context.args, checked: true, className: "dsds-radio-item-checked-focus!" }} />
          <Story args={{ ...context.args, checked: true, disabled: true }} />
        </div>
      )
    },
  ],
}

export const HorizontalOrientation: Story = {
  tags: ["!dev", "!autodocs"],
  ...Orientation,
  args: {
    ...Orientation.args,
    orientation: "horizontal",
  },
}
