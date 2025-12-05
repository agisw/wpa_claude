import type { Meta, StoryObj } from "@storybook/vue3-vite"
import type { ColumnVisibilityState } from "./_components/EHWColumnSettingModal.vue"
import type {
  ApprovalMember,
  ApprovalTemplate,
  EcmCompareRow,
  ManualRmsRow,
  RmsCompareRowUi,
} from "./_components/EHWCreateEcoPage.types"
import { computed, nextTick, onMounted, ref, watch } from "vue"
import { Modal, Searchbox, VTextField } from "@/components/ui"
import { booleanControl, hideOnControls, rangeControl, sleep } from "@/stories/utils"

import EHWApprPathAddModal from "./_components/EHWApprPathAddModal.vue"
import EHWApprPathAddModalCode from "./_components/EHWApprPathAddModal.vue?raw"
import EHWColumnSettingModal from "./_components/EHWColumnSettingModal.vue"
import EHWColumnSettingModalCode from "./_components/EHWColumnSettingModal.vue?raw"
import EHWCreateLayout from "./EHWCreateLayout.vue"
import EHWCreateLayoutCode from "./EHWCreateLayout.vue?raw"
import EHWDashboardLayout from "./EHWDashboardLayout.vue"

import EHWDashboardLayoutCode from "./EHWDashboardLayout.vue?raw"
import EHWEcmCompareModal from "./_components/EHWEcmCompareModal.vue"
import EHWEcmCompareModalCode from "./_components/EHWEcmCompareModal.vue?raw"
import EHWGpmModal from "./_components/EHWGpmModal.vue"
import EHWGpmModalCode from "./_components/EHWGpmModal.vue?raw"
import EHWRmsCompareModal from "./_components/EHWRmsCompareModal.vue"
import EHWRmsCompareModalCode from "./_components/EHWRmsCompareModal.vue?raw"
import EHWRmsModal from "./_components/EHWRmsModal.vue"
import EHWRmsModalCode from "./_components/EHWRmsModal.vue?raw"
import EHWRmsFailCaseModal from "./_components/EHWRmsFailCaseModal.vue"
import {
  createCompareRowFromManual,
  createEcmCompareRows,
  createMockApprovalTemplates,
  createRmsCompareStoryRows,
  createRmsManualStoryLists,
  DEFAULT_STD_EQP_IDS,
} from "./faker"

const components = {
  EHWDashboardLayout,
  EHWCreateLayout,
  EHWRmsModal,
  EHWRmsCompareModal,
  EHWEcmCompareModal,
  EHWGpmModal,
  EHWApprPathAddModal,
  EHWColumnSettingModal,
  EHWRmsFailCaseModal,
  Modal,
  VTextField,
  Searchbox,
}

const meta: Meta = {
  title: "Examples/ECO Highway",
  parameters: {
    layout: "fullscreen",
    docs: { codePanel: true },
  },
  argTypes: {
    collapsed: { ...hideOnControls, description: "헤더 필터의 축소 상태" },
    showTabs: { ...hideOnControls, description: "모달 내 탭 표시 여부" },
    checkResultCount: {
      ...hideOnControls,
      description: "GPM 비교 결과에 표시할 샘플 데이터 행 수",
    },
    onAction: { action: "action", ...hideOnControls },
  },
  args: {
    collapsed: false,
    showTabs: true,
    checkResultCount: 3,
  },
}

export default meta

type Story = StoryObj<typeof meta>

type RmsApiParamsStd = { stdEqpId: string }
type RmsApiParamsManual = { recipeId: string }

type RmsCompareModalExposed = {
  rmsApiCallParamsStd: RmsApiParamsStd
  rmsApiCallParamsManual: RmsApiParamsManual
  manualRecipeAllChk: boolean
  manualRmsCheckListStdOnlyChkInfo: boolean[]
  compareRecipeAllChk: boolean
  rmsFailCaseModelFlag: boolean
}

type RmsCompareModalInstance = InstanceType<typeof EHWRmsCompareModal> & RmsCompareModalExposed

