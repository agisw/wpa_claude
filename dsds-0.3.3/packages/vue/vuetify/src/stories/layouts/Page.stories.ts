import {
  Breadcrumb,
  Page,
  PageBody,
  PageBodyTools,
  PageHeader,
  PageHeaderFilter,
  PageHeaderFilterRow,
  PagePanel,
  PagePanelHeader,
  PagePanelTools,
  Pagination,
  PageFilterDivider,
  PageFilterToolGroup,
  Splitter,
  SplitterHandle,
  SplitterPanel,
  VBtn,
  VSelect,
  VTextField,
  Markdown,
} from "@/components/ui"
import { FakeRealGrid, createColumnsFromNames } from "@/faker"
import { dedent } from "@/lib/utils"
import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref } from "vue"

const components = {
  Page,
  PageHeader,
  PageHeaderFilter,
  PageHeaderFilterRow,
  PageBody,
  PageBodyTools,
  Pagination,
  FakeRealGrid,
  Breadcrumb,
  VBtn,
  VSelect,
  Splitter,
  SplitterPanel,
  SplitterHandle,
  PagePanel,
  PagePanelHeader,
  PagePanelTools,
  PageFilterToolGroup,
  PageFilterDivider,
  VTextField,
  Markdown,
}

const meta: Meta = {
  title: "Layouts/Page/Patterns",
  parameters: {
    layout: "fullscreen",
    docs: { codePanel: true },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

const baseColumns = createColumnsFromNames([
  ["lineName", { autoFilter: true }],
  ["procId", { autoFilter: true }],
  ["einecnno", { autoFilter: true, header: { text: "EINECN No." } }],
  ["evaluationPurpose", { header: { text: "Title" } }],
  ["createUser", { autoFilter: true }],
  ["createDate", { header: { text: "Reg.Date" } }],
  ["arrStatus", { autoFilter: true, header: { text: "Status" } }],
])

const BASIC_STRUCTURE_TEMPLATE = `
  <Page :class="containerClass">
    <PageHeader title="Single Page Layout">
      <template #tools>
        <v-btn variant="secondary">문서 링크</v-btn>
        <v-divider vertical />
        <Breadcrumb :items="[
          { title: 'Home', type: 'text' },
          { title: 'Overview', type: 'text' },
          { title: 'Single Page Layout', type: 'text' },
        ]" ellipsis />
      </template>
    </PageHeader>
    <PageBody>
      <Markdown :content="overviewMarkdown" />
    </PageBody>
  </Page>
`

const FILTERABLE_DASHBOARD_TEMPLATE = `
  <Page :class="containerClass" class="overflow-hidden">
    <PageHeader title="Filterable Dashboard">
      <template #tools>
        <v-btn variant="primary" size="small">ARR 요청</v-btn>
        <v-divider vertical />
        <v-btn variant="secondary" size="small">권한관리</v-btn>
        <v-btn variant="secondary" size="small">공지설정</v-btn>
        <v-divider vertical />
        <Breadcrumb :items="[
          { title: 'Home', type: 'text' },
          { title: 'Dashboards', type: 'text' },
          { title: 'Filterable', type: 'text' },
        ]" ellipsis />
      </template>
      <template #filter>
        <PageHeaderFilterRow>
          <v-btn size="small">검색</v-btn>
          <v-btn size="small" variant="secondary">조건 저장</v-btn>
          <v-btn size="small" variant="secondary">조건 불러오기</v-btn>

          <div class="col-span-1 rounded-sm border border-neutral-200 p-0.5 bg-neutral-50 text-neutral-600">
            필터 영역에 폼 혹은 콤보 박스를 배치합니다.
          </div>
        </PageHeaderFilterRow>
      </template>
    </PageHeader>
    <PageBody>
      <PageBodyTools>
        검색결과: {{ resultCount }}건
        <v-divider vertical />
        <v-select size="small" v-model="selectedPerPage" :items="itemsPerPage" class="max-w-24" />
      </PageBodyTools>
      <div class="flex-1 flex flex-col gap-3 min-h-0">
        <FakeRealGrid :columns="columns"  :rowCount="50" />
        <Pagination :length="10" v-model="currentPage" class="mt-3!" />
      </div>
    </PageBody>
  </Page>
`

const SPLIT_WORKSPACE_TEMPLATE = `
  <Page :class="containerClass">
    <PageHeader title="Alarm Summary">
      <template #tools>
        <v-btn variant="secondary" size="small">매뉴얼</v-btn>
        <v-divider vertical />
        <Breadcrumb :items="[
          { title: 'FDC', type: 'text' },
          { title: 'Interlock', type: 'text' },
          { title: 'Alarm Summary', type: 'text' },
        ]" ellipsis />
      </template>
    </PageHeader>
    <PageBody class="flex-1 p-0!">
      <Splitter class="h-full" direction="horizontal">
        <SplitterPanel :defaultWidth="300" class="border-r border-neutral-100 bg-neutral-50 p-4">
          <h3 class="typo-title-20-600 mb-2">조회 조건</h3>
          <p class="text-neutral-600">
            Splitter를 사용해 좌측에 검색 패널을 고정하고 우측에 데이터를 배치합니다.
          </p>
        </SplitterPanel>
        <SplitterHandle />
        <SplitterPanel>
          <Splitter direction="vertical" class="h-full">
            <SplitterPanel :defaultSize="45">
              <PagePanel>
                <PagePanelHeader>
                  Alarm History
                  <template #tools>
                    <PageFilterToolGroup>
                      <v-btn variant="secondary" size="small">Column 설정</v-btn>
                      <v-btn variant="secondary" size="small">Excel Export</v-btn>
                    </PageFilterToolGroup>
                  </template>
                </PagePanelHeader>
                <FakeRealGrid :columns="columns" :rowCount="15" class="flex-1" />
              </PagePanel>
            </SplitterPanel>
            <SplitterHandle />
            <SplitterPanel>
              <PagePanel>
                <PagePanelHeader>
                  Chart 분석
                  <template #tools>
                    <PageFilterToolGroup>
                      <v-select size="small" class="w-24" v-model="selectedChartType" :items="chartTypes" />
                      <v-select size="small" class="w-24" v-model="selectedCategory" :items="[
                        { title: 'All', value: 'all' },
                        { title: 'Register', value: 'register' },
                        { title: 'Unregister', value: 'unregister' },
                      ]" />
                      <v-text-field size="small" class="w-24" placeholder="Rank" />
                    </PageFilterToolGroup>
                  </template>
                </PagePanelHeader>
                <PageFilterDivider />
                <PagePanelTools>
                  <PageFilterToolGroup>
                    <v-btn variant="secondary" size="small">Copy</v-btn>
                    <v-btn variant="secondary" size="small">Raw Data</v-btn>
                  </PageFilterToolGroup>
                  <span class="ml-auto text-neutral-500">Total Alarm Count: 20건</span>
                </PagePanelTools>
                <div class="flex-1 rounded-sm border border-neutral-200 bg-neutral-50 p-6">
                  차트 영역 (커스텀 컴포넌트로 대체)
                </div>
              </PagePanel>
            </SplitterPanel>
          </Splitter>
        </SplitterPanel>
      </Splitter>
    </PageBody>
  </Page>
`

export const BasicStructure: Story = {
  name: "기본 페이지 뼈대",
  render: (_, { viewMode }) => ({
    components,
    setup() {
      const containerClass = viewMode === "docs" ? "h-[480px]" : "h-screen"
      const overviewMarkdown = dedent(`
        ### 레이아웃 목적

        \`PageHeader\` 와 \`PageBody\` 를 조합해 단일 페이지 정보를 전달하는 가장 단순한 패턴입니다.

        ### 툴바

        \`PageHeader\` 의 \`#tools\` 슬롯을 사용하면 우측에 문서 링크 \`Breadcrumb\`,  액션 버튼 등을 배치할 수 있습니다.

        ### 본문

        \`PageBody\` 는 기본적으로 패딩과 \`flex\` 레이아웃이 설정되어 있어 다양한 콘텐츠 구성이 가능합니다.
      `)

      return { overviewMarkdown, containerClass }
    },
    template: BASIC_STRUCTURE_TEMPLATE,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "가장 단순한 구성을 통해 PageHeader와 PageBody의 기본 역할을 소개합니다. 전체 높이를 확보하려면 외부 컨테이너에 고정 높이나 flex 레이아웃을 적용하세요.",
      },
      source: {
        code: BASIC_STRUCTURE_TEMPLATE.trim(),
      },
    },
  },
}

export const FilterableDashboard: Story = {
  name: "헤더 필터 + 본문",
  render: (_, { viewMode }) => ({
    components,
    setup() {
      const containerClass = viewMode === "docs" ? "h-[480px]" : "h-screen"
      const currentPage = ref(1)
      const itemsPerPage = ["50개씩 보기", "30개씩 보기", "20개씩 보기"]
      const selectedPerPage = ref(itemsPerPage[0])
      const resultCount = 50

      return { currentPage, itemsPerPage, selectedPerPage, resultCount, columns: baseColumns, containerClass }
    },
    template: FILTERABLE_DASHBOARD_TEMPLATE,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "헤더 필터와 PageBodyTools를 조합해 검색 결과 수, 페이징, 결과 그리드를 한 화면에 배치하는 패턴입니다. PageHeaderFilterRow를 사용하면 필터 영역을 자유롭게 구성할 수 있습니다.",
      },
      source: {
        code: FILTERABLE_DASHBOARD_TEMPLATE.trim(),
      },
    },
  },
}

export const SplitWorkspace: Story = {
  name: "분할 뷰 페이지",
  render: (_, { viewMode }) => ({
    components,
    setup() {
      const containerClass = viewMode === "docs" ? "h-[480px]" : "h-screen"
      const chartTypes = [
        { title: "Cumulative", value: "cumulative" },
        { title: "Comparison", value: "comparison" },
        { title: "Percentage", value: "percentage" },
      ]
      const selectedChartType = ref(chartTypes[0].value)
      const selectedCategory = ref("all")

      return {
        columns: baseColumns,
        chartTypes,
        selectedChartType,
        selectedCategory,
        containerClass,
      }
    },
    template: SPLIT_WORKSPACE_TEMPLATE,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Splitter와 PagePanel 계열 컴포넌트를 조합해 복잡한 분석 화면을 구성하는 예시입니다. 상단/하단, 좌/우로 영역을 분할해 정보 탐색과 데이터를 동시에 제공할 수 있습니다.",
      },
      source: {
        code: SPLIT_WORKSPACE_TEMPLATE.trim(),
      },
    },
  },
}
