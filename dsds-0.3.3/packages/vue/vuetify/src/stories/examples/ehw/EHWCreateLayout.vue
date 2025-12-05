<template>
  <v-app class="dsds-app dsds-form-layout overflow-y-auto h-screen! max-h-screen! scrollbar-thin!">
    <VuetifyModal />
    <VuetifyProgress hide-overlay />
    <EHWApprPathAddModal
      v-model="apprModalFlag"
      v-model:activeTab="activeApprTab"
      v-model:personalSearch="personalApprSearch"
      v-model:departmentSearch="deptApprSearch"
      :personalTemplates="personalApprList"
      :departmentTemplates="deptApprList"
      :getIspecApprPath="getIspecApprPath"
      @confirm="handleApprSelectionConfirm"
      @close="handleApprModalClose"
    />

    <!-- RMS 비교 모달 -->
    <EHWRmsCompareModal
      ref="dialogRef"
      v-model="rmsModalFlag"
      v-model:stdParams="rmsApiCallParamsStd"
      v-model:manualParams="rmsApiCallParamsManual"
      v-model:manualRmsCheckList="manualRmsCheckList"
      v-model:manualRmsCheckListStdOnly="manualRmsCheckListStdOnly"
      v-model:manualRmsCheckListStdOnlyChkInfo="manualRmsCheckListStdOnlyChkInfo"
      v-model:compareRecipeAllChk="compareRecipeAllChk"
      :eqpIdList="insertParams.eqpIdList"
      :stdEqpIdList="stdEqpIdList"
      :defaultRmsCheckList="defaultRmsCheckList"
      :rmsApiFlag="rmsApiFlag"
      :rmsRecipeCompareStr="rmsRecipeCompareStr"
      :rmsEqpIdParamMapping="rmsEqpIdParamMapping"
      :getStandardRmsApiCallList="getStandardRmsApiCallList"
      :callCopyRmsRecipe="callCopyRmsRecipe"
      :getManualRmsApiCallList="getManualRmsApiCallList"
      :eesLinkOpen="eesLinkOpen"
      :deleteRmsCheckList="deleteRmsCheckList"
      :initRmsApiCallList="initRmsApiCallList"
      :callRmsApiList="callRmsApiList"
      :addRmsCheckList="addRmsCheckList"
    />

    <!-- RMS 비교 모달 (Inline) -->
    <EHWRmsCompareModal
      ref="dialogRefInline"
      v-model="rmsModalFlagInline"
      v-model:stdParams="rmsApiCallParamsStdInline"
      v-model:manualParams="rmsApiCallParamsManualInline"
      v-model:manualRmsCheckList="manualRmsCheckListInline"
      v-model:manualRmsCheckListStdOnly="manualRmsCheckListStdOnlyInline"
      v-model:manualRmsCheckListStdOnlyChkInfo="manualRmsCheckListStdOnlyChkInfoInline"
      v-model:compareRecipeAllChk="compareRecipeAllChkInline"
      :eqpIdList="selectEqpInfoInline.eqpId"
      :stdEqpIdList="stdEqpIdListInline"
      :defaultRmsCheckList="defaultRmsCheckListInline"
      :rmsApiFlag="rmsApiFlagInline"
      :rmsRecipeCompareStr="rmsRecipeCompareStrInline"
      :rmsEqpIdParamMapping="rmsEqpIdParamMappingInline"
      :getStandardRmsApiCallList="getStandardRmsApiCallListInline"
      :callCopyRmsRecipe="callCopyRmsRecipeInline"
      :getManualRmsApiCallList="getManualRmsApiCallListInline"
      :eesLinkOpen="eesLinkOpen"
      :deleteRmsCheckList="deleteRmsCheckListInline"
      :initRmsApiCallList="initRmsApiCallListInline"
      :callRmsApiList="callRmsApiListInline"
      :addRmsCheckList="addRmsCheckListInline"
    />



    <!-- ECM 비교 모달 -->
    <EHWEcmCompareModal
      v-model="ecmModalFlag"
      v-model:stdEqpInfo="stdEqpInfo"
      :eqpIdList="insertParams.eqpIdList"
      :stdEqpIdList="stdEqpIdList"
      :ecmApiFlag="ecmApiFlag"
      :ecmRecipeCompareStr="ecmRecipeCompareStr"
      :ecmApiResult="ecmApiResult"
      :callEcmApi="callEcmApi"
      :eesLinkOpen="eesLinkOpen"
      :ecmCheckResult="ecmCheckResult"
    />

    <!-- ECM 비교 모달 (Inline) -->
    <EHWEcmCompareModal
      v-model="ecmModalFlagInline"
      v-model:stdEqpInfo="stdEqpInfoInline"
      :eqpIdList="selectEqpInfoInline.eqpId"
      :stdEqpIdList="stdEqpIdListInline"
      :ecmApiFlag="ecmApiFlagInline"
      :ecmRecipeCompareStr="ecmRecipeCompareStrInline"
      :ecmApiResult="ecmApiResultInline"
      :callEcmApi="callEcmApiInline"
      :eesLinkOpen="eesLinkOpen"
      :ecmCheckResult="ecmCheckResultInline"
    />

    <EHWCreateEcoPage :state="pageState" :computed="pageComputed" :handlers="pageHandlers" />
  </v-app>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, type Ref } from "vue"