export const DashboardLayout: Story = {
  argTypes: {
    collapsed: booleanControl,
  },
  render: (args: any) => ({
    components,
    setup() {
      return { args }
    },
    template: `
      <EHWDashboardLayout :args="args" />
    `,
  }),
  parameters: {
    docs: { source: { code: EHWDashboardLayoutCode } },
  },
}

export const CreateLayout: Story = {
  argTypes: {
    isInlineEqpFlag: booleanControl,
    attachFileUploadCount: rangeControl(0, 10, "근거자료 파일 첨부 개수"),
    mtgFileUploadCount: rangeControl(0, 10, "HCCB 회의록 파일 첨부 개수"),
    apprPathCount: rangeControl(0, 10, "결재 경로 사용자 수"),
  },
  args: {
    isInlineEqpFlag: false,
    attachFileUploadCount: 0,
    mtgFileUploadCount: 1,
    apprPathCount: 4,
  },
  render: (args: any) => ({
    components,
    setup() {
      return { args }
    },
    template: `
      <EHWCreateLayout :args="args" />
    `,
  }),
  parameters: {
    docs: { source: { code: EHWCreateLayoutCode } },
  },
}

export const ApprPathAddModal: Story = {
  argTypes: {
    onAction: { action: "action", ...hideOnControls },
  },
  render: (args: any) => ({
    components,
    setup() {
      type TabValue = "personal" | "department"

      const isOpen = ref(true)
      const activeTab = ref<TabValue>("personal")
      const personalSearch = ref("")
      const departmentSearch = ref("")

      const { personalTemplates, departmentTemplates } = createMockApprovalTemplates()

      const updateActiveTab = (value: TabValue) => {
        activeTab.value = value
      }

      const updatePersonalSearch = (value: string) => {
        personalSearch.value = value
      }

      const updateDepartmentSearch = (value: string) => {
        departmentSearch.value = value
      }

      const handleConfirm = (selectedApprPath: ApprovalMember[]) => {
        args.onAction?.({
          type: "confirm",
          payload: {
            selectedApprPath,
          },
        })
      }

      const handleClose = () => {
        args.onAction?.({ type: "close" })
      }

      const getIspecApprPath = async (template: ApprovalTemplate) => {
        await sleep(2000)
        return { data: template.members }
      }

      return {
        isOpen,
        activeTab,
        personalSearch,
        departmentSearch,
        personalTemplates,
        departmentTemplates,
        getIspecApprPath,
        updateActiveTab,
        updatePersonalSearch,
        updateDepartmentSearch,
        handleConfirm,
        handleClose,
      }
    },
    template: `
      <EHWApprPathAddModal
        v-model="isOpen"
        :activeTab="activeTab"
        :personalTemplates="personalTemplates"
        :getIspecApprPath="getIspecApprPath"
        :departmentTemplates="departmentTemplates"
        :personalSearch="personalSearch"
        :departmentSearch="departmentSearch"
        @update:activeTab="updateActiveTab"
        @update:personalSearch="updatePersonalSearch"
        @update:departmentSearch="updateDepartmentSearch"
        @confirm="handleConfirm"
        @close="handleClose"
      />
    `,
  }),
  parameters: {
    docs: { source: { code: EHWApprPathAddModalCode } },
  },
}

