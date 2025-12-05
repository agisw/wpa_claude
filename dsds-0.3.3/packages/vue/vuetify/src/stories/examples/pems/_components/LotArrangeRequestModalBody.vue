<template>
  <v-card>
    <v-card-title>
      <ModalHeader title="Lot Arrange 요청"
                    @close="emitClose" />
    </v-card-title>

    <v-card-text class="flex flex-col gap-5 overflow-y-auto h-[1163px]!">
      <ModalPanel collapsible
                   title="Information">
        <div class="flex gap-3 min-h-[256px]! max-h-[256px]!">
          <div class="left-panel flex-1 flex flex-col gap-3">
            <NoticeView class="w-full"
                        :noticeCont="noticeContent" />
            <div class="flex flex-col flex-1 gap-2">
              <span class="typo-sok-h6-14-400 flex gap-1 items-center">담당자
                <InformationIcon />
              </span>
              <table class="dsds-table form flex-1">
                <tbody>
                  <tr>
                    <th class="form-label max-w-[50px]!">정</th>
                    <td class="bg-white">
                      <span class="link-text">{{ prodUserInfo.chargeUser }}</span>
                    </td>
                  </tr>
                  <tr class="h-full">
                    <th>부</th>
                    <td class="bg-white">
                      <div class="overflow-y-auto py-1 scrollbar-thin">
                        <template v-for="(value, i) in prodUserInfo.countrUsers"
                                  :key="value">
                          <span class="link-text">{{ value }}</span>
                          <span v-if="i < prodUserInfo.countrUsers.length - 1">, </span>
                        </template>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
          <div class="right-panel flex-1 flex flex-col gap-2">
            <div class="typo-sok-h6-14-400">Change History</div>
            <FakeRealGrid hideIndicator
                          :emptyState="emptyState"
                          :rowCount="8"
                          :columns="changeHistoryColumns" />

          </div>
        </div>
      </ModalPanel>

      <ModalPanel title="Essential Option">
        <table class="dsds-table form">
          <tbody>
            <tr>
              <th class="form-label">Title</th>
              <td colspan="5"
                  class="form-field">
                <VTextField v-model="saveParams.elaTitle"
                            :clearable="isEditable.elaTitle"
                            :disabled="!isEditable.elaTitle"
                            size="small"
                            placeholder="입력하세요"
                            />
              </td>
            </tr>
            <tr>
              <th class="form-label">평가목적</th>
              <td colspan="5"
                  class="form-field">
                <VTextField v-model="saveParams.elaPurpsDesc"
                            :clearable="isEditable.elaPurpsDesc"
                            :disabled="!isEditable.elaPurpsDesc"
                            placeholder="입력하세요"
                            size="small"
                            />
              </td>
            </tr>
            <tr>
              <th class="form-label">EINECN NO</th>
              <td class="form-field w-[255px]!">
                <VTextField v-model="saveParams.einecnNo"
                            placeholder="입력하세요"
                            size="small"
                            clearable
                            readonly>
                  <template #append-inner>
                    <VBtn variant="ghost"
                          size="small"
                          iconOnly
                          :disabled="!isEditable.elaEinecnNoBtn"
                          @click="openEinecnNo">
                      <MagnifyIcon />
                    </VBtn>
                  </template>
                </VTextField>
              </td>
              <th class="form-label w-[255px]!">Line ID</th>
              <td class="form-field">
                <VSelect v-model="saveParams.lineId"
                         :disabled="!_.isEmpty(saveParams.elaId)"
                         :items="lineIdItems"
                         itemTitle="codeName"
                         itemValue="codeId"
                         size="small"
                         placeholder="선택하세요."
                         />
              </td>
              <th class="form-label">적용 공정</th>
              <td class="form-field w-[255px]!">
                <VAutocomplete v-model="saveParams.procName"
                               :disabled="!_.isEmpty(saveParams.elaId)"
                               :items="procNameItems"
                               itemTitle="codeName"
                               itemValue="codeId"
                               size="small"
                               placeholder="선택하세요."
                               />
              </td>
            </tr>
            <tr>
              <th class="form-label">Proc ID</th>
              <td class="form-field w-[255px]!">
                <VAutocomplete v-model="saveParams.procId"
                               :disabled="!_.isEmpty(saveParams.elaId)"
                               :items="procIdItems"
                               itemTitle="codeName"
                               itemValue="codeId"
                               size="small"
                               placeholder="선택하세요."
                               />
              </td>
              <th class="form-label">StepSeq</th>
              <td class="form-field w-[255px]!">
                <VAutocomplete v-model="saveParams.startStepSeq"
                               :disabled="!isEditable.startStepSeq"
                               :items="stepSeqItems"
                               itemTitle="stepSeqDesc"
                               itemValue="stepSeq"
                               itemSelection="stepSeq"
                               size="small"
                               placeholder="선택하세요."
                               hide-details>
                </VAutocomplete>
              </td>
              <th class="form-label">평가 Lot 수</th>
              <td class="form-field w-[255px]!">
                <VTextField v-model="saveParams.lotArrCnt"
                            :clearable="isEditable.lotArrCnt"
                            disabled
                            placeholder="0"
                            size="small"
                            @input="onInputNumber"
                            />
              </td>
            </tr>
            <tr>
              <th class="form-label min-w-[130px]!">
                <div class="flex items-center gap-2">평가Level 선택
                  <v-tooltip location="bottom"
                             contentClass="max-w-[560px]!">
                    <template #activator="{ props }">
                      <InformationIcon v-bind="props"
                                       class="mt-[-2px]!" />
                    </template>
                    <div class="flex flex-col">
                      <div class="typo-caption">
                        L1, L2, L3, L4는 기초평가 또는 ECO 시에 어디까지 보고 pass 할건지 기준인 Qual Level을 나타내며,<br />
                        각각의 항목의 의미는 아래와 같습니다!
                        <ul class="list-disc list-inside mt-1">
                          <li><b>L1</b>: IN FAB에서의 측정 Data(CD, OCD, THK, Defect 등)</li>
                          <li><b>L2</b>:
                            ET(Electrical Test) Data, 전기적 특성을 확인할 수 있는 Data로 성능을 확인하는 Data,
                            FABOUT직후 DC 측정을 통해 L2 DATA 확보
                          </li>
                          <li><b>L3</b>: EDS Data, 수율(YLD)을 확인하는 Data</li>
                          <li><b>L4</b>: 신뢰성 Data(TDDB, HTOL, HTS등...) 제품의 수명 및 내구성을 확인하는 Data</li>
                          <li><b>E</b>: 평가 후 E Type으로 전환 후 Scrap되는 평가</li>
                        </ul>
                      </div>
                    </div>
                  </v-tooltip>
                </div>
              </th>
              <td class="form-field min-w-[200px]! w-[255px]!">
                <div class="flex items-center gap-2 h-5">
                  <v-radio-group v-model="saveParams.lotLevel"
                                 inline>
                    <v-radio value="L1"
                             label="L1" />
                    <v-radio value="L2"
                             label="L2" />
                    <v-radio value="L3"
                             label="L3" />
                    <v-radio value="L4"
                             label="L4" />
                    <v-radio value="E"
                             label="E" />
                  </v-radio-group>
                </div>
              </td>
              <th class="form-label">양산 출하 여부</th>
              <td class="form-field w-[255px]!">
                <v-radio-group v-model="saveParams.shipYn"
                               inline
                               :disabled="!isEditable.shipYn">
                  <v-radio value="Y"
                           label="Y" />
                  <v-radio value="N"
                           label="N" />
                </v-radio-group>
              </td>
              <th class="form-label">요청자</th>
              <td class="py-px! w-[255px]!">
                <VTextField v-model="saveParams.regUserName"
                            disabled
                            size="small" />
              </td>
            </tr>
          </tbody>
        </table>
      </ModalPanel>

      <ModalPanel title="Additional Option">
        <template #title-tools>
          <VBtn :disabled="!isVisibleBtn.addOpt"
                variant="secondary"
                size="small"
                @click="addAdditionalOptionRow"> 추가 </VBtn>

          <VBtn :disabled="!isVisibleBtn.addOpt"
                variant="secondary"
                size="small"
                @click="delAdditionalOptionRow"> 삭제 </VBtn>
        </template>
        <FakeRealGrid hideIndicator
                      :emptyState="emptyState"
                      :columns="lotArrangeColumns"
                      :columnLayout="lotArrangeColumnLayout"
                      class="min-h-[126px]! max-h-[126px]!"
                      :rowCount="2" />
      </ModalPanel>

      <ModalPanel title="Arrange Lot List">
        <FakeRealGrid hideIndicator
                      :emptyState="emptyState"
                      :columns="lotArrangeLotColumns"
                      :columnLayout="lotArrangeLotColumnLayout"
                      class="min-h-[126px]! max-h-[126px]!"
                      :rowCount="3" />
      </ModalPanel>

      <ModalPanel title="Comment">
        <textarea v-model="saveParams.comment"
                  class="dsds-textarea typo-body h-[72px]"
                  placeholder="Comment를 입력하세요."
                  :disabled="!isEditable.comment"></textarea>
      </ModalPanel>
    </v-card-text>

    <v-card-actions>
      <div class="ml-auto text-danger">· Save 후 ‘Lot Arr Request’를 클릭해야 공정 담당자에게 메일링 됩니다.</div>
      <div class="flex items-center gap-1.5">
        <VBtn v-if="isVisibleBtn.lotArrReq"
              @click="confirmLotArrReq"> Lot Arr Request </VBtn>
        <VBtn v-if="isVisibleBtn.reArrReq"
              @click="confirmLotArrRetryReq"> Re Arr Request </VBtn>
        <VBtn v-if="isVisibleBtn.lotArr"
              @click="confirmLotArr"> LOT Arrange </VBtn>
        <VBtn v-if="isVisibleBtn.deleteRequest"
              variant="secondary"
              @click="confirmDelete"> Delete </VBtn>
        <VBtn v-if="isVisibleBtn.save"
              variant="secondary"
              @click="confirmSave"> Save </VBtn>
        <VBtn v-if="isVisibleBtn.cancel"
              variant="secondary"
              @click="emitClose"> Cancel </VBtn>
        <VBtn v-if="isVisibleBtn.edit"
              variant="secondary"
              @click="edit"> Edit </VBtn>
        <VBtn v-if="isVisibleBtn.cancelReq"
              variant="secondary"
              @click="confirmCancelRequest"> Cancel Request </VBtn>
        <VBtn v-if="isVisibleBtn.cancelLotArrReq"
              variant="secondary"
              @click="confirmCancelLotArr">
          Re Arrange 취소
        </VBtn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { InformationIcon, MagnifyIcon } from '@/components/icons'