import { sleep } from '@/stories/utils'
import EHWApprPathAddModal from "./_components/EHWApprPathAddModal.vue"
import type { EhwCreateEcoPageComputed, EhwCreateEcoPageHandlers, EhwCreateEcoPageState } from "./_components/EHWCreateEcoPage.types"
import EHWCreateEcoPage from "./_components/EHWCreateEcoPage.vue"
import EHWEcmCompareModal from "./_components/EHWEcmCompareModal.vue"
import EHWRmsCompareModal from "./_components/EHWRmsCompareModal.vue"
import type {
  ApprovalMember,
  ApprovalTemplate,
  EcmCompareRow,
  EhwInsertParams,
  ManualRmsRow,
  MultiProcessStep,
  RmsCompareRowUi,
} from "./faker"
import {
  buildTemplateSelection,
  createEcmCompareRows,
  createEhwCreateEcoMockData,
  createManualRmsRows,
  createMockApprovalPath,
  createMockFileList,
  createRmsCompareRows
} from "./faker"

type RmsApiParamsStd = { stdEqpId: string }
type RmsApiParamsManual = { recipeId: string }

const props = defineProps<{
  args: {
    isInlineEqpFlag: boolean
    attachFileUploadCount?: number
    mtgFileUploadCount?: number
    apprPathCount?: number
  }
}>()

const VuetifyModal = { template: "<div></div>" }
const VuetifyProgress = { template: "<div></div>" }

function sanitizeCount(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0
  }
  return Math.max(0, Math.floor(value))
}

const initialMock = createEhwCreateEcoMockData({
  isInlineEqpFlag: props.args.isInlineEqpFlag,
  attachFileUploadCount: sanitizeCount(props.args.attachFileUploadCount),
  mtgFileUploadCount: sanitizeCount(props.args.mtgFileUploadCount),
  apprPathCount: sanitizeCount(props.args.apprPathCount),
})

