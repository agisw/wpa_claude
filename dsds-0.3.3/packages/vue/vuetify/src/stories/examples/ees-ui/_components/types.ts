export type KeyValue = {
  key: string
  value: string
}

export type PeriodUnitType = "Day" | "Hour"
export type PeriodValueType = 31 | 24

export type SearchParam = {
  lineList: KeyValue[]
  selectedLine: KeyValue
  areaList: KeyValue[]
  selectedArea: KeyValue
  sdwtList: KeyValue[]
  selectedSdwt: KeyValue
  eqpModelList: KeyValue[]
  selectedEqpModel: KeyValue
  fdcModelList: KeyValue[]
  selectedFdcModel: KeyValue
  eqpIdList: KeyValue[]
  selectedEqpId: KeyValue
  unitList: KeyValue[]
  selectedUnit: KeyValue
  checkPeriod: boolean
  periodUnit: PeriodUnitType
  periodValue: number
  periodMaxValue: PeriodValueType
  fromDate: Date
  toDate: Date
  searchData: [string, string]
}
