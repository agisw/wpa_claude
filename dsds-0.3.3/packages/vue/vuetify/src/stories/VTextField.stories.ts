import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref } from "vue"

import { VTextField } from "@/components/ui"
import { MagnifyIcon } from "@/components/icons"

const meta: Meta = {
  title: "Components/TextField",
  component: VTextField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: `

Vuetify의 VTextField를 DSDS 디자인 시스템 스타일로 래핑한 텍스트 입력 컴포넌트입니다.

### 주요 기능 <features />
- **다양한 스타일**: default(아웃라인)와 ghost(채워진) 스타일 지원
- **크기 옵션**: small, medium, large 크기 지원
- **클리어 기능**: 커스텀 클리어 버튼으로 입력값 쉽게 삭제
- **접근성**: ARIA 속성 및 키보드 네비게이션 지원
- **커스터마이징**: append-inner 슬롯을 통한 추가 콘텐츠 삽입

### 디자인 일관성 정책 <policy />
DSDS 디자인 시스템의 일관성을 위해 다음과 같은 Vuetify VTextField의 기능들을 **의도적으로 지원하지 않습니다**:
- **색상 커스터마이징**: color prop을 통한 색상 변경
- **밀도 조절**: density prop을 통한 컴포넌트 밀도 조절
- **기본 클리어 아이콘**: Vuetify의 기본 클리어 아이콘 대신 커스텀 클리어 버튼 사용

이러한 기능들은 DSDS 디자인 시스템의 일관된 사용자 경험을 위해 제한되며, 필요한 경우 상위 컴포넌트 레벨에서 처리하는 것을 권장합니다.

### 사용 방법 <usages />

#### 1. 기본 텍스트 입력
\`\`\`html
<template>
  <VTextField v-model="inputValue"
              placeholder="텍스트를 입력하세요" />
</template>

<script setup>
import { ref } from 'vue'
import { VTextField } from '@/components/ui'

const inputValue = ref('')
</script>
\`\`\`

#### 2. 클리어 기능이 있는 입력
\`\`\`html
<template>
  <VTextField v-model="inputValue"
              placeholder="입력 후 X 버튼으로 클리어"
              clearable />
</template>

<script setup>
import { ref } from 'vue'
const inputValue = ref('기본값')
</script>
\`\`\`

#### 3. Ghost 스타일 입력
\`\`\`html
<template>
  <VTextField v-model="inputValue"
              variant="ghost"
              placeholder="Ghost 스타일 입력" />
</template>

<script setup>
import { ref } from 'vue'
const inputValue = ref('')
</script>
\`\`\`

#### 4. 크기별 입력
\`\`\`html
<template>
  <div class="input-examples">
    <VTextField v-model="smallValue" size="small" placeholder="Small" />
    <VTextField v-model="mediumValue" size="medium" placeholder="Medium" />
    <VTextField v-model="largeValue" size="large" placeholder="Large" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const smallValue = ref('')
const mediumValue = ref('')
const largeValue = ref('')
</script>
\`\`\`

#### 5. 추가 아이콘 삽입
\`\`\`html
<template>
  <VTextField v-model="searchValue" placeholder="검색">
    <template #append-inner>
      <VBtn variant="ghost" size="small" iconOnly>
        <MagnifyIcon />
      </VBtn>
    </template>
  </VTextField>
</template>

<script setup>
import { ref } from 'vue'
import { MagnifyIcon } from '@/components/icons'

const searchValue = ref('')
</script>
\`\`\`

### Props 설명 <props />
- \`variant\` (string, optional): TextField 스타일 변형 - 'default'(아웃라인), 'ghost'(채워짐)
- \`size\` (string, optional): TextField 크기 - 'small', 'medium', 'large'
- \`disabled\` (boolean, optional): TextField 비활성화 상태
- \`modelValue\` (string|number, optional): 입력된 값 (v-model)
- \`placeholder\` (string, optional): 플레이스홀더 텍스트
- \`clearable\` (boolean, optional): 클리어 버튼 표시 여부
- \`width\` (number, optional): TextField 너비 (px 단위)
- \`maxWidth\` (number, optional): TextField 최대 너비

### v-model <model />
VTextField은 Vue 3의 defineModel을 사용하여 양방향 바인딩을 지원합니다:

\`\`\`html
<VTextField v-model="inputValue" />
\`\`\`

### 이벤트 <events />
- \`@update:modelValue\`: 입력 값 변경 이벤트

### 클리어 기능 <clearable />
- \`clearable\` prop이 true일 때 우측에 X 버튼이 표시됩니다
- 버튼 클릭 시 입력값이 빈 문자열로 설정되고 입력상자로 포커스가 이동합니다
- 클리어 버튼은 입력값이 있을 때만 표시됩니다

### 접근성 <accessibility />
- 키보드 네비게이션 지원 (Tab, Enter, ESC)
- 스크린 리더 지원을 위한 ARIA 속성 자동 적용
- 포커스 표시 지원
- 라벨과 입력 필드의 올바른 연결

### Slots <slots />
- \`#append-inner\`: 입력 영역 우측에 추가 콘텐츠 삽입 (아이콘 등)

### 스타일링 <styling />
DSDS 디자인 시스템의 디자인 토큰을 사용하여 일관된 스타일을 제공합니다. 추가적인 커스터마이징이 필요한 경우 class prop을 통해 CSS 클래스를 적용할 수 있습니다.

### 유효성 검사 <validation />
VTextField은 기본적인 입력 유효성 검사를 지원하지 않습니다. 복잡한 유효성 검사가 필요한 경우 상위 컴포넌트에서 처리하는 것을 권장합니다.
        `,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs: Story["args"] = {
  variant: "default",
  size: "medium",
  disabled: false,
  clearable: false,
  placeholder: "텍스트를 입력하세요.",
  width: 150,
  modelValue: "",
}

/**
 * 기본 Default TextField입니다. DSDS 표준 스타일을 적용합니다.
 */
export const Default: Story = {
  name: "기본",
  args: {
    ...defaultArgs,
  },
  parameters: {
    docs: {
      description: {
        story: "기본 Default TextField입니다. 텍스트 입력과 기본 스타일링을 확인할 수 있습니다.",
      },
    },
  },
}

Default.render = (args) => ({
  components: { VTextField },
  setup() {
    const text = ref<string>("")
    return { args, text }
  },
  template: `<VTextField v-bind="args" v-model="text" />`,
})

/**
 * 비활성화 상태의 TextField입니다.
 */
export const Disabled: Story = {
  name: "비활성화",
  args: {
    ...defaultArgs,
    disabled: true,
    modelValue: "비활성화된 입력값",
  },
  parameters: {
    docs: {
      description: {
        story: "disabled 상태에서의 스타일과 동작을 확인할 수 있습니다.",
      },
    },
  },
}

Disabled.render = (args: Story["args"]) => ({
  components: { VTextField },
  setup() {
    const text = ref<string>(((args as any)?.modelValue ?? "") as string)
    return { args, text }
  },
  template: `<VTextField v-bind="args" v-model="text" />`,
})

/**
 * Clearable 기능이 활성화된 TextField입니다. 커스텀 X 아이콘으로 입력값을 지울 수 있습니다.
 */
export const Clearable: Story = {
  name: "클리어 가능",
  args: {
    ...defaultArgs,
    clearable: true,
    modelValue: "입력된 텍스트 예시",
    placeholder: "Clear 버튼을 확인해보세요",
  },
  parameters: {
    docs: {
      description: {
        story:
          "clearable 옵션 활성화 시, 입력값이 있을 때 우측에 커스텀 X 아이콘이 표시되어 클릭으로 내용을 지울 수 있습니다.",
      },
    },
  },
  render: (args: Story["args"]) => ({
    components: { VTextField },
    setup() {
      const text = ref<string>(((args as any)?.modelValue ?? "") as string)
      return { args, text }
    },
    template: `<VTextField v-bind="args" v-model="text" />`,
  }),
}

/**
 * 커스텀 Append 아이콘.
 */
export const CustomAppendIcon: Story = {
  name: "커스텀 추가 아이콘",
  args: {
    ...defaultArgs,
    clearable: true,
    modelValue: "입력된 텍스트 예시",
    placeholder: "커스텀 버튼을 확인해보세요",
  },
  parameters: {
    docs: {
      description: {
        story: "입력상자의 우측에 커스텀 아이콘을 넣을 수 있습니다. 이 때 Clearable 아이콘은 그 왼쪽에 표시됩니다.",
      },
    },
  },
  render: (args: Story["args"]) => ({
    components: { VTextField, MagnifyIcon },
    setup() {
      const text = ref<string>(((args as any)?.modelValue ?? "") as string)
      return { args, text }
    },
    template: `
    <VTextField v-bind="args" v-model="text">
      <template #append-inner>
        <MagnifyIcon />
      </template>
    </VTextField>
    `,
  }),
}

/**
 * Sizes: small, medium, large를 세로로 나란히 보여주는 예제입니다.
 */
export const Sizes: Story = {
  name: "크기 변형",
  args: {
    ...defaultArgs,
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story: "지원되는 size(small, medium, large)를 한 번에 비교할 수 있도록 세로로 배열한 예제입니다.",
      },
    },
  },
}

