/* eslint-disable @typescript-eslint/no-magic-numbers */
import type {
  ApprovalMember,
  ApprovalTemplate,
  EcmCompareRow,
  EhwCreateEcoData,
  EhwCreateEcoOptions,
  EhwInsertParams,
  EhwSelectOption,
  EhwTaskKind,
  ManualRmsRow,
  MultiProcessStep,
  RmsCompareRowUi,
} from "./_components/EHWCreateEcoPage.types"
import { round } from "@/lib/utils"

export type {
  ApprovalMember,
  ApprovalTemplate,
  EcmCompareRow,
  EhwCreateEcoData,
  EhwCreateEcoOptions,
  EhwInsertParams,
  EhwSelectOption,
  EhwTaskKind,
  ManualRmsRow,
  MultiProcessStep,
  RmsCompareRowUi,
} from "./_components/EHWCreateEcoPage.types"

export interface ApprovalTemplateFactoryContext {
  index: number
  type: "personal" | "department"
  taskId: string
  taskName: string
}

export type ApprovalTemplateMemberFactory = (context: ApprovalTemplateFactoryContext) => ApprovalMember[]

export interface MockApprovalTemplatesOptions {
  personalCount?: number
  departmentCount?: number
  personalLabel?: string
  departmentLabel?: string
  personalMembers?: ApprovalTemplateMemberFactory
  departmentMembers?: ApprovalTemplateMemberFactory
}

const DEFAULT_PERSONAL_TEMPLATE_COUNT = 30
const DEFAULT_DEPARTMENT_TEMPLATE_COUNT = 10

function normalizeTemplateCount(count: number | undefined, fallback: number) {
  if (count === undefined || !Number.isFinite(count)) {
    return fallback
  }
  return Math.max(0, Math.floor(count as number))
}

function createTemplateSeries(
  type: "personal" | "department",
  count: number | undefined,
  fallbackCount: number,
  label: string,
  memberFactory: ApprovalTemplateMemberFactory
): ApprovalTemplate[] {
  const normalizedCount = normalizeTemplateCount(count, fallbackCount)

  if (normalizedCount === 0) {
    return []
  }

  return Array.from({ length: normalizedCount }, (_, index) => {
    const taskId = `${type}-${index + 1}`
    const taskName = `${label} ${index + 1}`
    return {
      taskId,
      taskName,
      members: memberFactory({ index, type, taskId, taskName }),
    }
  })
}

export function createMockApprovalTemplates(options: MockApprovalTemplatesOptions = {}) {
  const {
    personalCount,
    departmentCount,
    personalLabel = "개인 결재 경로",
    departmentLabel = "부서 결재 경로",
    personalMembers = ({ index }) => createMockApprovalPath(3 + index),
    departmentMembers = ({ index }) => createMockApprovalPath(3 + index),
  } = options

  return {
    personalTemplates: createTemplateSeries(
      "personal",
      personalCount,
      DEFAULT_PERSONAL_TEMPLATE_COUNT,
      personalLabel,
      personalMembers
    ),
    departmentTemplates: createTemplateSeries(
      "department",
      departmentCount,
      DEFAULT_DEPARTMENT_TEMPLATE_COUNT,
      departmentLabel,
      departmentMembers
    ),
  }
}

export interface TemplateSelectionResult {
  templateName: string
  members: ApprovalMember[]
}

export function buildTemplateSelection(template?: ApprovalTemplate): TemplateSelectionResult {
  if (!template) {
    return {
      templateName: "",
      members: [],
    }
  }

  return {
    templateName: template.taskName,
    members: template.members.map((member, index) => ({
      ...member,
      taskOrder: index,
    })),
  }
}

export const DEFAULT_STD_EQP_IDS = ["STD-EQP-01", "STD-EQP-02", "STD-EQP-03", "STD-EQP-07"] as const