import { ModalHeader, ModalPanel, VAutocomplete, VBtn, VCard, VCardActions, VCardText, VCardTitle, VRadio, VRadioGroup, VSelect, VTextField, VTooltip } from '@/components/ui'
import { createColumnsFromNames, extendedFakeSource, FakeRealGrid, type ExtendedColumn } from '@/faker/realgrid'

import { pad } from '@/lib/utils'
import type { LayoutItem } from 'realgrid'
import { reactive, ref } from 'vue'
import NoticeView from './NoticeView.vue'

type CodeItem = { codeId: string; codeName: string }

const props = withDefaults(defineProps<{
  collapsed?: boolean,
  emptyState?: boolean
  noticeContent: string,
  modelValue?: boolean
}>(), {
  emptyState: false,
  modelValue: false,
});

// replace manual ref+watch with toRef

const emit = defineEmits<{
  (e: 'action', payload: { message: string }): void,
  (e: 'update:modelValue', value: boolean): void
}>()

function action(msg: string) {
  emit('action', { message: msg })
}

function generateItems(prefix: string, count = 5) {
  return Array.from({ length: count }, (_, i) => ({ codeId: `${prefix}${i + 1}`, codeName: `${prefix} ${i + 1} ` }))
}


const actionTypeColorMap = {
  "요청서 생성": "var(--colors-dioxide-film-blue-df-blue-11)",
  "작성중 저장": "var(--colors-dioxide-film-blue-df-blue-11)",
  "요청중": "var(--colors-dioxide-film-blue-df-blue-11)",
  "재 요청중": "var(--colors-copper-yellow-cu-yellow-11)",
  "보류 처리": "var(--colors-oxygen-red-o-red-09)",
  "요청서 삭제": "var(--colors-oxygen-red-o-red-09)",
  "수정 뒤 저장": "var(--colors-neutral-neutral-15)",
  "할당 완료": "var(--colors-neutral-neutral-15)"
} as Record<string, string>


