import { useCallback, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { cn } from "@/lib/utils"
import { ConfidentialIcon, ExternalIcon, GearIcon } from "@/components/icons"
import { Header, HeaderButton, HeaderItem, HeaderProps, useHeaderTabsContext } from "@/components/ui"

import { booleanControl, hideOnControls, radioControl } from "../utils"

// Storybook 메타 정보 정의
const meta = {
  title: "Layouts/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  // props 컨트롤을 위한 argTypes 정의
  argTypes: {
    logo: {
      control: "text",
      description: "로고 영역에 표시될 텍스트 또는 ReactNode입니다.",
    },
    logoAs: hideOnControls,
    gnb: hideOnControls,
    utility: hideOnControls,
    tabs: hideOnControls,
    activeTab: {
      control: "text",
      description: "현재 활성화된 탭의 value입니다.",
    },
    onTabSelect: hideOnControls,
    theme: radioControl(["light", "dark"]),
    size: {
      control: { type: "radio" },
      options: ["compact", "cozy"],
    },
    withTabs: booleanControl,
    // children은 고급 사용법이므로 컨트롤 패널에서 숨깁니다.
    sticky: hideOnControls,
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
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

const defaultArgs: HeaderProps = {
  logo: "LogoTitle",
}

// --- 스토리 정의 ---

/**
 * 이 스토리는 `logo`과 `items` prop을 사용하여 헤더를 구성하는 가장 기본적인 방법입니다.
 * 데이터 기반으로 헤더를 생성하여 일관성을 유지하고 API 연동을 쉽게 만듭니다.
 */
export const Default: Story = {
  args: {
    ...defaultArgs,
    gnb: [
      { type: "tenant", content: "Tenant", items: [{ content: "Tenant1", value: "tenant1" }] },
      { type: "divider" },
      { type: "searchbox" },
      { type: "button", content: "Button" },
      { type: "menu", content: "Menu", items: [{ content: "Docs", value: "docs" }] },
    ],
    utility: [
      { type: "searchbox" },
      { type: "button", content: "알림", props: { notiCount: 1 } },
      { type: "button", content: "S-VOC" },
      { type: "button", content: "Q&A" },
      { type: "button", content: "Helpdesk" },
      { type: "divider" },
      {
        type: "custom",
        content: (
          <div className="flex items-center">
            <div className="dsds-header-button">Admin</div>
            <HeaderButton className="ml-[-4px]" icon={<GearIcon />} iconOption="after">
              이삼성
            </HeaderButton>
          </div>
        ),
      },
      { type: "custom", content: <ConfidentialIcon color="dark" />, props: { className: "mr-1" } },
      { type: "divider" },
      { type: "hamburger", props: { onClick: () => console.log("Hamburger clicked") } },
    ],
  },
}

/**
 * [QA] Default States
 */
export const DefaultStates: Story = {
  tags: ["!dev"],
  args: {
    ...(Default.args || {}),
    logo: undefined,
    gnb: [
      { type: "custom", content: <div className="mr-2 font-bold!">[GNB]</div> },
      { type: "tenant", content: "Tenant", items: [{ content: "Tenant1", value: "tenant1" }] },
      { type: "divider" },
      { type: "button", content: "Button" },
      { type: "divider" },
      { type: "menu", content: "Menu", items: [{ content: "Docs", value: "docs" }] },
      { type: "divider" },
      { type: "searchbox" },
    ],
    utility: [
      { type: "custom", content: <div className="mx-2 font-bold!">[Utility]</div> },
      { type: "menu", content: "Menu", items: [{ content: "Docs", value: "docs" }] },
      { type: "divider" },
      { type: "button", content: "Button" },
      { type: "divider" },
      {
        type: "button",
        content: "Button",
        props: { badge: true },
      },
      { type: "divider" },
      { type: "button", content: "알림", props: { notiCount: 1 } },
      { type: "divider" },
      {
        type: "button",
        content: "이삼성",
        props: {
          icon: <GearIcon />,
          iconOption: "after",
          onClick: () => alert("Settings clicked"),
        },
      },
      { type: "divider" },
      { type: "hamburger", props: { onClick: () => console.log("Hamburger clicked") } },
    ],
    className: "max-w-[1000px]! min-w-[1000px]!",
  },
  argTypes: {
    size: hideOnControls,
  },
  decorators: [
    (Story: React.ComponentType<Story>, context) => {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <h3 className="text-marker min-w-16">Default</h3>
            <Story args={{ ...context.args }} />
          </div>
          <div className="flex items-center">
            <h3 className="text-marker min-w-16">Hover</h3>
            <Story
              args={{
                ...context.args,
                className: cn(
                  "[&_.dsds-header-gnb_.dsds-header-menu]:bg-header-menu-hover!",
                  "[&_.dsds-header-gnb_.dsds-header-button]:bg-header-menu-hover!",
                  "[&_.dsds-header-searchbox_.box-wrapper]:header-searchbox-hover!",
                  "[&_.dsds-header-utility_.header-button-label]:underline!",
                  "[&_.dsds-header-utility_.dsds-header-hamburger]:dsds-icon-hover!",
                  context.args.className
                ),
              }}
            />
          </div>
          <div className="flex items-center">
            <h3 className="text-marker min-w-16">Focus</h3>
            <Story
              args={{
                ...context.args,
                className: cn(
                  "[&_.dsds-header-gnb_.dsds-header-menu]:bg-header-menu-hover! [&_.dsds-header-gnb_.dsds-header-menu]:outline-ring-inner!",
                  "[&_.dsds-header-gnb_.dsds-header-button]:bg-header-menu-hover!",
                  "[&_.dsds-header-gnb_.dsds-header-menu]:outline-ring-inner!",
                  "[&_.dsds-header-gnb_.dsds-header-button]:outline-ring-inner!",
                  "[&_.dsds-header-searchbox_.box-wrapper]:header-searchbox-focus!",
                  "[&_.dsds-header-utility_.header-button-label]:underline!",
                  "[&_.dsds-header-utility_.dsds-header-menu]:outline-ring-inner!",
                  "[&_.dsds-header-utility_.dsds-header-button]:outline-ring-inner!",
                  "[&_.dsds-header-utility_.dsds-header-icon-button]:dsds-icon-focus!",
                  context.args.className
                ),
              }}
            />
          </div>
          <div className="flex items-center">
            <h3 className="text-marker min-w-16">Disabled</h3>
            <Story
              args={{
                ...context.args,
                gnb: context.args.gnb?.map((it) =>
                  ["tenant", "button", "menu", "searchbox"].includes(it.type)
                    ? { ...it, disabled: true, props: { ...it.props, disabled: true } }
                    : it
                ) as HeaderItem[],
                utility: context.args.utility?.map((it) =>
                  ["button", "menu", "searchbox", "hamburger"].includes(it.type)
                    ? { ...it, disabled: true, props: { ...it.props, disabled: true } }
                    : it
                ) as HeaderItem[],
                className: cn(context.args.className),
              }}
            />
          </div>
        </div>
      )
    },
  ],
}

/**
 * [QA] Default States (Dark)
 */
export const DarkStates: Story = {
  ...DefaultStates,
  args: {
    ...(DefaultStates.args || {}),
    theme: "dark",
  },
}

/**
 * [QA] Default + Dark Header
 */
export const DefaultDark: Story = {
  tags: ["!dev"],
  args: {
    ...(Default.args || {}),
    theme: "dark",
  },
  argTypes: {
    size: hideOnControls,
    theme: hideOnControls,
  },
}

/**
 * Cozy 사이즈를 적용한 Header입니다.
 */
export const CozySize: Story = {
  name: "Cozy 사이즈",
  args: {
    ...(Default.args || {}),
    size: "cozy",
  },
  argTypes: {
    size: hideOnControls,
    theme: hideOnControls,
  },
}

/**
 * Cozy 사이즈를 적용한 Header입니다.
 */
export const CozyDark: Story = {
  tags: ["!dev"],
  args: {
    ...(Default.args || {}),
    size: "cozy",
    theme: "dark",
  },
  argTypes: {
    size: hideOnControls,
    theme: hideOnControls,
  },
}

/**
 * 커스텀 레이아웃으로 Header.GNB와 Header.Utility를 사용하는 방법을 보여줍니다.
 */
export const CustomLayoutWithGNBUtility: Story = {
  name: "커스텀 레이아웃 (GNB / Utility)",
  args: {
    ...defaultArgs,
  },
  render: (args) => (
    <Header {...args}>
      <Header.Logo>LogoTitle</Header.Logo>
      <Header.GNB>
        <Header.Tenant items={[{ content: "Memory", value: "memory" }]}>Tenant</Header.Tenant>
        <Header.Divider />
        <Header.Menu items={[{ content: "문서", value: "docs" }]}>Menu</Header.Menu>
        <Header.Menu items={[{ content: "가이드", value: "guide" }]}>가이드</Header.Menu>
      </Header.GNB>
      <Header.Utility>
        <Header.Button>알림</Header.Button>
        <Header.Button>도움말</Header.Button>
        <Header.Divider />
        <Header.Image src="https://github.com/shadcn.png" alt="User Avatar" />
        <Header.HamburgerMenu />
      </Header.Utility>
    </Header>
  ),
}

/**
 * `items`나 `children` 없이 `logo`만 전달했을 때의 모습입니다.
 */
export const LogoOnly: Story = {
  name: "로고만 있는 경우",
  args: {
    ...defaultArgs,
  },
}

/**
 * 이 스토리는 `children`을 직접 전달하여 커스텀 레이아웃을 구성하는 방법을 보여줍니다.
 * `Header.Menu`, `Header.Button` 같은 컴파운드 컴포넌트를 사용하여 더 높은 자유도를 가집니다.
 */
export const CustomLayout_NoVisualRegression: Story = {
  name: "커스텀 레이아웃",
  args: {
    ...defaultArgs,
  },
  render: (args) => (
    <>
      <style>
        {`
          .rainbow-text {
            background: linear-gradient(
              90deg, #ff0000, #ff8000, #0080ff, #0000ff, #ff00ff, #ff0000
            );
            background-size: 200% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: rainbow-animation 3s linear infinite;
          }

          @keyframes rainbow-animation {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
        `}
      </style>
      <Header {...args}>
        <div className="rounded-md border-2 border-blue-300 font-bold" data-testid="custom-logo">
          <div className="rounded-md border-4 border-red-100">
            <span className="rainbow-text">My Custom Logo</span>
          </div>
        </div>
        <div className="flex-grow" />
        <div className="flex items-center gap-4" data-testid="custom-gnb" role="group" aria-label="custom gnb">
          <Header.Menu items={[{ content: "Home", value: "home" }]}>Home</Header.Menu>
          <Header.Menu items={[{ content: "About", value: "about" }]}>Home</Header.Menu>
          <Header.Divider />
          <ConfidentialIcon color="red" className="mr-1" />
          <Header.Button>Login</Header.Button>
        </div>
      </Header>
    </>
  ),
}

/**
 * GNB와 Utility props를 사용하여 Header를 구성하는 방법을 보여줍니다.
 * 이는 기존 items prop보다 더 구조화된 방식으로 Header를 정의합니다.
 */
export const WithGNBAndUtility: Story = {
  name: "GNB와 Utility 사용",
  args: {
    ...defaultArgs,
    gnb: [
      {
        type: "tenant",
        content: "Tenant",
        items: [{ content: "Tenant1", value: "tenant1" }],
        props: {
          onClick: () => console.log("Tenant clicked"),
        },
      },
      { type: "divider" },
      {
        type: "menu",
        content: "문서",
        items: [{ content: "문서1", value: "doc1" }],
        props: {
          onClick: () => console.log("문서 menu clicked"),
        },
      },
      {
        type: "menu",
        content: "가이드",
        items: [{ content: "가이드1", value: "guide1" }],
        props: {
          onClick: () => console.log("가이드 menu clicked"),
        },
      },
    ],
    utility: [
      { type: "searchbox" },
      {
        type: "button",
        content: "알림",
        props: {
          onClick: () => console.log("알림 clicked"),
          "data-noti-count": "3",
        } as React.ButtonHTMLAttributes<HTMLButtonElement>,
      },
      {
        type: "button",
        content: "업데이트",
        props: {
          onClick: () => console.log("업데이트 clicked"),
          "data-badge": "true",
        } as React.ButtonHTMLAttributes<HTMLButtonElement>,
      },
      { type: "divider" },
      {
        type: "image",
        props: {
          src: "https://github.com/shadcn.png",
          alt: "User Avatar",
        },
      },
      {
        type: "hamburger",
        props: {
          onClick: () => console.log("Hamburger menu clicked"),
        },
      },
    ],
  },
}

/**
 * Cozy 사이즈에서 2단 모드를 사용하는 예제입니다.
 * 상단에는 logo, gnb, utility가 있고 하단에는 탭이 표시됩니다.
 *
 * ### 2단 모드 활성화 조건:
 * - `withTabs`
 * - `tabs` 배열이 제공되어야 함
 *
 * ### 개선된 API:
 * - `activeTab` prop으로 현재 활성 탭을 지정
 * - `onTabSelect` 콜백으로 탭 선택 이벤트 처리
 * - tabs 배열에는 기존 HeaderItem 타입들(menu, button, link 등)을 재사용
 * - props.value로 각 탭의 식별자를 지정
 *
 * 2단 모드에서는 pt-[11px] px-[20px] pb-0 스타일이 적용되며,
 * 활성 탭은 하단에 흰색 선으로 강조됩니다.
 */
export const WithTabs: Story = {
  name: "2단 모드",
  decorators: [
    (Story, context) => {
      const [activeTab, setActiveTab] = useState(context.args.activeTab || "favorite-dashboard")
      const handleTabSelect = useCallback((value: string) => {
        console.log("Tab selected:", value)
        setActiveTab(value)
      }, [])

      return (
        <div className="h-full w-full flex-col items-start">
          <Story args={{ ...context.args, onTabSelect: handleTabSelect, activeTab }} />
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-gray-500">탭을 선택하면 해당 탭에 대한 콘텐츠가 표시됩니다.</p>
            <p className="mt-2">
              활성 탭: <span className="font-bold">{activeTab}</span>
            </p>
          </div>
        </div>
      )
    },
  ],
  args: {
    ...defaultArgs,
    withTabs: true,
    activeTab: "favorite-dashboard",
    gnb: [
      {
        type: "tenant",
        content: "Tenant",
        items: [
          { content: "Memory", value: "memory" },
          { content: "Foundry", value: "foundry" },
        ],
      },
      { type: "divider" },
      {
        type: "menu",
        content: "Menu",
        items: [
          { content: "웨이퍼", value: "wafer" },
          { content: "테스트", value: "test" },
        ],
      },
    ],
    utility: [
      { type: "searchbox" },
      {
        type: "button",
        content: "알림",
        props: { notiCount: 1 },
      },
      { type: "divider" },
      {
        type: "image",
        props: {
          src: "https://github.com/shadcn.png",
          alt: "User Avatar",
        },
      },
    ],
    tabs: [
      {
        type: "menu",
        content: "즐겨찾기 ☆",
        items: [
          { content: "대시보드", value: "favorite-dashboard" },
          { content: "주요 리포트", value: "favorite-reports" },
          { content: "자주 사용하는 분석", value: "favorite-analytics" },
          { content: "개인 설정", value: "favorite-settings" },
        ],
      },
      { type: "divider" },
      {
        type: "menu",
        content: "업무함",
        items: [
          { content: "대기중인 작업", value: "inbox-tasks" },
          { content: "승인 요청", value: "inbox-approvals" },
          { content: "알림함", value: "inbox-notifications" },
          { content: "완료된 작업", value: "inbox-completed" },
        ],
      },
      {
        type: "menu",
        content: "서비스",
        items: [
          { content: "웨이퍼 관리", value: "service-wafer" },
          { content: "테스트 시스템", value: "service-test" },
          { content: "품질 관리", value: "service-quality" },
          { content: "생산 계획", value: "service-production" },
        ],
      },
      {
        type: "menu",
        content: "설정",
        items: [
          { content: "일반 설정", value: "setting-general" },
          { content: "사용자 관리", value: "setting-users" },
          { content: "권한 설정", value: "setting-permissions" },
          { content: "시스템 설정", value: "setting-system" },
        ],
      },
      { type: "button", content: "새창", props: { value: "new-window", icon: <ExternalIcon />, iconOption: "after" } },
    ],
    onTabSelect: (value: string) => console.log("Tab selected:", value),
  },
}

/**
 * 커스텀 레이아웃으로 2단 모드를 구현하는 예제입니다.
 * 기존 Header 컴포넌트들(Button, Menu 등)을 재사용하여 탭을 구현합니다.
 */
export const CustomTwoLineLayout: Story = {
  name: "커스텀 2단 레이아웃",
  args: {
    ...defaultArgs,
    withTabs: true,
  },
  render: (args) => (
    <Header {...args} className="header-theme-dark flex flex-col">
      <div className="flex w-full items-center">
        <Header.Logo>MyApp</Header.Logo>
        <Header.GNB>
          <Header.Tenant items={[{ content: "기흥캠퍼스", value: "giheung" }]}>기흥캠퍼스</Header.Tenant>
          <Header.Divider />
          <Header.Menu items={[{ content: "제품 관리", value: "products" }]}>제품</Header.Menu>
          <Header.Menu items={[{ content: "공정 관리", value: "process" }]}>공정</Header.Menu>
        </Header.GNB>
        <Header.Utility>
          <Header.Searchbox placeholder="검색..." />
          <Header.Button badge>업데이트</Header.Button>
          <Header.Divider />
          <Header.Image src="https://github.com/shadcn.png" alt="User" />
        </Header.Utility>
      </div>
      <Header.Tabs className="w-full">
        <Header.Button className="header-tab-active" onClick={() => console.log("Overview")}>
          개요
        </Header.Button>
        <Header.Button onClick={() => console.log("Monitoring")}>모니터링</Header.Button>
        <Header.Button onClick={() => console.log("Analysis")}>분석</Header.Button>
        <Header.Button disabled onClick={() => console.log("Reports")}>
          리포트
        </Header.Button>
      </Header.Tabs>
    </Header>
  ),
}

/**
 * useHeaderTabsContext 훅을 사용하여 Header.Tabs 내부에 있는지 감지하는 예제입니다.
 * 탭 내부에서는 특별한 스타일이 적용됩니다.
 */
export const TabsContextDemo: Story = {
  name: "탭 컨텍스트 데모",
  args: {
    ...defaultArgs,
    size: "cozy",
  },
  render: (args) => {
    const CustomComponent = ({ children }: { children: React.ReactNode }) => {
      const isInTabs = useHeaderTabsContext()
      return (
        <div
          className={`w-full rounded border p-1 !px-1 font-sans text-sm ${
            isInTabs
              ? "absolute h-[28px] border-blue-300 bg-blue-100 text-center text-blue-800"
              : "border-gray-300 bg-gray-100 text-gray-800"
          }`}
        >
          {children} {isInTabs ? "(탭 내부)" : "(일반 영역)"}
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <Header {...args}>
          <div className="flex w-full items-center">
            <Header.Logo>MyApp</Header.Logo>
            <Header.GNB>
              <CustomComponent>GNB 영역의 컴포넌트</CustomComponent>
            </Header.GNB>
            <Header.Utility className="ml-1! flex-1">
              <CustomComponent>Utility 영역의 컴포넌트</CustomComponent>
            </Header.Utility>
          </div>
          {args.withTabs && (
            <Header.Tabs>
              <CustomComponent>탭 영역의 컴포넌트</CustomComponent>
              <Header.Button>탭 버튼 1</Header.Button>
              <Header.Button>탭 버튼 2</Header.Button>
            </Header.Tabs>
          )}
        </Header>
        <div className="p-4">
          <CustomComponent>Header 외부의 컴포넌트</CustomComponent>
        </div>
      </div>
    )
  },
}

// --- 실험 기능 스토리 ---

/**
 * `variant="sticky"` prop의 동작을 확인하기 위한 스토리입니다.
 * 데코레이터를 사용하여 스크롤 가능한 영역을 추가했습니다.
 */
export const Sticky_NoVisualRegression: Story = {
  name: "[실험중] Sticky Header",
  args: {
    ...Default.args, // Default 스토리의 props를 재사용합니다.
    sticky: true,
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="bg-muted mt-[50vh] flex h-[150vh] flex-col gap-4 p-8 pt-10">
          <p className="h-[50px] bg-red-300">Scroll down to see the sticky effect.</p>
          <p className="h-[50px] bg-blue-300">Scroll down to see the sticky effect.</p>
          <p className="h-[50px] bg-green-300">Scroll down to see the sticky effect.</p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: { disable: true },
  },
}