export function createEqpOptions(ids: readonly string[] = DEFAULT_STD_EQP_IDS): EhwSelectOption[] {
  return ids.map((value) => ({
    title: value,
    value,
  }))
}

export type GpmStatus = "정상" | "확인필요" | "미사용"

export interface GpmCheckRow {
  menuCode: string
  menuName: string
  status: GpmStatus
  referenceCount: number
  compareCount: number
  viewCount: number
  command: string
  taskOrder: string
  condition: string
}

export interface GpmCompareInfo {
  stdEqpId: string
  stepSeq: string
  ppid: string
  prcGroup: string
}

export interface GpmTimestamp {
  date: string
  time: string
}

export const GPM_STATUS_CYCLE: readonly GpmStatus[] = ["정상", "확인필요", "미사용"] as const

export interface GpmRowGeneratorOptions {
  inline?: boolean
  statusCycle?: readonly GpmStatus[]
  baseCount?: number
  menuLabel?: string
  menuCodePrefix?: string
  commandCycle?: readonly string[]
}

function normalizeCount(count: number | undefined, fallback = 0): number {
  if (!Number.isFinite(count)) return fallback
  const normalized = Math.floor(count as number)
  return normalized < 0 ? 0 : normalized
}

export function generateGpmCheckRows(count: number, options: GpmRowGeneratorOptions = {}): GpmCheckRow[] {
  const {
    inline = false,
    statusCycle = GPM_STATUS_CYCLE,
    baseCount = 6,
    menuLabel = inline ? "Scanner Item" : "Recipe Item",
    menuCodePrefix = inline ? "SCN" : "GPM",
    commandCycle = inline ? ["SYNC", "CHECK"] : ["SYNC", "CHECK", "SKIP"],
  } = options

  const normalizedCount = normalizeCount(count)

  return Array.from({ length: normalizedCount }, (_, index) => {
    const status = statusCycle[index % statusCycle.length]
    const command = commandCycle[index % commandCycle.length] ?? "SYNC"
    const referenceCount = baseCount + index + (inline ? 2 : 4)
    const compareCount =
      status === "확인필요" ? Math.max(0, referenceCount - 2) : status === "미사용" ? 0 : referenceCount
    const viewCount = status === "미사용" ? referenceCount : Math.max(0, referenceCount - compareCount)

    return {
      menuCode: `${menuCodePrefix}${(index + 1).toString().padStart(4, "0")}`,
      menuName: `${menuLabel} ${index + 1}`,
      status,
      referenceCount,
      compareCount,
      viewCount,
      command,
      taskOrder: `TASK-${(index + 1).toString().padStart(2, "0")}`,
      condition: inline ? "SCANNER" : "DEFAULT",
    }
  })
}

export interface GpmCountSummary {
  totalCount: number
  passCount: number
  failCount: number
  noUsedCount: number
}

export function summarizeGpmRows(rows: readonly GpmCheckRow[]): GpmCountSummary {
  return rows.reduce<GpmCountSummary>(
    (summary, row) => {
      summary.totalCount += 1

      if (row.status === "정상") {
        summary.passCount += 1
        return summary
      }

      if (row.status === "확인필요") {
        summary.failCount += 1
        return summary
      }

      summary.noUsedCount += 1
      return summary
    },
    {
      totalCount: 0,
      passCount: 0,
      failCount: 0,
      noUsedCount: 0,
    }
  )
}

const MIN_PPID_LENGTH = 24
const MAX_PPID_LENGTH = 26
const RANDOM_SUFFIX_LENGTH = 6

function createRandomNumericSuffix(length: number): string {
  const upperBound = 10 ** length
  return Math.floor(Math.random() * upperBound)
    .toString()
    .padStart(length, "0")
}

