import {
  collapsedLNBLayoutExample,
  simpleTreeLayoutExample,
  StandardLayoutSample,
  TwoLineHeaderLayoutExample,
} from "@/stories/data/layoutExample"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { hideOnControls, rangeControl } from "./utils"

const meta: Meta = {
  title: "Layouts/Layout Examples",
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
export const StandardLayout: Story = {
  args: {
    headerTheme: "dark",
    headerSize: "cozy",
    footerTheme: "light",
    hideLnb: false,
    notiCount: 1,
  },

  name: "표준 레이아웃",

  render: (args) => StandardLayoutSample(args),
}

/**
 * Header가 2단 모드로 구성된 레이아웃입니다.
 * 상단에는 로고, GNB, 유틸리티가 배치되고, 하단에는 탭이 배치됩니다.
 */
export const TwoLineHeaderLayout: Story = {
  name: "2단 헤더 레이아웃",
  args: {
    headerTheme: "dark",
    headerSize: "cozy",
    footerTheme: "light",
    footerSize: "compact",
    hideLnb: false,
    notiCount: 1,
  },
  argTypes: {
    size: hideOnControls,
    headerTheme: hideOnControls,
    footerTheme: hideOnControls,
  },
  render: (args) => TwoLineHeaderLayoutExample(args),
}

/**
 * LNB를 숨긴 상태의 레이아웃입니다. 모바일이나 좁은 화면에서 사용됩니다.
 */
export const CollapsedLNBLayout: Story = {
  name: "LNB 숨김 레이아웃",
  args: {
    headerTheme: "light",
    headerSize: "compact",
    footerTheme: "light",
    hideLnb: true,
    notiCount: 1,
  },
  render: (args) => collapsedLNBLayoutExample(args),
}

/**
 * 트리 구조만 사용하는 간단한 레이아웃입니다.
 */
export const SimpleTreeLayout: Story = {
  name: "심플 트리 레이아웃",
  args: {
    headerTheme: "light",
    footerTheme: "light",
    notiCount: 1,
  },
  render: (args) => simpleTreeLayoutExample(args),
}
