import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref } from "vue"
import { VRadioGroup, VRadio } from "@/components/ui"

const components = { VRadioGroup, VRadio }

/* ---------------------------
   Reusable template snippets
--------------------------- */

// Basic usage
const TPL_BASIC = `
<div class="flex flex-col gap-4">
  <div class="text-sm font-medium">선택된 값: {{ selected }}</div>

  <VRadioGroup v-model="selected" :inline="args.inline">
    <v-radio label="옵션 A" value="A" />
    <v-radio label="옵션 B" value="B" />
    <v-radio label="옵션 C" value="C" />
  </VRadioGroup>
</div>
`.trim()

// Row direction
const TPL_ROW = `
<div class="flex flex-col gap-4">
  <div class="text-sm font-medium">선택된 값: {{ selected }}</div>

  <VRadioGroup v-model="selected" :inline="args.inline !== undefined ? args.inline : true">
    <v-radio label="Small" value="small" />
    <v-radio label="Medium" value="medium" />
    <v-radio label="Large" value="large" />
  </VRadioGroup>
</div>
`.trim()

// Disabled state
const TPL_DISABLED = `
<div class="flex flex-col gap-6">
  <div>
    <div class="text-sm font-medium mb-2">전체 비활성화</div>
    <VRadioGroup v-model="selected1" disabled :inline="args.inline">
      <v-radio label="옵션 1" value="1" />
      <v-radio label="옵션 2" value="2" />
      <v-radio label="옵션 3" value="3" />
    </VRadioGroup>
  </div>

  <div>
    <div class="text-sm font-medium mb-2">개별 라디오 비활성화</div>
    <VRadioGroup v-model="selected2" :inline="args.inline">
      <v-radio label="활성화됨" value="enabled"  />
      <v-radio label="비활성화됨" value="disabled" disabled />
      <v-radio label="활성화됨" value="enabled2" />
    </VRadioGroup>
  </div>
</div>
`.trim()

// With validation rules
const TPL_VALIDATION = `
<div class="flex flex-col gap-4">
  <div class="text-sm font-medium">필수 선택 (유효성 검사)</div>

  <VRadioGroup
    v-model="selected"
    :inline="args.inline"
    :rules="[v => !!v || '하나의 옵션을 선택해주세요']"
  >
    <v-radio label="동의함" value="agree" />
    <v-radio label="동의하지 않음" value="disagree" />
  </VRadioGroup>
</div>
`.trim()

const meta: Meta<typeof VRadioGroup> = {
  title: "Components/Radio",
  component: VRadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: `

Vuetify의 VRadioGroup을 DSDS 디자인 시스템 스타일로 래핑한 라디오 그룹 컴포넌트입니다.

### 주요 기능 <features />
- **단일 선택**: 여러 옵션 중 하나만 선택 가능
- **v-model 지원**: Vue 3의 defineModel을 사용한 양방향 바인딩
- **유연한 배치**: 가로/세로 방향 배치 지원
- **접근성**: ARIA 속성 및 키보드 네비게이션 지원
- **커스터마이징**: 필수 선택, 비활성화 등 다양한 옵션
- **반응형 디자인**: 모바일과 데스크톱 최적화

### 디자인 일관성 정책 <policy />
DSDS 디자인 시스템의 일관성을 위해 다음과 같은 Vuetify VRadioGroup의 기능들을 **의도적으로 지원하지 않습니다**:
- **색상 커스터마이징**: color prop을 통한 색상 변경
- **밀도 조절**: density prop을 통한 컴포넌트 밀도 조절
- **유효성 검사**: rules prop을 통한 커스텀 검증 기능

이러한 기능들은 DSDS 디자인 시스템의 일관된 사용자 경험을 위해 제한되며, 필요한 경우 상위 컴포넌트 레벨에서 처리하는 것을 권장합니다.

### 사용 방법 <usages />

#### 1. 기본 라디오 그룹
\`\`\`html
<template>
  <VRadioGroup v-model="selectedValue">
    <VRadio label="옵션 A" value="A" />
    <VRadio label="옵션 B" value="B" />
    <VRadio label="옵션 C" value="C" />
  </VRadioGroup>
</template>

<script setup>
import { ref } from 'vue'
import { VRadioGroup, VRadio } from '@/components/ui'

const selectedValue = ref('')
</script>
\`\`\`

#### 2. 가로 배치
\`\`\`html
<template>
  <VRadioGroup v-model="selectedSize" inline>
    <VRadio label="Small" value="small" />
    <VRadio label="Medium" value="medium" />
    <VRadio label="Large" value="large" />
  </VRadioGroup>
</template>

<script setup>
import { ref } from 'vue'
const selectedSize = ref('medium')
</script>
\`\`\`

#### 4. 비활성화 상태
\`\`\`html
<template>
  <div class="space-y-4">
    <!-- 전체 그룹 비활성화 -->
    <VRadioGroup v-model="selected1" disabled>
      <VRadio label="옵션 1" value="1" />
      <VRadio label="옵션 2" value="2" />
    </VRadioGroup>

    <!-- 개별 라디오 비활성화 -->
    <VRadioGroup v-model="selected2">
      <VRadio label="활성화됨" value="enabled" />
      <VRadio label="비활성화됨" value="disabled" disabled />
      <VRadio label="활성화됨" value="enabled2" />
    </VRadioGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const selected1 = ref('1')
const selected2 = ref('enabled')
</script>
\`\`\`

### Props 설명 <props />
- \`row\` (boolean, optional): 라디오 그룹을 가로 방향으로 배치
- \`column\` (boolean, optional): 라디오 그룹을 세로 방향으로 배치 (기본값)
- \`mandatory\` (boolean, optional): 필수 선택 여부 (기본값: true)
- \`disabled\` (boolean, optional): 전체 라디오 그룹 비활성화
- \`inline\` (boolean, optional): 인라인 스타일 적용 (가로 배치)

### v-model
VRadioGroup은 Vue 3의 defineModel을 사용하여 양방향 바인딩을 지원합니다:

\`\`\`html
<VRadioGroup v-model="selectedValue">
  <VRadio label="옵션 1" value="option1" />
  <VRadio label="옵션 2" value="option2" />
</VRadioGroup>
\`\`\`

### 이벤트 <events />
- \`@update:modelValue\`: 선택 값 변경 이벤트
- \`@change\`: 라디오 선택 변경 이벤트

### 접근성 <accessibility />
- 키보드 네비게이션 지원 (Tab, Arrow keys)
- 스크린 리더 지원을 위한 ARIA 속성 자동 적용
- 포커스 표시 지원
- 라벨과 라디오의 올바른 연결

### 스타일링 <styling />
DSDS 디자인 시스템의 디자인 토큰을 사용하여 일관된 스타일을 제공합니다. 추가적인 커스터마이징이 필요한 경우 class prop을 통해 CSS 클래스를 적용할 수 있습니다.
        `,
      },
    },
  },
} satisfies Meta<typeof VRadioGroup>
export default meta