const changeHistoryColumns = createColumnsFromNames([
  ['arrStatus', {
    width: 90, header: { text: 'Action' }, fakeSourceKey: 'arrActionTypes',
    styleName: '',
    renderer: {
      type: "html",
      callback: function (grid, cell) {
        const rowData = grid.getJsonRows()[cell.index!.dataRow!] as Record<string, any>
        const actionTypeName = rowData[cell.index!.fieldName!]
        const color = actionTypeColorMap[actionTypeName] || "var(--colors-neutral-neutral-15)"

        let html = ``
        html += `<div style='display: flex; align-items: center; gap: 4px;'>`
        html += `  <span style='width: 4px; height: 4px; background-color: ${color}; flex-shrink: 0;'></span>`
        html += `  <span style='color: ${color} !important'>${actionTypeName}</span>`
        html += `</div>`
        return html
      },
    },
  }],
  ['requestDate', { width: 110, header: { text: 'Date' } }],
  ['koreanNameWithEnglish', { width: 90, styleName: 'link-text', header: { text: 'User' } }],
  ['evaluationPurpose', { header: { text: 'Comment' }, width: 100 }]
])

const lotArrangeColumns = createColumnsFromNames([
  ["count", { width: 50, header: { text: "Lot Cnt." } }],
  ["groupId", { width: 70 }],
  ["lotIds", { header: { text: "Lot" }, width: 310 }],
  ["isYn", { width: 65, header: { text: "Random\nY/N" } }],
  ["count", { width: 50, fieldName: "wfCnt", header: { text: "WF Cnt." }, fakeOptions: { min: 1, max: 5 } }],
  ...Array.from(
    { length: 25 },
    (_v, i) =>
      [
        "count",
        {
          fieldName: `wafer${pad(i + 1, 2)}Yn`,
          width: 24,
          header: {
            text: `${i + 1}`,
            styleName: "dsds-realgrid-compact-header",
          },
          styleCallback: (grid, dataCell) => {
            const ret: { styleName?: string } = {}
            if (parseInt(dataCell.value) === i + 1 && dataCell.item?.dataRow === i / 2) {
              return "dsds-realgrid-cell-compact-center dsds-realgrid-cell-bg-selected"
            } else {
              return "dsds-realgrid-cell-compact-center dsds-realgrid-cell-text-disabled"
            }
          },
          fakeOptions: {
            computeFn: () => i + 1,
          },
        },
      ] as [string, Partial<ExtendedColumn>]
  ),
])

