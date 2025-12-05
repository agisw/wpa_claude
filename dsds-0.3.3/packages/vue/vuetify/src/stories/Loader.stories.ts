import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { onBeforeUnmount, ref } from "vue"

import { Loader, VBtn, Page, PageBody } from "@/components/ui"
import { dedent } from "@/lib/utils"

const components = { Loader, VBtn, Page, PageBody }

interface LoaderStoryProps {
  message?: string
  hideMessage?: boolean
  scrim?: boolean
  contained?: boolean
  size?: "xs" | "small" | "medium" | "large" | "xl"
  delay?: number
}

const meta: Meta<LoaderStoryProps> = {
  title: "Components/Loader",
  component: Loader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      codePanel: true,
      description: {
        component: dedent(`
          DSDS Loader는 전역 상태를 가리지 않으면서 **전체 화면 오버레이**를 표시해 긴 비동기 작업을 안내하는 컴포넌트입니다.

          - Vuetify \`v-overlay\` 기반으로, \`message\` prop으로 안내 문구를 변경할 수 있습니다.
          - \`hideMessage\`를 사용하면 스피너만 노출하여 최소한의 정보만 전달하도록 설정할 수 있습니다.
          - \`scrim\`을 활성화하면 배경을 어둡게 처리해 집중도를 높일 수 있습니다.
          - \`contained\`는 부모 컨테이너 범위 안에서만 오버레이를 표시할 때 사용합니다.
          - \`delay\`를 지정하면 지정한 시간(ms) 동안 대기 후 스피너가 표시되어, 짧은 작업에서는 깜빡임을 피할 수 있습니다.
          - 기본 오버레이는 \`pointer-events: none\`으로 구성되어 있어 하위 영역과 상호 작용을 차단하지 않습니다.
        `).trim(),
      },
    },
  },
  argTypes: {
    message: {
      control: "text",
      description: "오버레이 가운데에 노출되는 안내 문구",
    },
    hideMessage: {
      control: "boolean",
      description: "안내 문구를 숨길지 여부",
    },
    scrim: {
      control: "boolean",
      description: "배경 스크림(어두운 레이어)을 표시할지 여부",
    },
    contained: {
      control: "boolean",
      description: "부모 컨테이너 안에 오버레이를 한정할지 여부",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "small", "medium", "large", "xl"],
      description: "스피너 크기",
    },
    delay: {
      control: { type: "number", min: 0, step: 100 },
      description: "스피너가 나타나기까지의 지연 시간(ms)",
    },
  },
  args: {
    message: "Loading…",
    hideMessage: false,
    scrim: false,
    contained: true,
    size: "xl",
    delay: 0,
  },
} satisfies Meta<LoaderStoryProps>

export default meta

type Story = StoryObj<typeof meta>

const LOADER_PLAYGROUND_TEMPLATE = `
  <main class="dsds-main-page" :class="containerClass">
    <Page class="flex-1">
      <Loader v-model="isLoading" v-bind="args" />
      <PageBody class="items-center gap-4">
        <p class="text-neutral-600">
          비동기 통신이나 긴 처리 작업 동안 Loader를 노출해 사용자에게 진행 상황을 알립니다.
        </p>
        <v-btn class="mx-auto" @click="toggleLoading" :disabled="isLoading">
          {{ isLoading ? \`로딩중 (\${remainedTimeSec})\` : '로딩 시작' }}
        </v-btn>
      </PageBody>
    </Page>
  </main>
`

type LoaderSizeOption = NonNullable<LoaderStoryProps["size"]>

const LOADER_SIZE_VARIANTS = [
  {
    size: "xs",
    label: "XS",
    description: "아이콘 버튼이나 미니 카드에 적합한 초소형 스피너",
    message: 'size="xs"',
  },
  {
    size: "small",
    label: "Small",
    description: "콤팩트한 모달·툴팁 내 로딩 상태 표현",
    message: 'size="small"',
  },
  {
    size: "medium",
    label: "Medium",
    description: "일반적인 컨텐츠 영역에 어울리는 기본 크기",
    message: 'size="medium"',
  },
  {
    size: "large",
    label: "Large",
    description: "다이어로그나 카드 전체를 덮는 로딩 표시",
    message: 'size="large"',
  },
  {
    size: "xl",
    label: "XL",
    description: "페이지 전체 오버레이에 사용하는 최대 크기",
    message: 'size="xl"',
  },
] satisfies Array<{
  size: LoaderSizeOption
  label: string
  description: string
  message: string
}>

