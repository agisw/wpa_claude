import type { Meta, StoryObj } from "@storybook/react"

import { Slider } from "@/components/ui"

import { hideOnControls } from "./utils"

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  tags: ["autodocs"],
  component: Slider,
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      codePanel: true,
    },
  },
  argTypes: {
    min: { control: { type: "number" }, table: { defaultValue: { summary: "0" } } },
    max: { control: { type: "number" }, table: { defaultValue: { summary: "100" } } },
    className: hideOnControls,
    value: hideOnControls,
    onValueChange: hideOnControls,
  },
  args: {
    min: 0,
    max: 100,
  },
}
export default meta

export const Default: StoryObj<typeof Slider> = {
  args: {
    min: 0,
    max: 100,
  },
  render: (args) => (
    <div style={{ width: 202, height: 24 }}>
      <Slider {...args} />
    </div>
  ),
}
