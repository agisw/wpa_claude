import type { ComputedRef, Ref, WritableComputedRef } from "vue"

export type EhwSelectOption = {
  title: string
  value: string
}

export type EhwTaskKind = "DRAFT" | "APPROVE" | "AGREE" | "NOTICE"

export interface MultiProcessStep {
  id: string
  processId: string
  prcGroup: string
  stepSeq: string
  lotCount: number
}

export interface ApprovalMember {
  taskOrder: number
  taskKind: EhwTaskKind
  taskEmpName: string
  uGradeName?: string
  userId: string
  task_DeptName: string
}

export interface ApprovalTemplate {
  taskId: string
  taskName: string
  members: ApprovalMember[]
}

export interface ManualRmsRow {
  eqpSelect: string
  eqpStd: string
  chamberId: string
  rcpId: string
  usedTime: number
}

export interface RmsCompareRowUi {
  eqpSelect: string
  eqpStd: string
  chamberId: string
  rcpId: string
  model_chk: "일치" | "불일치"
  a_rate: number
  b_rate: number
  c_rate: number
  fail_message: string
  isStdEqp: boolean
  chkInfo: boolean
}

export interface EcmCompareRow {
  eqpSelect: string
  eqpStd: string
  ecModel: string
  model_chk: "일치" | "불일치"
  a_rate: number
  b_rate: number
  c_rate: number
  fail_message: string
}

export interface EhwInsertParams {
  lineId: string
  eqpIdList: string
  procId: string
  stepSeqList: string
  ecoType: string
  caseType: string
  reqTitle: string
  userComment: string
  lotQty: string
  periodType: string
  intlkType: string
  nonSopYn: string
  logicType: string
  stdType: string
  stdTitle: string
  stdNo: string
  mtgProgrsType?: string
}

export interface EhwCreateEcoOptions {
  isInlineEqpFlag?: boolean
  attachFileUploadCount?: number
  mtgFileUploadCount?: number
  apprPathCount?: number
}

export interface EhwCreateEcoData {
  isInlineEqpFlag: boolean
  insertParams: EhwInsertParams
  periodItems: Array<{ label: string; value: string }>
  multiPrcSelectCond: { procId: string[]; prcGroup: string[] }
  processIdItemsMultiPrc: Array<{ PROCESS_ID: string }>
  prcGroupItemsMultiPrc: Array<{ PROCESS_GROUP_NAME: string }>
  multiProcessCandidates: MultiProcessStep[]
  selectedMultiProcess: MultiProcessStep[]
  einConnectEcoFlag: boolean
  confirmButtonFlag: boolean
  attachFileArr: File[]
  attachFileChkFlag: boolean
  mtgFileArr: File[]
  personalApprList: ApprovalTemplate[]
  deptApprList: ApprovalTemplate[]
  apprPath: ApprovalMember[]
  stdEqpIdList: EhwSelectOption[]
  stdEqpIdListInline: EhwSelectOption[]
  stdEqpInfo: { eqpId: string }
  stdEqpInfoInline: { eqpId: string }
  rmsApiCallParamsStd: { stdEqpId: string }
  rmsApiCallParamsManual: { recipeId: string }
  rmsApiCallParamsStdInline: { stdEqpId: string }
  rmsApiCallParamsManualInline: { recipeId: string }
  selectEqpInfoInline: { eqpId: string }
  rmModelSelectStr: string
  rmModelSelectStrInline: string
  ecModelSelectStr: string
  ecModelSelectStrInline: string
  manualRmsCheckList: ManualRmsRow[]
  manualRmsCheckListStdOnly: ManualRmsRow[]
  manualRmsCheckListInline: ManualRmsRow[]
  manualRmsCheckListStdOnlyInline: ManualRmsRow[]
  defaultRmsCheckList: RmsCompareRowUi[]
  defaultRmsCheckListInline: RmsCompareRowUi[]
  ecmApiResult: EcmCompareRow[]
  ecmApiResultInline: EcmCompareRow[]
}

