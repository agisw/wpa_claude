import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref } from "vue"

import { ToggleButton } from "@/components/ui"

const TOGGLE_BUTTON_BASIC_TEMPLATE = `
  <ToggleButton v-bind="args" v-model="checked">
    Time Series
  </ToggleButton>
`

const TOGGLE_BUTTON_SIZES_TEMPLATE = `
  <div class="flex flex-col gap-4">
    <ToggleButton size="small" v-model="smallChecked">
      Small
    </ToggleButton>
    <ToggleButton size="medium" v-model="mediumChecked">
      Medium
    </ToggleButton>
    <ToggleButton size="large" v-model="largeChecked">
      Large
    </ToggleButton>
  </div>
`

const meta: Meta<typeof ToggleButton> = {
  title: "Components/ToggleButton",
  component: ToggleButton,
  tags: ["autodocs"],
  args: {
    size: "medium",
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
      description: "버튼 크기",
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: `
DSDS ToggleButton 컴포넌트는 버튼 UI에 체크 상태를 결합한 토글 컨트롤입니다. 내부적으로 VBtn과 VCheckbox를 조합해 상태에 따라 아이콘이 전환되며, Vue 3의 \`defineModel\`을 사용해 \`v-model\` 기반의 양방향 바인딩을 지원합니다.

### 주요 기능 <features />
- 버튼 스타일과 체크박스 토글 동작의 결합
- \`v-model\` 로 ON/OFF 상태 제어
- small / medium / large 세 가지 크기 프리셋
- PageHeader, PagePanel 등에서 액션 토글로 재사용 가능

### 사용 시나리오 <usages />
- 필터 패널에서 옵션 토글
- 대시보드 상단 도구 모음에서 보기 모드 전환
- 데이터 시각화에서 시리즈 표시/숨김 토글
        `.trim(),
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: "기본",
  parameters: {
    docs: {
      description: {
        story:
          "가장 단순한 ToggleButton 예제입니다. 클릭 시 내부 체크 상태가 전환되며, 아이콘이 체크박스 모양으로 바뀝니다.",
      },
      source: {
        code: TOGGLE_BUTTON_BASIC_TEMPLATE.trim(),
      },
    },
  },
  render: (args) => ({
    components: { ToggleButton },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: TOGGLE_BUTTON_BASIC_TEMPLATE,
  }),
}

export const Sizes: Story = {
  name: "크기 비교",
  parameters: {
    controls: { exclude: ["size"] },
    docs: {
      description: {
        story: "세 가지 크기 프리셋을 한 화면에서 비교합니다. 각 버튼은 독립적으로 토글됩니다.",
      },
      source: {
        code: TOGGLE_BUTTON_SIZES_TEMPLATE.trim(),
      },
    },
  },
  render: () => ({
    components: { ToggleButton },
    setup() {
      const smallChecked = ref(false)
      const mediumChecked = ref(true)
      const largeChecked = ref(false)
      return { smallChecked, mediumChecked, largeChecked }
    },
    template: TOGGLE_BUTTON_SIZES_TEMPLATE,
  }),
}
