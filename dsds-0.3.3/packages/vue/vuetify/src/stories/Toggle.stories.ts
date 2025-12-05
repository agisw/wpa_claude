import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { computed, ref, watch } from "vue"

import { Toggle } from "@/components/ui"
import { booleanControl, hideOnControls, selectControl } from "./utils"

type ToggleStoryProps = {
  checked?: boolean
  disabled?: boolean
  size?: "large" | "medium" | "small"
  class?: string | string[] | Record<string, boolean>
}

const meta: Meta<ToggleStoryProps> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  excludeStories: /.*/, // VSwitch를 우선적으로 노출하기 위해 사이드바에서 숨김
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: `
DSDS 디자인 토글 컴포넌트는 **ON/OFF 상태**를 전환하는 스위치 UI입니다. Vue 3.5의 \`defineModel\`을 사용해 \`v-model:checked\`로 상태를 제어하며, 크기(size)와 비활성화(disabled) 상태를 지원합니다.

### 주요 특징 <features />
- 세 가지 크기: \`small\`, \`medium\`, \`large\`
- \`v-model:checked\`를 통한 양방향 바인딩
- 키보드/스크린리더 친화적인 접근성 속성
- 디자인 토큰 기반 스타일과 상태별 유틸리티 클래스 제공
        `.trim(),
      },
    },
  },
  args: {
    checked: false,
    disabled: false,
    size: "medium",
  },
  argTypes: {
    checked: booleanControl,
    disabled: booleanControl,
    size: selectControl(["large", "medium", "small"]),
    class: hideOnControls,
  },
} satisfies Meta<ToggleStoryProps>

export default meta

type Story = StoryObj<typeof meta>

function useSyncedChecked(args: ToggleStoryProps) {
  const checked = ref(args.checked ?? false)

  watch(
    () => args.checked,
    (value) => {
      const next = value ?? false
      if (next !== checked.value) {
        checked.value = next
      }
    }
  )

  watch(checked, (value) => {
    if (args.checked !== value) {
      args.checked = value
    }
  })

  return checked
}

const withCheckedBinding = (story: () => any, context: { args: ToggleStoryProps }) => {
  const Story = story()
  return {
    components: { Story },
    setup() {
      const checked = useSyncedChecked(context.args)
      return { args: context.args, checked }
    },
    template: `<Story v-bind="args" v-model:checked="checked" class="overflow-hidden"/>`,
  }
}

const withSizesGrid = (_story: () => any, context: { args: ToggleStoryProps }) => {
  return {
    components: { Toggle },
    setup() {
      const checked = useSyncedChecked(context.args)
      const commonArgs = computed(() => {
        const { size: _ignoredSize, ...rest } = context.args
        return rest
      })
      const smallArgs = computed(() => ({ ...commonArgs.value, size: "small" }))
      const mediumArgs = computed(() => ({ ...commonArgs.value, size: "medium" }))
      const largeArgs = computed(() => ({ ...commonArgs.value, size: "large" }))

      return { checked, smallArgs, mediumArgs, largeArgs }
    },
    template: `
      <div class="grid gap-6" style="grid-template-columns: repeat(3, 80px);">
        <div class="flex flex-col items-center gap-2">
          <span class="text-marker text-xs">Small</span>
          <Toggle v-bind="smallArgs" v-model:checked="checked" />
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-marker text-xs">Medium</span>
          <Toggle v-bind="mediumArgs" v-model:checked="checked" />
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-marker text-xs">Large</span>
          <Toggle v-bind="largeArgs" v-model:checked="checked" />
        </div>
      </div>
    `,
  }
}

const withStateTrackingLayout = (story: () => any, context: { args: ToggleStoryProps }) => {
  const Story = story()
  return {
    components: { Story },
    setup() {
      const isChecked = useSyncedChecked(context.args)
      return { args: context.args, isChecked }
    },
    template: `
      <div class="space-y-4">
        <h3 class="mb-2 text-sm font-semibold">토글 상태: {{ isChecked ? 'ON' : 'OFF' }}</h3>
        <Story v-bind="args" v-model:checked="isChecked" />
        <p class="text-sm text-gray-600">클릭하여 토글 상태를 변경해보세요.</p>
      </div>
    `,
  }
}

const withDefaultStatesGrid = (_story: () => any, context: { args: ToggleStoryProps }) => {
  return {
    components: { Toggle },
    setup() {
      return { args: context.args }
    },
    template: `
      <div class="grid gap-4" style="grid-template-columns: 50px 80px 80px 80px 80px;">
        <div>&nbsp;</div>
        <h3 class="text-marker">Enabled</h3>
        <h3 class="text-marker">Hover</h3>
        <h3 class="text-marker">Focus</h3>
        <h3 class="text-marker">Disabled</h3>

        <h3 class="text-marker font-bold">Off</h3>
        <Toggle v-bind="args" :checked="false" />
        <Toggle v-bind="args" :checked="false" class="dsds-toggle-unchecked-hover!" />
        <Toggle v-bind="args" :checked="false" class="dsds-toggle-unchecked-focus!" />
        <Toggle v-bind="args" :checked="false" disabled />

        <h3 class="text-marker font-bold">On</h3>
        <Toggle v-bind="args" :checked="true" />
        <Toggle v-bind="args" :checked="true" class="dsds-toggle-checked-hover!" />
        <Toggle v-bind="args" :checked="true" class="dsds-toggle-checked-focus!" />
        <Toggle v-bind="args" :checked="true" disabled />
      </div>
    `,
  }
}

export const Default: Story = {
  name: "기본",
  parameters: {
    docs: {
      description: {
        story:
          "가장 단순한 형태의 Toggle입니다. 기본적으로 꺼진 상태에서 시작하며, 클릭하거나 키보드로 ON/OFF를 전환할 수 있습니다.",
      },
    },
  },
  decorators: [withCheckedBinding],
}

export const Checked: Story = {
  name: "체크됨",
  args: {
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: "켜진 상태에서 시작하는 Toggle입니다. 초기값을 true로 설정해 기본 선택 상태를 표현합니다.",
      },
    },
  },
  decorators: [withCheckedBinding],
}

export const Sizes: Story = {
  argTypes: {
    size: hideOnControls,
  },
  parameters: {
    docs: {
      description: {
        story: "Small, Medium, Large 세 가지 크기를 한눈에 비교할 수 있는 예제입니다.",
      },
    },
  },
  decorators: [withSizesGrid],
}

export const WithStateTracking: Story = {
  name: "상태 추적",
  parameters: {
    docs: {
      description: {
        story: "컴포넌트 외부에서 상태를 추적해 문구로 표시하는 예제입니다.",
      },
    },
  },
  decorators: [withStateTrackingLayout],
}

export const DefaultStates: Story = {
  tags: ["!dev"],
  argTypes: {
    checked: hideOnControls,
    disabled: hideOnControls,
    size: hideOnControls,
  },
  parameters: {
    docs: {
      description: {
        story: "활성/비활성, 호버, 포커스 상태 등을 한 화면에서 검토할 수 있는 QA용 스냅샷입니다.",
      },
    },
  },
  decorators: [withDefaultStatesGrid],
}