Sizes.render = (args) => ({
  components: { VTextField },
  setup() {
    const largeText = ref<string>("Large size")
    const mediumText = ref<string>("Medium size")
    const smallText = ref<string>("Small size")
    return { args, largeText, mediumText, smallText }
  },
  template: `
    <div class="flex flex-col gap-3" style="width: 200px;">
      <VTextField v-bind="args" v-model="largeText" size="large" placeholder="Large TextField" />
      <VTextField v-bind="args" v-model="mediumText" size="medium" placeholder="Medium TextField" />
      <VTextField v-bind="args" v-model="smallText" size="small" placeholder="Small TextField" />
    </div>
  `,
})

/**
 * 다양한 변형(variant)을 보여주는 예제입니다.
 */
export const Variants: Story = {
  args: {
    ...defaultArgs,
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story: "default와 ghost variant를 비교할 수 있는 예제입니다.",
      },
    },
  },
}

Variants.render = (args) => ({
  components: { VTextField },
  setup() {
    const defaultText = ref<string>("Default variant")
    const ghostText = ref<string>("Ghost variant")
    return { args, defaultText, ghostText }
  },
  template: `
    <div class="flex flex-col gap-3" style="width: 200px;">
      <VTextField v-bind="args" v-model="defaultText" variant="default" placeholder="Default variant" />
      <VTextField v-bind="args" v-model="ghostText" variant="ghost" placeholder="Ghost variant" />
    </div>
  `,
})