const multiRegionVisible = ref(true)
const insertParams = reactive<EhwInsertParams>({ ...initialMock.insertParams })
const periodItems = initialMock.periodItems
const multiPrcSelectCond = reactive({ ...initialMock.multiPrcSelectCond })
const processIdItemsMultiPrc = initialMock.processIdItemsMultiPrc
const prcGroupItemsMultiPrc = initialMock.prcGroupItemsMultiPrc
const multiProcessCandidates = initialMock.multiProcessCandidates
const selectedMultiProcess = ref<MultiProcessStep[]>([...initialMock.selectedMultiProcess])
const einConnectEcoFlag = ref(initialMock.einConnectEcoFlag)
const isInlineEqpFlag = computed(() => Boolean(props.args.isInlineEqpFlag))
const confirmButtonFlag = ref(initialMock.confirmButtonFlag)
const attachFileArr = ref<File[]>([...initialMock.attachFileArr])
const attachFileUploadNameList = ref<string[]>([])
const attachFileUploadSizeList = ref<number[]>([])
const attachFileUploadCheckInfo = ref<boolean[]>([])
const attachFileChkFlag = ref(initialMock.attachFileChkFlag)
const mtgFileArr = ref<File[]>([...initialMock.mtgFileArr])
const mtgFileUploadNameList = ref<string[]>([])
const mtgFileUploadSizeList = ref<number[]>([])
const mtgFileUploadCheckInfo = ref<boolean[]>([])
const personalApprList = ref<ApprovalTemplate[]>([...initialMock.personalApprList])
const deptApprList = ref<ApprovalTemplate[]>([...initialMock.deptApprList])
const personalApprSearch = ref("")
const deptApprSearch = ref("")
const activeApprTab = ref<"personal" | "department">("personal")
const apprModalFlag = ref(false)
const tempApprParams = reactive<{ taskId: string; taskName: string; members: ApprovalMember[] }>({
  taskId: "",
  taskName: "",
  members: [],
})
const selectedApprPath = ref<ApprovalMember[]>([])

function applyApprovalTemplate(template?: ApprovalTemplate) {
  const { templateName, members } = buildTemplateSelection(template)
  tempApprParams.taskId = template?.taskId ?? ""
  tempApprParams.taskName = templateName
  tempApprParams.members = members
  selectedApprPath.value = members
}

const stdEqpIdList = initialMock.stdEqpIdList
const stdEqpIdListInline = initialMock.stdEqpIdListInline
const stdEqpInfo = ref<{eqpId: string}>({ ...initialMock.stdEqpInfo })
const stdEqpInfoInline = ref<{eqpId: string}>({ ...initialMock.stdEqpInfoInline })
const rmsApiCallParamsStd = ref<RmsApiParamsStd>({ ...initialMock.rmsApiCallParamsStd })
const rmsApiCallParamsManual = ref<RmsApiParamsManual>({ ...initialMock.rmsApiCallParamsManual })
const rmsApiCallParamsStdInline = ref<RmsApiParamsStd>({ ...initialMock.rmsApiCallParamsStdInline })
const rmsApiCallParamsManualInline = ref<RmsApiParamsManual>({ ...initialMock.rmsApiCallParamsManualInline })
const selectEqpInfoInline = reactive({ ...initialMock.selectEqpInfoInline })
const rmModelSelectStr = ref(initialMock.rmModelSelectStr)
const rmModelSelectStrInline = ref(initialMock.rmModelSelectStrInline)
const ecModelSelectStr = ref(initialMock.ecModelSelectStr)
const ecModelSelectStrInline = ref(initialMock.ecModelSelectStrInline)
const manualRmsCheckList = ref<ManualRmsRow[]>([...initialMock.manualRmsCheckList])
const manualRmsCheckListStdOnly = ref<ManualRmsRow[]>([...initialMock.manualRmsCheckListStdOnly])
const manualRmsCheckListStdOnlyChkInfo = ref<boolean[]>(initialMock.manualRmsCheckListStdOnly.map(() => false))
const manualRecipeAllChk = ref(false)
const manualRmsCheckListInline = ref<ManualRmsRow[]>([...initialMock.manualRmsCheckListInline])
const manualRmsCheckListStdOnlyInline = ref<ManualRmsRow[]>([...initialMock.manualRmsCheckListStdOnlyInline])
const manualRmsCheckListStdOnlyChkInfoInline = ref<boolean[]>(initialMock.manualRmsCheckListStdOnlyInline.map(() => false))
const manualRecipeAllChkInline = ref(false)
const defaultRmsCheckList = ref<RmsCompareRowUi[]>([...initialMock.defaultRmsCheckList])
const defaultRmsCheckListInline = ref<RmsCompareRowUi[]>([...initialMock.defaultRmsCheckListInline])
const compareRecipeAllChk = ref(false)
const compareRecipeAllChkInline = ref(false)
const rmsRecipeCompareStr = ref("비교")
const rmsRecipeCompareStrInline = ref("비교")
const rmsApiFlag = ref(false)
const rmsApiFlagInline = ref(false)
const rmsModalFlag = ref(false)
const rmsModalFlagInline = ref(false)
const ecmCompareChkFlag = ref(false)
const popupButtonFlag = ref(false)
const ecmModalFlag = ref(false)
const ecmModalFlagInline = ref(false)
const ecmApiFlag = ref(false)
const ecmApiFlagInline = ref(false)
const ecmRecipeCompareStr = ref("비교")
const ecmRecipeCompareStrInline = ref("비교")
const ecmApiResult = ref<EcmCompareRow[]>([...initialMock.ecmApiResult])
const ecmApiResultInline = ref<EcmCompareRow[]>([...initialMock.ecmApiResultInline])
const rmsFailCaseModelFlag = ref(false)
const ecmFailCaseModelFlag = ref(false)

