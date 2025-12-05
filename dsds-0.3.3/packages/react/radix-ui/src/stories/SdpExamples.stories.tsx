import {
  sdpComplianceMatrixLayoutSample,
  sdpErsManagementLayoutSample,
  sdpFunctionDetailLayoutSample,
  sdpFunctionManagementLayoutSample,
  sdpMyTaskLayoutSample,
  sdpSrsDetailLayoutSample,
  sdpSrsManagementLayoutSample,
} from "@/stories/data/layoutExample"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { rangeControl } from "./utils"

const meta: Meta = {
  title: "Layouts/SDP Examples",
  parameters: {
    layout: "fullscreen",
    docs: {
      codePanel: true,
    },
  },
  argTypes: {
    headerTheme: {
      control: { type: "radio" },
      options: ["light", "dark"],
      description: "Header의 테마를 설정합니다.",
      defaultValue: "dark",
    },
    headerSize: {
      control: { type: "radio" },
      options: ["compact", "cozy"],
      description: "Header의 크기를 설정합니다.",
      defaultValue: "cozy",
    },
    footerTheme: {
      control: { type: "radio" },
      options: ["light", "dark"],
      description: "Footer의 테마를 설정합니다.",
      defaultValue: "light",
    },
    footerSize: {
      control: { type: "radio" },
      options: ["compact", "cozy"],
      description: "Footer의 크기를 설정합니다.",
      defaultValue: "compact",
    },
    hideLnb: {
      control: { type: "boolean" },
      description: "LNB를 숨길지 여부를 설정합니다.",
      defaultValue: false,
    },
    notiCount: rangeControl(0, 120, "알림 개수", 1),
  },
  args: {
    headerTheme: "dark",
    headerSize: "cozy",
    footerTheme: "light",
    hideLnb: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>
export type Args = {
  headerTheme?: "dark" | "light"
  headerSize?: "cozy" | "compact"
  footerTheme?: "dark" | "light"
  footerSize?: "cozy" | "compact"
  hideLnb?: boolean
  notiCount?: number
}

/**
 * Header, LNB, Content, Footer로 구성된 가장 일반적인 웹 애플리케이션 레이아웃입니다.
 */

export const SDPSRSLayout: Story = {
  name: "SRS Management",
  args: {
    headerTheme: "dark",
    headerSize: "compact",
    footerTheme: "light",
    notiCount: 1,
  },
  render: (args) => sdpSrsManagementLayoutSample(args),
}

export const SDPMyTaskLayout: Story = {
  name: "My Task",
  args: {
    headerTheme: "dark",
    headerSize: "compact",
    footerTheme: "light",
    notiCount: 1,
  },
  render: (args) => sdpMyTaskLayoutSample(args),
}

export const SDPSRSDetailLayout: Story = {
  name: "SRS 상세 페이지",
  args: {
    headerTheme: "dark",
    headerSize: "compact",
    footerTheme: "light",
    notiCount: 1,
  },
  render: (args) => sdpSrsDetailLayoutSample(args),
}

export const SDPFunctionDetailLayout: Story = {
  name: "Function 상세 페이지",
  args: {
    headerTheme: "dark",
    headerSize: "compact",
    footerTheme: "light",
    notiCount: 1,
  },
  render: (args) => sdpFunctionDetailLayoutSample(args),
}

export const SDPErsManagementLayout: Story = {
  name: "ERS Management",
  args: {
    headerTheme: "dark",
    headerSize: "compact",
    footerTheme: "light",
    notiCount: 1,
  },
  render: (args) => sdpErsManagementLayoutSample(args),
}

export const SDPFunctionManagementLayout: Story = {
  name: "Function Management",
  args: {
    headerTheme: "dark",
    headerSize: "compact",
    footerTheme: "light",
    notiCount: 1,
  },
  render: (args) => sdpFunctionManagementLayoutSample(args),
}

export const SDPComplianceMatrixLayout: Story = {
  name: "Compliance Matrix",
  args: {
    headerTheme: "dark",
    headerSize: "compact",
    footerTheme: "light",
    notiCount: 1,
  },
  render: (args) => sdpComplianceMatrixLayoutSample(args),
}
