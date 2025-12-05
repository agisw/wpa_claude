import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { computed, ref, watch } from "vue"

import { VSwitch } from "@/components/ui"
import { booleanControl, hideOnControls, selectControl } from "./utils"

type SwitchStoryProps = {
  modelValue?: boolean
  disabled?: boolean
  size?: "large" | "medium" | "small"
  class?: string | string[] | Record<string, boolean>
}

const meta: Meta<SwitchStoryProps> = {
  title: "Components/Toggle (VSwitch)",
  component: VSwitch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: `
\`VSwitch\`는 Vuetify의 \`v-switch\` 를 래핑해 DSDS 디자인 시스템과 일관된 토글 스위치를 제공합니다. v-model API만 유지하며, 크기(size)와 비활성화(disabled) 상태를 지원합니다.

### 주요 특징 <features />
- Vue 3 v-model(\`modelValue\`) 및 \`update:modelValue\` 이벤트 호환
- Disabled 상태 지원
- Small, Medium, Large 세 가지 크기 제공
- DSDS 스타일 토큰 기반 시각 표현
        `.trim(),
      },
    },
  },
  args: {
    modelValue: false,
    disabled: false,
    size: "medium",
  },
  argTypes: {
    modelValue: booleanControl,
    disabled: booleanControl,
    size: selectControl(["large", "medium", "small"]),
    class: hideOnControls,
  },
} satisfies Meta<SwitchStoryProps>

export default meta

type Story = StoryObj<typeof meta>

function useSyncedModel(args: SwitchStoryProps) {
  const model = ref(args.modelValue ?? false)

  watch(
    () => args.modelValue,
    (value) => {
      const next = value ?? false
      if (next !== model.value) {
        model.value = next
      }
    }
  )

  watch(model, (value) => {
    if (args.modelValue !== value) {
      args.modelValue = value
    }
  })

  return model
}

const withModelBinding = (story: () => any, context: { args: SwitchStoryProps }) => {
  const Story = story()
  return {
    components: { Story },
    setup() {
      const model = useSyncedModel(context.args)
      return { args: context.args, model }
    },
    template: `<Story v-bind="args" v-model="model" />`,
  }
}

const withSizesGrid = (_story: () => any, context: { args: SwitchStoryProps }) => {
  return {
    components: { VSwitch },
    setup() {
      const model = useSyncedModel(context.args)
      const commonArgs = computed(() => {
        const { size: _ignoredSize, ...rest } = context.args
        return rest
      })

      const smallArgs = computed(() => ({ ...commonArgs.value, size: "small" }))
      const mediumArgs = computed(() => ({ ...commonArgs.value, size: "medium" }))
      const largeArgs = computed(() => ({ ...commonArgs.value, size: "large" }))

      return { model, smallArgs, mediumArgs, largeArgs }
    },
    template: `
      <div class="grid gap-6" style="grid-template-columns: repeat(3, 100px);">
        <div class="flex flex-col items-center gap-2">
          <span class="text-marker text-xs">Small</span>
          <VSwitch v-bind="smallArgs" v-model="model" />
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-marker text-xs">Medium</span>
          <VSwitch v-bind="mediumArgs" v-model="model" />
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-marker text-xs">Large</span>
          <VSwitch v-bind="largeArgs" v-model="model" />
        </div>
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
          "가장 단순한 형태의 스위치입니다. 기본적으로 꺼진 상태에서 시작하며, 클릭 또는 키보드로 ON/OFF를 전환합니다.",
      },
    },
  },
  decorators: [withModelBinding],
}

export const Checked: Story = {
  name: "체크됨",
  args: {
    modelValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: "켜진 상태에서 시작하는 스위치 예제입니다. 초기값을 true로 설정해 기본 선택 상태를 보여줍니다.",
      },
    },
  },
  decorators: [withModelBinding],
}

export const Disabled: Story = {
  name: "비활성화",
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "사용자가 조작할 수 없는 비활성화 상태의 스위치입니다.",
      },
    },
  },
  decorators: [withModelBinding],
}

export const Sizes: Story = {
  argTypes: {
    size: hideOnControls,
  },
  parameters: {
    docs: {
      description: {
        story: "Small, Medium, Large 세 가지 크기를 한 화면에서 비교할 수 있습니다.",
      },
    },
  },
  decorators: [withSizesGrid],
}