const multiSelectStr = computed(() => {
  const count = selectedMultiProcess.value.length
  if (count === 0) {
    return "선택된 항목 없음"
  }
  const preview = selectedMultiProcess.value
    .slice(0, 2)
    .map((item) => item.stepSeq)
    .join(", ")
  return count <= 2 ? preview : `${preview} 외 ${count - 2}건`
})
const procLotCntTotal = computed(() => selectedMultiProcess.value.length)
const procLotCntSum = computed(() => selectedMultiProcess.value.reduce((total, item) => total + item.lotCount, 0))

function updateAttachFileState() {
  attachFileUploadNameList.value = attachFileArr.value.map((file) => file.name)
  attachFileUploadSizeList.value = attachFileArr.value.map((file) => Math.max(1, Math.round(file.size / 1024)))
  attachFileUploadCheckInfo.value = attachFileArr.value.map(() => false)
}

function updateMtgFileState() {
  mtgFileUploadNameList.value = mtgFileArr.value.map((file) => file.name)
  mtgFileUploadSizeList.value = mtgFileArr.value.map((file) => Math.max(1, Math.round(file.size / 1024)))
  mtgFileUploadCheckInfo.value = mtgFileArr.value.map(() => false)
}

watch(attachFileArr, updateAttachFileState, { immediate: true })
watch(mtgFileArr, updateMtgFileState, { immediate: true })

watch(manualRmsCheckListStdOnly, (list) => {
  manualRmsCheckListStdOnlyChkInfo.value = list.map(() => false)
  manualRecipeAllChk.value = false
}, { immediate: true })

watch(manualRmsCheckListStdOnlyInline, (list) => {
  manualRmsCheckListStdOnlyChkInfoInline.value = list.map(() => false)
  manualRecipeAllChkInline.value = false
}, { immediate: true })

watch(manualRmsCheckListStdOnlyChkInfo, (checks) => {
  manualRecipeAllChk.value = checks.length > 0 && checks.every((flag) => flag)
}, { deep: true })

watch(manualRmsCheckListStdOnlyChkInfoInline, (checks) => {
  manualRecipeAllChkInline.value = checks.length > 0 && checks.every((flag) => flag)
}, { deep: true })

const attachFileUploadCount = computed(() => sanitizeCount(props.args.attachFileUploadCount))
const mtgFileUploadCount = computed(() => sanitizeCount(props.args.mtgFileUploadCount))
const apprPathCount = computed(() => sanitizeCount(props.args.apprPathCount))

