import {
  Breadcrumb,
  Page,
  PageBody,
  PageBodyTools,
  PageHeader,
  PageHeaderFilter,
  Pagination,
  RealGrid,
  Toast,
  VBtn,
  Modal,
  VSelect,
} from "@/components/ui"
import { createColumnsFromNames, FakeRealGrid } from "@/faker/realgrid"
import { hideOnControls, textControl } from "@/stories/utils"
import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { SelectionStyle } from "realgrid"
import { ref } from "vue"
import AuthManageModalBody from "./_components/AuthManageModalBody.vue"
import AuthManageModalBodyRaw from "./_components/AuthManageModalBody.vue?raw"
import CleanLotDashboardHeaderFilterBody from "./_components/CleanLotDashboardHeaderFilterBody.vue"
import CleanLotDashboardHeaderFilterBodyRaw from "./_components/CleanLotDashboardHeaderFilterBody.vue?raw"
import CleanLotDashboardLayout from "./_components/CleanLotDashboardLayout.vue"
import LotArrangeRequestModalBody from "./_components/LotArrangeRequestModalBody.vue"
import LotArrangeRequestModalBodyRaw from "./_components/LotArrangeRequestModalBody.vue?raw"
import NoticeModalBody from "./_components/NoticeModalBody.vue"
import SearchModifyTcpHeaderFilterBody from "./_components/SearchModifyTcpHeaderFilterBody.vue"
import SearchModifyTcpHeaderFilterBodyRaw from "./_components/SearchModifyTcpHeaderFilterBody.vue?raw"

// Function to extract template content from raw Vue file
function extractTemplate(rawVue: string): string {
  const templateStartRegex = /^<template>/m
  const templateEndRegex = /^<\/template>/m
  const startMatch = rawVue.match(templateStartRegex)
  const endMatch = rawVue.match(templateEndRegex)
  if (!startMatch || !endMatch) {
    throw new Error("Template not found in Vue file")
  }
  const startIndex = startMatch.index! + startMatch[0].length
  const endIndex = endMatch.index!
  return rawVue.substring(startIndex, endIndex).trim()
}

// Function to create dialog template with extracted component template
function createModalTemplate(
  tpl: string,
  searchStr: string | RegExp,
  componentRaw: string,
  options?: {
    indentLevel?: number
  }
): string {
  let componentTemplate = extractTemplate(componentRaw)
  // Replace noticeContent with the binding
  // Add indent to each line of componentTemplate
  const indent = " ".repeat(options?.indentLevel || 0)
  componentTemplate = componentTemplate
    .split("\n")
    .map((line) => (line.trim() ? indent + line : line))
    .join("\n")
  return tpl.replace(searchStr, componentTemplate)
}

const components = {
  Page,
  PageHeaderFilter,
  PageHeader,
  PageBody,
  PageBodyTools,
  Pagination,
  Breadcrumb,
  CleanLotDashboardLayout,
  CleanLotDashboardHeaderFilterBody,
  SearchModifyTcpHeaderFilterBody,
  LotArrangeRequestModalBody,
  AuthManageModalBody,
  NoticeModalBody,
  FakeRealGrid,
  Modal,
  VSelect,
  VBtn,
  Toast,
}