const LOADER_SIZE_VARIANTS_TEMPLATE = `
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div v-for="variant in variants" :key="variant.size" class="flex flex-col items-center gap-3">
      <div class="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-sm border border-neutral-200">
        <Loader
          v-bind="args"
          :contained="true"
          :size="variant.size"
          :message="variant.message ?? args.message"
          :model-value="true"
        />
      </div>
      <div class="flex flex-col items-center gap-1 text-center">
        <p class="typo-sss-h6-11-600 text-neutral-700">{{ variant.label }}</p>
        <p class="text-sm text-neutral-500">{{ variant.description }}</p>
      </div>
    </div>
  </div>
`

const loaderRender: Story["render"] = (args, { viewMode }) => ({
  components,
  setup() {
    const isLoading = ref(false)
    const remainedTimeSec = ref(3)
    let timer: ReturnType<typeof setInterval> | null = null

    const clearTimer = () => {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }

    const toggleLoading = () => {
      clearTimer()
      isLoading.value = true
      remainedTimeSec.value = 3
      timer = setInterval(() => {
        remainedTimeSec.value -= 1
        if (remainedTimeSec.value <= 0) {
          isLoading.value = false
          clearTimer()
        }
      }, 1000)
    }

    const containerClass = viewMode === "docs" ? "max-h-[400px]! relative" : "h-screen relative"

    onBeforeUnmount(clearTimer)

    return { args, isLoading, toggleLoading, containerClass, remainedTimeSec }
  },
  template: LOADER_PLAYGROUND_TEMPLATE,
})

export const Playground: Story = {
  name: "기본 사용",
  render: loaderRender,
  parameters: {
    docs: {
      description: {
        story: "버튼을 눌러 Loader 오버레이를 토글하면서, 비동기 작업 중에 어떻게 노출되는지 확인할 수 있습니다.",
      },
      source: {
        code: LOADER_PLAYGROUND_TEMPLATE.trim(),
      },
    },
  },
}

export const SizeVariants: Story = {
  name: "Size 옵션 비교",
  args: {
    hideMessage: false,
    scrim: false,
    contained: true,
  },
  argTypes: {
    size: { control: false },
  },
  render: (args) => ({
    components: { Loader },
    setup() {
      return {
        args,
        variants: LOADER_SIZE_VARIANTS,
      }
    },
    template: LOADER_SIZE_VARIANTS_TEMPLATE,
  }),
  parameters: {
    docs: {
      description: {
        story: "`size` prop으로 제공되는 다섯 가지 스피너 크기를 한눈에 비교할 수 있습니다.",
      },
      source: {
        code: LOADER_SIZE_VARIANTS_TEMPLATE.trim(),
      },
    },
  },
}

export const WithCustomMessage: Story = {
  name: "메시지 커스터마이징",
  args: {
    message: "리포트를 준비하고 있습니다…",
  },
  render: loaderRender,
  parameters: {
    docs: {
      description: {
        story: "`message` prop에 커스텀 텍스트를 전달해 사용자에게 더 구체적인 진행 상황을 안내할 수 있습니다.",
      },
      source: {
        code: LOADER_PLAYGROUND_TEMPLATE.trim(),
      },
    },
  },
}

export const WithoutMessage: Story = {
  name: "메시지 숨김",
  args: {
    hideMessage: true,
  },
  render: loaderRender,
  parameters: {
    docs: {
      description: {
        story: "`hideMessage`를 활성화하면 스피너만 표시되어, 기타 UI를 방해하지 않는 최소한의 피드백을 제공합니다.",
      },
      source: {
        code: LOADER_PLAYGROUND_TEMPLATE.trim(),
      },
    },
  },
}

export const WithScrim: Story = {
  name: "Scrim 적용",
  args: {
    scrim: true,
  },
  render: loaderRender,
  parameters: {
    docs: {
      description: {
        story: "`scrim`을 활성화하면 배경을 어둡게 처리하여 진행 중인 작업에 집중하도록 도울 수 있습니다.",
      },
      source: {
        code: LOADER_PLAYGROUND_TEMPLATE.trim(),
      },
    },
  },
}

export const WithDelay: Story = {
  name: "지연 후 표시",
  args: {
    delay: 800,
  },
  render: loaderRender,
  parameters: {
    docs: {
      description: {
        story: "\`delay\` 값을 활용해 스피너 노출을 800ms 지연시켜 짧은 로딩에서 깜빡이는 문제를 줄이는 예시입니다.",
      },
      source: {
        code: LOADER_PLAYGROUND_TEMPLATE.trim(),
      },
    },
  },
}

export const FullscreenOverlay: Story = {
  name: "전체 화면 오버레이",
  args: {
    contained: false,
    scrim: true,
  },
  render: loaderRender,
  parameters: {
    docs: {
      description: {
        story: "`contained`를 비활성화하면 Loader가 상위 레이아웃 전체에 표시되어 전역 상태를 차단할 때 유용합니다.",
      },
      source: {
        code: LOADER_PLAYGROUND_TEMPLATE.trim(),
      },
    },
  },
}
