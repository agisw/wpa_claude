<template>
  <main class="dsds-main-page">
    <Toast v-bind="args" />
    <Page>
      <PageHeader title="Dashboard">
        <template #tools>
          <v-btn variant="primary"
                 @click="args.onAction('Arr요청')"> Arr 요청 </v-btn>
          <v-divider vertical />
          <v-btn variant="secondary"
                 @click="openAuthModal">권한관리</v-btn>
          <v-btn variant="secondary"
                 @click="openNoticeModal">공지설정</v-btn>
          <v-btn variant="secondary"
                 @click="args.onAction('금지Lot설정')">금지Lot설정</v-btn>
          <v-divider vertical />
          <Breadcrumb :items="[
            { title: 'PEMS(Foundry)', type: 'text' },
            { title: 'Eval Lot Arrange System', type: 'text' },
            { title: 'Dashboard', type: 'text' },
          ]"
                      ellipsis />
        </template>

        <template #filter>
          <CleanLotDashboardHeaderFilterBody @action="args.onAction" />
        </template>
      </PageHeader>

      <PageBody>

        <PageBodyTools class="flex-end">
          검색결과: {{ gridRef?.getDataProvider()?.getRowCount() }}건
          <v-divider vertical />
          <v-select size="small"
                    v-model="selectedPerPage"
                    :items="itemsPerPageData"
                    class="max-w-24" />
        </PageBodyTools>

        <FakeRealGrid ref="gridRef"
                      class="dsds-page-body-content"
                      v-model="gridViewRef"
                      :columns="columns"
                      :rowCount="50"
                      :emptyState="args.emptyState"
                      :selectionStyle="args.selectionStyle" />

        <Pagination :length="10"
                    :startPage="1"
                    v-model="currentPage"
                    class="mt-3!" />
      </PageBody>
    </Page>

    <!-- 권한관리 다이얼로그 -->
    <Modal v-model="showAuthModal"
             size="2xl">
      <AuthManageModalBody v-model="showAuthModal"
                            :emptyState="args.emptyState" />
    </Modal>

    <!-- 공지설정 다이얼로그 -->
    <Modal v-model="showNoticeModal"
             size="2xl">
      <NoticeModalBody v-model="showNoticeModal"
                        :emptyState="args.emptyState" />
    </Modal>

    <!-- Lot Arrange 요청 다이얼로그 -->
    <Modal v-model="showLotArrangeRequestModal"
             size="2xl">
      <LotArrangeRequestModalBody v-model="showLotArrangeRequestModal"
                                   :noticeContent="args.noticeContent"
                                   :emptyState="args.emptyState" />
    </Modal>
  </main>
</template>

<script setup lang="ts">
import {
  Breadcrumb,
  Page,
  PageBody,
  PageBodyTools,
  PageHeader,
  Pagination,
  RealGrid,
  Toast,
  VBtn,
  VSelect
} from "@/components/ui"
import { FakeRealGrid, createColumnsFromNames } from "@/faker"
import type { GridView } from "realgrid"
import { ref, shallowRef, watch } from "vue"
import AuthManageModalBody from "./AuthManageModalBody.vue"
import CleanLotDashboardHeaderFilterBody from "./CleanLotDashboardHeaderFilterBody.vue"
import LotArrangeRequestModalBody from "./LotArrangeRequestModalBody.vue"
import NoticeModalBody from "./NoticeModalBody.vue"

const gridRef = ref<InstanceType<typeof RealGrid> | null>(null)
const gridViewRef = shallowRef<GridView>()

watch(() => gridViewRef.value,
  (newVal) => {
    if (newVal) {
      newVal.onCellClicked = function (grid, clickData) {
        const field = clickData.column
        console.log("field:", field)
        if (field === "einecnno") {
          showLotArrangeRequestModal.value = true
        }
      }
    }
  }
)

const statusTypeMap = {
  작성중: {
    code: "1",
    style: "background: #ccf0f9 !important; border-color: #b3e8f6 !important; color: #007492 !important; ",
  },
  요청중: {
    code: "2",
    style: "background: #ffe9c8 !important; border-color: #ffe1b5 !important; color: #80591c !important; ",
  },
  "재 요청중": {
    code: "3",
    style: "background: #ffe9c8 !important; border-color: #ffe1b5 !important; color: #80591c !important; ",
  },
  보류: {
    code: "4",
    style: "background: #ffd9d7 !important; border-color: #ffc7c3 !important; color: #ff4337 !important; ",
  },
  완료: {
    code: "9",
    style: "background: #e4e9ed !important; border-color: #dadfe4 !important; color: #565e66 !important; ",
  },
  취소: {
    code: "9",
    style: "background: #e4e9ed !important; border-color: #dadfe4 !important; color: #565e66 !important; ",
  },
} as Record<string, { code: string; style: string }>

const commonStatusStyle =
  "border: 1px solid !important; border-radius: 2px !important; height: 16px !important; line-height: 16px !important; margin-left: 4px !important; margin-right: 4px !important; text-align: center; "


const columns = createColumnsFromNames([
  ["lineName", { autoFilter: true }],
  ["process", { autoFilter: true, header: { text: "적용공정" } }],
  ["procId", { autoFilter: true }],
  ["einecnno", { styleName: "link-text", autoFilter: true, header: { text: "EINECN No." } }],
  [
    "arrStatus",
    {
      autoFilter: true,
      header: { text: "Status" },
      renderer: {
        type: "html",
        callback: function (grid, cell) {
          const rowData = grid.getJsonRows()[cell.index!.dataRow!] as Record<string, any>
          const statusTypeName = rowData[cell.index!.fieldName!]
          const statusInfo = statusTypeMap[statusTypeName] || statusTypeMap["완료"]

          let style = commonStatusStyle + statusInfo.style

          let html = ``
          html += `<div style='` + style + `'>`
          html += statusTypeName
          html += `</div>`
          return html
        },
      },
    },
  ],
  ["evaluationPurpose", { autoFilter: true, header: { text: "Title" } }],
  ["koreanNameWithEnglish", { fieldName: "createUser", autoFilter: true, header: { text: "Create User" } }],
  ["createDate", { autoFilter: true }],
  ["koreanNameWithEnglish", { fieldName: "requestUser", autoFilter: true, header: { text: "Request User" } }],
  ["requestDate", { autoFilter: false }],
  ["koreanNameWithEnglish", { fieldName: "arrangeUser", autoFilter: true, header: { text: "Arrange User" } }],
  ["arrangeDate", { autoFilter: false }],
])
const currentPage = ref(1)
const itemsPerPageData = ["50개씩보기", "30개씩보기", "20개씩보기"]
const selectedPerPage = ref(itemsPerPageData[0])

// 다이얼로그 상태
const showAuthModal = ref(false)
const showNoticeModal = ref(false)
const showLotArrangeRequestModal = ref(false)

// 다이얼로그 열기 함수
const openAuthModal = () => {
  showAuthModal.value = true
}

const openNoticeModal = () => {
  showNoticeModal.value = true
}

defineProps<{
  args: any,
}>()

</script>