export const RmsCompareModal: Story = {
  argTypes: {
    manualCount: rangeControl(0, 10, "Manual Recipe 데이터 수"),
    stdOnlyCount: rangeControl(0, 10, "표준 Recipe 데이터 수"),
    compareCount: rangeControl(0, 10, "RMS 비교 결과 행 수"),
    onAction: { action: "action", ...hideOnControls },
  },
  args: {
    manualCount: 3,
    stdOnlyCount: 3,
    compareCount: 4,
  },
  render: (args: any) => ({
    components,
    setup() {
      const dialogRef = ref<RmsCompareModalInstance | null>(null)
      const modalOpen = ref(true)
      const insertParams = { eqpIdList: "EQP-301 / EQP-302" }
      const stdEqpIdList = DEFAULT_STD_EQP_IDS.slice(0, 3)
      const manualRmsCheckList = ref<ManualRmsRow[]>([])
      const manualRmsCheckListStdOnly = ref<ManualRmsRow[]>([])
      const defaultRmsCheckList = ref<RmsCompareRowUi[]>([])
      const rmsApiFlag = ref(false)
      const rmsRecipeCompareStr = ref("RMS Recipe 비교")
      const rmsApiCallParamsStd = ref<RmsApiParamsStd>({ stdEqpId: stdEqpIdList[0] ?? "" })
      const rmsApiCallParamsManual = ref<RmsApiParamsManual>({ recipeId: "" })

      const logAction = (type: string, payload?: unknown) => args.onAction?.({ type, payload })
      const resolveSelectedCompareCount = () => (Number(args.compareCount) > 0 ? 1 : 0)

      const applyStoryData = () => {
        const instance = dialogRef.value
        const { manualList, manualStdOnlyList, manualStdOnlyChkInfo } = createRmsManualStoryLists({
          manualCount: args.manualCount,
          manualStdOnlyCount: args.stdOnlyCount,
        })
        rmsApiCallParamsStd.value.stdEqpId = stdEqpIdList[0] ?? ""
        rmsApiCallParamsManual.value.recipeId = "RCP-MANUAL-001"
        manualRmsCheckList.value = manualList
        manualRmsCheckListStdOnly.value = manualStdOnlyList
        defaultRmsCheckList.value = createRmsCompareStoryRows({
          compareCount: args.compareCount,
          selectedCount: resolveSelectedCompareCount(),
          sourceManualRows: manualList,
        })
        if (instance) {
          instance.manualRmsCheckListStdOnlyChkInfo = manualStdOnlyChkInfo
          instance.manualRecipeAllChk = false
          instance.compareRecipeAllChk = false
        }
      }

      const syncStoryData = () => nextTick().then(applyStoryData)

      onMounted(syncStoryData)

      watch(
        () => [args.manualCount, args.stdOnlyCount, args.compareCount],
        () => {
          syncStoryData()
        }
      )

      const rmsEqpIdParamMapping = () => {
        logAction("rms-eqp-change", rmsApiCallParamsStd.value.stdEqpId)
      }

      const refreshStdOnlySelections = (checked = false) => {
        const instance = dialogRef.value
        if (!instance) return
        instance.manualRmsCheckListStdOnlyChkInfo = manualRmsCheckListStdOnly.value.map(() => checked)
      }

      const getStandardRmsApiCallList = async () => {
        const instance = dialogRef.value
        logAction("standard-fetch")
        rmsApiFlag.value = true
        await mockDelay()
        const { manualList, manualStdOnlyList, manualStdOnlyChkInfo } = createRmsManualStoryLists({
          manualCount: args.manualCount,
          manualStdOnlyCount: args.stdOnlyCount,
        })
        manualRmsCheckList.value = manualList
        manualRmsCheckListStdOnly.value = manualStdOnlyList
        if (instance) {
          instance.manualRmsCheckListStdOnlyChkInfo = manualStdOnlyChkInfo
          instance.manualRecipeAllChk = false
        }
        rmsApiFlag.value = false
      }

      const getManualRmsApiCallList = async () => {
        const instance = dialogRef.value
        if (!instance) return
        logAction("manual-fetch", rmsApiCallParamsManual.value.recipeId)
        await mockDelay(200)
        const { manualList } = createRmsManualStoryLists({ manualCount: args.manualCount })
        manualRmsCheckList.value = manualList
        rmsApiCallParamsManual.value.recipeId = ""
      }

      const addRmsCheckList = (index: number) => {
        const candidate = manualRmsCheckList.value[index]
        if (!candidate) return
        defaultRmsCheckList.value = [
          ...defaultRmsCheckList.value,
          createCompareRowFromManual(candidate, candidate.eqpSelect === candidate.eqpStd),
        ]
        const instance = dialogRef.value
        if (instance) {
          instance.compareRecipeAllChk = false
        }
        logAction("manual-add", { index })
      }

      const callCopyRmsRecipe = (mode: "MULTI" | "SINGLE", index: number) => {
        const instance = dialogRef.value
        if (!instance) return
        const targets =
          mode === "MULTI"
            ? manualRmsCheckListStdOnly.value.filter(
                (_row: ManualRmsRow, idx: number) => instance.manualRmsCheckListStdOnlyChkInfo[idx]
              )
            : [manualRmsCheckListStdOnly.value[index]].filter(Boolean)
        if (targets.length === 0) return
        defaultRmsCheckList.value = [
          ...defaultRmsCheckList.value,
          ...targets.map((row: ManualRmsRow) => createCompareRowFromManual(row, row.eqpSelect === row.eqpStd)),
        ]
        instance.manualRecipeAllChk = false
        refreshStdOnlySelections(false)
        logAction("copy-rms", { mode, index })
      }

      const deleteRmsCheckList = () => {
        const instance = dialogRef.value
        if (!instance) return
        defaultRmsCheckList.value = defaultRmsCheckList.value.filter((row) => !row.chkInfo)
        instance.compareRecipeAllChk = false
        logAction("delete-rms")
      }

      const initRmsApiCallList = () => {
        const instance = dialogRef.value
        if (!instance) return
        defaultRmsCheckList.value = []
        instance.compareRecipeAllChk = false
        logAction("reset-rms")
      }

      const callRmsApiList = async () => {
        logAction("rms-compare")
        rmsApiFlag.value = true
        rmsRecipeCompareStr.value = "비교 중..."
        await mockDelay(500)
        defaultRmsCheckList.value = createRmsCompareStoryRows({
          compareCount: args.compareCount,
          selectedCount: resolveSelectedCompareCount(),
          sourceManualRows: manualRmsCheckList.value,
        })
        const instance = dialogRef.value
        if (instance) {
          instance.compareRecipeAllChk = false
        }
        rmsRecipeCompareStr.value = "비교 완료"
        rmsApiFlag.value = false
      }

      const eesLinkOpen = (type: string) => {
        logAction("ees-link", type)
      }

      return {
        dialogRef,
        modalOpen,
        insertParams,
        stdEqpIdList,
        manualRmsCheckList,
        manualRmsCheckListStdOnly,
        defaultRmsCheckList,
        rmsApiFlag,
        rmsRecipeCompareStr,
        rmsApiCallParamsStd,
        rmsApiCallParamsManual,
        rmsEqpIdParamMapping,
        getStandardRmsApiCallList,
        callCopyRmsRecipe,
        getManualRmsApiCallList,
        eesLinkOpen,
        deleteRmsCheckList,
        initRmsApiCallList,
        callRmsApiList,
        addRmsCheckList,
      }
    },
    template: `
      <EHWRmsCompareModal
        ref="dialogRef"
        v-model="modalOpen"
        v-model:std-params="rmsApiCallParamsStd"
        v-model:manual-params="rmsApiCallParamsManual"
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
    `,
  }),
  parameters: {
    docs: { source: { code: EHWRmsCompareModalCode } },
  },
}