export interface EhwCreateEcoPageState {
  multiRegionVisible: Ref<boolean>
  insertParams: EhwInsertParams
  periodItems: EhwCreateEcoData["periodItems"]
  multiPrcSelectCond: EhwCreateEcoData["multiPrcSelectCond"]
  processIdItemsMultiPrc: EhwCreateEcoData["processIdItemsMultiPrc"]
  prcGroupItemsMultiPrc: EhwCreateEcoData["prcGroupItemsMultiPrc"]
  multiProcessCandidates: EhwCreateEcoData["multiProcessCandidates"]
  selectedMultiProcess: Ref<MultiProcessStep[]>
  einConnectEcoFlag: Ref<boolean>
  isInlineEqpFlag: ComputedRef<boolean>
  confirmButtonFlag: Ref<boolean>
  attachFileArr: Ref<File[]>
  attachFileUploadNameList: Ref<string[]>
  attachFileUploadSizeList: Ref<number[]>
  attachFileUploadCheckInfo: Ref<boolean[]>
  attachFileChkFlag: Ref<boolean>
  mtgFileArr: Ref<File[]>
  mtgFileUploadNameList: Ref<string[]>
  mtgFileUploadSizeList: Ref<number[]>
  mtgFileUploadCheckInfo: Ref<boolean[]>
  personalApprList: Ref<ApprovalTemplate[]>
  deptApprList: Ref<ApprovalTemplate[]>
  personalApprSearch: Ref<string>
  deptApprSearch: Ref<string>
  activeApprTab: Ref<"personal" | "department">
  apprModalFlag: Ref<boolean>
  tempApprParams: { taskId: string; taskName: string; members: ApprovalMember[] }
  selectedApprPath: Ref<ApprovalMember[]>
  stdEqpIdList: EhwCreateEcoData["stdEqpIdList"]
  stdEqpIdListInline: EhwCreateEcoData["stdEqpIdListInline"]
  stdEqpInfo: Ref<EhwCreateEcoData["stdEqpInfo"]>
  stdEqpInfoInline: Ref<EhwCreateEcoData["stdEqpInfoInline"]>
  rmsApiCallParamsStd: Ref<EhwCreateEcoData["rmsApiCallParamsStd"]>
  rmsApiCallParamsManual: Ref<EhwCreateEcoData["rmsApiCallParamsManual"]>
  rmsApiCallParamsStdInline: Ref<EhwCreateEcoData["rmsApiCallParamsStdInline"]>
  rmsApiCallParamsManualInline: Ref<EhwCreateEcoData["rmsApiCallParamsManualInline"]>
  selectEqpInfoInline: EhwCreateEcoData["selectEqpInfoInline"]
  rmModelSelectStr: Ref<string>
  rmModelSelectStrInline: Ref<string>
  ecModelSelectStr: Ref<string>
  ecModelSelectStrInline: Ref<string>
  manualRmsCheckList: Ref<ManualRmsRow[]>
  manualRmsCheckListStdOnly: Ref<ManualRmsRow[]>
  manualRmsCheckListStdOnlyChkInfo: Ref<boolean[]>
  manualRecipeAllChk: Ref<boolean>
  manualRmsCheckListInline: Ref<ManualRmsRow[]>
  manualRmsCheckListStdOnlyInline: Ref<ManualRmsRow[]>
  manualRmsCheckListStdOnlyChkInfoInline: Ref<boolean[]>
  manualRecipeAllChkInline: Ref<boolean>
  defaultRmsCheckList: Ref<RmsCompareRowUi[]>
  defaultRmsCheckListInline: Ref<RmsCompareRowUi[]>
  rmsRecipeCompareStr: Ref<string>
  rmsRecipeCompareStrInline: Ref<string>
  rmsApiFlag: Ref<boolean>
  rmsApiFlagInline: Ref<boolean>
  rmsModalFlag: Ref<boolean>
  rmsModalFlagInline: Ref<boolean>
  ecmCompareChkFlag: Ref<boolean>
  popupButtonFlag: Ref<boolean>
  ecmModalFlag: Ref<boolean>
  ecmModalFlagInline: Ref<boolean>
  ecmApiFlag: Ref<boolean>
  ecmApiFlagInline: Ref<boolean>
  ecmRecipeCompareStr: Ref<string>
  ecmRecipeCompareStrInline: Ref<string>
  ecmApiResult: Ref<EcmCompareRow[]>
  ecmApiResultInline: Ref<EcmCompareRow[]>
  rmsFailCaseModelFlag: Ref<boolean>
  ecmFailCaseModelFlag: Ref<boolean>
}

export interface EhwCreateEcoPageComputed {
  multiSelectStr: ComputedRef<string>
  procLotCntTotal: ComputedRef<number>
  procLotCntSum: ComputedRef<number>
}

export interface EhwCreateEcoPageHandlers {
  toggleMultiDisplay: () => void
  filterNonNumeric: () => void
  lotCountSync: () => void
  checkPeriod: () => void
  getMultiPrcStepData: () => void
  getSelectedMultiList: () => void
  chkFileUploadSubmit: (type: "eco/add" | "eco/hccb_attach") => void
  deleteAttachFiles: (type: "eco/add" | "eco/hccb_attach") => void
  linkIspecChecklist: () => void
  setEhwData: () => Promise<void>
  openDeptApprModal: () => void
  openApprTab: (tabId: "personal" | "department", tabContent?: string) => void
  ispecApprClickEvent: (template: ApprovalTemplate) => void
  manualRmsCheckFlagChangeInline: () => void
  addRmsCheckList: (index: number) => void
  addRmsCheckListInline: (index: number) => void
  deleteRmsCheckList: () => void
  deleteRmsCheckListInline: () => void
  initRmsApiCallList: () => void
  initRmsApiCallListInline: () => void
  getStandardRmsApiCallList: () => Promise<void>
  getStandardRmsApiCallListInline: () => Promise<void>
  getManualRmsApiCallList: () => void
  getManualRmsApiCallListInline: () => void
  callRmsApiList: () => Promise<void>
  callRmsApiListInline: () => Promise<void>
  callCopyRmsRecipe: (mode: "MULTI" | "SINGLE", index: number) => void
  callCopyRmsRecipeInline: (mode: "MULTI" | "SINGLE", index: number) => void
  compareRmsCheckFlagChange: () => void
  rmsEqpIdParamMapping: () => void
  rmsEqpIdParamMappingInline: () => void
  eesLinkOpen: (mode: "RMS" | "ECM") => void
  rmsCheckResult: () => void
  rmsCheckResultInline: () => void
  callEcmApi: () => Promise<void>
  callEcmApiInline: () => Promise<void>
  ecmCheckResult: () => void
  ecmCheckResultInline: () => void
}