watch(apprPathCount, (count) => {
  selectedApprPath.value = createMockApprovalPath(count)
}, { immediate: true })

watch(attachFileUploadCount, (count) => {
  attachFileArr.value = createMockFileList(count, "evidence")
  if (count > 0) {
    attachFileChkFlag.value = false
  }
}, { immediate: true })

watch(mtgFileUploadCount, (count) => {
  mtgFileArr.value = createMockFileList(count, "meeting")
}, { immediate: true })

function toggleMultiDisplay() {
  multiRegionVisible.value = !multiRegionVisible.value
}

function filterNonNumeric() {
  insertParams.lotQty = insertParams.lotQty.replace(/[^0-9]/g, "")
}

function lotCountSync() {
  const parsed = Number.parseInt(insertParams.lotQty, 10)
  const safeLot = Number.isFinite(parsed) ? Math.max(parsed, 0) : 0
  selectedMultiProcess.value = selectedMultiProcess.value.map((item) => ({
    ...item,
    lotCount: safeLot,
  }))
}

function checkPeriod() {
  console.info("[Storybook][EHW] Period changed:", insertParams.periodType)
}

function getMultiPrcStepData() {
  const { procId, prcGroup } = multiPrcSelectCond
  const filtered = multiProcessCandidates.filter((item) => {
    const matchProc = procId.length === 0 || procId.includes(item.processId)
    const matchGroup = prcGroup.length === 0 || prcGroup.includes(item.prcGroup)
    return matchProc && matchGroup
  })
  selectedMultiProcess.value = filtered.length > 0 ? filtered : multiProcessCandidates.slice(0, 2)
}

function getSelectedMultiList() {
  console.info("[Storybook][EHW] Connect ECO flag:", einConnectEcoFlag.value)
}

function chkFileUploadSubmit(type: "eco/add" | "eco/hccb_attach") {
  if (type === "eco/add") {
    updateAttachFileState()
    return
  }
  updateMtgFileState()
}

function deleteAttachFiles(type: "eco/add" | "eco/hccb_attach") {
  if (type === "eco/add") {
    attachFileArr.value = attachFileArr.value.filter((_file, index) => !attachFileUploadCheckInfo.value[index])
    updateAttachFileState()
    return
  }
  mtgFileArr.value = mtgFileArr.value.filter((_file, index) => !mtgFileUploadCheckInfo.value[index])
  updateMtgFileState()
}

function linkIspecChecklist() {
  console.info("[Storybook][EHW] ISPEC checklist open mocked.")
}

async function setEhwData() {
  confirmButtonFlag.value = true
  await delay(400)
  console.info("[Storybook][EHW] 저장된 데이터:", { ...insertParams, multiSelection: selectedMultiProcess.value })
  confirmButtonFlag.value = false
}

const getIspecApprPath = async (template: ApprovalTemplate) => {
  await sleep(500)
  return { data: template.members }
}

function openDeptApprModal() {
  activeApprTab.value = "personal"
  apprModalFlag.value = true
}

function openApprTab(tabId: "personal" | "department", _tabContent?: string) {
  activeApprTab.value = tabId
}

function ispecApprClickEvent(template: ApprovalTemplate) {
  applyApprovalTemplate(template)
}

function handleApprSelectionConfirm(selectedApprPath: ApprovalMember[]) {
  pageState.selectedApprPath.value = selectedApprPath
}

function handleApprModalClose() {
  apprModalFlag.value = false
}

function manualRmsCheckFlagChangeInline() {
  manualRmsCheckListStdOnlyChkInfoInline.value = manualRmsCheckListStdOnlyChkInfoInline.value.map(() => manualRecipeAllChkInline.value)
}

function addRmsCheckList(index: number) {
  const candidate = manualRmsCheckList.value[index]
  if (!candidate) return
  defaultRmsCheckList.value = [
    ...defaultRmsCheckList.value,
    createCompareRowFromManual(candidate, false),
  ]
}