export const EcmCompareModal: Story = {
  argTypes: {
    onAction: { action: "action", ...hideOnControls },
  },
  render: (args: any) => ({
    components,
    setup() {
      const modalOpen = ref(true)
      const stdEqpInfo = ref({ eqpId: "STD-EQP-01" })
      const insertParams = { eqpIdList: "EQP-301 / EQP-302" }
      const stdEqpIdList = DEFAULT_STD_EQP_IDS.slice(0, 3)
      const ecmApiFlag = ref(false)
      const ecmRecipeCompareStr = ref("비교")
      const ecmApiResult = ref<EcmCompareRow[]>([])

      const logAction = (type: string, payload?: unknown) => args.onAction?.({ type, payload })

      const callEcmApi = async () => {
        logAction("ecm-compare")
        ecmApiFlag.value = true
        ecmRecipeCompareStr.value = "비교 중..."
        await mockDelay(500)
        ecmApiResult.value = createEcmCompareRows("main")
        ecmRecipeCompareStr.value = "비교 완료"
        ecmApiFlag.value = false
      }

      const eesLinkOpen = (type: string) => {
        logAction("ees-link", type)
      }

      const ecmCheckResult = () => {
        logAction("ecm-complete")
        modalOpen.value = false
      }

      return {
        modalOpen,
        stdEqpInfo,
        insertParams,
        stdEqpIdList,
        ecmApiFlag,
        ecmRecipeCompareStr,
        ecmApiResult,
        callEcmApi,
        eesLinkOpen,
        ecmCheckResult,
      }
    },
    template: `
      <EHWEcmCompareModal
        v-model="modalOpen"
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
    `,
  }),
  parameters: {
    docs: { source: { code: EHWEcmCompareModalCode } },
  },
}