function normalizePpidPrefix(prefix: string): string {
  const minPrefixLength = MIN_PPID_LENGTH - RANDOM_SUFFIX_LENGTH
  const maxPrefixLength = MAX_PPID_LENGTH - RANDOM_SUFFIX_LENGTH

  if (prefix.length < minPrefixLength) {
    return prefix.padEnd(minPrefixLength, "0")
  }

  if (prefix.length > maxPrefixLength) {
    return prefix.slice(0, maxPrefixLength)
  }

  return prefix
}

export function buildGpmCompareInfo(eqpId: string, prcGroup = "SOH"): GpmCompareInfo {
  const sequenceSuffix = eqpId.slice(-2)
  const ppidPrefix = normalizePpidPrefix(`${eqpId}-PPID`)
  const ppid = `${ppidPrefix}-${createRandomNumericSuffix(RANDOM_SUFFIX_LENGTH)}`

  return {
    stdEqpId: eqpId,
    stepSeq: `SEQ-${sequenceSuffix}`,
    ppid,
    prcGroup,
  }
}

export function createGpmTimestamp(baseDate: Date = new Date()): GpmTimestamp {
  const date = new Date(baseDate)
  return {
    date: date.toISOString().slice(0, 10),
    time: date.toTimeString().slice(0, 8),
  }
}

export type SequenceFilter = "ALL" | "WITH" | "WITHOUT"

export type SequenceFilterOption = {
  label: string
  value: SequenceFilter
}

export const DEFAULT_SEQUENCE_FILTER_OPTIONS: readonly SequenceFilterOption[] = [
  { label: "전체", value: "ALL" },
  { label: "With Sequence", value: "WITH" },
  { label: "Without Sequence", value: "WITHOUT" },
] as const

export function createSequenceFilterOptions(
  options: readonly SequenceFilterOption[] = DEFAULT_SEQUENCE_FILTER_OPTIONS
) {
  return options.map(({ label, value }) => ({ label, value }))
}

export interface RmsSummaryInfo {
  stdEqpId: string
  selectEqpId: string
  recipeId: string
  stdEqpIdInline: string
  selectEqpIdInline: string
  recipeIdInline: string
}

export function createRmsSummaryInfo(overrides: Partial<RmsSummaryInfo> = {}): RmsSummaryInfo {
  return {
    stdEqpId: "STD-EQP-01",
    selectEqpId: "CMP-EQP-07",
    recipeId: "RCP-SEQ-001",
    stdEqpIdInline: "STD-EQP-02",
    selectEqpIdInline: "SCAN-EQP-03",
    recipeIdInline: "RCP_SCN_010/12345_5678",
    ...overrides,
  }
}

export type RmsRecipeStatus = "등록" | "미등록"

export interface RmsRecipeRow {
  RCP_ID: string
  CHAMBERID: string
  RCP_TYPE: string
  STATUS: RmsRecipeStatus
  VIEWFLAG: "Y" | "N"
  CHKINFO: boolean
}

export interface RmsRecipeGeneratorOptions {
  variant?: "sequence" | "scanner"
  statusCycle?: readonly RmsRecipeStatus[]
  chamberPrefix?: string
  recipePrefix?: string
  viewFlag?: "Y" | "N"
}

const DEFAULT_SEQUENCE_STATUS: readonly RmsRecipeStatus[] = ["등록", "미등록", "미등록", "등록"] as const
const DEFAULT_SCANNER_STATUS: readonly RmsRecipeStatus[] = ["등록", "미등록", "미등록", "등록"] as const

