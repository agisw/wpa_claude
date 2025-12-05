import type { Meta, StoryObj } from "@storybook/vue3-vite"

import { VBtn } from "@/components/ui"
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon.vue"
import ChevronRightIcon from "@/components/icons/ChevronRightIcon.vue"
import HamburgerIcon from "@/components/icons/HamburgerIcon.vue"
import MagnifyIcon from "@/components/icons/MagnifyIcon.vue"
import VBtnDemo from "./views/VBtnDemo.vue"

const meta = {
  title: "Components/Button",
  component: VBtn,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: `

Vuetify의 VBtn을 DSDS 디자인 시스템 스타일로 래핑한 버튼 컴포넌트입니다.

### 주요 기능 <features />
- **다양한 스타일 변형**: primary, secondary, warning, danger, ghost, ghostLink
- **크기 옵션**: small, medium, large 세 가지 크기 지원
- **아이콘 지원**: 아이콘만 또는 아이콘 + 텍스트 조합 가능
- **상태 관리**: disabled, active, selected 상태 지원
- **접근성**: ARIA 속성 및 키보드 네비게이션 지원
- **반응형 디자인**: 모바일과 데스크톱 최적화

### 사용 방법 <usages />

#### 1. 기본 버튼
\`\`\`html
<VBtn variant="primary">확인</VBtn>
\`\`\`

#### 2. 아이콘과 텍스트 조합
\`\`\`html
<!-- 아이콘 왼쪽에 배치 -->
<VBtn variant="primary" icon="mdi-plus" icon-option="before">
  추가
</VBtn>

<!-- 아이콘 오른쪽에 배치 -->
<VBtn variant="secondary" icon="mdi-chevron-right" icon-option="after">
  다음
</VBtn>
\`\`\`

#### 3. 아이콘만 버튼
\`\`\`html
<VBtn variant="primary" icon="mdi-plus" icon-only aria-label="추가" />
\`\`\`

#### 4. 다양한 상태
\`\`\`html
<!-- 비활성화 -->
<VBtn variant="primary" disabled>비활성화</VBtn>

<!-- 선택 상태 -->
<VBtn variant="secondary" selected>선택됨</VBtn>

<!-- 활성화 상태 -->
<VBtn variant="ghost" active>활성화</VBtn>
\`\`\`

### Props 설명 <props />
- \`variant\` (string, optional): 버튼 스타일 - "primary", "secondary", "warning", "danger", "ghost", "ghostLink"
- \`size\` (string, optional): 버튼 크기 - "small", "medium", "large"
- \`disabled\` (boolean, optional): 비활성화 상태
- \`active\` (boolean, optional): 활성화 상태
- \`selected\` (boolean, optional): 선택 상태
- \`icon\` (Component|string, optional): 아이콘 컴포넌트 또는 아이콘 이름
- \`iconOption\` (string, optional): 아이콘 위치 - "before", "after"
- \`iconOnly\` (boolean, optional): 아이콘만 표시
- \`loading\` (boolean, optional): 로딩 상태
- \`class\` (string|array|object, optional): 추가 CSS 클래스

### 슬롯 <slots />
- \`default\`: 버튼의 기본 콘텐츠 (텍스트나 다른 요소)

### 이벤트 <events />
- \`@click\`: 버튼 클릭 이벤트
- \`@focus\`: 포커스 이벤트
- \`@blur\`: 블러 이벤트

### 접근성 <accessibility />
- 키보드 네비게이션 지원
- 스크린 리더 지원을 위한 ARIA 속성 자동 적용
- 포커스 표시 지원
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "warning", "danger", "ghost", "ghostLink"],
      description: "버튼의 변형",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "버튼의 크기",
    },
    disabled: {
      control: { type: "boolean" },
      description: "버튼 비활성화",
    },
    active: {
      control: { type: "boolean" },
      description: "버튼 활성화 상태",
    },
    selected: {
      control: { type: "boolean" },
      description: "버튼 선택 상태",
    },
    iconOption: {
      control: { type: "select" },
      options: ["before", "after", undefined],
      description: "아이콘 위치",
    },
  },
} satisfies Meta<typeof VBtn>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs: Story["args"] = {
  default: "button",
  size: "medium",
  disabled: false,
  active: false,
  selected: false,
}

/**
 * VBtn 컴포넌트의 포괄적인 데모 - 모든 variant와 상태 조합을 보여줍니다.
 * 개발용으로 모든 버튼 스타일과 상태 변화를 한눈에 확인할 수 있습니다.
 */
export const Demo: Story = {
  name: "포괄적 데모",
  render: () => ({
    components: { VBtnDemo },
    template: `<VBtnDemo />`,
  }),
  parameters: {
    docs: {
      description: {
        story: `
VBtn 컴포넌트의 포괄적인 데모입니다. 모든 variant와 상태 조합을 한눈에 확인할 수 있습니다.
        `,
      },
    },
  },
  tags: ["!dev"],
}

/**
 * 기본 Primary 버튼입니다. 주요 액션에 사용하세요.
 * 가장 일반적으로 사용되는 버튼 스타일로, 중요한 작업이나 긍정적인 액션에 적합합니다.
 */
export const Primary: Story = {
  args: {
    ...defaultArgs,
    variant: "primary",
  },
  parameters: {
    docs: {
      description: {
        story: `
기본 Primary 버튼입니다. 주요 액션에 사용하세요.

**특징**
- 가장 강조되는 버튼 스타일
- 주요 CTA(Call-to-Action)에 사용
- 높은 시각적 가중치로 사용자의 주의를 끕니다
        `,
      },
    },
  },
}

/**
 * Secondary 버튼입니다. 보조 액션에 적합합니다.
 * Primary 버튼과 함께 사용될 때 계층 구조를 만들 수 있습니다.
 */
export const Secondary: Story = {
  args: {
    ...defaultArgs,
    variant: "secondary",
  },
  parameters: {
    docs: {
      description: {
        story: `
Secondary 버튼입니다. 보조 액션에 적합합니다.

**특징**
- Primary 버튼의 보조 역할을 하는 스타일
- 덜 중요한 액션이나 취소 버튼에 사용
- Primary 버튼과 함께 사용할 때 좋은 시각적 계층을 만듭니다
        `,
      },
    },
  },
}

/**
 * Warning 버튼입니다. 주의를 요하는 액션에 사용하세요.
 * 사용자가 신중하게 고려해야 하는 액션에 적합합니다.
 */
export const Warning: Story = {
  args: {
    ...defaultArgs,
    variant: "warning",
  },
  parameters: {
    docs: {
      description: {
        story: `
Warning 버튼입니다. 주의를 요하는 액션에 사용하세요.

**특징**
- 주의를 요하는 액션에 사용
- 경고나 주의 메시지와 함께 사용
- 사용자가 액션을 신중하게 고려하도록 유도
        `,
      },
    },
  },
}

/**
 * Danger 버튼입니다. 삭제 등 위험한 액션에 사용하세요.
 * 사용자가 액션을 취소할 수 있는 기회를 제공해야 합니다.
 */
export const Danger: Story = {
  args: {
    ...defaultArgs,
    variant: "danger",
  },
  parameters: {
    docs: {
      description: {
        story: `
Danger 버튼입니다. 삭제 등 위험한 액션에 사용하세요.

**특징**
- 위험한 액션(삭제, 제거 등)에 사용
- 사용자가 신중하게 결정하도록 유도
- 되돌릴 수 없는 액션에 사용 권장
        `,
      },
    },
  },
}

/**
 * Ghost 버튼입니다. 배경이 없는 투명한 버튼입니다.
 * 부수적인 액션이나 보조 네비게이션에 적합합니다.
 */
export const Ghost: Story = {
  args: {
    ...defaultArgs,
    variant: "ghost",
  },
  parameters: {
    docs: {
      description: {
        story: `
Ghost 버튼입니다. 배경이 없는 투명한 버튼입니다.

**특징**
- 배경이 없는 투명한 스타일
- 부수적인 액션이나 보조 네비게이션에 적합
- active, selected 상태에서만 시각적 피드백 제공
        `,
      },
    },
  },
}

/**
 * GhostLink 버튼입니다. 링크 스타일의 Ghost 버튼입니다.
 * 텍스트 링크처럼 보이지만 버튼 기능을 제공합니다.
 */
export const GhostLink: Story = {
  args: {
    ...defaultArgs,
    variant: "ghostLink",
  },
  parameters: {
    docs: {
      description: {
        story: `
GhostLink 버튼입니다. 링크 스타일의 Ghost 버튼입니다.

**특징**
- 링크처럼 보이는 버튼 스타일
- 텍스트 기반 네비게이션에 적합
- 최소한의 시각적 강조로 깔끔한 디자인
        `,
      },
    },
  },
}

/**
 * 버튼 크기 변형 예시
 * 세 가지 크기 옵션(small, medium, large)을 모두 보여줍니다.
 */
export const Sizes: Story = {
  name: "크기 변형",
  args: {
    ...defaultArgs,
    variant: "primary",
  },
  render: () => ({
    components: { VBtn },
    template: `
      <div class="flex gap-4 items-center">
        <VBtn variant="primary" size="small">Small</VBtn>
        <VBtn variant="primary" size="medium">Medium</VBtn>
        <VBtn variant="primary" size="large">Large</VBtn>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
다양한 크기의 버튼들입니다.

#### 크기 옵션 <sizes />
- **Small**: 컴팩트한 디자인에 적합, 보조 버튼에 사용
- **Medium**: 기본 크기, 가장 일반적으로 사용
- **Large**: 강조가 필요한 주요 액션에 사용

모든 크기는 접근성과 터치 타겟 크기를 고려하여 디자인되었습니다.
        `,
      },
    },
  },
}

/**
 * 모든 변형 예시
 */
export const AllVariants: Story = {
  name: "모든 변형",
  args: {
    ...defaultArgs,
  },
  render: () => ({
    components: { VBtn },
    template: `
      <div class="flex flex-wrap gap-4 items-center">
        <VBtn variant="primary">Primary</VBtn>
        <VBtn variant="secondary">Secondary</VBtn>
        <VBtn variant="warning">Warning</VBtn>
        <VBtn variant="danger">Danger</VBtn>
        <VBtn variant="ghost">Ghost</VBtn>
        <VBtn variant="ghostLink">Ghost Link</VBtn>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
모든 변형의 버튼들입니다.

#### 모든 스타일 변형 <variants />
- **Primary**: 주요 액션에 사용되는 기본 버튼
- **Secondary**: 보조 액션에 사용되는 버튼
- **Warning**: 주의를 요하는 액션에 사용
- **Danger**: 위험한 액션(삭제 등)에 사용
- **Ghost**: 배경이 없는 투명한 버튼
- **GhostLink**: 링크 스타일의 Ghost 버튼

각 변형은 DSDS 디자인 시스템의 색상과 스타일 가이드를 따르며, 일관된 사용자 경험을 제공합니다.
        `,
      },
    },
  },
}

/**
 * 아이콘 옵션과 iconOnly 조합을 보여주는 예시입니다.
 * iconOption(before/after)과 iconOnly에 따라 다양한 레이아웃을 확인할 수 있습니다.
 */
export const IconOptions: Story = {
  name: "아이콘 옵션",
  render: () => ({
    components: { VBtn },
    setup() {
      return {
        ChevronLeftIcon,
        ChevronRightIcon,
        HamburgerIcon,
        MagnifyIcon,
      }
    },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex gap-4 items-center">
          <VBtn variant="primary" :icon="ChevronLeftIcon" icon-option="before">
            이전 단계
          </VBtn>
          <VBtn variant="secondary" :icon="ChevronRightIcon" icon-option="after">
            다음 단계
          </VBtn>
        </div>
        <div class="flex gap-4 items-center">
          <VBtn variant="warning" :icon="HamburgerIcon" icon-only aria-label="메뉴 열기" />
          <VBtn variant="ghost" :icon="MagnifyIcon" icon-only aria-label="검색" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
아이콘 위치(before/after)와 아이콘만 버튼을 동시에 확인할 수 있는 예시입니다.

#### 포인트 <icon />
- **iconOption**: before/after로 텍스트 대비 아이콘 위치를 제어합니다.
- **iconOnly**: aria-label과 함께 제공해 접근성을 보장합니다.
        `,
      },
    },
  },
}

