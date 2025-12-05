import { ChevronDownIcon, HistoryIcon } from "@/components/icons"
import {
  FormField,
  PageFilter,
  PageFilterDivider,
  PageFilterSection,
  PageFilterSectionFooter,
  PageFilterToolGroup,
  PagePanel,
  PagePanelHeader,
  PagePanelTools,
  ScrollArea,
  VBtn,
  VDivider,
  VSelect,
  VTabs,
  VTabsWindow,
  VTabsWindowItem,
} from "@/components/ui"
import { FakeRealGrid, createColumnsFromNames } from "@/faker/realgrid"
import { dedent } from "@/lib/utils"
import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { computed, ref } from "vue"

const components = {
  ChevronDownIcon,
  FakeRealGrid,
  FormField,
  HistoryIcon,
  PageFilter,
  PageFilterDivider,
  PageFilterSection,
  PageFilterSectionFooter,
  PageFilterToolGroup,
  PagePanel,
  PagePanelHeader,
  PagePanelTools,
  ScrollArea,
  VBtn,
  VDivider,
  VSelect,
  VTabs,
  VTabsWindow,
  VTabsWindowItem,
}

const meta: Meta = {
  title: "Layouts/Page/PageFilter",
  parameters: {
    layout: "fullscreen",
    docs: {
      codePanel: true,
      description: {
        component: dedent(`
          PageFilter 계열 컴포넌트는 페이지 내에서 보조 조건을 정리하거나 데이터 탐색 워크플로우를 구성할 때 사용하는 사이드/보조 패널 빌딩 블록입니다.
          1/2단 필터, 선택 / 분석 패널 등으로 사용할 수 있으며 \`PagePanelHeader\`, \`PagePanelTools\` \`Splitter\` 등과 조합해
          검색 폼, 결과 툴, 분석 도구를 한 화면에서 연결합니다.

          ## 구성 요소 (Anatomy)

          ![page-filter-anatomy](/static/images/dsds/pagefilter-anatomy.png)
          `),
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

const createOptionItems = (prefix: string, count = 3) =>
  Array.from({ length: count }, (_, index) => ({
    title: `${prefix}-${index + 1}`,
    value: `${prefix}-${index + 1}`,
  }))

export const SidePageFilter: Story = {
  name: "사이드 필터 패널",
  render: (_, { viewMode }) => ({
    components,
    setup() {
      const containerClass = viewMode === "docs" ? "" : "h-screen"
      const periodTabs = ref("datepicker")
      const period = ref<[Date, Date] | null>(null)
      const activeCategory = ref("eqpId")
      const relativeType = ref("day")
      const relativeAmount = ref(1)

      const categories = [
        { value: "eqpId", label: "EQP ID" },
        { value: "ppid", label: "PPID" },
        { value: "recipeId", label: "Recipe ID" },
      ]

      const relativeAmountItems = computed(() =>
        Array.from({ length: relativeType.value === "day" ? 30 : 24 }, (_, index) => ({
          title: `-${index + 1}`,
          value: index + 1,
        }))
      )

      const categoryTabs = computed(() =>
        categories.map((category) => ({
          value: category.value,
          label: category.label,
          closable: false,
        }))
      )

      return {
        containerClass,
        periodTabs,
        period,
        relativeType,
        relativeAmount,
        relativeAmountItems,
        categoryTabs,
        activeCategory,
        categories,
        HistoryIcon,
        filterOptions: {
          line: createOptionItems("Line"),
          area: createOptionItems("Area"),
          sdwt: createOptionItems("SDWT"),
          eqModel: createOptionItems("EQM"),
        },
      }
    },
    template: `
      <div class="bg-page-bg" :class="containerClass">
        <PageFilter class="mx-auto h-full w-80">
          <PageFilterSection>
            <VBtn variant="secondary">Load Bookmark</VBtn>
          </PageFilterSection>
          <PageFilterDivider />
          <ScrollArea>
            <PageFilter>
              <PageFilterSection class="grid grid-cols-2">
                <FormField label="Line">
                  <VSelect :items="filterOptions.line" placeholder="선택" clearable />
                </FormField>
                <FormField label="Area">
                  <VSelect :items="filterOptions.area" placeholder="선택" clearable />
                </FormField>
                <FormField label="SDWT">
                  <VSelect :items="filterOptions.sdwt" placeholder="선택" clearable />
                </FormField>
                <FormField label="EQ Model">
                  <VSelect :items="filterOptions.eqModel" placeholder="선택" clearable />
                </FormField>
                <FormField label="Period"
                           class="col-span-2">
                  <template #tools>
                    <VTabs v-model="periodTabs" variant="button" size="small">
                      <VTab value="datepicker">Ranged</VTab>
                      <VTab value="relative">Relative</VTab>
                    </VTabs>
                  </template>

                  <VTabsWindow v-model="periodTabs">
                    <VTabsWindowItem value="datepicker">
                      <div class="rounded-sm border border-neutral-200 bg-neutral-50 p-4 text-neutral-600">
                        DatePicker를 연동해 기간을 선택하세요.
                      </div>
                    </VTabsWindowItem>
                    <VTabsWindowItem value="relative">
                      <div class="grid grid-cols-2 gap-x-3">
                        <VSelect :items="[
                          { title: 'Day', value: 'day' },
                          { title: 'Hour', value: 'hour' },
                        ]" v-model="relativeType" placeholder="기준" />
                        <VSelect :items="relativeAmountItems" v-model="relativeAmount" placeholder="기간" />
                      </div>
                    </VTabsWindowItem>
                  </VTabsWindow>
                </FormField>

                <PageFilterSectionFooter class="col-span-2">
                  <VBtn>Search</VBtn>
                  <VBtn variant="secondary">Reset</VBtn>
                  <VDivider vertical />
                  <VBtn variant="secondary" iconOption="before" :icon="HistoryIcon">History</VBtn>
                </PageFilterSectionFooter>
              </PageFilterSection>
            </PageFilter>
          </ScrollArea>
        </PageFilter>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: dedent(`
          PageFilter과 PageFilterSection을 사용해 스크롤 가능한 사이드 패널을 구성하는 예시입니다.
          항목별로 FormField를 배치하고 PageFilterSectionFooter로 액션 버튼을 정리합니다.
        `),
      },
    },
  },
}

export const SelectionPageFilter: Story = {
  name: "데이터 선택 패널",
  render: (_, { viewMode }) => ({
    components,
    setup() {
      const containerClass = viewMode === "docs" ? "" : "h-screen"
      const columns = createColumnsFromNames([
        ["id", { header: { text: "EQP ID" }, width: 80 }],
        ["count", { header: { text: "Count" }, width: 40 }],
      ])

      const fdcModelColumns = computed(() =>
        createColumnsFromNames([
          ["id", { header: { text: "EQP ID" }, fakeOptions: { min: 1, prefix: "EQPID" } }],
          ["count", { header: { text: "Count" }, width: 30 }],
        ])
      )

      const categoryTabs = [
        { title: "EQP", value: "eqp" },
        { title: "Recipe", value: "recipe" },
        { title: "Lot", value: "lot" },
      ]
      const activeCategory = ref(categoryTabs[0].value)

      return { columns, categoryTabs, activeCategory, containerClass, fdcModelColumns, ChevronDownIcon }
    },
    template: `
      <div class="bg-page-bg" :class="containerClass">
        <PageFilter class="flex w-full flex-col">
          <PageFilterSection class="grid">
            <FormField label="대상 선택">
              <template #tools>
                <VBtn variant="secondary" size="small">전체 선택</VBtn>
                <VSelect size="small" class="w-28" :items="categoryTabs" v-model="activeCategory" item-title="title" item-value="value" />
              </template>
            </FormField>
            <div class="min-h-50 h-50 rounded-sm border border-neutral-200">
              <FakeRealGrid :columns="columns" :rowCount="6" hideIndicator />
            </div>

            <PageFilterSectionFooter>
              <VBtn>추가</VBtn>
              <VBtn variant="secondary">삭제</VBtn>
              <VDivider vertical />
              <VBtn variant="secondary">즐겨찾기 저장</VBtn>
            </PageFilterSectionFooter>
            </PageFilterSection>

          <PageFilterDivider doubleLine />

          <PageFilterSection class="grid grid-cols-2">
            <FormField label="FDC Model"
                      class="col-span-2 h-50 max-h-50">
              <template #tools>
                <VSelect size="small"
                        class="w-28"
                        :items="[
                          { title: 'EQP ID', value: 'eqpId' },
                          { title: 'PPID', value: 'ppid' },
                          { title: 'Recipe ID', value: 'recipeId' },
                          { title: 'Lot ID', value: 'lotId' },
                          { title: 'Alarm ID', value: 'alarmId' },
                        ]"
                        v-model="fdcModelType" />
              </template>
              <FakeRealGrid checkBar
                            hideIndicator
                            :columns="fdcModelColumns"
                            :rowCount="6" />
            </FormField>
            <div class="col-span-2 flex items-center justify-center">
              <VBtn variant="secondary"
                    size="small"
                    iconOnly
                    :icon="ChevronDownIcon" />
            </div>
          </PageFilterSection>
        </PageFilter>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: dedent(`
          \`PageFilter\`와 제목만 있는 \`FormField\`와 \`tools\` 템플릿 도구, \`PageFilterSectionFooter\` 를 활용해
          다중 선택이 필요한 영역을 구성합니다. \`PageFilterSectionFooter\`는 액션 버튼을 하단에 고정합니다.
          서로다른 섹션 간의 구분은 이중선(\`<PageFilterDivider doubleLine />\`)을 활용하세요
        `),
      },
    },
  },
}

export const PageHeaderPanelFilterToolGroup: Story = {
  name: "PagePanel 헤더 필터 도구 그룹핑",
  render: (_, { viewMode }) => ({
    components,
    setup() {
      const containerClass = viewMode === "docs" ? "min-h-100 h-100" : "h-screen"
      const chartTypes = [
        { title: "Cumulative", value: "cumulative" },
        { title: "Comparison", value: "comparison" },
        { title: "Percentage", value: "percentage" },
      ]
      const selectedChartType = ref(chartTypes[0].value)

      return {
        containerClass,
        chartTypes,
        selectedChartType,
        columns: createColumnsFromNames([
          ["lineName", {}],
          ["procId", {}],
          ["evaluationPurpose", { header: { text: "Title" } }],
        ]),
      }
    },
    template: `
      <PagePanel class="bg-page-bg w-full" :class="containerClass">
        <PagePanelHeader>
          분석 패널
          <template #title-tools>
            <PageFilterToolGroup>
              <VSelect size="small" class="w-28" v-model="selectedChartType" :items="chartTypes" item-title="title" item-value="value" />
              <VTextField size="small" class="w-24" placeholder="Rank" />
            </PageFilterToolGroup>
          </template>
          <template #tools>
            <PageFilterToolGroup>
              <VBtn variant="secondary" size="small">Excel Export</VBtn>
              <VBtn variant="secondary" size="small">Raw Data</VBtn>
            </PageFilterToolGroup>
          </template>

          <v-divider vertical />

          <PageFilterToolGroup>
            <VBtn variant="secondary" size="small">Copy</VBtn>
            <VBtn variant="secondary" size="small">즐겨찾기</VBtn>
          </PageFilterToolGroup>
          <VBtn size="small">Run</VBtn>
        </PagePanelHeader>

        <PageFilterDivider />

        <FakeRealGrid :columns="columns" :rowCount="12" class="flex-1" />

      </PagePanel>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "PageFilter 계열 컴포넌트와 PageFilterToolGroup을 결합해 분석 영역을 구성하는 패턴입니다. title-tools와 tools 슬롯을 구분해 상단 UI를 깔끔하게 배치할 수 있습니다.",
      },
    },
  },
}