export function generateRmsRecipeRows(count: number, options: RmsRecipeGeneratorOptions = {}): RmsRecipeRow[] {
  const {
    variant = "sequence",
    statusCycle = variant === "scanner" ? DEFAULT_SCANNER_STATUS : DEFAULT_SEQUENCE_STATUS,
    chamberPrefix = variant === "scanner" ? "SC" : "CH",
    recipePrefix = variant === "scanner" ? "RCP-SCN" : variant === "sequence" ? "RCP-SEQ" : "RCP",
    viewFlag = "Y",
  } = options

  const normalizedCount = normalizeCount(count)

  return Array.from({ length: normalizedCount }, (_, index) => {
    const status = statusCycle[index % statusCycle.length]
    const isSequenceVariant = variant === "sequence"
    const isScannerVariant = variant === "scanner"

    const recipeId = (() => {
      if (isScannerVariant) {
        if (index === 0) {
          return `${recipePrefix}-010/12345_5678`
        }

        return `${recipePrefix}-${(index + 10).toString().padStart(3, "0")}`
      }

      if (isSequenceVariant && index % 2 === 0) {
        return `${recipePrefix}-${(index + 1).toString().padStart(3, "0")}`
      }

      if (isSequenceVariant) {
        return `RCP-NORM-${(index + 1).toString().padStart(3, "0")}`
      }

      return `${recipePrefix}-${(index + 1).toString().padStart(3, "0")}`
    })()

    const recipeType = (() => {
      if (isScannerVariant) {
        return "SCANNER"
      }

      if (isSequenceVariant && index % 2 === 0) {
        return "SEQUENCE"
      }

      if (isSequenceVariant) {
        return "NORMAL"
      }

      return "NORMAL"
    })()

    const chamberId = `${chamberPrefix}-${(index + 1).toString().padStart(2, "0")}`

    return {
      RCP_ID: recipeId,
      CHAMBERID: chamberId,
      RCP_TYPE: recipeType,
      STATUS: status,
      VIEWFLAG: viewFlag,
      CHKINFO: false,
    }
  })
}

type MockFileScenario = "evidence" | "meeting"

function sanitizeCount(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0
  }
  return Math.max(0, Math.floor(value))
}

function createMockFile(name: string, sizeKb: number): File {
  const sizeBytes = Math.max(1, sizeKb) * 1024
  if (typeof File !== "undefined") {
    return new File([new Uint8Array(sizeBytes)], name, {
      type: "application/pdf",
      lastModified: Date.now(),
    })
  }
  return {
    name,
    size: sizeBytes,
  } as File
}

export function createMockFileList(count: number, scenario: MockFileScenario): File[] {
  const safeCount = sanitizeCount(count)
  if (safeCount <= 0) {
    return []
  }
  const label = scenario === "evidence" ? "근거자료" : "회의록"
  return Array.from({ length: safeCount }, (_unused, index) => {
    const sequence = String(index + 1).padStart(2, "0")
    const sizeBase = scenario === "evidence" ? 160 : 120
    return createMockFile(`${label}_${sequence}.pdf`, sizeBase + index * 24)
  })
}

const TASK_GRADE_ROTATION = ["CL4", "CL3", "CL2", "CL1"] as const
const MIN_APPROVAL_MEMBERS = 2

type ApprovalTaskKind = Extract<EhwTaskKind, "DRAFT" | "APPROVE" | "AGREE" | "NOTICE">

const APPROVAL_ROLE_TITLES: Record<ApprovalTaskKind, string> = {
  DRAFT: "기안자",
  APPROVE: "결재자",
  AGREE: "합의자",
  NOTICE: "통보자",
}

const DEFAULT_DEPARTMENT_BY_KIND: Record<ApprovalTaskKind, string> = {
  DRAFT: "ECO운영팀",
  APPROVE: "ECO운영팀",
  AGREE: "설비기술팀",
  NOTICE: "품질보증팀",
}

interface ApprovalMemberNameParams {
  kind: ApprovalTaskKind
  kindIndex: number
  order: number
}

interface ApprovalMemberGeneratorOptions {
  totalMembers: number
  nameFactory?: (params: ApprovalMemberNameParams) => string
  userIdFactory?: (params: ApprovalMemberNameParams) => string
  deptFactory?: (params: ApprovalMemberNameParams) => string
}

