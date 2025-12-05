import type { Meta, StoryObj } from "@storybook/react-vite"

import { toPublishedSourceCode } from "@/lib/utils"
import { boxMessageVariantsConfig, boxVariantsConfig, Calbox } from "@/components/ui"

import { CalboxTemplate } from "../templates/CalboxTemplate"
import CalboxTemplateSource from "../templates/CalboxTemplate?raw"
import { booleanControl, hideOnControls, radioControl, rangeControl, selectControl, textControl } from "../utils"

const meta = {
  title: "Components/Textbox/Calbox",
  tags: ["autodocs"],
  component: Calbox,
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
    message: textControl(),
    width: rangeControl(85, 200),
    messageType: radioControl(Object.keys(boxMessageVariantsConfig.messageType)),
    disabled: booleanControl,
    className: hideOnControls,
    wrapperClassName: hideOnControls,
    onChange: hideOnControls,
    onClear: hideOnControls,
  },
  args: {},
} satisfies Meta<typeof Calbox>

export default meta
type Story = StoryObj<typeof meta>
type SearchboxStoryArgs = Story["args"]

const defaultArgs: SearchboxStoryArgs = {
  variant: "default",
  size: "medium",
  placeholder: "Search",
  value: "",
  message: "",
  messageType: "default",
  width: 120,
  disabled: false,
  onClear: () => console.log("clear"),
}

export const Default: Story = {
  render: (args) => <CalboxTemplate args={args} />,
  args: {
    ...defaultArgs,
  },
  parameters: {
    docs: {
      source: {
        code: toPublishedSourceCode(CalboxTemplateSource),
      },
    },
  },
}

export const Ghost: Story = {
  ...Default,
  args: {
    ...defaultArgs,
    variant: "ghost",
  },
}

export const DefaultWithMessage: Story = {
  name: "Default with Message",
  args: {
    ...defaultArgs,
    message: "Text (Optional)",
  },
}

/**
 * [QA] Icon States
 */
export const IconStates: Story = {
  tags: ["!dev"],
  args: {
    ...defaultArgs,
  },
  argTypes: {
    disabled: hideOnControls,
    size: hideOnControls,
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
