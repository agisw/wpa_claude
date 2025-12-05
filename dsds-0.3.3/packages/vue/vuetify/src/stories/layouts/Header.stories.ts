import Header from "@/components/ui/header/Header.vue"
import HeaderButton from "@/components/ui/header/HeaderButton.vue"
import HeaderDivider from "@/components/ui/header/HeaderDivider.vue"
import HeaderGNB from "@/components/ui/header/HeaderGNB.vue"
import HeaderImage from "@/components/ui/header/HeaderImage.vue"
import HeaderLogo from "@/components/ui/header/HeaderLogo.vue"
import HeaderMenu from "@/components/ui/header/HeaderMenu.vue"
import HeaderTenant from "@/components/ui/header/HeaderTenant.vue"
import HeaderUtility from "@/components/ui/header/HeaderUtility.vue"
import { booleanControl } from "@/stories/utils"
import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref } from "vue"

/* ---------------------------
   Reusable template snippets
--------------------------- */

// Basic usage with data props
const TPL_DEFAULT = `
<Header
  :logo="args.logo"
  :gnb="gnb"
  :utility="utility"
  :theme="args.theme"
  :size="args.size"
  :active-tab="activeTab"
  @tab-select="onTabSelect"
/>
`.trim()

// Custom layout with GNB and Utility
const TPL_CUSTOM_GNB_UTILITY = `
<Header :logo="args.logo">
  <HeaderLogo>LogoTitle</HeaderLogo>
  <HeaderGNB>
    <HeaderTenant :items="tenantItems">Tenant</HeaderTenant>
    <HeaderDivider />
    <HeaderMenu :items="docItems">문서</HeaderMenu>
    <HeaderMenu :items="guideItems">가이드</HeaderMenu>
  </HeaderGNB>
  <HeaderUtility>
    <HeaderButton>알림</HeaderButton>
    <HeaderButton>도움말</HeaderButton>
    <HeaderDivider />
    <HeaderImage src="https://github.com/shadcn.png" alt="User Avatar" />
    <HeaderButton>Login</HeaderButton>
  </HeaderUtility>
</Header>
`.trim()

// Logo only
const TPL_LOGO_ONLY = `
<Header :logo="args.logo" />
`.trim()

// Custom layout
const TPL_CUSTOM_LAYOUT = `
<Header :logo="args.logo">
  <div class="custom-logo">
    <span class="rainbow-text">My Custom Logo</span>
  </div>
  <div class="flex-grow"></div>
  <div class="custom-gnb">
    <HeaderMenu :items="homeItems">Home</HeaderMenu>
    <HeaderMenu :items="aboutItems">About</HeaderMenu>
    <HeaderDivider />
    <HeaderButton>Login</HeaderButton>
  </div>
</Header>

<style scoped>
.custom-logo {
  @apply rounded-md border-2 border-blue-300 font-bold;
}

.rainbow-text {
  background: linear-gradient(90deg, #ff0000, #ff8000, #0080ff, #0000ff, #ff00ff, #ff0000);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow-animation 3s linear infinite;
}

@keyframes rainbow-animation {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.custom-gnb {
  @apply flex items-center gap-4;
}
</style>
`.trim()

// Menu interactions with selection state
const TPL_MENU_WITH_SELECTION = `
<Header :logo="args.logo">
  <HeaderLogo>LogoTitle</HeaderLogo>
  <HeaderGNB>
    <HeaderMenu v-model:selected="selected"
                :items="menuItems"
                content="서비스"
                @select="onSelect" />
  </HeaderGNB>
  <HeaderUtility>
    <HeaderButton>선택: {{ selected || '없음' }}</HeaderButton>
  </HeaderUtility>
</Header>
`.trim()