function createApprovalSequence(totalMembers: number): ApprovalTaskKind[] {
  const safeTotal = Math.max(MIN_APPROVAL_MEMBERS, totalMembers)
  const sequence: ApprovalTaskKind[] = ["DRAFT", "APPROVE"]
  const remaining = safeTotal - sequence.length

  if (remaining <= 0) {
    return sequence
  }

  const agreeCount = Math.ceil(remaining / 2)
  const noticeCount = Math.max(0, remaining - agreeCount)

  for (let index = 0; index < agreeCount; index += 1) {
    sequence.push("AGREE")
  }

  for (let index = 0; index < noticeCount; index += 1) {
    sequence.push("NOTICE")
  }

  return sequence
}

function defaultApprovalName({ kind, kindIndex }: ApprovalMemberNameParams): string {
  const base = APPROVAL_ROLE_TITLES[kind]
  if (kind === "DRAFT" || kind === "APPROVE" || kindIndex === 0) {
    return base
  }
  return `${base} ${kindIndex + 1}`
}

function defaultApprovalUserId({ order }: ApprovalMemberNameParams): string {
  return `appr${order.toString().padStart(2, "0")}`
}

function defaultDepartment({ kind }: ApprovalMemberNameParams): string {
  return DEFAULT_DEPARTMENT_BY_KIND[kind]
}

function generateApprovalMembers({
  totalMembers,
  nameFactory,
  userIdFactory,
  deptFactory,
}: ApprovalMemberGeneratorOptions): ApprovalMember[] {
  const sequence = createApprovalSequence(totalMembers)
  const counters: Record<ApprovalTaskKind, number> = {
    DRAFT: 0,
    APPROVE: 0,
    AGREE: 0,
    NOTICE: 0,
  }

  return sequence.map((kind, index) => {
    const order = index + 1
    const kindIndex = counters[kind]
    counters[kind] += 1

    const params: ApprovalMemberNameParams = { kind, kindIndex, order }
    const taskEmpName = nameFactory?.(params) ?? defaultApprovalName(params)
    const userId = userIdFactory?.(params) ?? defaultApprovalUserId(params)
    const task_DeptName = deptFactory?.(params) ?? defaultDepartment(params)
    const uGradeName = TASK_GRADE_ROTATION[(order - 1) % TASK_GRADE_ROTATION.length]

    return {
      taskOrder: order,
      taskKind: kind,
      taskEmpName,
      uGradeName,
      userId,
      task_DeptName,
    }
  })
}

export function createMockApprovalMember(index: number): ApprovalMember {
  const safeIndex = Math.max(0, Math.floor(index))
  const members = generateApprovalMembers({ totalMembers: safeIndex + 1 })
  return members[Math.min(safeIndex, members.length - 1)]
}

export function createMockApprovalPath(count: number): ApprovalMember[] {
  const sanitized = sanitizeCount(count)
  if (sanitized <= 0) {
    return []
  }
  const totalMembers = Math.max(MIN_APPROVAL_MEMBERS, sanitized)
  return generateApprovalMembers({ totalMembers })
}

export function createApprovalMembers(prefix: string, totalMembers = 4): ApprovalMember[] {
  const normalizedTotal = Math.max(MIN_APPROVAL_MEMBERS, totalMembers)
  const lowerPrefix = prefix.toLowerCase()

  return generateApprovalMembers({
    totalMembers: normalizedTotal,
    nameFactory: ({ kind, kindIndex }) => {
      const base = APPROVAL_ROLE_TITLES[kind]
      if (kind === "DRAFT" || kind === "APPROVE") {
        return `${prefix} ${base}`
      }
      return `${prefix} ${base} ${kindIndex + 1}`
    },
    userIdFactory: ({ kind, kindIndex }) => {
      const roleCode = kind.toLowerCase()
      const ordinal = kind === "DRAFT" || kind === "APPROVE" ? 1 : kindIndex + 1
      return `${lowerPrefix}-${roleCode}-${ordinal.toString().padStart(2, "0")}`
    },
  })
}

