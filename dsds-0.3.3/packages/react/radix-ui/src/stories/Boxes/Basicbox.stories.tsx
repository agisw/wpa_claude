import type { Meta, StoryObj } from "@storybook/react-vite"

import { cn } from "@/lib/utils"
import { Basicbox, type BasicboxProps } from "@/components/ui/boxes/_components/Basicbox"
import { CloseIcon, DummyIcon } from "@/components/icons"
import { boxMessageVariantsConfig } from "@/components/ui"

import { booleanControl, hideOnControls, radioControl, rangeControl, textControl } from "../utils"

const meta = {
  title: "Components/Boxes/Basicbox",
  component: Basicbox,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },

  argTypes: {
    placeholder: textControl("The title of the box"),
    message: textControl(),
    width: rangeControl(85, 200),
    messageType: radioControl(Object.keys(boxMessageVariantsConfig.messageType)),
    iconOnly: booleanControl,
    className: hideOnControls,
    wrapperClassName: hideOnControls,
    inputClassName: hideOnControls,
    icon: hideOnControls,
    iconSub: hideOnControls,
    children: hideOnControls,
  },
  args: {},
} satisfies Meta<typeof Basicbox>

export default meta
type Story = StoryObj<typeof meta>
type BasicboxStoryArgs = Story["args"]

const render = (args: BasicboxProps) => {
  return (
    <Basicbox
      {...args}
      width={args.iconOnly ? undefined : 85}
      wrapperClassName={
        args.iconOnly ? undefined : cn("border-basic-box-demo px-[6px]", args.icon && "pr-[4px]", args.wrapperClassName)
      }
    />
  )
}

const defaultArgs: BasicboxStoryArgs = {
  placeholder: "Boxes",
  message: "",
  messageType: "default",
  iconOnly: false,
}

export const Default: Story = {
  tags: ["!dev"],
  args: {
    ...defaultArgs,
  },
  argTypes: {
    message: hideOnControls,
    messageType: hideOnControls,
  },
  render,
}

export const WithIcon: Story = {
  tags: ["!dev"],
  args: {
    ...defaultArgs,
    icon: <DummyIcon />,
  },
  render,
}

export const WithSubIcon: Story = {
  tags: ["!dev"],
  args: {
    ...defaultArgs,
    icon: <DummyIcon />,
    iconSub: <CloseIcon />,
  },
  render,
}

export const IconsAndMesages: Story = {
  tags: ["!dev"],
  args: {
    ...defaultArgs,
    icon: <DummyIcon />,
    iconSub: <CloseIcon />,
    width: 85,
    message: "Text(Optional)",
  },
  render,
}
