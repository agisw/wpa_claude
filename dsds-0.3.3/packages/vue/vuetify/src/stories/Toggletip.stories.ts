import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { computed, ref, watch } from "vue"
import { Toggletip, ToggletipFrame, ToggletipContent, ToggletipFooter, VBtn } from "@/components/ui"
import { booleanControl, hideOnControls, numberControl, selectControl, textControl } from "./utils"

interface Step {
  title: string
  description: string
}

export const defaultSteps: Step[] = [
  {
    title: "데이터 현황 빠르게 이해하기",
    description: "대시보드 상단에서는 서비스의 주요 지표를 한눈에 비교할 수 있어요.",
  },
  {
    title: "필요한 지표만 집중해서 보기",
    description: "필터를 적용해 팀 또는 프로젝트별로 봐야 하는 데이터만 남겨보세요.",
  },
  {
    title: "이상 징후에 빠르게 대응하기",
    description: "그래프에서 피크를 발견하면 세부 분석으로 이동해 상세한 원인을 파악할 수 있어요.",
  },
]
type ToggletipProps = InstanceType<typeof Toggletip>["$props"]

type StoryArgs = ToggletipProps & {
  currentPage?: number
  steps?: Step[]
  showFooter?: boolean
  showSkip?: boolean
  size?: "small" | "medium"
  nextLabel?: string
  prevLabel?: string
  skipLabel?: string
  doneLabel?: string
  resetOnClose?: boolean
}

