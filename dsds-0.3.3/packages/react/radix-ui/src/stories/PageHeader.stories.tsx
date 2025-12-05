import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button, DetailPageHeader, PageHeader } from "@/components/ui"

import { textControl } from "./utils"

const meta: Meta = {
  title: "Layouts/SDP Examples/SDP Pageheader",
  component: PageHeader,
  parameters: {
    layout: "center",
    docs: {
      codePanel: true,
    },
  },
  argTypes: {
    title: textControl(),
    // headerSize: {
    //   control: { type: "radio" },
    //   options: ["compact", "cozy"],
    //   description: "Header의 크기를 설정합니다.",
    //   defaultValue: "cozy",
    // },
    // footerTheme: {
    //   control: { type: "radio" },
    //   options: ["light", "dark"],
    //   description: "Footer의 테마를 설정합니다.",
    //   defaultValue: "light",
    // },
    // footerSize: {
    //   control: { type: "radio" },
    //   options: ["compact", "cozy"],
    //   description: "Footer의 크기를 설정합니다.",
    //   defaultValue: "compact",
    // },
    // hideLnb: {
    //   control: { type: "boolean" },
    //   description: "LNB를 숨길지 여부를 설정합니다.",
    //   defaultValue: false,
    // },
    // notiCount: rangeControl(0, 120, "알림 개수", 1),
  },
  args: {
    title: "Page Header Title",
    TooltipContent: (
      <div>
        <p className="font-bold">Tooltip Title</p>
        <p>Tooltip Content</p>
      </div>
    ),
  },
}

export default meta
type Story = StoryObj<typeof meta>
export type Args = {
  title?: string
  tooltipContent?: React.ReactNode | string
  children?: React.ReactNode
  className?: string
}

export const SDPPageHeader: Story = {
  render: (args) => (
    <PageHeader
      {...args}
      title="Page Header Title"
      tooltipContent={
        <div>
          <p className="font-bold">Tooltip Title</p>
          <p>Tooltip Content</p>
        </div>
      }
      children={
        <div className="flex items-center gap-[12px]">
          <Button>Button</Button>
          <Button variant="secondary">Button</Button>
        </div>
      }
    />
  ),
}
export const SDPDetailPageHeader: Story = {
  render: (args) => (
    <DetailPageHeader
      {...args}
      title="Page Header Title"
      tooltipContent={
        <div>
          <p className="font-bold">Tooltip Title</p>
          <p>Tooltip Content</p>
        </div>
      }
      children={
        <div className="flex items-center gap-[12px]">
          <Button>Button</Button>
          <Button variant="secondary">Button</Button>
        </div>
      }
    />
  ),
}