function addRmsCheckListInline(index: number) {
  const candidate = manualRmsCheckListInline.value[index]
  if (!candidate) return
  defaultRmsCheckListInline.value = [
    ...defaultRmsCheckListInline.value,
    createCompareRowFromManual(candidate, false),
  ]
}

function deleteRmsCheckList(){
    compareRecipeAllChk.value = false;
    defaultRmsCheckList.value = defaultRmsCheckList.value.filter((item) => item.chkInfo !== true)
}

function deleteRmsCheckListInline() {
  defaultRmsCheckListInline.value = defaultRmsCheckListInline.value.filter((item) => !item.chkInfo)
}

function initRmsApiCallList() {
  defaultRmsCheckList.value = createRmsCompareRows("sequence")
}

function initRmsApiCallListInline() {
  defaultRmsCheckListInline.value = createRmsCompareRows("scanner")
}

async function getStandardRmsApiCallList() {
  rmsApiFlag.value = true
  await delay(250)
  manualRmsCheckList.value = createManualRmsRows("sequence", false)
  manualRmsCheckListStdOnly.value = createManualRmsRows("sequence", true)
  rmsApiFlag.value = false
}

async function getStandardRmsApiCallListInline() {
  rmsApiFlagInline.value = true
  await delay(250)
  manualRmsCheckListInline.value = createManualRmsRows("scanner", false)
  manualRmsCheckListStdOnlyInline.value = createManualRmsRows("scanner", true)
  rmsApiFlagInline.value = false
}

function getManualRmsApiCallList() {
  const recipeId = rmsApiCallParamsManual.value.recipeId.trim()
  if (!recipeId) return
  manualRmsCheckList.value = [
    {
      eqpSelect: "EQP-CUSTOM",
      eqpStd: rmsApiCallParamsStd.value.stdEqpId || "STD-EQP-01",
      chamberId: "CH-99",
      rcpId: recipeId,
      usedTime: 120,
    },
    ...manualRmsCheckList.value,
  ]
  rmsApiCallParamsManual.value.recipeId = ""
}

function getManualRmsApiCallListInline() {
  const recipeId = rmsApiCallParamsManualInline.value.recipeId.trim()
  if (!recipeId) return
  manualRmsCheckListInline.value = [
    {
      eqpSelect: "INLINE-CUSTOM",
      eqpStd: rmsApiCallParamsStdInline.value.stdEqpId || "STD-EQP-02",
      chamberId: "SC-99",
      rcpId: recipeId,
      usedTime: 90,
    },
    ...manualRmsCheckListInline.value,
  ]
  rmsApiCallParamsManualInline.value.recipeId = ""
}

async function callRmsApiList() {
  rmsApiFlag.value = true
  rmsRecipeCompareStr.value = "비교 중..."
  await delay(300)
  defaultRmsCheckList.value = createRmsCompareRows("sequence")
  rmsRecipeCompareStr.value = "비교 완료"
  rmsApiFlag.value = false
}

async function callRmsApiListInline() {
  rmsApiFlagInline.value = true
  rmsRecipeCompareStrInline.value = "비교 중..."
  await delay(300)
  defaultRmsCheckListInline.value = createRmsCompareRows("scanner")
  rmsRecipeCompareStrInline.value = "비교 완료"
  rmsApiFlagInline.value = false
}

function callCopyRmsRecipe(mode: "MULTI" | "SINGLE", index: number) {
  alert(manualRmsCheckListStdOnlyChkInfo.value)
}

function callCopyRmsRecipeInline(mode: "MULTI" | "SINGLE", index: number) {
  registerManualSelections({
    manualList: manualRmsCheckListStdOnlyInline.value,
    selectionFlags: manualRmsCheckListStdOnlyChkInfoInline.value,
    targetList: defaultRmsCheckListInline,
    mode,
    index,
    onComplete: () => {
      manualRecipeAllChkInline.value = false
    },
  })
}

