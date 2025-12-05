import type { Meta, StoryObj } from "@storybook/vue3-vite"
import {
  FormField,
  FormLabel,
  FormTools,
  PageHeaderFilter,
  PageHeaderFilterRow,
  VBtn,
  VCheckbox,
  VSelect,
  VTextField,
  VueDatePicker,
  VTabs,
  VTab,
  PageFilter,
  PageFilterSection,
} from "@/components/ui"
import { ref } from "vue"

const components = {
  FormField,
  FormLabel,
  FormTools,
  PageFilter,
  PageFilterSection,
  PageHeaderFilter,
  PageHeaderFilterRow,
  VBtn,
  VCheckbox,
  VSelect,
  VTab,
  VTabs,
  VTextField,
  VueDatePicker,
}

const meta: Meta = {
  title: "Layouts/Form",
  parameters: {
    layout: "fullscreen",
    docs: { codePanel: true },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

const getContainerClass = (viewMode?: string) => (viewMode === "docs" ? "" : "flex h-screen flex-col bg-page-bg")

const simpleGridTemplate = `
<div :class="containerClass">
  <PageFilter>
    <PageFilterSection class="grid grid-cols-2">
      <FormField label="Line" required>
        <VSelect v-model="line" :items="selectItems('Line')" placeholder="라인 선택" clearable />
      </FormField>
      <FormField label="Area">
        <VSelect v-model="area" :items="selectItems('Area')" placeholder="선택" clearable />
      </FormField>
      <FormField label="SDWT">
        <VSelect v-model="sdwt" :items="selectItems('SDWT')" placeholder="선택" clearable />
      </FormField>
      <FormField label="EQ Model">
        <VSelect v-model="eqModel" :items="selectItems('EQM')" placeholder="선택" clearable />
      </FormField>
      <FormField label="Keyword" class="col-span-2">
        <VTextField v-model="keyword" placeholder="검색어를 입력하세요" />
        <template #tools>
          <VBtn variant="primary" size="small">검색</VBtn>
          <VBtn variant="secondary" size="small">초기화</VBtn>
        </template>
      </FormField>
    </PageFilterSection>
  </PageFilter>
</div>
`.trim()

const fieldToolsSlotTemplate = `
<div :class="containerClass">
  <div class="mx-auto grid w-80 gap-4">
    <FormField label="기간" class="col-span-2">
      <template #tools>
        <VTabs v-model="periodType" variant="button" size="small">
          <VTab value="range">Range</VTab>
          <VTab value="relative">Relative</VTab>
        </VTabs>
      </template>
      <VueDatePicker v-if="periodType === 'range'" v-model="rangeValue" range enableTimePicker />
      <div v-else class="grid grid-cols-2 gap-3">
        <VSelect v-model="relativeType" :items="relativeItems" placeholder="단위" />
        <VSelect :items="Array.from({ length: relativeType === 'day' ? 30 : 24 }, (_, i) => ({ title: '-' + (i + 1), value: i + 1 }))" placeholder="기간" />
      </div>
    </FormField>
  </div>
</div>
`.trim()

const formFieldAttachedTools = `
<div :class="containerClass">
  <PageFilter class="p-3">
    <PageHeaderFilterRow>
      <FormField label="Line" required>
        <VSelect v-model="line" :items="selectItems('Line')" placeholder="라인 선택" clearable />
      </FormField>
      <FormField>
        <FormTools class="ml-auto flex items-center gap-2">
          <v-divider vertical />
          <VBtn variant="secondary">불러오기</VBtn>
          <VBtn variant="secondary">초기화</VBtn>
          <VBtn variant="primary">저장</VBtn>
        </FormTools>
      </FormField>
    </PageHeaderFilterRow>
  </PageFilter>
</div>
`.trim()

export const SimpleGrid: Story = {
  name: "2열 폼 구성",
  render: (_, { viewMode }) => ({
    components,
    setup() {
      const containerClass = getContainerClass(viewMode)
      const line = ref<string | null>("Line-1")
      const area = ref<string | null>(null)
      const sdwt = ref<string | null>(null)
      const eqModel = ref<string | null>("EQM-1")
      const keyword = ref("")
      const autoRun = ref(true)

      const selectItems = (prefix: string) =>
        Array.from({ length: 5 }, (_, index) => ({
          title: `${prefix}-${index + 1}`,
          value: `${prefix}-${index + 1}`,
        }))

      return {
        containerClass,
        line,
        area,
        sdwt,
        eqModel,
        keyword,
        autoRun,
        selectItems,
      }
    },
    template: simpleGridTemplate,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "`FormField`와 `FormTools`를 2열 그리드에 배치한 기본 폼 구성입니다. `Examples/PEMS` 대시보드의 검색 조건 블록을 단순화했습니다.",
      },
      source: {
        code: simpleGridTemplate,
      },
    },
  },
}

export const FieldToolsSlot: Story = {
  name: "툴 슬롯 활용",
  render: (_, { viewMode }) => ({
    components,
    setup() {
      const containerClass = getContainerClass(viewMode)
      const periodType = ref("range")
      const rangeValue = ref<[Date, Date] | null>([new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), new Date()])
      const relativeType = ref("day")

      const relativeItems = [
        { title: "Day", value: "day" },
        { title: "Hour", value: "hour" },
      ]

      return { containerClass, periodType, rangeValue, relativeType, relativeItems }
    },
    template: fieldToolsSlotTemplate,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "`FormField`의 `tools` 슬롯에 탭과 선택 컴포넌트를 배치하여 기간 입력 방식을 전환하는 패턴입니다. `Examples/EES-UI` 사이드 패널에서 사용한 구성입니다.",
      },
      source: {
        code: fieldToolsSlotTemplate,
      },
    },
  },
}

export const FormFieldAttachedTools: Story = {
  name: "FormField와 인접한 Tools",
  render: (_, { viewMode }) => ({
    components,
    setup() {
      const containerClass = getContainerClass(viewMode)
      const line = ref<string | null>("Line-1")

      const selectItems = (prefix: string) =>
        Array.from({ length: 5 }, (_, index) => ({
          title: `${prefix}-${index + 1}`,
          value: `${prefix}-${index + 1}`,
        }))

      return {
        containerClass,
        line,
        selectItems,
      }
    },
    template: formFieldAttachedTools,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "`FormField` 두개를 연속으로 쓰고 마지막 `FormField` 에 `FormTools`로 액션 버튼을 나열한 예시입니다. `Examples/PEMS` 다이얼로그 헤더에서 영감을 받았습니다.",
      },
      source: {
        code: formFieldAttachedTools,
      },
    },
  },
}
