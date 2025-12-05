import type { Meta, StoryObj } from "@storybook/react-vite"

import { Textbox } from "@/components/ui/boxes/Textbox"
import { boxMessageVariantsConfig, boxVariantsConfig } from "@/components/ui/types"

import { booleanControl, hideOnControls, radioControl, rangeControl, selectControl, textControl } from "../utils"

const meta = {
  title: "Components/Textbox",
  tags: ["autodocs"],
  component: Textbox,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },

  argTypes: {
    placeholder: textControl("The title of the box"),
    size: selectControl(Object.keys(boxVariantsConfig.size)),
    variant: selectControl(Object.keys(boxVariantsConfig.variant)),
    type: selectControl(["text", "password", "number"]),
    value: {
      control: { type: "text" },
      description: "제어형 모드에서 사용할 값 (비워두면 비제어형 모드로 동작)",
    },
    defaultValue: {
      control: { type: "text" },
      description: "비제어형 모드에서 사용할 초기값",
    },
    message: textControl(),
    width: rangeControl(85, 200),
    messageType: radioControl(Object.keys(boxMessageVariantsConfig.messageType)),
    disabled: booleanControl,
    multiline: booleanControl,
    autoResize: booleanControl,
    clearable: booleanControl,
    wrapperClassName: hideOnControls,
    onChange: hideOnControls,
  },
  args: {},
} satisfies Meta<typeof Textbox>

export default meta
type Story = StoryObj<typeof meta>
type TextboxStoryArgs = Story["args"]

const defaultArgs: TextboxStoryArgs = {
  variant: "default",
  size: "medium",
  placeholder: "textinputplace",
  message: "",
  messageType: "default",
  width: 120,
  disabled: false,
  multiline: false,
  autoResize: false,
  clearable: false,
}

const defaultMultilineArgs: TextboxStoryArgs = {
  ...defaultArgs,
  multiline: true,
  width: 140,
}

const ghostArgs: TextboxStoryArgs = {
  ...defaultArgs,
  variant: "ghost",
}

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  parameters: {
    docs: {
      description: {
        story: "기본 Textbox 컴포넌트입니다. 단일 라인 텍스트 입력을 위한 기본 형태입니다.",
      },
    },
  },
}

export const Ghost: Story = {
  args: {
    ...ghostArgs,
  },
  parameters: {
    docs: {
      description: {
        story: "Ghost 변형의 Textbox입니다. 배경이 투명한 스타일로 다른 요소 위에 배치할 때 유용합니다.",
      },
    },
  },
}

export const DefaultWithMessage: Story = {
  args: {
    ...defaultArgs,
    message: "Text (Optional)",
  },
  parameters: {
    docs: {
      description: {
        story: "메시지가 포함된 기본 Textbox입니다. 입력 필드 아래에 도움말이나 유효성 메시지를 표시할 수 있습니다.",
      },
    },
  },
}

export const Clearable: Story = {
  args: {
    ...defaultArgs,
    clearable: true,
    defaultValue: "클리어 가능한 텍스트",
  },
  parameters: {
    docs: {
      description: {
        story: `clearable prop이 활성화된 Textbox입니다. 입력값이 있을 때 클리어 버튼이 표시되어
        텍스트를 쉽게 지울 수 있습니다.`,
      },
    },
  },
}

export const MultiLine: Story = {
  args: {
    ...defaultMultilineArgs,
    defaultValue: "여러 줄 텍스트를 입력할 수 있습니다.\n자동으로 높이가 조정됩니다.",
  },
  parameters: {
    docs: {
      description: {
        story: "멀티라인 Textbox입니다. 여러 줄의 텍스트를 입력할 수 있는 textarea 형태입니다.",
      },
    },
  },
}

export const MultiLineAutoResize: Story = {
  args: {
    ...defaultMultilineArgs,
    autoResize: true,
    defaultValue: "이 텍스트는 자동으로 크기가 조정됩니다.\n더 많은 텍스트를 입력해보세요.",
  },
  parameters: {
    docs: {
      description: {
        story: "자동 크기 조정 기능이 활성화된 멀티라인 Textbox입니다. 입력 내용에 따라 높이가 자동으로 조정됩니다.",
      },
    },
  },
}

/**
 * [QA] Icon States
 */
export const IconStates: Story = {
  tags: ["!dev"],
  args: {
    ...defaultArgs,
    clearable: true,
  },
  argTypes: {
    disabled: hideOnControls,
    size: hideOnControls,
  },
  parameters: {
    docs: {
      description: {
        story:
          "QA용 아이콘 상태 테스트입니다. clearable prop이 활성화된 상태에서 다양한 입력 상태의 클리어 아이콘 표시를 확인할 수 있습니다.",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType<Story>, context) => {
      return (
        <div className="grid gap-4" style={{ gridTemplateColumns: "120px 120px 120px 120px" }}>
          {/* Header row */}
          <h3 className="text-marker">Default</h3>
          <h3 className="text-marker">텍스트 입력시</h3>
          <h3 className="text-marker">텍스트 + Hover</h3>
          <h3 className="text-marker">Disabled</h3>

          {/* Main row */}
          <Story args={{ ...context.args, value: undefined }} />
          <Story
            args={{
              ...context.args,
              value: "Text",
              className: "",
            }}
          />
          <Story
            args={{
              ...context.args,
              value: "Text",
              wrapperClassName: "border-text-box-hover! [&_.dsds-icon]:dsds-icon-hover!",
            }}
          />
          <Story
            args={{
              ...context.args,
              disabled: true,
            }}
          />
        </div>
      )
    },
  ],
}
