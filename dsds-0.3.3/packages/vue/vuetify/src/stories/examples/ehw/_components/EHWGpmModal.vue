<template>
  <Modal size="xl" v-model="gpmModalFlag">
    <v-card :class="[{
      'max-h-[609px]! min-h-[609px]!': esopParams.area !== 'PHOTO',
      'max-h-[641px]! min-h-[641px]!': esopParams.area === 'PHOTO',
    }]">
      <v-card-title>
        <ModalHeader @close="gpmModalFlag = false">
          GPM
          <span>&nbsp;</span>
          <span class="font-bold text-neutral-3rd">(EQP:{{ esopParams.eqpId }})</span>
        </ModalHeader>
      </v-card-title>
      <div class="dsds-dialog-form-filter-row">
        <FormField label="표준 설비 선택" class="w-30">
          <v-select v-model="selectedGpmStdEqpId" :items="stdEqpIdList"  placeholder="Select EQP"/>
        </FormField>
        <FormField>
          <FormTools>
            <v-divider vertical />
            <v-btn @click="changeStdEqpId" :disabled="gpmCompareFlag">{{ t('ecoh.dashboard.compare') }}</v-btn>
          </FormTools>
        </FormField>
      </div>
      <v-divider />
      <v-card-text class="dsds-dialog-form-body overflow-hidden">
        <div class="dsds-form-item">
          <div class="dsds-form-item-title">
            <b>비교 결과</b>
            <div class="ml-auto max-h-5!">
              <v-btn variant="secondary" @click="ExcelDownload" :disabled="excelDownButton">{{ t('ecoh.dashboard.excel_download') }}</v-btn>
              <v-btn variant="secondary" style="margin-left:10px;" @click="gpmInfoModalFlag = !gpmInfoModalFlag">{{ t('ecoh.dashboard.criteria') }}</v-btn>
            </div>
          </div>
          <div class="flex gap-1">
            <div class="flex flex-col gap-1 flex-1">
              <table class="dsds-table grid grid-cols-[64px_120px_100px_auto_138px]! w-full!">
                <tbody>
                  <tr>
                    <th class="row-span-2 align-top">조회 기준</th>
                    <th>Reference EQP</th>
                    <th>Step SEQ</th>
                    <th>PPID</th>
                    <th>비교 시간</th>
                  </tr>
                  <tr>
                    <td class="truncate">{{compareEqpInfo.stdEqpId}}</td>
                    <td class="truncate">{{compareEqpInfo.stepSeq}}</td>
                    <td class="truncate">{{compareEqpInfo.ppid}}</td>
                    <td class="text-nowrap">{{compareDateInfo}}&nbsp;{{compareTimeInfo}}</td>
                  </tr>
                </tbody>
              </table>
              <table class="dsds-table grid grid-cols-[63px_1fr_1fr]! w-full!">
                <tbody>
                  <tr>
                    <th class="row-span-2 align-top">비교 현황</th>
                    <th class="">{{t('ecoh.dashboard.all')}}</th>
                    <th class="">완료</th>
                  </tr>
                  <tr>
                    <td>{{gpmCompareStrTotal}}</td>
                    <td>{{gpmCompareStr}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex items-center border border-outer bg-surface-secondary text-neutral-1st" style="width: 297px">
              <div class="flex-1 flex flex-col items-center justify-center gap-3">
                <div class="flex items-center gap-0.5 typo-sok-caption-12-400">{{ t('ecoh.dashboard.all') }}</div>
                <div class="typo-sok-h3-24-700">{{ countSummary.totalCount }}</div>
              </div>
              <v-divider vertical class="h-[58px]! self-center!" />
              <div class="flex-1 flex flex-col items-center justify-center gap-3">
                <div class="flex items-center gap-0.5 typo-sok-caption-12-400">
                  <span class="size-1.5! rounded-full" style="background-color:#00B050"></span>정상
                </div>
                <div class="typo-sok-h3-24-700">{{ countSummary.passCount }}</div>
              </div>
              <v-divider vertical class="h-[58px]! self-center!"  />
              <div class="flex-1 flex flex-col items-center justify-center gap-3">
                <div class="flex items-center gap-0.5 typo-sok-caption-12-400">
                  <span class="size-1.5! rounded-full" style="background-color:#FFC000"></span>확인필요
                </div>
                <div class="typo-sok-h3-24-700">{{ countSummary.failCount }}</div>
              </div>
              <v-divider vertical class="h-[58px]! self-center!"  />
              <div class="flex-1 flex flex-col items-center justify-center gap-3">
                <div class="flex items-center gap-0.5 typo-sok-caption-12-400">
                  <span class="size-1.5! rounded-full" style="background-color:#BFBFBF"></span>No_Used
                </div>
                <div class="typo-sok-h3-24-700">{{ countSummary.noUsedCount }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="dsds-form-item flex-1 min-h-0 overflow-hidden">
          <div class="dsds-form-item-title">세부 결과 리스트</div>
          <VTabsContainer defaultValue="tab1" asChild >
            <VTabs variant="button" v-if="esopParams.area=='PHOTO' && gpmCheckResultInline.length > 0">
              <VTab value="tab1" :class="['tablinks', { active: activeTab === 'tab1' }]" @click="openTab('tab1')">
                <span v-if="esopParams.area=='PHOTO' && (compareEqpInfo.prcGroup.indexOf('SOH') != -1 || compareEqpInfo.prcGroup.indexOf('CRC') != -1)">SOH</span>
                <span v-if="esopParams.area=='PHOTO' && (compareEqpInfo.prcGroup.indexOf('SOH') == -1 && compareEqpInfo.prcGroup.indexOf('CRC') == -1)">Spinner</span>
              </VTab>
              <VTab value="tab2" :class="['tablinks', { active: activeTab === 'tab2' }]" @click="openTab('tab2')">Scanner</VTab>
            </VTabs>
            <VTabsWindow asChild>
              <VTabsWindowItem value="tab1">
                <ScrollableTable class="w-full grid-cols-[240px_120px_120px_120px_120px_auto]">
                  <thead>
                    <tr>
                      <th>메뉴</th>
                      <th>Status</th>
                      <th>Reference</th>
                      <th>Compare</th>
                      <th>Ref_Only</th>
                      <th class="truncate">명령</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in gpmCheckResult" :key="index">
                      <td style="color:#515E94"><a @click="gpmLinkOpen(item.menuCode)">{{ item.menuName }}</a></td>
                      <td class="py-0.5!" v-if='item.status=="정상"'>
                        <div class="rounded-xs underline cursor-pointer py-0.5" style="background-color:#D4F1D7; color:#145C1C; text-align:center">
                          <a @click.prevent="gpmDetailViewOpen(item.taskOrder,'default',item.condition)">{{item.status}}</a>
                        </div>
                      </td>
                      <td class="py-0.5!" v-else-if='item.status=="확인필요"'>
                        <div class="rounded-xs underline cursor-pointer py-0.5" style="background-color:#FFE9C8; color:#80591C; text-align:center">
                          <a @click.prevent="gpmDetailViewOpen(item.taskOrder,'default',item.condition)">{{item.status}}</a>
                        </div>
                      </td>
                      <td class="py-0.5!" v-else>
                        <div class="rounded-xs underline cursor-pointer py-0.5" style="background-color:#E4E9ED; color:#565E66; text-align:center">
                          <a @click.prevent="gpmDetailViewOpen(item.taskOrder,'default',item.condition)">{{item.status}}</a>
                        </div>
                      </td>
                      <td >{{ item.referenceCount }}</td>
                      <td >{{ item.compareCount }}</td>
                      <td >{{ item.viewCount }}</td>
                      <td >{{ item.command }}</td>
                    </tr>
                  </tbody>
                </ScrollableTable>
              </VTabsWindowItem>
              <VTabsWindowItem value="tab2">
                <ScrollableTable class="w-full grid-cols-[240px_120px_120px_120px_120px_auto]">
                  <thead>
                    <tr>
                      <th>Menu</th>
                      <th>Status</th>
                      <th>Reference</th>
                      <th>Compare</th>
                      <th>Ref_Only</th>
                      <th>명령</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in gpmCheckResultInline" :key="index">
                      <td style="color:#515E94"><a @click="gpmLinkOpen(item.menuCode)">{{ item.menuName }}</a></td>
                      <td class="py-0.5!" v-if='item.status=="정상"'>
                        <div class="rounded-xs underline cursor-pointer py-0.5" style="background-color:#D4F1D7; color:#145C1C; text-align:center">
                          <a @click.prevent="gpmDetailViewOpen(item.taskOrder,'SCANNER',item.condition)">{{item.status}}</a>
                        </div>
                      </td>
                      <td class="py-0.5!" v-else-if='item.status=="확인필요"'>
                        <div class="rounded-xs underline cursor-pointer py-0.5" style="background-color:#FFE9C8; color:#80591C; text-align:center">
                          <a @click.prevent="gpmDetailViewOpen(item.taskOrder,'SCANNER',item.condition)">{{item.status}}</a>
                        </div>
                      </td>
                      <td class="py-0.5!" v-else>
                        <div class="rounded-xs underline cursor-pointer py-0.5" style="background-color:#E4E9ED; color:#565E66; text-align:center">
                          <a @click.prevent="gpmDetailViewOpen(item.taskOrder,'SCANNER',item.condition)">{{item.status}}</a>
                        </div>
                      </td>
                      <td >{{ item.referenceCount }}</td>
                      <td >{{ item.compareCount }}</td>
                      <td >{{ item.viewCount }}</td>
                      <td >{{ item.command }}</td>
                    </tr>
                  </tbody>
                </ScrollableTable>
              </VTabsWindowItem>
            </VTabsWindow>
          </VTabsContainer>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn size="large" @click="SetupToGPM" :disabled="gpmInsertButton">Set Up To GPM</v-btn>
        <v-btn size="large" @click="gpmModalFlag=!gpmModalFlag">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </Modal>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue"
import { useI18n } from "vue-i18n"

import {
  FormField,
  FormTools,
  Modal,
  ModalHeader,
  ScrollableTable,
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VDivider,
  VSelect,
  VTab,
  VTabs,
  VTabsContainer,
  VTabsWindow,
  VTabsWindowItem
} from "@/components/ui"

import {
  buildGpmCompareInfo,
  createEqpOptions,
  createGpmTimestamp,
  generateGpmCheckRows,
  summarizeGpmRows,
  type GpmCheckRow,
} from "../faker"

const emit = defineEmits<{
  close: [],
  'update:modelValue': [value: boolean]
}>()

const props = withDefaults(defineProps<{
  area?: string
  eqpId?: string
  checkResultCount?: number
  modelValue?: boolean
}>(), {
  area: "PHOTO",
  eqpId: "EQP-1701",
  checkResultCount: 3,
})

const { t } = useI18n()

interface CompareEqpInfo {
  stdEqpId: string
  stepSeq: string
  ppid: string
  prcGroup: string
}

const esopParams = ref({
  area: props.area,
  eqpId: props.eqpId,
})

const stdEqpIdList = createEqpOptions()

const gpmModalFlag = ref(props.modelValue);

watch(gpmModalFlag, (nextOpen) => {
  console.log("[Storybook][RMS] Modal open state changed:", nextOpen);
  emit('update:modelValue', nextOpen);
})

const selectedGpmStdEqpId = ref<string>(stdEqpIdList[0]?.value ?? "STD-EQP-01")
const activeTab = ref<"tab1" | "tab2">("tab1")
const gpmCompareFlag = ref(false)
const gpmInsertButton = ref(false)
const excelDownButton = ref(false)
const gpmInfoModalFlag = ref(false)

const initialCompareInfo = buildGpmCompareInfo("STD-EQP-01", "PRC")

const compareEqpInfo = reactive<CompareEqpInfo>({
  stdEqpId: initialCompareInfo.stdEqpId,
  stepSeq: initialCompareInfo.stepSeq,
  ppid: initialCompareInfo.ppid,
  prcGroup: initialCompareInfo.prcGroup,
})

const compareDateInfo = ref("2025-03-15")
const compareTimeInfo = ref("14:32:00")

const gpmCheckResult = ref<GpmCheckRow[]>([])
const gpmCheckResultInline = ref<GpmCheckRow[]>([])

function refreshGpmResults(count: number) {
  gpmCheckResult.value = generateGpmCheckRows(count)
  gpmCheckResultInline.value = generateGpmCheckRows(count, { inline: true })
  if (gpmCheckResultInline.value.length === 0 && activeTab.value === "tab2") {
    activeTab.value = "tab1"
  }
}

const countSummary = computed(() => {
  const rows = [...gpmCheckResult.value, ...gpmCheckResultInline.value]
  return summarizeGpmRows(rows)
})

const gpmCompareStrTotal = computed(() => `${countSummary.value.totalCount}건`)
const gpmCompareStr = computed(() => `${countSummary.value.passCount}건`)

function openTab(tabId: "tab1" | "tab2") {
  activeTab.value = tabId
}

async function changeStdEqpId() {
  if (gpmCompareFlag.value) return

  gpmCompareFlag.value = true

  const nextInfo = buildGpmCompareInfo(selectedGpmStdEqpId.value, compareEqpInfo.prcGroup)
  compareEqpInfo.stdEqpId = nextInfo.stdEqpId
  compareEqpInfo.stepSeq = nextInfo.stepSeq
  compareEqpInfo.ppid = nextInfo.ppid

  const { date, time } = createGpmTimestamp()
  compareDateInfo.value = date
  compareTimeInfo.value = time

  await new Promise((resolve) => setTimeout(resolve, 300))

  gpmCompareFlag.value = false
  console.info(`[Storybook][GPM] 비교 실행: ${selectedGpmStdEqpId.value}`)
}

function ExcelDownload() {
  if (excelDownButton.value) return

  excelDownButton.value = true
  console.info("[Storybook][GPM] Excel 다운로드를 시작합니다.")
  window.setTimeout(() => {
    excelDownButton.value = false
    console.info("[Storybook][GPM] Excel 다운로드가 완료되었습니다.")
  }, 500)
}

function gpmLinkOpen(menuCode: string) {
  console.info(`[Storybook][GPM] 메뉴 오픈: ${menuCode}`)
}

function gpmDetailViewOpen(taskOrder: string, mode: "default" | "SCANNER", condition: string) {
  console.info(`[Storybook][GPM] 상세 보기: ${taskOrder}, mode=${mode}, condition=${condition}`)
}

async function SetupToGPM() {
  if (gpmInsertButton.value) return

  gpmInsertButton.value = true
  console.info(`[Storybook][GPM] Set Up To GPM 실행: ${selectedGpmStdEqpId.value}`)

  await new Promise((resolve) => setTimeout(resolve, 400))

  gpmInsertButton.value = false
}

watch(
  () => props.checkResultCount,
  (count) => {
    refreshGpmResults(count ?? 0)
  },
  { immediate: true },
)

watch(() => props.area, (area) => {
  esopParams.value.area = area
  if (area !== "PHOTO") {
    activeTab.value = "tab1"
  }
})

watch(() => props.eqpId, (eqpId) => {
  esopParams.value.eqpId = eqpId
})

watch(gpmInfoModalFlag, (flag) => {
  if (flag) {
    console.info("[Storybook][GPM] 기준 안내 모달을 열었습니다.")
  }
})

watch(gpmModalFlag, (flag) => {
  if (!flag) {
    console.info("[Storybook][GPM] GPM 다이얼로그를 닫았습니다.")
  }
})

const gpmState = {
  selectedGpmStdEqpId,
  stdEqpIdList,
  gpmCompareFlag,
  excelDownButton,
  gpmInfoModalFlag,
  gpmModalFlag,
  compareEqpInfo,
  compareDateInfo,
  compareTimeInfo,
  gpmCheckResult,
  gpmCheckResultInline,
  gpmCompareStrTotal,
  gpmCompareStr,
  countSummary,
  activeTab,
  gpmInsertButton,
}

defineExpose({
  gpmState,
  openTab,
  changeStdEqpId,
  ExcelDownload,
  gpmLinkOpen,
  gpmDetailViewOpen,
  SetupToGPM,
})
</script>