const lotArrangeColumnLayout = [
  "count",
  "groupId",
  "lotIds",
  "isYn",
  "wfCnt",
  {
    name: "Slot",
    direction: "horizontal",
    header: {
      text: "Slot IDs",
      styleName: "border-r-0!",
    },
    items: Array.from({ length: 25 }, (_, i) => `wafer${pad(i + 1, 2)}Yn`),
  } as LayoutItem,
]

const lotArrangeLotColumns = createColumnsFromNames([
  ["groupId", { width: 70 }],
  ["lotId", { header: { text: "LotID" }, width: 100 }],
  ["stepSeq", { header: { text: "StepSeq" }, width: 100 }],
  ["stepDesc", { header: { text: "StepDesc" }, width: 150 }],
  ["count", { width: 50, fieldName: "wfCnt", header: { text: "WF Cnt." }, fakeOptions: { min: 1, max: 5 } }],
  ...Array.from(
    { length: 25 },
    (_v, i) =>
      [
        "count",
        {
          fieldName: `wafer${pad(i + 1, 2)}Yn`,
          width: 24,
          header: {
            text: `${i + 1}`,
            styleName: "dsds-realgrid-compact-header",
          },
          styleCallback: (grid, dataCell) => {
            const ret: { styleName?: string } = {}
            if (parseInt(dataCell.value) === i + 1 && dataCell.item?.dataRow === i / 2) {
              return "dsds-realgrid-cell-compact-center dsds-realgrid-cell-bg-selected"
            } else {
              return "dsds-realgrid-cell-compact-center dsds-realgrid-cell-text-disabled"
            }
          },
          fakeOptions: {
            computeFn: () => i + 1,
          },
        },
      ] as [string, Partial<ExtendedColumn>]
  ),
])