export type RmsCompareVariant = "sequence" | "scanner"

export function createManualRmsRows(variant: RmsCompareVariant, withUsedTime: boolean): ManualRmsRow[] {
  const recipes = generateRmsRecipeRows(4, { variant })
  return recipes.map((row, index) => ({
    eqpSelect: variant === "scanner" ? `INLINE-${index + 1}` : `EQP-${index + 1}`,
    eqpStd: variant === "scanner" ? `SCN-STD-${index + 1}` : `STD-${index + 1}`,
    chamberId: row.CHAMBERID,
    rcpId: row.RCP_ID,
    usedTime: withUsedTime ? 45 + index * 30 : 0,
  }))
}

export function createCompareRowFromManual(manual: ManualRmsRow, isStdEqp: boolean): RmsCompareRowUi {
  return {
    eqpSelect: manual.eqpSelect,
    eqpStd: manual.eqpStd,
    chamberId: manual.chamberId,
    rcpId: manual.rcpId,
    model_chk: isStdEqp ? "일치" : "불일치",
    a_rate: 98.5,
    b_rate: 87.2,
    c_rate: 75.4,
    fail_message: isStdEqp ? "" : "스텝 조건이 상이합니다.",
    isStdEqp,
    chkInfo: false,
  }
}

export function createRmsCompareRows(variant: RmsCompareVariant): RmsCompareRowUi[] {
  const recipes = generateRmsRecipeRows(6, { variant })
  return recipes.map((row, index) => ({
    eqpSelect: variant === "scanner" ? `INLINE-${index + 1}` : `EQP-${index + 1}`,
    eqpStd: variant === "scanner" ? `INLINE-STD-${index + 1}` : `STD-${index + 1}`,
    chamberId: row.CHAMBERID,
    rcpId: row.RCP_ID,
    model_chk: index % 2 === 0 ? "일치" : "불일치",
    a_rate: 99 - index,
    b_rate: 97 - index,
    c_rate: 95 - index,
    fail_message: index % 2 === 0 ? "" : "PPID 실행 이력 불일치",
    isStdEqp: index === 0,
    chkInfo: false,
  }))
}

const DEFAULT_RMS_MANUAL_COUNT = 3
const DEFAULT_RMS_STD_ONLY_COUNT = 3
const DEFAULT_RMS_COMPARE_COUNT = 4

function createStoryManualRow(index: number): ManualRmsRow {
  const eqpSuffix = (301 + index).toString().padStart(3, "0")
  return {
    eqpSelect: `EQP-${eqpSuffix}`,
    eqpStd: `STD-EQP-${((index % 3) + 1).toString().padStart(2, "0")}`,
    chamberId: `CH-${String.fromCharCode(65 + (index % 6))}${(index + 1).toString().padStart(2, "0")}`,
    rcpId: `RCP-MAN-${(index + 1).toString().padStart(3, "0")}`,
    usedTime: 90 + index * 32,
  }
}

function createStoryStdOnlyRow(index: number): ManualRmsRow {
  const eqpId = `STD-EQP-${(index + 4).toString().padStart(2, "0")}`
  return {
    eqpSelect: eqpId,
    eqpStd: eqpId,
    chamberId: `CH-STD-${(index + 1).toString().padStart(2, "0")}`,
    rcpId: `RCP-STD-${(index + 10).toString().padStart(3, "0")}`,
    usedTime: 140 + index * 45,
  }
}

export interface RmsManualStoryOptions {
  manualCount?: number
  manualStdOnlyCount?: number
}

export function createRmsManualStoryLists(options: RmsManualStoryOptions = {}) {
  const manualCount = sanitizeCount(options.manualCount)
  const stdOnlyCount = sanitizeCount(options.manualStdOnlyCount)

  const manualList = Array.from({ length: manualCount }, (_, index) => createStoryManualRow(index))
  const manualStdOnlyList = Array.from({ length: stdOnlyCount }, (_, index) => createStoryStdOnlyRow(index))

  return {
    manualList,
    manualStdOnlyList,
    manualStdOnlyChkInfo: manualStdOnlyList.map(() => false),
  }
}

