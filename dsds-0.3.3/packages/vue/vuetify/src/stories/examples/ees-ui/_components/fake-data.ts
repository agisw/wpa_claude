export type AlarmHistoryRow = {
  ACT_TIME: string
  IS_RUNNING: string
  LINE: string
  EQP_MODEL: string
  EQP_TYPE: string
  EQP_ID: string
  CH_ID: string
  CH_NAME: string
  ALARM_GROUP_1: string
  ALARM_GROUP_2: string
  ALARM_GROUP_3: string
  ALARM_CODE: string
  ALARM_ID: string
  ALARM_TEXT: string
  LOT_ID: string
  LOT_TYPE: string
  STEPSEQ: string
  SLOT_NO: string
  WAFER_NO: string
  PART_ID: string
  PROC_PLAN_ID: string
  PPID: string
  RECIPEID: string
  OCCUR_DATE: string
  SET_TIME: string
  PROCESSING_TIME: number
  IS_EQHOLD: boolean
  IS_LOTHOLD: boolean
  PATIENT: string
  IS_EIS: boolean
  IS_AEGIS: boolean
  IS_MEASURE: boolean
  IS_APC: boolean
  IS_RCMD: boolean
  ACTION_COMMENT: string
  IS_PATIENT: boolean
  EQP_STATUS_CODE: string
}

export const fakeAlarmHistory: AlarmHistoryRow[] = [
  {
    ACT_TIME: "2024-10-01 12:01",
    IS_RUNNING: "Set",
    LINE: "L01",
    EQP_MODEL: "ETCH-100",
    EQP_TYPE: "ETCHER",
    EQP_ID: "EQP-A01",
    CH_ID: "CH-01",
    CH_NAME: "Chamber-A",
    ALARM_GROUP_1: "Module-1",
    ALARM_GROUP_2: "Unit-Alpha",
    ALARM_GROUP_3: "Cell-1",
    ALARM_CODE: "ALM-1001",
    ALARM_ID: "A-1001",
    ALARM_TEXT: "Pressure High Warning",
    LOT_ID: "LOT-2401",
    LOT_TYPE: "Mass",
    STEPSEQ: "30",
    SLOT_NO: "12",
    WAFER_NO: "05",
    PART_ID: "PRT-01",
    PROC_PLAN_ID: "PLAN-007",
    PPID: "PP-12",
    RECIPEID: "REC-88",
    OCCUR_DATE: "2024-10-01",
    SET_TIME: "2024-10-01 12:01",
    PROCESSING_TIME: 15,
    IS_EQHOLD: false,
    IS_LOTHOLD: false,
    PATIENT: "N",
    IS_EIS: false,
    IS_AEGIS: true,
    IS_MEASURE: true,
    IS_APC: false,
    IS_RCMD: true,
    ACTION_COMMENT: "Checked valves",
    IS_PATIENT: false,
    EQP_STATUS_CODE: "Normal",
  },
  {
    ACT_TIME: "2024-10-01 13:45",
    IS_RUNNING: "Clear",
    LINE: "L01",
    EQP_MODEL: "ETCH-100",
    EQP_TYPE: "ETCHER",
    EQP_ID: "EQP-A01",
    CH_ID: "CH-01",
    CH_NAME: "Chamber-A",
    ALARM_GROUP_1: "Module-1",
    ALARM_GROUP_2: "Unit-Alpha",
    ALARM_GROUP_3: "Cell-1",
    ALARM_CODE: "ALM-1001",
    ALARM_ID: "A-1001",
    ALARM_TEXT: "Pressure High Cleared",
    LOT_ID: "LOT-2401",
    LOT_TYPE: "Mass",
    STEPSEQ: "30",
    SLOT_NO: "12",
    WAFER_NO: "05",
    PART_ID: "PRT-01",
    PROC_PLAN_ID: "PLAN-007",
    PPID: "PP-12",
    RECIPEID: "REC-88",
    OCCUR_DATE: "2024-10-01",
    SET_TIME: "2024-10-01 13:45",
    PROCESSING_TIME: 8,
    IS_EQHOLD: false,
    IS_LOTHOLD: false,
    PATIENT: "N",
    IS_EIS: false,
    IS_AEGIS: false,
    IS_MEASURE: true,
    IS_APC: false,
    IS_RCMD: false,
    ACTION_COMMENT: "Reset complete",
    IS_PATIENT: false,
    EQP_STATUS_CODE: "Normal",
  },
  {
    ACT_TIME: "2024-10-02 02:20",
    IS_RUNNING: "Set",
    LINE: "L02",
    EQP_MODEL: "ETCH-200",
    EQP_TYPE: "ETCHER",
    EQP_ID: "EQP-B12",
    CH_ID: "CH-09",
    CH_NAME: "Chamber-Z",
    ALARM_GROUP_1: "Module-3",
    ALARM_GROUP_2: "Unit-Gamma",
    ALARM_GROUP_3: "Cell-9",
    ALARM_CODE: "ALM-2020",
    ALARM_ID: "A-2020",
    ALARM_TEXT: "Over Temperature",
    LOT_ID: "LOT-2450",
    LOT_TYPE: "Pilot",
    STEPSEQ: "12",
    SLOT_NO: "02",
    WAFER_NO: "01",
    PART_ID: "PRT-12",
    PROC_PLAN_ID: "PLAN-010",
    PPID: "PP-45",
    RECIPEID: "REC-21",
    OCCUR_DATE: "2024-10-02",
    SET_TIME: "2024-10-02 02:20",
    PROCESSING_TIME: 21,
    IS_EQHOLD: true,
    IS_LOTHOLD: false,
    PATIENT: "Y",
    IS_EIS: true,
    IS_AEGIS: false,
    IS_MEASURE: false,
    IS_APC: true,
    IS_RCMD: false,
    ACTION_COMMENT: "Cooling initiated",
    IS_PATIENT: true,
    EQP_STATUS_CODE: "Critical",
  },
]