function compareRmsCheckFlagChange() {
  console.info("[Storybook][EHW] Header checkbox toggled:", compareRecipeAllChk.value)
}

function rmsEqpIdParamMapping() {
  rmModelSelectStr.value = `RMS-${rmsApiCallParamsStd.value.stdEqpId}`
}

function rmsEqpIdParamMappingInline() {
  rmModelSelectStrInline.value = `RMS-${rmsApiCallParamsStdInline.value.stdEqpId}`
}

function eesLinkOpen(mode: "RMS" | "ECM") {
  console.info(`[Storybook][EHW] ${mode} compare link opened.`)
}

function rmsCheckResult() {
  rmsModalFlag.value = false
}

function rmsCheckResultInline() {
  rmsModalFlagInline.value = false
}

async function callEcmApi() {
  ecmApiFlag.value = true
  ecmRecipeCompareStr.value = "비교 중..."
  await delay(300)
  ecmApiResult.value = createEcmCompareRows("main")
  ecmRecipeCompareStr.value = "비교 완료"
  ecmApiFlag.value = false
}

async function callEcmApiInline() {
  ecmApiFlagInline.value = true
  ecmRecipeCompareStrInline.value = "비교 중..."
  await delay(300)
  ecmApiResultInline.value = createEcmCompareRows("inline")
  ecmRecipeCompareStrInline.value = "비교 완료"
  ecmApiFlagInline.value = false
}

function ecmCheckResult() {
  ecModelSelectStr.value = `ECM-${stdEqpInfo.value.eqpId}`
  ecmModalFlag.value = false
}

function ecmCheckResultInline() {
  ecModelSelectStrInline.value = `ECM-${stdEqpInfoInline.value.eqpId}`
  ecmModalFlagInline.value = false
}

function collectManualTargets(
  manualList: ManualRmsRow[],
  selectionFlags: boolean[],
  mode: "MULTI" | "SINGLE",
  index: number,
): ManualRmsRow[] {
  if (mode === "SINGLE") {
    const single = manualList[index]
    return single ? [single] : []
  }
  const selected = manualList.filter((_item, idx) => selectionFlags[idx])
  if (selected.length > 0) {
    return selected
  }
  const fallback = manualList[index]
  return fallback ? [fallback] : []
}

type ManualSelectionParams = {
  manualList: ManualRmsRow[]
  selectionFlags: boolean[]
  targetList: Ref<RmsCompareRowUi[]>
  mode: "MULTI" | "SINGLE"
  index: number
  onComplete?: () => void
}

function registerManualSelections({
  manualList,
  selectionFlags,
  targetList,
  mode,
  index,
  onComplete,
}: ManualSelectionParams) {
  const targets = collectManualTargets(manualList, selectionFlags, mode, index)
  if (targets.length === 0) {
    console.info("[Storybook][EHW] 선택된 레시피가 없습니다.")
    return
  }
  const mapped = targets.map((manual) => createCompareRowFromManual(manual, false))
  targetList.value = [...targetList.value, ...mapped]

  if (mode === "MULTI") {
    selectionFlags.fill(false)
  } else if (selectionFlags[index]) {
    selectionFlags[index] = false
  }

  onComplete?.()
}