export interface RmsCompareStoryRowsOptions {
  compareCount?: number
  selectedCount?: number
  sourceManualRows?: ManualRmsRow[]
}

export function createRmsCompareStoryRows(options: RmsCompareStoryRowsOptions = {}): RmsCompareRowUi[] {
  const compareCount = sanitizeCount(options.compareCount ?? DEFAULT_RMS_COMPARE_COUNT)
  const selectedCount = Math.max(0, Math.min(compareCount, sanitizeCount(options.selectedCount ?? 1)))

  if (compareCount === 0) {
    return []
  }

  const manualSource = options.sourceManualRows?.length
    ? options.sourceManualRows
    : createRmsManualStoryLists({ manualCount: Math.max(1, compareCount) }).manualList

  return Array.from({ length: compareCount }, (_, index) => {
    const manual = manualSource[index % manualSource.length]
    const isStdEqp = index % 3 === 0
    const isModelChk = index % 3 === 1
    const manualForConversion = isStdEqp ? { ...manual, eqpStd: manual.eqpSelect } : manual
    const baseRow = createCompareRowFromManual(manualForConversion, isStdEqp)
    const rateShift = index * 2

    return {
      ...baseRow,
      a_rate: round(Math.max(30, baseRow.a_rate - rateShift), 1),
      b_rate: round(Math.max(25, baseRow.b_rate - rateShift), 1),
      c_rate: round(Math.max(20, baseRow.c_rate - rateShift), 1),
      model_chk: isModelChk ? "일치" : "불일치",
      fail_message: baseRow.fail_message || (isStdEqp ? "" : "PPID 실행 이력이 상이합니다."),
      chkInfo: index < selectedCount,
    }
  })
}

export function createEcmCompareRows(variant: "main" | "inline"): EcmCompareRow[] {
  const baseLabel = variant === "inline" ? "INLINE" : "MAIN"
  return Array.from({ length: 5 }, (_unused, index) => ({
    eqpSelect: `${baseLabel}-EQP-${index + 1}`,
    eqpStd: `${baseLabel}-STD-${index + 1}`,
    ecModel: `${baseLabel}-MODEL-${index + 10}`,
    model_chk: index % 2 === 0 ? "일치" : "불일치",
    a_rate: 93 - index,
    b_rate: 88 - index,
    c_rate: 84 - index,
    fail_message: index % 2 === 0 ? "" : "ECM 설정이 다릅니다.",
  }))
}