const meta: Meta<StoryArgs> = {
  title: "Components/Toggletip",
  component: Toggletip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: `Radix Toggletip 패턴을 Vuetify \`VMenu\` 기반으로 포팅한 컴포넌트입니다.\n\n- 트리거 슬롯을 통해 버튼 또는 아이콘을 자유롭게 제어할 수 있어요.\n- \`ToggletipFrame\`, \`ToggletipContent\` 등 하위 컴포넌트로 구조를 재사용할 수 있습니다.
**예제 코드**

\`\`\`html
<Toggletip v-model:open="open">
  <template #default="{ close }">
    <ToggletipFrame :size="frameSize" :title="currentStep.title">
      <ToggletipContent>
        {{ currentStep.description }}
      </ToggletipContent>

      <template #footer>
        <ToggletipFooter :page="totalPages"
                          :current-page="page"
                          @change="handlePageChange">
          <VBtn v-if="showSkip"
                size="small"
                @click="handleSkip(close)">
            {{ skipLabel }}
          </VBtn>
          <VBtn v-if="page > 1"
                size="small"
                @click="handlePrev">
            {{ prevLabel }}
          </VBtn>
          <VBtn variant="secondary"
                size="small"
                @click="handleNext(close)">
            {{ page === totalPages ? doneLabel : nextLabel }}
          </VBtn>
        </ToggletipFooter>
      </template>
    </ToggletipFrame>
  </template>
</Toggletip>
\`\`\`

        `,
      },
    },
  },
  argTypes: {
    open: booleanControl,
    currentPage: numberControl,
    size: selectControl(["small", "medium"]),
    triggerLabel: textControl(),
    nextLabel: textControl(),
    prevLabel: textControl(),
    skipLabel: textControl(),
    doneLabel: textControl(),
    contentClass: textControl(),
    resetOnClose: booleanControl,
    steps: hideOnControls,
    showFooter: hideOnControls,
    showSkip: hideOnControls,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const defaultArgs: StoryArgs = {
  open: true,
  currentPage: 1,
  size: "medium" as const,
  triggerLabel: "도움말 열기",
  nextLabel: "다음",
  prevLabel: "이전",
  skipLabel: "건너뛰기",
  doneLabel: "완료",
  contentClass: "",
  resetOnClose: true,
  steps: defaultSteps,
  showFooter: true,
  showSkip: true,
}

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args: StoryArgs) => ({
    components: {
      Toggletip,
      ToggletipFrame,
      ToggletipContent,
      ToggletipFooter,
      VBtn,
    },
    setup() {
      const open = ref(args.open ?? false)
      const page = ref(args.currentPage ?? 1)

      watch(
        () => args.open,
        (value) => {
          if (typeof value === "boolean") {
            open.value = value
          }
        }
      )

      watch(
        () => args.currentPage,
        (value) => {
          if (typeof value === "number" && Number.isFinite(value)) {
            page.value = Math.max(1, Math.floor(value))
          }
        }
      )

      const steps = computed(() => args.steps ?? defaultSteps)
      const totalPages = computed(() => Math.max(steps.value.length, 1))
      const frameSize = computed(() => args.size ?? "medium")
      const showFooter = computed(() => args.showFooter !== false)
      const showSkip = computed(() => args.showSkip !== false)
      const nextLabel = computed(() => args.nextLabel ?? defaultArgs.nextLabel ?? "다음")
      const prevLabel = computed(() => args.prevLabel ?? defaultArgs.prevLabel ?? "이전")
      const skipLabel = computed(() => args.skipLabel ?? defaultArgs.skipLabel ?? "건너뛰기")
      const doneLabel = computed(() => args.doneLabel ?? defaultArgs.doneLabel ?? "완료")
      const resetOnClose = computed(() => args.resetOnClose !== false)
      const triggerLabel = computed(() => args.triggerLabel ?? defaultArgs.triggerLabel ?? "도움말 열기")
      const contentClass = computed(() => args.contentClass ?? "")

      watch(
        [steps, page],
        () => {
          const total = totalPages.value
          if (page.value > total) {
            page.value = total
          }
          if (page.value < 1) {
            page.value = 1
          }
        },
        { immediate: true }
      )

      const currentStep = computed(() => {
        const fallback = steps.value[0] ?? { title: "", description: "" }
        return steps.value[page.value - 1] ?? fallback
      })

      watch(open, (isOpen, wasOpen) => {
        if (!isOpen && wasOpen && resetOnClose.value) {
          page.value = 1
        }
      })

      const handlePageChange = (next: number) => {
        const total = totalPages.value
        page.value = Math.min(Math.max(next, 1), total)
      }

      const handlePrev = () => {
        if (page.value > 1) {
          page.value -= 1
        }
      }

      const handleNext = (close: () => void) => {
        const total = totalPages.value
        if (page.value >= total) {
          close()
          return
        }
        page.value += 1
      }

      const handleSkip = (close: () => void) => {
        close()
      }

      return {
        args,
        open,
        page,
        steps,
        totalPages,
        currentStep,
        frameSize,
        showFooter,
        showSkip,
        nextLabel,
        prevLabel,
        skipLabel,
        doneLabel,
        triggerLabel,
        contentClass,
        handlePageChange,
        handlePrev,
        handleNext,
        handleSkip,
      }
    },
    template: `
      <div class="flex h-[320px] w-full items-center justify-center bg-[var(--color-bg-surface-base)]">
        <Toggletip v-model:open="open"
                   :trigger-label="triggerLabel"
                   :content-class="contentClass">
          <template #default="{ close }">
            <ToggletipFrame :size="frameSize"
                             :title="currentStep.title">
              <ToggletipContent>
                {{ currentStep.description }}
              </ToggletipContent>

              <template v-if="showFooter"
                        #footer>
                <ToggletipFooter :page="totalPages"
                                  :current-page="page"
                                  @change="handlePageChange">
                  <VBtn v-if="showSkip"
                        size="small"
                        @click="handleSkip(close)">
                    {{ skipLabel }}
                  </VBtn>
                  <VBtn v-if="page > 1"
                        size="small"
                        @click="handlePrev">
                    {{ prevLabel }}
                  </VBtn>
                  <VBtn variant="secondary"
                        size="small"
                        @click="handleNext(close)">
                    {{ page === totalPages ? doneLabel : nextLabel }}
                  </VBtn>
                </ToggletipFooter>
              </template>
            </ToggletipFrame>
          </template>
        </Toggletip>
      </div>
    `,
  }),
}

export const WithoutFooter: Story = {
  args: {
    ...defaultArgs,
    showFooter: false,
    showSkip: false,
    steps: [defaultSteps[0]],
  },
  render: Default.render,
}