/**
 * 버튼의 여러 상태 변형 예시 - 기본, disabled, selected, active
 * 모든 상태 변화를 한눈에 확인할 수 있는 인터랙티브한 예시입니다.
 */
export const StatesOverview: Story = {
  name: "상태 개요",
  parameters: {
    docs: {
      description: {
        story: `
버튼의 여러 상태 변화를 한눈에 확인할 수 있는 인터랙티브한 예시입니다.

#### 상태 설명
- **Default**: 기본 상태의 버튼
- **Disabled**: 비활성화된 버튼 (클릭 불가)
- **Selected**: 선택된 상태 (secondary, ghost variant에서만 표시)
- **Active**: 활성화된 상태 (secondary, ghost variant에서만 표시)

#### 사용 방법
variant와 size 컨트롤을 사용하여 각 상태가 어떻게 변하는지 확인할 수 있습니다.
특히 secondary와 ghost variant에서는 selected와 active 상태의 시각적 변화가 뚜렷합니다.
        `,
      },
      codePanel: false,
    },
  },
  args: {
    variant: "primary",
    size: "medium",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "warning", "danger", "ghost", "ghostLink"],
      description: "버튼의 변형",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "버튼의 크기",
    },
  },
  render: (args) => ({
    components: { VBtn },
    setup() {
      return { args }
    },
    template: `
      <div class="flex gap-4 items-center">
        <div class="flex flex-col items-center gap-2">
          <VBtn v-bind="args">Default</VBtn>
          <span class="text-xs text-gray-600">Default</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <VBtn v-bind="args" disabled>Disabled</VBtn>
          <span class="text-xs text-gray-600">Disabled</span>
        </div>
        <div class="flex flex-col items-center gap-2" v-if="['secondary', 'ghost'].includes(args.variant)">
          <VBtn v-bind="args" selected>Selected</VBtn>
          <span class="text-xs text-gray-600">Selected</span>
        </div>
        <div class="flex flex-col items-center gap-2" v-if="['secondary', 'ghost'].includes(args.variant)">
          <VBtn v-bind="args" active>Active</VBtn>
          <span class="text-xs text-gray-600">Active</span>
        </div>
      </div>
    `,
  }),
}

/**
 * 로딩 상태 표현 예시입니다. 진행 중인 작업을 시각적으로 전달합니다.
 */
export const LoadingStates: Story = {
  name: "로딩 상태",
  render: () => ({
    components: { VBtn },
    setup() {
      return { ChevronRightIcon }
    },
    template: `
      <div class="flex gap-4 items-center">
        <VBtn variant="primary" loading>
          저장 중...
        </VBtn>
        <VBtn variant="secondary" :icon="ChevronRightIcon" icon-option="after" loading>
          다음 단계
        </VBtn>
        <VBtn variant="ghost" icon-only loading aria-label="데이터 새로고침" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
SpinnerIcon을 사용해 작업 진행 중임을 보여주는 예시입니다. 버튼 콘텐츠 대신 스피너가 나타나며,
필요 시 iconOnly 형태와 조합해 세밀한 상태 표현이 가능합니다.
        `,
      },
    },
  },
}