// Two line mode
const TPL_TWO_LINE = `
<div class="two-line-container">
  <Header
    :logo="args.logo"
    :gnb="gnb"
    :utility="utility"
    :tabs="tabs"
    :active-tab="activeTab"
    withTabs
    @tab-select="onTabSelect"
  />
  <div class="content-area">
    <p class="text-gray-500">탭을 선택하면 해당 탭에 대한 콘텐츠가 표시됩니다.</p>
    <p class="mt-2">
      활성 탭: <span class="font-bold">{{ activeTab }}</span>
    </p>
  </div>
</div>

<style scoped>
.two-line-container {
  @apply h-full w-full flex flex-col items-start;
}

.content-area {
  @apply flex-1 overflow-y-auto p-4;
}
</style>
`.trim()

const meta: Meta<typeof Header> = {
  title: "Layouts/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
DSDS 디자인 시스템의 Header 컴포넌트로, 데이터 기반 또는 커스텀 레이아웃으로 헤더를 구성할 수 있습니다.

## 주요 특징

- **데이터 기반 구성**: gnb, utility props를 통해 선언적으로 헤더 구성
- **커스텀 레이아웃**: children slot을 활용한 유연한 커스터마이징
- **테마 지원**: light/dark 테마 지원
- **2단 모드**: withTabs 옵션으로 탭이 포함된 2단 헤더 구성
- **반응형 메뉴**: tenant, menu, button, link, image, divider, searchbox 등 다양한 요소 지원

## 사용 시나리오

- 애플리케이션 최상단 네비게이션
- 테넌트 선택 기능
- GNB (Global Navigation Bar) 구성
- 유틸리티 메뉴 (알림, 사용자 메뉴 등)
- 멀티 레벨 메뉴 구조

## 구성 요소 (Anatomy)

![header-anatomy](/static/images/dsds/header-anatomy.png)

## Props

### gnb
- **타입**: HeaderItem[]
- **설명**: 좌측 GNB 메뉴 아이템 배열

### utility
- **타입**: HeaderItem[]
- **설명**: 우측 유틸리티 메뉴 아이템 배열

### theme
- **타입**: 'light' | 'dark'
- **기본값**: 'light'
- **설명**: 헤더 테마

### size
- **타입**: 'compact' | 'cozy'
- **기본값**: 'compact'
- **설명**: 헤더 높이 및 내부 패딩

## Events

- **tab-select**: 탭 선택 시 발생 (value: string)

## Slots

- **default**: 커스텀 레이아웃 컨텐츠
        `,
      },
      source: {
        code: true,
      },
    },
  },
  argTypes: {
    logo: {
      control: "text",
      description: "로고 영역에 표시될 텍스트입니다.",
    },
    theme: {
      control: { type: "radio" },
      options: ["light", "dark"],
      description: "헤더 테마",
    },
    size: {
      control: { type: "radio" },
      options: ["compact", "cozy"],
      description: "헤더 크기",
    },
    withTabs: booleanControl,
    gnb: {
      description: "좌측 GNB 메뉴 아이템 배열",
      table: { disable: true },
    },
    utility: {
      description: "우측 유틸리티 메뉴 아이템 배열",
      table: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs: Story["args"] = {
  logo: "LogoTitle",
  theme: "light",
  size: "compact",
}

/* ---------------------------
           Stories
--------------------------- */

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
      { type: "button", content: "알림", notiCount: 1 },
      { type: "link", content: "S-VOC", href: "/svoc" },
      { type: "link", content: "Q&A", href: "/qna" },
      { type: "divider" },
      { type: "image", src: "https://github.com/shadcn.png", alt: "User Avatar" },
      { type: "button", content: "Login" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "데이터 기반으로 헤더를 구성하는 가장 기본적인 방법입니다.",
      },
      source: {
        code: TPL_DEFAULT,
      },
    },
  },
  render: (args: Story["args"]) => ({
    components: { Header },
    setup() {
      const activeTab = ref("")
      const onTabSelect = (value: string) => console.log("Tab selected:", value)

      const gnb = ref(args?.gnb || [])
      const utility = ref(args?.utility || [])

      return { args, activeTab, onTabSelect, gnb, utility }
    },
    template: TPL_DEFAULT,
  }),
  decorators: [
    () => ({
      template: `<div class="h-screen w-full flex flex-col justify-center items-center"><story /></div>`,
    }),
  ],
}

export const CustomLayoutWithGNBUtility: Story = {
  name: "커스텀 레이아웃 (GNB / Utility)",
  args: { ...defaultArgs },
  parameters: {
    docs: {
      description: {
        story: "커스텀 레이아웃으로 Header.GNB와 Header.Utility를 사용하는 방법을 보여줍니다.",
      },
      source: {
        code: TPL_CUSTOM_GNB_UTILITY,
      },
    },
  },
  render: (args: Story["args"]) => ({
    components: {
      Header,
      HeaderLogo,
      HeaderGNB,
      HeaderTenant,
      HeaderDivider,
      HeaderMenu,
      HeaderUtility,
      HeaderButton,
      HeaderImage,
    },
    setup() {
      const tenantItems = ref([{ content: "Memory", value: "memory" }])
      const docItems = ref([{ content: "문서", value: "docs" }])
      const guideItems = ref([{ content: "가이드", value: "guide" }])

      return { args, tenantItems, docItems, guideItems }
    },
    template: TPL_CUSTOM_GNB_UTILITY,
  }),
}

export const LogoOnly: Story = {
  name: "로고만 있는 경우",
  args: { ...defaultArgs },
  parameters: {
    docs: {
      description: {
        story: "`items`나 `children` 없이 `logo`만 전달했을 때의 모습입니다.",
      },
      source: {
        code: TPL_LOGO_ONLY,
      },
    },
  },
  render: (args: Story["args"]) => ({
    components: { Header },
    setup() {
      return { args }
    },
    template: TPL_LOGO_ONLY,
  }),
}

export const CustomLayout: Story = {
  name: "커스텀 레이아웃",
  args: { ...defaultArgs },
  parameters: {
    docs: {
      description: {
        story: "`children`을 직접 전달하여 커스텀 레이아웃을 구성하는 방법을 보여줍니다.",
      },
      source: {
        code: TPL_CUSTOM_LAYOUT,
      },
    },
  },
  render: (args: Story["args"]) => ({
    components: {
      Header,
      HeaderMenu,
      HeaderDivider,
      HeaderButton,
    },
    setup() {
      const homeItems = ref([{ content: "Home", value: "home" }])
      const aboutItems = ref([{ content: "About", value: "about" }])

      return { args, homeItems, aboutItems }
    },
    template: TPL_CUSTOM_LAYOUT,
  }),
}

export const MenuWithSelection: Story = {
  name: "메뉴 선택",
  args: { ...defaultArgs },
  parameters: {
    docs: {
      description: {
        story: "`HeaderMenu`의 `v-model:selected`와 `onSelect`를 함께 사용하는 예제입니다.",
      },
      source: {
        code: TPL_MENU_WITH_SELECTION,
      },
    },
  },
  render: (args: Story["args"]) => ({
    components: {
      Header,
      HeaderLogo,
      HeaderGNB,
      HeaderMenu,
      HeaderUtility,
      HeaderButton,
    },
    setup() {
      const menuItems = ref([
        { content: "메모리 분석", value: "memory", description: "디바이스 수명 분석 리포트" },
        { content: "웨이퍼 트래킹", value: "wafer", description: "웨이퍼 제조 공정 현황" },
        { content: "테스트 결과", value: "test", description: "최신 테스트 성능 데이터" },
      ])
      const selected = ref<string | undefined>(menuItems.value[0]?.value)
      const onSelect = (value: string) => {
        selected.value = value
        console.log("Menu selected:", value)
      }

      return { args, menuItems, selected, onSelect }
    },
    template: TPL_MENU_WITH_SELECTION,
  }),
}

export const WithGNBAndUtility: Story = {
  name: "GNB와 Utility 사용",
  args: {
    ...defaultArgs,
    gnb: [
      {
        type: "tenant",
        content: "Memory",
        items: [{ content: "Tenant1", value: "tenant1" }],
      },
      { type: "divider" },
      {
        type: "menu",
        content: "문서",
        items: [{ content: "문서1", value: "doc1" }],
      },
      {
        type: "menu",
        content: "가이드",
        items: [{ content: "가이드1", value: "guide1" }],
      },
    ],
    utility: [
      { type: "searchbox" },
      { type: "button", content: "알림", notiCount: 3 },
      { type: "button", content: "업데이트", badge: true },
      { type: "divider" },
      { type: "image", src: "https://github.com/shadcn.png", alt: "User Avatar" },
      { type: "button", content: "Login" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "GNB와 Utility props를 사용하여 Header를 구성하는 방법을 보여줍니다.",
      },
      source: {
        code: TPL_DEFAULT,
      },
    },
  },
  render: (args: Story["args"]) => ({
    components: { Header },
    setup() {
      const activeTab = ref("")
      const onTabSelect = (value: string) => console.log("Tab selected:", value)

      const gnb = ref(args?.gnb || [])
      const utility = ref(args?.utility || [])

      return { args, activeTab, onTabSelect, gnb, utility }
    },
    template: TPL_DEFAULT,
  }),
}

export const WithTabs: Story = {
  name: "2단 모드 (탭 포함)",
  args: {
    ...defaultArgs,
    withTabs: true,
    gnb: [
      {
        type: "tenant",
        content: "Memory",
        items: [
          { content: "Memory", value: "memory" },
          { content: "Foundry", value: "foundry" },
        ],
      },
      { type: "divider" },
      {
        type: "menu",
        content: "제품",
        items: [
          { content: "웨이퍼", value: "wafer" },
          { content: "테스트", value: "test" },
        ],
      },
    ],
    utility: [
      { type: "searchbox" },
      { type: "button", content: "알림", notiCount: 1 },
      { type: "divider" },
      { type: "image", src: "https://github.com/shadcn.png", alt: "User Avatar" },
    ],
    tabs: [
      {
        type: "menu",
        content: "즐겨찾기 ☆",
        items: [
          { content: "대시보드", value: "favorite-dashboard" },
          { content: "주요 리포트", value: "favorite-reports" },
        ],
      },
      { type: "divider" },
      {
        type: "menu",
        content: "업무함",
        items: [
          { content: "대기중인 작업", value: "inbox-tasks" },
          { content: "승인 요청", value: "inbox-approvals" },
        ],
      },
      {
        type: "menu",
        content: "서비스",
        items: [
          { content: "웨이퍼 관리", value: "service-wafer" },
          { content: "테스트 시스템", value: "service-test" },
        ],
      },
      {
        type: "menu",
        content: "설정",
        items: [
          { content: "일반 설정", value: "setting-general" },
          { content: "사용자 관리", value: "setting-users" },
        ],
      },
      { type: "button", content: "새창", value: "new-window" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cozy 사이즈에서 2단 모드를 사용하는 예제입니다. 상단에는 logo, gnb, utility가 있고 하단에는 탭이 표시됩니다.",
      },
      source: {
        code: TPL_TWO_LINE,
      },
    },
  },
  render: (args: Story["args"]) => ({
    components: { Header },
    setup() {
      const activeTab = ref("home")
      const onTabSelect = (value: string) => {
        console.log("Tab selected:", value)
        activeTab.value = value
      }

      const gnb = ref(args?.gnb || [])
      const utility = ref(args?.utility || [])
      const tabs = ref(args?.tabs || [])

      return { args, activeTab, onTabSelect, gnb, utility, tabs }
    },
    template: TPL_TWO_LINE,
  }),
}