export const RMSModal: Story = {
  argTypes: {
    showTabs: booleanControl,
  },
  render: (args: any) => ({
    components,
    setup() {
      const modalOpen = ref(true)
      const area = computed(() => (args.showTabs ? "PHOTO" : "ETCH"))
      return { args, area, modalOpen }
    },
    template: `
      <EHWRmsModal v-model="modalOpen" :area="area" :args="args" />
    `,
  }),
  parameters: {
    docs: { source: { code: EHWRmsModalCode } },
  },
}

export const RMSFaileCaseModal: Story = {
  name: "RMS 실패 Case 설명 모달",
  argTypes: {
    showTabs: booleanControl,
  },
  render: (args: any) => ({
    components,
    setup() {
      const modalOpen = ref(true)
      return { args, modalOpen }
    },
    template: `
      <EHWRmsFailCaseModal v-model="modalOpen" />
    `,
  }),
}

export const GPMModal: Story = {
  argTypes: {
    showTabs: booleanControl,
    checkResultCount: rangeControl(4, 20, "GPM 비교 결과에 표시할 샘플 데이터 행 수"),
  },
  render: (args: any) => ({
    components,
    setup() {
      const modalOpen = ref(true)
      const area = computed(() => (args.showTabs ? "PHOTO" : "ETCH"))

      return { args, area, modalOpen }
    },
    template: `
      <EHWGpmModal v-model="modalOpen" :area="area" :checkResultCount="args.checkResultCount" :args="args"/>
    `,
  }),
  parameters: {
    docs: { source: { code: EHWGpmModalCode } },
  },
}

export const ColumnSettingModal: Story = {
  render: (args: any) => ({
    components,
    setup() {
      const initialVisibility: ColumnVisibilityState = {
        gpmLine: true,
        processId: true,
        subArea: true,
        stepSeq: true,
        stepDesc: true,
        recipeId: true,
        processGroupName: true,
        rmModel: true,
        ecModel: true,
      }

      const modalOpen = ref(true)
      const columnVisibleFlag = ref<ColumnVisibilityState>({ ...initialVisibility })
      const appliedState = ref<ColumnVisibilityState>({ ...initialVisibility })

      const currentSelection = computed(() => JSON.stringify(columnVisibleFlag.value, null, 2))
      const appliedSelection = computed(() => JSON.stringify(appliedState.value, null, 2))

      function handleApply() {
        appliedState.value = { ...columnVisibleFlag.value }
        args.onAction?.({
          type: "apply",
          payload: { ...appliedState.value },
        })
      }

      return {
        args,
        modalOpen,
        columnVisibleFlag,
        currentSelection,
        appliedSelection,
        handleApply,
      }
    },
    template: `
      <EHWColumnSettingModal
        v-model="modalOpen"
        v-model:columnVisibleFlag="columnVisibleFlag"
        @apply="handleApply"
      />
    `,
  }),
  parameters: {
    docs: { source: { code: EHWColumnSettingModalCode } },
  },
}

const mockDelay = (ms = 350) => new Promise<void>((resolve) => setTimeout(resolve, ms))
