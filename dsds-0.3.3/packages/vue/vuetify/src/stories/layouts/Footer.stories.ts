import { h } from "vue"
import type { Meta, StoryObj } from "@storybook/vue3-vite"

import {
  Footer,
  type FooterProps,
  type FooterItem,
  FooterButton,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterText,
} from "@/components/ui"
import { hideOnControls, radioControl } from "@/stories/utils"

const meta = {
  title: "Layouts/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
DSDS 디자인 시스템의 Footer 컴포넌트로, 페이지 하단에 브랜드 정보, 링크, 버튼 등을 표시합니다.

## 주요 특징

- **데이터 기반 구성**: items prop을 통해 선언적으로 푸터 구성
- **커스텀 레이아웃**: children slot을 활용한 유연한 커스터마이징
- **다양한 아이템 타입**: 텍스트, 버튼, 링크, 저작권, 구분선, 커스텀 컴포넌트 지원
- **테마 지원**: light/dark 테마
- **크기 옵션**: compact/cozy 사이즈 제공
- **정렬 옵션**: left/center/right 정렬 지원
- **유동형 레이아웃**: fluid prop으로 컨테이너 폭 제어

## 사용 시나리오

- 페이지 하단 브랜드/저작권 정보
- 약관, 개인정보 처리 방침 링크
- 고객 지원 버튼
- 기타 사이트 링크 모음

## Props

### items
- **타입**: FooterItem[]
- **설명**: 푸터에 표시할 아이템 배열 (text, button, link, copyright, divider, custom)

### theme
- **타입**: 'light' | 'dark'
- **기본값**: 'light'
- **설명**: 푸터 테마

### size
- **타입**: 'compact' | 'cozy'
- **기본값**: 'compact'
- **설명**: 푸터 높이 및 내부 패딩

### align
- **타입**: 'left' | 'center' | 'right'
- **기본값**: 'right'
- **설명**: 푸터 콘텐츠 정렬 방식

### fluid
- **타입**: boolean
- **기본값**: false
- **설명**: true일 때 컨테이너 폭을 그대로 사용 (반응형 최소 폭 비활성화)

### tag
- **타입**: keyof HTMLElementTagNameMap
- **기본값**: 'footer'
- **설명**: 렌더링할 HTML 태그

## FooterItem 타입

\`\`\`typescript
type FooterItem =
  | { type: 'text'; content: VNodeChild; props?: HTMLAttributes }
  | { type: 'button'; content: VNodeChild; props?: FooterButtonProps & HTMLAttributes }
  | { type: 'link'; href: string; content: VNodeChild; props?: AnchorHTMLAttributes }
  | { type: 'copyright'; content?: VNodeChild; props?: HTMLAttributes }
  | { type: 'divider'; props?: HTMLAttributes }
  | { type: 'custom'; content: VNodeChild; props?: HTMLAttributes }
\`\`\`

## Slots

- **default**: 커스텀 레이아웃 컨텐츠 (items가 없을 때)
        `,
      },
      codePanel: true,
    },
  },
  argTypes: {
    items: {
      description: "푸터에 표시할 아이템 배열",
      table: { disable: true },
    },
    theme: radioControl(["light", "dark"]),
    size: radioControl(["compact", "cozy"]),
    align: radioControl(["right", "center", "left"]),
    class: {
      table: { disable: true },
    },
    fluid: {
      control: "boolean",
      description: "컨테이너 폭을 그대로 사용 (반응형 최소 폭 비활성화)",
    },
  },
} satisfies Meta<typeof Footer>

export default meta

type Story = StoryObj<typeof meta>

export const defaultFooterItems: FooterItem[] = [
  { type: "text", content: "Textinputplace" },
  { type: "divider" },
  { type: "text", content: "Textinputplace" },
  { type: "button", content: "개인정보 처리방침" },
  { type: "link", href: "#privacy", content: "이용약관" },
  { type: "copyright" },
]

const defaultArgs: FooterProps = {
  theme: "light",
  align: "right",
  size: "compact",
  items: [...defaultFooterItems],
}

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
}

export const CenterAlign: Story = {
  name: "중앙 정렬",
  args: {
    ...defaultArgs,
    align: "center",
  },
}

export const TextButtonHover: Story = {
  tags: ["!dev"],
  args: {
    ...CenterAlign.args,
    class: "[&_.dsds-footer-button]:text-footer-button-hover!",
  },
}

export const TextButtonDisabled: Story = {
  tags: ["!dev"],
  args: {
    ...CenterAlign.args,
    class: "[&_.dsds-footer-button]:text-footer-button-disabled!",
  },
}

export const CozySize: Story = {
  name: "Cozy 사이즈",
  args: {
    ...defaultArgs,
    size: "cozy",
  },
  argTypes: {
    size: hideOnControls,
    align: hideOnControls,
  },
  decorators: [
    (Story, context) => ({
      components: { Story },
      setup() {
        return { args: context.args }
      },
      template: `
        <div class="flex w-full flex-col gap-4">
          <story :args="{ ...args, size: 'compact' }" />
          <story :args="{ ...args }" />
        </div>
      `,
    }),
  ],
}

export const DisabledTextButton: Story = {
  name: "비활성화된 버튼",
  args: {
    ...defaultArgs,
    items: defaultFooterItems.map((item) =>
      item.type === "button"
        ? {
            ...item,
            props: { ...item.props, disabled: true },
          }
        : item
    ),
  },
}

export const CustomLayout: Story = {
  name: "커스텀 레이아웃",
  args: {
    ...defaultArgs,
    items: undefined,
  },
  render: (args) => ({
    components: { Footer, FooterButton, FooterCopyright, FooterDivider, FooterLink, FooterText },
    setup() {
      return { args }
    },
    template: `
      <Footer v-bind="args">
        <FooterCopyright>2025 Samsung</FooterCopyright>
        <FooterDivider />
        <FooterLink href="/privacy">개인정보 처리 방침</FooterLink>
        <FooterLink href="/terms">이용약관</FooterLink>
        <FooterDivider />
  <FooterButton @click="console.log('설정 클릭')">설정</FooterButton>
      </Footer>
    `,
  }),
}

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
        content: h("span", { class: "text-blue-500 font-semibold" }, "Custom Component"),
      },
    ],
  },
}

export const WidthConstraints: Story = {
  name: "너비 제한 테스트",
  args: {
    ...defaultArgs,
  },
  decorators: [
    (Story) => ({
      components: { Story },
      template: `
        <div class="space-y-4">
          <div class="bg-gray-100 p-4">
            <h3 class="mb-2 text-lg font-bold">1920px 이상 컨테이너 (공백 생성)</h3>
            <div class="w-[2000px] border-2 border-red-200">
              <Story />
            </div>
          </div>
          <div class="bg-gray-100 p-4">
            <h3 class="mb-2 text-lg font-bold">1200px 미만 컨테이너 (잘림)</h3>
            <div class="w-[1000px] overflow-hidden border-2 border-blue-200">
              <Story />
            </div>
          </div>
          <div class="bg-gray-100 p-4">
            <h3 class="mb-2 text-lg font-bold">정상 범위 (1200px-1920px)</h3>
            <div class="w-[1500px] border-2 border-green-200">
              <Story />
            </div>
          </div>
        </div>
      `,
    }),
  ],
  parameters: {
    docs: { disable: true },
  },
}
