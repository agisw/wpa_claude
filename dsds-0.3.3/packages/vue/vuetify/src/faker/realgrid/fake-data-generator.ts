import {
  GridView,
  ValueType,
  type CellLayoutGroupHeader,
  type CellLayoutHeader,
  type CellStyleCallback,
  type GridCell,
  type GridColumn,
  type GridHeader,
} from "realgrid"
import { extendedFakeSource } from "./column-presets"

// Fake 데이터 타입 정의
export type FakeType = "random" | "fixed" | "incremental" | "computed"

// Fake 옵션 인터페이스
export interface FakeOptions {
  min?: number
  max?: number
  prefix?: string
  suffix?: string
  format?: string
  computeFn?: (row: Record<string, any>, index: number, fakeOptions: FakeOptions) => any
}

// 컬럼 정의 확장 인터페이스
export interface ExtendedColumn {
  name: string
  fieldName: string
  styleName?: string
  editable?: boolean
  visible?: boolean
  width?: string | number
  header?: string | CellLayoutGroupHeader
  renderer?: { type: string; callback: (grid: GridView, cell: GridCell) => string }
  styleCallback?: CellStyleCallback
  dataType?: ValueType
  fakeType?: FakeType
  fakeSourceKey?: string
  fakeOptions?: FakeOptions
  [key: string]: any // 기존 RealGrid 컬럼 속성들
}

// Fake 데이터 소스 타입
export type FakeDataSource = Record<string, string | string[] | number | number[]>

// Fake 데이터 생성기 클래스
export class FakeDataGenerator {
  private fakeSource: FakeDataSource
  private incrementalCounters: Record<string, number> = {}

  constructor(fakeSource: FakeDataSource) {
    this.fakeSource = fakeSource
  }

  // 단일 값 생성
  generateValue(column: ExtendedColumn, rowIndex: number, rowData: Record<string, any>): any {
    if (!column.fakeType) return ""

    switch (column.fakeType) {
      case "random":
        return this.generateRandomValue(column)
      case "fixed":
        return this.generateFixedValue(column)
      case "incremental":
        return this.generateIncrementalValue(column)
      case "computed":
        return this.generateComputedValue(column, rowData, rowIndex)
      default:
        return ""
    }
  }

  // 여러 행의 데이터 생성
  generateRows(columns: ExtendedColumn[], rowCount: number): Record<string, any>[] {
    const rows: Record<string, any>[] = []

    for (let i = 0; i < rowCount; i++) {
      const row: Record<string, any> = {}

      // 먼저 모든 non-computed 컬럼을 처리
      for (const column of columns) {
        if (column.fakeType && column.fakeType !== "computed") {
          row[column.fieldName] = this.generateValue(column, i, row)
        }
      }

      // 그 다음 computed 컬럼을 처리 (다른 컬럼들을 참조할 수 있음)
      for (const column of columns) {
        if (column.fakeType === "computed") {
          row[column.fieldName] = this.generateValue(column, i, row)
        }
      }

      rows.push(row)
    }

    return rows
  }

  private generateRandomValue(column: ExtendedColumn): any {
    if (!column.fakeSourceKey) return ""

    const sourceData = this.fakeSource[column.fakeSourceKey]
    if (!sourceData) return ""

    if (Array.isArray(sourceData)) {
      const randomIndex = Math.floor(Math.random() * sourceData.length)
      return sourceData[randomIndex]
    }

    return sourceData
  }

  private generateFixedValue(column: ExtendedColumn): any {
    if (!column.fakeSourceKey) return ""

    const sourceData = this.fakeSource[column.fakeSourceKey]
    return Array.isArray(sourceData) ? sourceData[0] : sourceData
  }

  private generateIncrementalValue(column: ExtendedColumn): any {
    const key = column.fieldName
    if (!(key in this.incrementalCounters)) {
      this.incrementalCounters[key] = column.fakeOptions?.min || 1
    }

    const value = this.incrementalCounters[key]
    this.incrementalCounters[key]++

    const prefix = column.fakeOptions?.prefix || ""
    const suffix = column.fakeOptions?.suffix || ""

    return `${prefix}${value}${suffix}`
  }

  private generateComputedValue(column: ExtendedColumn, rowData: Record<string, any>, rowIndex: number): any {
    if (column.fakeOptions?.computeFn) {
      return column.fakeOptions.computeFn(rowData, rowIndex, column.fakeOptions)
    }
    return ""
  }

  // 카운터 리셋
  resetCounters(): void {
    this.incrementalCounters = {}
  }
}

// 기본 fake 데이터 소스들
export const defaultFakeSource: FakeDataSource = {
  // 이름 관련
  firstNames: ["김철수", "이영희", "박민수", "최지은", "정우진", "한소희", "임채영", "송민호"],
  lastNames: ["김", "이", "박", "최", "정", "한", "임", "송"],
  fullNames: ["김철수", "이영희", "박민수", "최지은", "정우진", "한소희", "임채영", "송민호", "류현진", "손흥민"],

  // 회사 관련
  companies: [
    "네이버",
    "카카오",
    "삼성전자",
    "LG전자",
    "SK텔레콤",
    "현대자동차",
    "포스코",
    "신한은행",
    "하나은행",
    "우리은행",
  ],

  // 이메일 도메인
  emailDomains: ["gmail.com", "naver.com", "daum.net", "kakao.com", "company.co.kr"],

  // 연령대
  ages: [22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50],

  // 부서
  departments: ["개발팀", "기획팀", "디자인팀", "마케팅팀", "영업팀", "인사팀", "재무팀"],

  // 직급
  positions: ["사원", "주임", "대리", "과장", "차장", "부장", "상무", "전무"],

  // 상태
  statuses: ["활성", "비활성", "대기", "승인", "거부"],

  // 고정값들
  defaultCompany: "우리회사",
  defaultDepartment: "개발팀",
  activeStatus: "활성",
}

// 유틸리티 함수들
export function createFields(columns: ExtendedColumn[]) {
  return columns.map((col) => ({
    fieldName: col.fieldName,
    dataType: col.dataType || ValueType.TEXT,
  }))
}

export function createRealGridColumns(columns: ExtendedColumn[]) {
  return columns.map((col) => {
    const { fakeType, fakeSourceKey, fakeOptions, dataType, ...realGridColumn } = col
    return realGridColumn as GridColumn
  })
}

export function generateFakeData(
  columns: ExtendedColumn[],
  rowCount: number = 10,
  fakeSource: FakeDataSource = extendedFakeSource
) {
  const generator = new FakeDataGenerator(fakeSource)
  return generator.generateRows(columns, rowCount)
}