const meta: Meta = {
  title: "Examples/PEMS/Common",
  parameters: {
    layout: "fullscreen",
    docs: { codePanel: true },
  },
  argTypes: {
    onAction: { action: "action", ...hideOnControls },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const AUTH_MANAGE_DIALOG_TPL = `
<div class="flex flex-col items-center">
  <Modal v-bind="args" v-model="open" size="2xl">
    <AuthManageModalBody :emptyState="args.emptyState" />
  </Modal>
</div>
`

export const AuthManageModal: Story = {
  name: "Auth Manage Modal",
  argTypes: {
    emptyState: {
      control: { type: "boolean" },
      description: "Toggle empty state for the grid",
    },
  },
  args: {
    emptyState: false,
  },
  render: (args: any) => ({
    components,
    setup() {
      const modalOpen = ref(true)
      return { args, open: modalOpen }
    },
    template: AUTH_MANAGE_DIALOG_TPL,
  }),
  parameters: {
    docs: {
      source: {
        code: createModalTemplate(AUTH_MANAGE_DIALOG_TPL, /<AuthManageModalBody.*\/>/, AuthManageModalBodyRaw),
      },
    },
  },
}

const LOT_ARRANGE_REQUEST_FORM_TPL = `
<div class="flex flex-col items-center">
  <Modal v-bind="args" v-model="open" size="2xl">
    <LotArrangeRequestModalBody :noticeContent="args.noticeContent" :emptyState="args.emptyState" />
  </Modal>
</div>
`

export const LotArrangeRequest: Story = {
  argTypes: {
    noticeContent: textControl(),
    emptyState: {
      control: { type: "boolean" },
      description: "Toggle empty state for the grid",
    },
  },
  args: {
    emptyState: false,
    noticeContent:
      "* EINECN NO는 평가용 EINECN NO를 입력하시고 Line ID, 적용공정, Proc ID는 선택하세요. <br/> * StepSeq는 시작 StepSeq를 선택하세요. <br/> * 평가 Lot 수는 0으로 초기화되며, LOT Arrange 시에 선택한 Lot 수로 변경됩니다. <br/> * 평가Level은 L1~L4 또는 E 중에서 선택하세요. <br/> * 양산 출하 여부는 Y/N 중에서 선택하세요. <br/> * 요청자는 로그인한 사용자로 자동 입력됩니다.",
  },
  render: (args: any) => ({
    components,
    setup() {
      const modalOpen = ref(true)
      return { args, open: modalOpen }
    },
    template: LOT_ARRANGE_REQUEST_FORM_TPL,
  }),
  parameters: {
    docs: {
      source: {
        code: createModalTemplate(
          LOT_ARRANGE_REQUEST_FORM_TPL,
          /<LotArrangeRequestModalBody .* \/>/,
          LotArrangeRequestModalBodyRaw
        ),
      },
    },
  },
}

const CLEAN_LOT_DASHBOARD_TPL = `
  <main class="dsds-main-page">
    <Toast v-bind="args" />
    <Page>
      <PageHeader title="Dashboard">
        <template #tools>
          <v-btn variant="primary" @click="args.onAction('Arr요청')"> Arr 요청 </v-btn>
          <v-divider vertical />
          <v-btn variant="secondary" @click="openAuthModal">권한관리</v-btn>
          <v-btn variant="secondary" @click="openNoticeModal">공지설정</v-btn>
          <v-btn variant="secondary" @click="args.onAction('금지Lot설정')">금지Lot설정</v-btn>
          <v-divider vertical />
          <Breadcrumb
            :items="[
              { title: 'PEMS(Foundry)', type: 'text' },
              { title: 'Eval Lot Arrange System', type: 'text' },
              { title: 'Dashboard', type: 'text' },
            ]"
            ellipsis
          />
        </template>
        <template #filter>
          <CleanLotDashboardHeaderFilterBody @action="args.onAction" />
        </template>
      </PageHeader>
      <PageBody class="flex flex-col justify-center items-center">
        <div class="flex w-full gap-1.5 mb-2.5! items-center justify-end typo-sok-caption-12-400">
          <div class="flex-1"></div>
          <div class="mx-auto text-neutral-3rd">검색결과: {{ gridRef?.getDataProvider()?.getRowCount() }}건</div>
          <v-divider vertical />
          <v-select size="small" v-model="selectedPerPage" :items="itemsPerPageData" class="max-w-[89px]!" />
        </div>
        <FakeRealGrid ref="gridRef" v-model="gridViewRef" :columns="columns" class="flex-1" :rowCount="50" :emptyState="args.emptyState" :selectionStyle="args.selectionStyle"/>
        <Pagination :length="10" :startPage="1" v-model="currentPage" class="mt-3!" />
      </PageBody>
    </Page>
    <!-- 권한관리 다이얼로그 -->
    <Modal v-model="showAuthModal" size="2xl">
      <AuthManageModalBody v-model="showAuthModal" :emptyState="args.emptyState" />
    </Modal>

    <!-- 공지설정 다이얼로그 -->
    <Modal v-model="showNoticeModal" size="2xl">
      <NoticeModalBody v-model="showNoticeModal" :emptyState="args.emptyState" />
    </Modal>

    <!-- Lot Arrange 요청 다이얼로그 -->
    <Modal v-model="showLotArrangeRequestModal" size="2xl">
      <LotArrangeRequestModalBody v-model="showLotArrangeRequestModal" :noticeContent="args.noticeContent" :emptyState="args.emptyState" />
    </Modal>
  </main>
`

export const CleanLotDashboard: Story = {
  name: "Clean Lot Dashboard List",
  args: { collapsed: false, emptyState: false },
  argTypes: {
    collapsed: hideOnControls,
    selectionStyle: SelectionStyle.COLUMNS,
    emptyState: {
      control: { type: "boolean" },
      description: "Toggle empty state for the grid",
    },
  },
  render: (args: any) => ({
    components,
    setup() {
      return { args }
    },
    template: `<CleanLotDashboardLayout :args="args" />`,
  }),
  parameters: {
    docs: {
      source: {
        code: createModalTemplate(
          CLEAN_LOT_DASHBOARD_TPL,
          /<CleanLotDashboardHeaderFilterBody .*\/>/,
          CleanLotDashboardHeaderFilterBodyRaw,
          { indentLevel: 4 }
        ),
      },
    },
  },
}

const SEARCH_MODIFY_TCP_VIEW_TPL = `
  <main class="dsds-main-page">
    <Page>
      <PageHeader title="Search/Modify TCP">
        <template #tools>
          <Breadcrumb :items="[
            { title: 'Home', type: 'text' },
            { title: 'Test Control Plan', type: 'text' },
            { title: 'Search/Modify TCPs', type:'text' },
          ]" ellipsis />
        </template>
        <template #filter>
          <SearchModifyTcpHeaderFilterBody @action="args.onAction" />
        </template>
      </PageHeader>
      <PageBody>
        <PageBodyTools class="flex-end">
          <div class="text-neutral-3rd">검색결과: {{ gridRef?.getDataProvider()?.getRowCount() }}건</div>
          <v-divider vertical />
          <v-select size="small" v-model="selectedPerPage" :items="itemsPerPageData" class="max-w-[89px]" />
          <v-btn variant="secondary" size="small">Remove TCP</v-btn>
          <v-btn variant="secondary" size="small">Remove TCP(Not reusable)</v-btn>
        </PageBodyTools>
        <FakeRealGrid ref="gridRef" :columns="columns"  :rowCount="50"/>
        <Pagination :length="10" :startPage="1" v-model="currentPage" class="mt-3!" />
      </PageBody>
    </Page>
  </main>
`

export const SearchModifyTcp: Story = {
  name: "Search/Modify TCP",
  args: {
    collapsed: false,
  },
  render: (args: any) => ({
    components,
    setup() {
      const gridRef = ref<InstanceType<typeof RealGrid> | null>(null)
      const columns = createColumnsFromNames([
        ["lineName", { autoFilter: true }],
        ["procId", { autoFilter: true }],
        ["partId", { autoFilter: true }],
        ["isYn", { autoFilter: true, header: { text: "MultiYn" }, width: 70 }],
        ["stepSeq", { autoFilter: true }],
        ["einecnno", { autoFilter: true }],
        ["evaluationPurpose", { header: { text: "Title" } }],
        ["createDate", { header: { text: "Reg.Date" } }],
        ["createUser", { autoFilter: true, fieldName: "regUser", header: { text: "Reg.User" } }],
        ["createUser", { autoFilter: true, fieldName: "updateUser", header: { text: "Upd.User" } }],
        ["arrStatus", { autoFilter: true, header: { text: "Status" } }],
        ["tcpType", { autoFilter: true }],
      ])
      const currentPage = ref(1)
      const itemsPerPageData = ["50개씩 보기", "30개씩 보기", "20개씩 보기"]
      const selectedPerPage = ref(itemsPerPageData[0])

      return { args, columns, gridRef, itemsPerPageData, selectedPerPage, currentPage }
    },
    template: SEARCH_MODIFY_TCP_VIEW_TPL,
  }),
  parameters: {
    docs: {
      source: {
        code: createModalTemplate(
          SEARCH_MODIFY_TCP_VIEW_TPL,
          /<SearchModifyTcpHeaderFilterBody .* \/>/,
          SearchModifyTcpHeaderFilterBodyRaw.trim().replace(/^ /gm, "         ")
        ),
      },
    },
  },
}