const lotArrangeLotColumnLayout = [
  "groupId",
  "lotId",
  "stepSeq",
  "stepDesc",
  {
    name: "Slot",
    direction: "horizontal",
    header: {
      text: "Slot",
      styleName: "border-r-0!",
    },
    items: Array.from({ length: 25 }, (_, i) => `wafer${pad(i + 1, 2)}Yn`),
  } as LayoutItem,
]

const lineIdItems = ref<CodeItem[]>(generateItems('L', 3))
const procNameItems = ref<CodeItem[]>(generateItems('P', 6))
const procIdItems = ref<CodeItem[]>(generateItems('PID', 6))
const stepSeqItems = ref(Array.from({ length: 5 }, (_, i) => ({ stepSeq: `STEPSEQ${i + 1}`, stepSeqDesc: `STEPSEQ${i + 1} : Step Description ${i + 1}` })))

const prodUserInfo = reactive({
  chargeUser: (() => {
    const koreanNames = extendedFakeSource.koreanNames as string[]
    const englishNames = extendedFakeSource.englishNames as string[]
    const randomIndex = Math.floor(Math.random() * koreanNames.length)
    return `${koreanNames[randomIndex]}(${englishNames[randomIndex]})`
  })(),
  countrUsers: (() => {
    const koreanNames = extendedFakeSource.koreanNames as string[]
    const englishNames = extendedFakeSource.englishNames as string[]
    const selectedIndices = new Set<number>()
    while (selectedIndices.size < 5) {
      selectedIndices.add(Math.floor(Math.random() * koreanNames.length))
    }
    const selectedUsers = Array.from(selectedIndices).map(i =>
      `${koreanNames[i]}(${englishNames[i]})`
    )
    return selectedUsers
  })()
})

const isEditable = reactive({
  elaTitle: true,
  elaPurpsDesc: true,
  elaEinecnNoBtn: true,
  startStepSeq: true,
  lotArrCnt: true,
  lotLevel: true,
  shipYn: true,
  comment: true,
})

const isVisibleBtn = reactive({
  addOpt: true,
  del: true,
  lotArrReq: true,
  reArrReq: false,
  lotArr: false,
  deleteRequest: false,
  save: true,
  cancel: true,
  edit: false,
  cancelReq: false,
  cancelLotArrReq: false,
})

const saveParams = reactive({
  elaId: 'ELA-001',
  elaTitle: '스토리북 제목',
  elaPurpsDesc: '스토리북용 설명',
  einecnNo: 'E-123',
  lineId: lineIdItems.value[0]?.codeId ?? null,
  procName: [procNameItems.value[0]?.codeId],
  procId: [procIdItems.value[0]?.codeId],
  startStepSeq: stepSeqItems.value[0]?.stepSeq ?? null,
  lotArrCnt: 0,
  lotLevel: 'L1',
  shipYn: 'N',
  regUserName: 'storybook',
  comment: '',
})

// small lodash mock used in template
const _ = {
  isEmpty: (v: any) => v === null || v === undefined || (Array.isArray(v) && v.length === 0) || (typeof v === 'object' && Object.keys(v).length === 0) || v === ''
}

// mock translation function used in template
function $t(key: string) {
  return key
}

function emitClose() {
  emit('update:modelValue', false)
}

function openEinecnNo() { action('openEinecnNo') }
function onInputNumber() { action('onInputNumber') }
function addAdditionalOptionRow() { action('addAdditionalOptionRow') }
function delAdditionalOptionRow() { action('delAdditionalOptionRow') }
function confirmDelArrangeLotList() { action('confirmDelArrangeLotList') }
function confirmLotArrReq() { action('confirmLotArrReq') }
function confirmLotArrRetryReq() { action('confirmLotArrRetryReq') }
function confirmLotArr() { action('confirmLotArr') }
function confirmDelete() { action('confirmDelete') }
function confirmSave() { action('confirmSave') }
function cancel() { action('cancel') }
function edit() { action('edit') }
function confirmCancelRequest() { action('confirmCancelRequest') }
function confirmCancelLotArr() { action('confirmCancelLotArr') }

</script>


<style scoped></style>