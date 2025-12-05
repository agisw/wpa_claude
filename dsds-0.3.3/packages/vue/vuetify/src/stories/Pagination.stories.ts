import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref, computed } from "vue"
import { Pagination, ToggletipContent, ToggletipFrame, ToggletipFooter, VBtn } from "@/components/ui"
import { defaultSteps } from "./Toggletip.stories"

const meta: Meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    docs: {
      layout: "centered",
      codePanel: true,
      description: {
        component: `
DSDS Pagination 컴포넌트는 페이지 탐색에 필요한 **숫자형**과 **도트형** 네비게이션 패턴을 제공합니다. 반응형 레이아웃과 키보드 접근성을 고려해 설계되었으며,
현재 페이지 상태를 \`v-model\` 바인딩으로 간편하게 제어할 수 있습니다.

### 주요 기능 <features />
- 숫자/도트 두 가지 표기 방식 지원 (\`isDot\`)
- \`v-model\` 기반 양방향 페이지 상태 동기화
- 첫/이전/다음/마지막 이동을 위한 이벤트 훅 (\`@first\`, \`@prev\`, \`@next\`, \`@last\`)
- 시맨틱 버튼과 스크린리더 레이블로 접근성 확보
- 디자인 토큰 기반 스타일로 다크 모드 및 다양한 테마와 조화

### 사용 시나리오 <usages />
- 리스트/테이블 데이터 페이지네이션
- 카드/갤러리 뷰처럼 페이지 수가 많은 콘텐츠 탐색
- 콤팩트한 모바일 뷰에서 도트형 페이지 표시
        `.trim(),
      },
    },
  },
  argTypes: {
    isDot: { control: "boolean" },
    startPage: { control: "number" },
    selectedPage: { control: "number" },
    length: { control: "number" },
    modelValue: { control: "number" },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  isDot: false,
  length: 5,
  startPage: 1,
  selectedPage: 1,
}

const PAGINATION_NUMBER_TEMPLATE = `
  <div class="flex flex-col items-center justify-center">
    <Pagination
      v-bind="args"
      v-model="currentPage"
      @page-change="handlePageChange"
      @first="handleFirst"
      @prev="handlePrev"
      @next="handleNext"
      @last="handleLast"
    />
    <p class="mt-4">Current Page: {{ currentPage }}</p>
  </div>
`

const PAGINATION_DOT_TEMPLATE = `
  <div class="flex flex-col items-center justify-center">
    <Pagination
      v-bind="args"
      v-model="currentPage"
      @page-change="handlePageChange"
    />
    <p class="mt-4">Current Page: {{ currentPage }}</p>
  </div>
`

export const NumberStyle: Story = {
  name: "숫자",
  args: { ...defaultArgs },
  render: (args: any) => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(args.selectedPage || 1)

      const handlePageChange = (page: number) => {
        console.log("Page changed to:", page)
        currentPage.value = page
      }

      const handleFirst = () => console.log("First clicked")
      const handlePrev = () => console.log("Prev clicked")
      const handleNext = () => console.log("Next clicked")
      const handleLast = () => console.log("Last clicked")

      return {
        args,
        currentPage,
        handlePageChange,
        handleFirst,
        handlePrev,
        handleNext,
        handleLast,
      }
    },
    template: PAGINATION_NUMBER_TEMPLATE,
  }),
  parameters: {
    docs: {
      source: {
        code: PAGINATION_NUMBER_TEMPLATE.trim(),
      },
    },
  },
}

export const DotStyle: Story = {
  name: "점",
  args: { ...defaultArgs, isDot: true },
  render: (args: any) => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(args.selectedPage || 1)

      const handlePageChange = (page: number) => {
        console.log("Page changed to:", page)
        currentPage.value = page
      }

      return {
        args,
        currentPage,
        handlePageChange,
      }
    },
    template: PAGINATION_DOT_TEMPLATE,
  }),
  parameters: {
    docs: {
      source: {
        code: PAGINATION_DOT_TEMPLATE.trim(),
      },
    },
  },
}

export const DotStyleUsage: Story = {
  name: "도트 스타일 사용 예시",
  args: {
    ...defaultArgs,
  },
  render: () => ({
    components: {
      ToggletipFrame,
      ToggletipFooter,
      ToggletipContent,
      VBtn,
    },
    setup() {
      const steps = defaultSteps
      const totalPages = Math.max(steps.length, 1)
      const fallbackStep = steps[0] ?? { title: "", description: "" }
      const clampPage = (value: number) => {
        const isNumber = typeof value === "number" && Number.isFinite(value)
        const normalized = isNumber ? Math.floor(value) : 1
        return Math.min(Math.max(normalized, 1), totalPages)
      }

      const page = ref(clampPage(1))

      const currentStep = computed(() => {
        return steps[clampPage(page.value) - 1] ?? fallbackStep
      })

      const goToPage = (next: number) => {
        page.value = clampPage(next)
      }

      const handlePrev = () => {
        goToPage(page.value - 1)
      }

      const handleNext = () => {
        goToPage(page.value + 1)
      }

      const handleSkip = () => {}

      return {
        page,
        totalPages,
        currentStep,
        frameSize: "medium",
        nextLabel: "다음",
        prevLabel: "이전",
        skipLabel: "건너뛰기",
        doneLabel: "완료",
        showSkip: true,
        handlePageChange: goToPage,
        handlePrev,
        handleNext,
        handleSkip,
      }
    },
    template: `
      <div class="flex h-[320px] w-full items-center justify-center bg-[var(--color-bg-surface-base)]">
        <ToggletipFrame :size="frameSize"
                          :title="currentStep.title">
          <ToggletipContent>
            {{ currentStep.description }}
          </ToggletipContent>

          <template #footer>
            <ToggletipFooter :page="totalPages"
                              :current-page="page"
                              @change="handlePageChange">
              <VBtn v-if="showSkip"
                    size="small"
                    @click="handleSkip()">
                {{ skipLabel }}
              </VBtn>
              <VBtn v-if="page > 1"
                    size="small"
                    @click="handlePrev">
                {{ prevLabel }}
              </VBtn>
              <VBtn variant="secondary"
                    size="small"
                    @click="handleNext()">
                {{ page === totalPages ? doneLabel : nextLabel }}
              </VBtn>
            </ToggletipFooter>
          </template>
        </ToggletipFrame>
      </div>
    `,
  }),
}