export function createEhwCreateEcoMockData(options: EhwCreateEcoOptions = {}): EhwCreateEcoData {
  const { isInlineEqpFlag = false, attachFileUploadCount = 0, mtgFileUploadCount = 0, apprPathCount = 3 } = options

  const { personalTemplates, departmentTemplates } = createMockApprovalTemplates()

  const rmsSummaryDefaults = createRmsSummaryInfo()
  const insertParams: EhwInsertParams = {
    lineId: "L01",
    eqpIdList: `${rmsSummaryDefaults.selectEqpId} / ${rmsSummaryDefaults.selectEqpIdInline}`,
    procId: "PRC-1001",
    stepSeqList: "SEQ-01, SEQ-02",
    ecoType: "정상",
    caseType: "양산",
    reqTitle: "ECO Highway Mock Request",
    userComment: "",
    lotQty: "12",
    periodType: "7D",
    intlkType: "L1",
    nonSopYn: "N",
    logicType: "ECO_CREATE",
    stdType: "표준",
    stdTitle: "Mock Standard Title",
    stdNo: "STD-2024-001",
    mtgProgrsType: undefined,
  }

  const multiProcessCandidates: MultiProcessStep[] = [
    { id: "MP-001", processId: "PRC-1001", prcGroup: "SOH", stepSeq: "SEQ-01", lotCount: 3 },
    { id: "MP-002", processId: "PRC-1002", prcGroup: "SOH", stepSeq: "SEQ-02", lotCount: 5 },
    { id: "MP-003", processId: "PRC-1003", prcGroup: "CRC", stepSeq: "SEQ-03", lotCount: 4 },
    { id: "MP-004", processId: "PRC-2001", prcGroup: "CMP", stepSeq: "SEQ-04", lotCount: 2 },
    { id: "MP-005", processId: "PRC-2001", prcGroup: "CRC", stepSeq: "SEQ-05", lotCount: 6 },
  ]

  return {
    isInlineEqpFlag,
    insertParams,
    periodItems: [
      { label: "기간 없음", value: "NONE" },
      { label: "7일", value: "7D" },
      { label: "14일", value: "14D" },
      { label: "30일", value: "30D" },
    ],
    multiPrcSelectCond: {
      procId: [],
      prcGroup: [],
    },
    processIdItemsMultiPrc: [
      { PROCESS_ID: "PRC-1001" },
      { PROCESS_ID: "PRC-1002" },
      { PROCESS_ID: "PRC-1003" },
      { PROCESS_ID: "PRC-2001" },
    ],
    prcGroupItemsMultiPrc: [
      { PROCESS_GROUP_NAME: "SOH" },
      { PROCESS_GROUP_NAME: "CRC" },
      { PROCESS_GROUP_NAME: "CMP" },
    ],
    multiProcessCandidates,
    selectedMultiProcess: multiProcessCandidates.slice(0, 3),
    einConnectEcoFlag: false,
    confirmButtonFlag: false,
    attachFileArr: createMockFileList(attachFileUploadCount, "evidence"),
    attachFileChkFlag: false,
    mtgFileArr: createMockFileList(mtgFileUploadCount, "meeting"),
    personalApprList: personalTemplates,
    deptApprList: departmentTemplates,
    apprPath: createMockApprovalPath(apprPathCount),
    stdEqpIdList: createEqpOptions(["STD-EQP-01", "STD-EQP-02", "STD-EQP-03"]),
    stdEqpIdListInline: createEqpOptions(["STD-EQP-02", "STD-EQP-04", "STD-EQP-05"]),
    stdEqpInfo: { eqpId: rmsSummaryDefaults.stdEqpId },
    stdEqpInfoInline: { eqpId: rmsSummaryDefaults.stdEqpIdInline },
    rmsApiCallParamsStd: { stdEqpId: rmsSummaryDefaults.stdEqpId },
    rmsApiCallParamsManual: { recipeId: "" },
    rmsApiCallParamsStdInline: { stdEqpId: rmsSummaryDefaults.stdEqpIdInline },
    rmsApiCallParamsManualInline: { recipeId: "" },
    selectEqpInfoInline: { eqpId: rmsSummaryDefaults.selectEqpIdInline },
    rmModelSelectStr: rmsSummaryDefaults.recipeId,
    rmModelSelectStrInline: rmsSummaryDefaults.recipeIdInline,
    ecModelSelectStr: `ECM-${rmsSummaryDefaults.stdEqpId}`,
    ecModelSelectStrInline: `ECM-${rmsSummaryDefaults.stdEqpIdInline}`,
    manualRmsCheckList: createManualRmsRows("sequence", false),
    manualRmsCheckListStdOnly: createManualRmsRows("sequence", true),
    manualRmsCheckListInline: createManualRmsRows("scanner", false),
    manualRmsCheckListStdOnlyInline: createManualRmsRows("scanner", true),
    defaultRmsCheckList: createRmsCompareRows("sequence"),
    defaultRmsCheckListInline: createRmsCompareRows("scanner"),
    ecmApiResult: createEcmCompareRows("main"),
    ecmApiResultInline: createEcmCompareRows("inline"),
  }
}
