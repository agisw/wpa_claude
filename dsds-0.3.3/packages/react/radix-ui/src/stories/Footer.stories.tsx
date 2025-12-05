import React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Footer, FooterProps } from "@/components/ui"

import { hideOnControls, radioControl } from "./utils"

// Storybook 메타 정보 정의
const meta = {
  title: "Layouts/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  // props 컨트롤을 위한 argTypes 정의
  argTypes: {
    items: hideOnControls,
    theme: radioControl(["light", "dark"]),
    size: radioControl(["compact", "cozy"]),
    align: radioControl(["center", "right"]),
    children: {
      table: {
        disable: true,
      },
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

const defaultArgs: FooterProps = {
  theme: "light",
  align: "right",
  size: "compact",
}

// --- 스토리 정의 ---

/**
 * 이 스토리는 `items` prop을 사용하여 Footer를 구성하는 가장 기본적인 방법입니다.
 * 데이터 기반으로 Footer를 생성하여 일관성을 유지하고 API 연동을 쉽게 만듭니다.
 */
export const Default: Story = {
  args: {
    ...defaultArgs,
    items: [
      { type: "text", content: "Textinputplace" },
      { type: "divider" },
      { type: "text", content: "Textinputplace" },
      { type: "button", content: "개인정보 처리방침" },
      { type: "link", href: "#privacy", content: "이용약관" },
      { type: "copyright" },
    ],
  },
}

/**
 * 중앙 정렬된 Footer입니다.
 */
export const CenterAlign: Story = {
  name: "중앙 정렬",
  args: {
    ...(Default.args || {}),
    align: "center",
  },
}

/**
 * [QA용] 버튼 Hover 상태
 */
export const TextButtonHover: Story = {
  tags: ["!dev"],
  args: {
    ...(CenterAlign.args || {}),
    className: "[&_button]:text-footer-button-hover!",
  },
}

/**
 * [QA용] 버튼 Disabled 상태
 */
export const TextButtonDisabled: Story = {
  tags: ["!dev"],
  args: {
    ...(CenterAlign.args || {}),
    className: "[&_button]:text-footer-button-disabled!",
  },
}

/**
 * Cozy 사이즈를 적용한 Footer입니다.
 */
export const CozySize: Story = {
  name: "Cozy 사이즈",
  args: {
    ...(Default.args || {}),
    size: "cozy",
  },
  argTypes: {
    size: hideOnControls,
    align: hideOnControls,
  },
  decorators: [
    (Story: React.ComponentType<Story>, context) => (
      <div className="flex w-full flex-col gap-4">
        <Story />
        <Story args={{ ...context.args, align: "center" }} />
      </div>
    ),
  ],
}

/**
 * 버튼 Disabled 상태
 */
export const DisabledTextButton: Story = {
  name: "비활성화된 버튼",
  args: {
    ...(Default.args || {}),
    items: (Default.args?.items || []).map((it) => (it.type === "button" ? { ...it, props: { disabled: true } } : it)),
  },
}

/**
 * 이 스토리는 `children`을 직접 전달하여 커스텀 레이아웃을 구성하는 방법을 보여줍니다.
 * `Footer.Text`, `Footer.Link` 같은 컴파운드 컴포넌트를 사용하여 더 높은 자유도를 가집니다.
 */
export const CustomLayout: Story = {
  name: "커스텀 레이아웃",
  args: {
    ...defaultArgs,
  },
  render: (args: FooterProps) => (
    <Footer {...args}>
      <Footer.Copyright>2025 Samsung</Footer.Copyright>
      <Footer.Divider />
      <Footer.Link href="/privacy">개인정보 처리 방침</Footer.Link>
      <Footer.Link href="/terms">이용약관</Footer.Link>
      <Footer.Divider />
      <Footer.Button onClick={() => console.log("Settings clicked")}>설정</Footer.Button>
    </Footer>
  ),
}

/**
 * Dark 테마를 적용한 Footer입니다.
 */
export const DarkTheme: Story = {
  name: "다크 테마",
  args: {
    ...defaultArgs,
    theme: "dark",
    items: [
      { type: "button", content: "⚙️ 설정" },
      { type: "divider" },
      { type: "button", content: "개인정보 처리 방침" },
      { type: "link", href: "/terms", content: "이용약관" },
      { type: "copyright", content: "2025 Samsung" },
    ],
  },
}

/**
 * 다양한 타입의 아이템들을 포함한 Footer입니다.
 */
export const AllItemTypes: Story = {
  name: "모든 아이템 타입",
  args: {
    ...defaultArgs,
    items: [
      { type: "copyright", content: "2025 Samsung" },
      { type: "link", href: "/privacy", content: "개인정보 처리 방침" },
      { type: "link", href: "/terms", content: "이용약관" },
      { type: "divider" },
      {
        type: "button",
        content: "고객센터",
        props: { onClick: () => console.log("고객센터 clicked") },
      },
      { type: "divider" },
      {
        type: "custom",
        content: <span style={{ color: "#007bff", fontWeight: "bold" }}>Custom Component</span>,
      },
    ],
  },
}

/**
 * Footer 너비 제한을 확인하기 위한 스토리입니다.
 * 데코레이터를 사용하여 다양한 너비 컨테이너에서 Footer의 동작을 확인합니다.
 */
export const WidthConstraints: Story = {
  name: "너비 제한 테스트",
  args: {
    ...Default.args,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div>
        <div className="mb-4 bg-gray-100 p-4">
          <h3 className="mb-2 text-lg font-bold">1920px 이상 컨테이너 (공백 생성)</h3>
          <div className="w-[2000px] border-2 border-red-200">
            <Story />
          </div>
        </div>
        <div className="mb-4 bg-gray-100 p-4">
          <h3 className="mb-2 text-lg font-bold">1200px 미만 컨테이너 (잘림)</h3>
          <div className="w-[1000px] overflow-hidden border-2 border-blue-200">
            <Story />
          </div>
        </div>
        <div className="mb-4 bg-gray-100 p-4">
          <h3 className="mb-2 text-lg font-bold">정상 범위 (1200px-1920px)</h3>
          <div className="w-[1500px] border-2 border-green-200">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: { disable: true },
  },
}