function createCompareRowFromManual(manual: ManualRmsRow, isStdEqp: boolean): RmsCompareRowUi {
  return {
    eqpSelect: manual.eqpSelect,
    eqpStd: manual.eqpStd,
    chamberId: manual.chamberId,
    rcpId: manual.rcpId,
    model_chk: isStdEqp ? "일치" : "불일치",
    a_rate: isStdEqp ? 98.5 : 92,
    b_rate: isStdEqp ? 87.2 : 88,
    c_rate: isStdEqp ? 75.4 : 84,
    fail_message: isStdEqp ? "" : "스텝 조건이 상이합니다.",
    isStdEqp,
    chkInfo: false,
  }
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const pageState: EhwCreateEcoPageState = {
  multiRegionVisible,
  insertParams,
  periodItems,
  multiPrcSelectCond,
  processIdItemsMultiPrc,
  prcGroupItemsMultiPrc,
  multiProcessCandidates,
  selectedMultiProcess,
  einConnectEcoFlag,
  isInlineEqpFlag,
  confirmButtonFlag,
  attachFileArr,
  attachFileUploadNameList,
  attachFileUploadSizeList,
  attachFileUploadCheckInfo,
  attachFileChkFlag,
  mtgFileArr,
  mtgFileUploadNameList,
  mtgFileUploadSizeList,
  mtgFileUploadCheckInfo,
  personalApprList,
  deptApprList,
  personalApprSearch,
  deptApprSearch,
  activeApprTab,
  apprModalFlag,
  tempApprParams,
  selectedApprPath,
  stdEqpIdList,
  stdEqpIdListInline,
  stdEqpInfo,
  stdEqpInfoInline,
  rmsApiCallParamsStd,
  rmsApiCallParamsManual,
  rmsApiCallParamsStdInline,
  rmsApiCallParamsManualInline,
  selectEqpInfoInline,
  rmModelSelectStr,
  rmModelSelectStrInline,
  ecModelSelectStr,
  ecModelSelectStrInline,
  manualRmsCheckList,
  manualRmsCheckListStdOnly,
  manualRmsCheckListStdOnlyChkInfo,
  manualRecipeAllChk,
  manualRmsCheckListInline,
  manualRmsCheckListStdOnlyInline,
  manualRmsCheckListStdOnlyChkInfoInline,
  manualRecipeAllChkInline,
  defaultRmsCheckList,
  defaultRmsCheckListInline,
  rmsRecipeCompareStr,
  rmsRecipeCompareStrInline,
  rmsApiFlag,
  rmsApiFlagInline,
  rmsModalFlag,
  rmsModalFlagInline,
  ecmCompareChkFlag,
  popupButtonFlag,
  ecmModalFlag,
  ecmModalFlagInline,
  ecmApiFlag,
  ecmApiFlagInline,
  ecmRecipeCompareStr,
  ecmRecipeCompareStrInline,
  ecmApiResult,
  ecmApiResultInline,
  rmsFailCaseModelFlag,
  ecmFailCaseModelFlag,
}

const pageComputed: EhwCreateEcoPageComputed = {
  multiSelectStr,
  procLotCntTotal,
  procLotCntSum,
}

const pageHandlers: EhwCreateEcoPageHandlers = {
  toggleMultiDisplay,
  filterNonNumeric,
  lotCountSync,
  checkPeriod,
  getMultiPrcStepData,
  getSelectedMultiList,
  chkFileUploadSubmit,
  deleteAttachFiles,
  linkIspecChecklist,
  setEhwData,
  openDeptApprModal,
  openApprTab,
  ispecApprClickEvent,
  manualRmsCheckFlagChangeInline,
  addRmsCheckList,
  addRmsCheckListInline,
  deleteRmsCheckList,
  deleteRmsCheckListInline,
  initRmsApiCallList,
  initRmsApiCallListInline,
  getStandardRmsApiCallList,
  getStandardRmsApiCallListInline,
  getManualRmsApiCallList,
  getManualRmsApiCallListInline,
  callRmsApiList,
  callRmsApiListInline,
  callCopyRmsRecipe,
  callCopyRmsRecipeInline,
  compareRmsCheckFlagChange,
  rmsEqpIdParamMapping,
  rmsEqpIdParamMappingInline,
  eesLinkOpen,
  rmsCheckResult,
  rmsCheckResultInline,
  callEcmApi,
  callEcmApiInline,
  ecmCheckResult,
  ecmCheckResultInline,
}
</script>
  callEcmApiInline,