type Story = StoryObj<typeof meta>

const defaultArgs: Story["args"] = {
  modelValue: "",
  inline: false,
  disabled: false,
}

/* ---------------------------
           Stories
--------------------------- */

export const Basic: Story = {
  name: "기본",
  args: { ...defaultArgs, modelValue: "A" },
  parameters: {
    docs: {
      source: { type: "code", language: "html", code: TPL_BASIC },
      description: {
        story: `
기본적인 VRadioGroup 사용법입니다. 가장 간단한 형태의 라디오 그룹으로, v-model을 통해 선택된 값을 관리합니다.

**특징**
- 기본적인 단일 선택 기능
- 세로 방향 배치 (기본값)
- 필수 선택 모드 (mandatory=true)
- DSDS 디자인 시스템 스타일 적용
        `,
      },
    },
  },
  render: (args) => ({
    components,
    setup() {
      const selected = ref(args.modelValue)
      return { args, selected }
    },
    template: TPL_BASIC,
  }),
}

export const RowDirection: Story = {
  name: "행 방향",
  args: { ...defaultArgs, modelValue: "medium", inline: true },
  parameters: {
    docs: {
      source: { type: "code", language: "html", code: TPL_ROW },
      description: {
        story: `
inline prop을 사용하여 라디오 버튼을 가로로 배치하는 예시입니다.

**특징**
- inline=true로 가로 배치
- 공간을 효율적으로 사용
- 좁은 공간에 적합
- 선택된 값 실시간 표시
        `,
      },
    },
  },
  render: (args) => ({
    components,
    setup() {
      const selected = ref(args.modelValue)
      return { args, selected }
    },
    template: TPL_ROW,
  }),
}

export const DisabledStates: Story = {
  name: "비활성화",
  args: { ...defaultArgs },
  parameters: {
    docs: {
      source: { type: "code", language: "html", code: TPL_DISABLED },
      description: {
        story: `
전체 그룹 또는 개별 라디오 버튼을 비활성화하는 방법을 보여줍니다.

**특징**
- **전체 비활성화**: disabled prop으로 그룹 전체 비활성화
- **개별 비활성화**: 각 VRadio에 disabled prop 적용
- **시각적 피드백**: 비활성화 상태의 명확한 시각적 표시
- **접근성**: disabled 속성으로 스크린 리더 지원
        `,
      },
    },
  },
  render: (args) => ({
    components,
    setup() {
      const selected1 = ref("2")
      const selected2 = ref("enabled")
      return { args, selected1, selected2 }
    },
    template: TPL_DISABLED,
  }),
}
