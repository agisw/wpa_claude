import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox } from "@/components/ui"

import { booleanControl, hideOnControls } from "./utils"

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  tags: ["autodocs"],
  component: Checkbox,
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
    checked: {
      control: { type: "select" },
      options: [false, true, "indeterminate"],
    },
    disabled: booleanControl,
    label: {
      control: { type: "text" },
    },
    onCheckedChange: hideOnControls,
  },
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "기본 Checkbox 컴포넌트입니다. 선택되지 않은 기본 상태입니다.",
      },
    },
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "선택된 상태의 Checkbox입니다. 체크 표시가 나타납니다.",
      },
    },
  },
}

export const Indeterminate: Story = {
  args: {
    checked: "indeterminate",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "불확정 상태의 Checkbox입니다. 일부 하위 항목만 선택된 경우에 사용됩니다.",
      },
    },
  },
}

export const WithLabel: Story = {
  args: {
    checked: false,
    disabled: false,
    label: "동의합니다",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Checkbox label="동의합니다" />
        `.trim(),
      },
      description: {
        story: "레이블이 포함된 Checkbox입니다. 사용자에게 선택 항목을 명확히 설명할 수 있습니다.",
      },
    },
  },
}

export const LabelExamples: Story = {
  decorators: [],
  render: () => {
    return (
      <div className="space-y-2">
        <Checkbox label="이용약관에 동의합니다" />
        <Checkbox label="개인정보 수집 및 이용에 동의합니다" checked />
        <Checkbox label="마케팅 정보 수신에 동의합니다 (선택)" checked="indeterminate" />
        <Checkbox label="만 14세 이상입니다" disabled />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "다양한 레이블 예제입니다. 실제 사용 사례에서 볼 수 있는 여러 상태의 Checkbox들을 보여줍니다.",
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
    checked: false,
    disabled: false,
  },
  argTypes: {
    checked: hideOnControls,
    disabled: hideOnControls,
  },
  parameters: {
    docs: {
      description: {
        story:
          "QA용 상태 테스트입니다. 다양한 상태(활성화, 호버, 포커스, 비활성화)의 Checkbox 표시를 확인할 수 있습니다.",
      },
      codePanel: false,
    },
  },
  decorators: [
    (Story: React.ComponentType<Story>, context) => {
      return (
        <div className="grid gap-4" style={{ gridTemplateColumns: "100px 100px 100px 100px 100px" }}>
          {/* Header row */}
          <div>&nbsp;</div>
          <h3 className="text-marker">Enabled</h3>
          <h3 className="text-marker">Hover</h3>
          <h3 className="text-marker">Focus</h3>
          <h3 className="text-marker">Disabled</h3>

          {/* Unchecked row */}
          <h3 className="text-marker font-bold">Off</h3>
          <Story args={{ ...context.args, checked: false, disabled: false }} />
          <Story
            args={{
              ...context.args,
              checked: false,
              disabled: false,
              className: "border-check-off-hover!",
            }}
          />
          <Story args={{ ...context.args, checked: false, className: "dsds-checkbox-focus!" }} />
          <Story args={{ ...context.args, checked: false, disabled: true }} />

          {/* Checked row */}
          <h3 className="text-marker font-bold">On</h3>
          <Story args={{ ...context.args, checked: true, disabled: false }} />
          <Story
            args={{
              ...context.args,
              checked: true,
              disabled: false,
              className: "dsds-checkbox-active-hover!",
            }}
          />
          <Story args={{ ...context.args, checked: true, className: "dsds-checkbox-active-focus!" }} />
          <Story args={{ ...context.args, checked: true, disabled: true }} />

          {/* Indeterminate row */}
          <h3 className="text-marker font-bold">Indeterminate</h3>
          <Story args={{ ...context.args, checked: "indeterminate", disabled: false }} />
          <Story
            args={{
              ...context.args,
              checked: "indeterminate",
              disabled: false,
              className: "dsds-checkbox-active-hover!",
            }}
          />
          <Story args={{ ...context.args, checked: "indeterminate", className: "dsds-checkbox-active-focus!" }} />
          <Story args={{ ...context.args, checked: "indeterminate", disabled: true }} />
        </div>
      )
    },
  ],
}
