import { ValueType, type LayoutItem } from "realgrid"
import type { ExtendedColumn, FakeDataSource } from "./fake-data-generator"
import { formatDate } from "@/lib/utils"

/**
 * Returns a Date object within the last `maxDays` days (including today).
 */
export function randomPastDate(maxDays: number) {
  const date = new Date()
  const offset = Math.floor(Math.random() * (Math.max(1, maxDays) + 1))
  date.setDate(date.getDate() - offset)
  // randomize time within the day
  date.setHours(Math.floor(Math.random() * 24))
  date.setMinutes(Math.floor(Math.random() * 60))
  date.setSeconds(Math.floor(Math.random() * 60))
  return date
}

// 자주 사용하는 컬럼 템플릿들 정의
// 공통으로 재사용 가능한 fake 템플릿 (중복되는 fakeType/fakeSourceKey를 하나로 묶음)
const baseFullNamesTemplate = {
  dataType: ValueType.TEXT,
  width: "120",
  fakeType: "random" as const,
  fakeSourceKey: "fullNames",
}

const baseUsersTemplate = {
  dataType: ValueType.TEXT,
  width: "120",
  autoFilter: false,
  fakeType: "random" as const,
  fakeSourceKey: "users",
}

export const columnTemplates = {
  // ID/식별자 관련
  id: {
    fieldName: "id",
    width: "80",
    header: { text: "ID" },
    dataType: ValueType.TEXT,
    fakeType: "incremental" as const,
    fakeOptions: { min: 1, prefix: "ID", suffix: "" },
  },

  userId: {
    fieldName: "userId",
    width: "100",
    header: { text: "사용자 ID" },
    dataType: ValueType.TEXT,
    fakeType: "incremental" as const,
    fakeOptions: { min: 1000, prefix: "USER", suffix: "" },
  },

  employeeId: {
    fieldName: "employeeId",
    width: "120",
    header: { text: "사번" },
    dataType: ValueType.TEXT,
    fakeType: "incremental" as const,
    fakeOptions: { min: 2024001, prefix: "EMP", suffix: "" },
  },

  orderId: {
    fieldName: "orderId",
    width: "120",
    header: { text: "주문번호" },
    dataType: ValueType.TEXT,
    fakeType: "incremental" as const,
    fakeOptions: { min: 20240001, prefix: "ORD-", suffix: "" },
  },

  productId: {
    fieldName: "productId",
    width: "100",
    header: { text: "상품 ID" },
    dataType: ValueType.TEXT,
    fakeType: "incremental" as const,
    fakeOptions: { min: 1, prefix: "PRD", suffix: "" },
  },

  // 이름 관련
  name: {
    fieldName: "name",
    width: "100",
    header: { text: "이름" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "firstNames",
  },

  fullName: {
    ...baseFullNamesTemplate,
    fieldName: "fullName",
    header: { text: "전체 이름" },
  },

  customerName: {
    ...baseFullNamesTemplate,
    fieldName: "customerName",
    header: { text: "고객명" },
  },

  productName: {
    fieldName: "productName",
    width: "180",
    header: { text: "상품명" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "productNames",
  },

  // 연락처 정보
  email: {
    fieldName: "email",
    width: "250",
    header: { text: "이메일" },
    dataType: ValueType.TEXT,
    fakeType: "computed" as const,
    fakeOptions: {
      computeFn: (row: any, index: number) => {
        const name = (row.Name || row.FullName || row.CustomerName || `user${index}`).replace(/\s+/g, "").toLowerCase()
        const domains = ["gmail.com", "naver.com", "company.com", "example.com"]
        const domain = domains[Math.floor(Math.random() * domains.length)]
        return `${name}${index + 1}@${domain}`
      },
    },
  },

  phone: {
    fieldName: "phone",
    width: "120",
    header: { text: "전화번호" },
    dataType: ValueType.TEXT,
    fakeType: "computed" as const,
    fakeOptions: {
      computeFn: () => {
        const prefix = ["010", "011", "016", "017", "018", "019"]
        const selectedPrefix = prefix[Math.floor(Math.random() * prefix.length)]
        const middle = String(Math.floor(Math.random() * 9000) + 1000)
        const last = String(Math.floor(Math.random() * 9000) + 1000)
        return `${selectedPrefix}-${middle}-${last}`
      },
    },
  },

  // 숫자 관련
  age: {
    fieldName: "age",
    width: "70",
    header: { text: "나이" },
    dataType: ValueType.NUMBER,
    fakeType: "random" as const,
    fakeSourceKey: "ages",
    numberFormat: "0",
  },

  price: {
    fieldName: "price",
    width: "100",
    header: { text: "가격" },
    dataType: ValueType.NUMBER,
    fakeType: "random" as const,
    fakeSourceKey: "prices",
    numberFormat: "#,##0원",
  },

  subArea: {
    fieldName: "subArea",
    width: "100",
    header: { text: "Sub Area" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "subAreas",
  },

  eqpId: {
    fieldName: "eqpId",
    width: "80",
    header: { text: "EQP ID" },
    dataType: ValueType.TEXT,
    fakeType: "computed" as const,
    fakeOptions: {
      computeFn: () => {
        // A-Z 사이의 알파벳 연속 4글자
        const prefix = Array.from({ length: 5 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join(
          ""
        )
        // 0-9 사이의 숫자 연속 3글자
        const postfix = Array.from({ length: 3 }, () => String(Math.floor(Math.random() * 10))).join("")
        return `${prefix}${postfix}`
      },
    },
  },

  recipeId: {
    fieldName: "recipeId",
    width: "120",
    header: { text: "Recipe ID" },
    dataType: ValueType.TEXT,
    fakeType: "computed" as const,
    fakeOptions: {
      computeFn: () => {
        // A-Z 사이의 알파벳 연속 5글자
        const prefix = Array.from({ length: 5 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join(
          ""
        )
        // 0-9 사이의 숫자 연속 3글자
        const postfix = Array.from({ length: 3 }, () => String(Math.floor(Math.random() * 10))).join("")
        return `${prefix}${postfix}`
      },
    },
  },

  amount: {
    fieldName: "amount",
    width: "110",
    header: { text: "금액" },
    dataType: ValueType.NUMBER,
    fakeType: "random" as const,
    fakeSourceKey: "orderAmounts",
    numberFormat: "#,##0원",
  },

  quantity: {
    fieldName: "quantity",
    width: "80",
    header: { text: "수량" },
    dataType: ValueType.NUMBER,
    fakeType: "random" as const,
    fakeSourceKey: "quantities",
    numberFormat: "0",
  },

  // 조직/회사 관련
  company: {
    fieldName: "company",
    width: "180",
    header: { text: "회사명" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "companies",
  },

  department: {
    fieldName: "department",
    width: "120",
    header: { text: "부서" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "departments",
  },

  position: {
    fieldName: "position",
    width: "100",
    header: { text: "직급" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "positions",
  },

  // 상태/분류 관련
  status: {
    fieldName: "status",
    width: "80",
    header: { text: "상태" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "statuses",
  },

  activeStatus: {
    fieldName: "activeStatus",
    width: "80",
    header: { text: "상태" },
    dataType: ValueType.TEXT,
    fakeType: "fixed" as const,
    fakeSourceKey: "activeStatus",
  },

  orderStatus: {
    fieldName: "orderStatus",
    width: "100",
    header: { text: "주문상태" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "orderStatuses",
  },

  category: {
    fieldName: "category",
    width: "120",
    header: { text: "카테고리" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "categories",
  },

  // 날짜 관련
  createdAt: {
    fieldName: "createdAt",
    width: "120",
    header: { text: "생성일" },
    dataType: ValueType.TEXT,
    fakeType: "computed" as const,
    fakeOptions: {
      computeFn: () => formatDate(randomPastDate(365), "yyyy-MM-dd"),
    },
  },

  orderDate: {
    fieldName: "orderDate",
    width: "120",
    header: { text: "주문일" },
    dataType: ValueType.TEXT,
    fakeType: "computed" as const,
    fakeOptions: {
      computeFn: () => formatDate(randomPastDate(30), "yyyy-MM-dd"),
    },
  },

  joinDate: {
    fieldName: "joinDate",
    width: "120",
    header: { text: "입사일" },
    dataType: ValueType.TEXT,
    fakeType: "computed" as const,
    fakeOptions: {
      computeFn: () => {
        // joinDate within last ~10 years (approximate by days)
        return formatDate(randomPastDate(365 * 10), "yyyy-MM-dd")
      },
    },
  },

  // 공정 / 요청 관련 컬럼 템플릿
  lineId: {
    fieldName: "lineId",
    width: "70",
    header: { text: "LineID" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "lineIds",
  },

  lineName: {
    fieldName: "lineName",
    width: "70",
    header: { text: "Line Name" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "lineNames",
  },

  process: {
    fieldName: "process",
    width: "140",
    header: { text: "적용 공정" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "processes",
  },

  procId: {
    fieldName: "procId",
    width: "120",
    header: { text: "Proc ID" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "procIds",
  },

  partId: {
    fieldName: "partId",
    width: "120",
    header: { text: "Part ID" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "partIds",
  },

  // lot / slot 관련
  lotId: {
    fieldName: "lotId",
    width: "160",
    header: { text: "Lot ID" },
    dataType: ValueType.TEXT,
    fakeType: "incremental" as const,
    fakeOptions: { min: 1, prefix: "LOTID.", suffix: "" },
  },

  groupId: {
    fieldName: "groupId",
    width: "120",
    header: { text: "Group" },
    dataType: ValueType.TEXT,
    fakeType: "incremental" as const,
    fakeOptions: { min: 1, prefix: "Group", suffix: "" },
  },

  // 새로 추가: 연속된 LOTID.x들을 콤마로 연결한 문자열 생성
  lotIds: {
    fieldName: "lotIds",
    width: "220",
    header: { text: "Lot IDs" },
    dataType: ValueType.TEXT,
    fakeType: "computed" as const,
    fakeOptions: {
      // 기본 최대 개수는 5. 필요시 오버라이드 가능.
      maxCount: 5,
      prefix: "LOTID.",
      // computeFn: 시작 번호를 무작위로 정하고 길이(len)를 1..maxCount 사이로 정한 후 연속된 LOTID.x들을 생성
      computeFn: (_row: any, _index: number, options?: any) => {
        // options가 전달되지 않을 수 있으므로 fallback 사용
        const maxCount = (options && options.maxCount) || 5
        const prefix = (options && options.prefix) || "LOTID."
        const start = Math.floor(Math.random() * 200) + 1 // 1..200
        const len = Math.floor(Math.random() * maxCount) + 1 // 1..maxCount
        return Array.from({ length: len }, (_v, i) => `${prefix}${start + i}`).join(",")
      },
    },
  },

  stepDesc: {
    fieldName: "stepDesc",
    width: "260",
    header: { text: "Step Description" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "stepDescs",
  },

  slotIds: {
    fieldName: "slotIds",
    width: "180",
    header: { text: "Slot IDs" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "slotIds",
  },

  count: {
    fieldName: "count",
    width: "80",
    header: { text: "Count" },
    dataType: ValueType.NUMBER,
    fakeType: "computed" as const,
    fakeOptions: {
      // 기본 최소/최대는 1..10. 필요시 createColumnsFromNames 또는 호출부에서 오버라이드 가능.
      min: 1,
      max: 10,
      computeFn: (_row: any, _index: number, options?: any) => {
        const min = options && typeof options.min === "number" ? options.min : 1
        const max = options && typeof options.max === "number" ? options.max : 10
        const lo = Math.min(min, max)
        const hi = Math.max(min, max)
        return Math.floor(Math.random() * (hi - lo + 1)) + lo
      },
    },
    numberFormat: "0",
  },

  lotType: {
    fieldName: "lotType",
    width: "100",
    header: { text: "Lot Type" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "lotTypes",
  },

  isYn: {
    fieldName: "isYn",
    width: 60,
    header: { text: "Y/N" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "yn",
  },

  stepSeq: {
    fieldName: "stepSeq",
    width: "180",
    header: { text: "StepSeq" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "stepSeqs",
  },

  einecnno: {
    fieldName: "einecnno",
    width: "180",
    header: { text: "EINECNNO" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "einecnNos",
  },

  evaluationPurpose: {
    fieldName: "evaluationPurpose",
    width: "360",
    header: { text: "평가 목적" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "evaluationPurposes",
  },

  createUser: {
    ...baseUsersTemplate,
    fieldName: "createUser",
    header: { text: "Create User" },
  },

  // 한글 이름 + 영문 이름 형식 (예: 이삼성(samsung.lee))
  koreanNameWithEnglish: {
    fieldName: "koreanNameWithEnglish",
    width: "180",
    header: { text: "담당자" },
    dataType: ValueType.TEXT,
    fakeType: "computed" as const,
    fakeOptions: {
      computeFn: (row: any, index: number) => {
        const koreanNames = [
          "김철수",
          "이영희",
          "박민수",
          "최지은",
          "정우진",
          "한소희",
          "임채영",
          "송민호",
          "류현진",
          "손흥민",
          "박서준",
        ]
        const englishNames = [
          "chulsoo.kim",
          "younghee.lee",
          "minsoo.park",
          "jieun.choi",
          "woojin.jung",
          "sohee.han",
          "chaeyoung.lim",
          "minho.song",
          "hyunjin.ryu",
          "heungmin.son",
          "seojun.park",
        ]

        // 같은 인덱스의 한글 이름과 영문 이름을 매칭
        const koreanName = koreanNames[index % koreanNames.length]
        const englishName = englishNames[index % englishNames.length]

        return `${koreanName}(${englishName})`
      },
    },
  },

  tcpType: {
    fieldName: "tcpType",
    width: "100",
    header: { text: "Type" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "tcpTypes",
  },

  createDate: {
    fieldName: "createDate",
    width: "160",
    header: { text: "Create Date" },
    dataType: ValueType.TEXT,
    fakeType: "computed" as const,
    fakeOptions: {
      computeFn: () => formatDate(randomPastDate(90), "yyyy-MM-dd HH:mm:ss"),
    },
  },

  requestUser: {
    ...baseUsersTemplate,
    fieldName: "requestUser",
    header: { text: "Request User" },
  },

  requestDate: {
    fieldName: "requestDate",
    width: "160",
    header: { text: "Request Date" },
    dataType: ValueType.TEXT,
    fakeType: "computed" as const,
    fakeOptions: {
      computeFn: () => formatDate(randomPastDate(60), "yyyy-MM-dd HH:mm"),
    },
  },

  arrangeUser: {
    ...baseUsersTemplate,
    fieldName: "arrangeUser",
    header: { text: "Arrange User" },
  },

  arrangeDate: {
    fieldName: "arrangeDate",
    width: "160",
    header: { text: "Arrange Date" },
    dataType: ValueType.TEXT,
    fakeType: "computed" as const,
    fakeOptions: {
      computeFn: () => formatDate(randomPastDate(30), "yyyy-MM-dd HH:mm"),
    },
  },

  arrStatus: {
    fieldName: "arrStatus",
    width: "120",
    header: { text: "Arr Status" },
    dataType: ValueType.TEXT,
    fakeType: "random" as const,
    fakeSourceKey: "arrStatuses",
  },
}

// 확장된 fake 데이터 소스
export const extendedFakeSource: FakeDataSource = {
  // 기본 데이터
  firstNames: ["김철수", "이영희", "박민수", "최지은", "정우진", "한소희", "임채영", "송민호"],
  fullNames: [
    "김철수",
    "이영희",
    "박민수",
    "최지은",
    "정우진",
    "한소희",
    "임채영",
    "송민호",
    "류현진",
    "손흥민",
    "박서준",
    "아이유",
    "방탄소년단",
    "블랙핑크",
    "트와이스",
  ],

  // 회사/조직
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
    "스타트업코리아",
    "테크이노베이션",
    "디지털솔루션",
  ],
  departments: ["개발팀", "기획팀", "디자인팀", "마케팅팀", "영업팀", "인사팀", "재무팀", "QA팀"],
  positions: ["사원", "주임", "대리", "과장", "차장", "부장", "상무", "전무"],

  // 상품/상태
  productNames: [
    "스마트폰",
    "노트북",
    "태블릿",
    "이어폰",
    "키보드",
    "마우스",
    "모니터",
    "스피커",
    "웹캠",
    "충전기",
    "케이스",
    "스탠드",
  ],
  categories: ["전자제품", "가전제품", "컴퓨터", "액세서리", "모바일", "가구", "의류"],
  statuses: ["활성", "비활성", "대기", "승인", "거부", "보류"],
  orderStatuses: ["주문접수", "결제완료", "상품준비중", "배송중", "배송완료", "취소", "반품"],

  // 숫자 데이터
  ages: [22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 55, 60],
  prices: [10000, 25000, 50000, 100000, 150000, 200000, 300000, 500000, 800000, 1000000],
  orderAmounts: [30000, 50000, 75000, 100000, 150000, 200000, 250000, 300000, 500000],
  quantities: [1, 2, 3, 5, 10, 20, 50, 100],

  // 고정값들
  activeStatus: "활성",
  defaultCompany: "우리회사",
  defaultDepartment: "개발팀",

  // 공정/요청용 확장 데이터
  lineIds: ["SLN1", "SLN2", "SLN3", "PLN1", "PLN2", "PLN3"],
  lineNames: ["S1", "S2", "S3", "P1", "P2", "P3"],
  yn: ["Y", "N", "-"],
  stepSeqs: ["ABC0001", "ABC0002", "XYZ1001", "XYZ1002", "TEST123", "DEMO999"],
  // 반도체 8대 공정
  subAreas: ["DIFF", "ETCH", "CLEAN", "PHOTO", "IMP", "CMP", "CVD", "METAL"],
  processes: ["공정A", "공정B", "외주공정", "검사공정", "포장공정"],
  procIds: ["ABCD09AB", "ABCD01XY", "PROC1234", "PROC-9999"],
  partIds: ["PART-1001", "PART-1002", "PART-2001", "PART-3001"],
  // lot / slot 확장 데이터
  lotIds: ["LOT-20250801-001", "LOT-20250801-002", "LOT-20250731-101", "LOT-20250730-900"],
  stepDescs: ["1.2 ABC QWE DCD", "2.1 XYZ ASD ZXC", "3.5 TEST 123 456", "4.0 DEMO 789 000"],
  slotIds: ["SLOT-A1", "SLOT-A2", "SLOT-B1", "SLOT-B2", "SLOT-C10"],
  counts: [1, 2, 4, 8, 16, 32, 64],
  lotTypes: ["Normal", "Rework", "Sample", "Hold"],
  einecnNos: ["EC000011-ABCD1", "EC000012-XYZ02", "EC000099-TEST1"],
  evaluationPurposes: ["QWE-20123 AI1.1 ABCD A1012302 TEST. 전환", "신뢰성 검증 및 성능 측정", "공정 최적화 평가"],
  users: ["김삼성", "이영희", "박민수", "최지은", "정우진", "한소희"],
  tcpTypes: ["Extend TCP", "Modify TCP", "Create TCP"],
  arrStatuses: ["작성중", "요청중", "재 요청중", "보류", "완료"],
  arrActionTypes: [
    "요청서 생성",
    "작성중 저장",
    "요청중",
    "재 요청중",
    "보류 처리",
    "요청서 삭제",
    "수정 뒤 저장",
    "할당 완료",
  ],

  // 한글 이름 + 영문 이름 형식 데이터
  koreanNames: [
    "김철수",
    "이영희",
    "박민수",
    "최지은",
    "정우진",
    "한소희",
    "임채영",
    "송민호",
    "류현진",
    "손흥민",
    "박서준",
  ],
  englishNames: [
    "chulsoo.kim",
    "younghee.lee",
    "minsoo.park",
    "jieun.choi",
    "woojin.jung",
    "sohee.han",
    "chaeyoung.lim",
    "minho.song",
    "hyunjin.ryu",
    "heungmin.son",
    "seojun.park",
  ],
}

// 컬럼 이름 배열로부터 ExtendedColumn 배열을 생성하는 헬퍼 함수
export function createColumnsFromNames(
  columnNames: (keyof typeof columnTemplates | [string, Partial<ExtendedColumn>])[],
  customOptions?: Partial<Record<keyof typeof columnTemplates, Partial<ExtendedColumn>>>
): ExtendedColumn[] {
  return columnNames.map((maybeName) => {
    const name = (typeof maybeName === "string" ? maybeName : maybeName[0]) as keyof typeof columnTemplates
    const overrides = typeof maybeName === "string" ? null : maybeName[1]

    // Start with base template
    const baseTemplate = columnTemplates[name]
    if (!baseTemplate) {
      console.warn(`Column template '${name}' not found`)
      return {
        name: String(name),
        fieldName: String(name),
        width: "100",
        header: { text: String(name) },
        dataType: ValueType.TEXT,
      }
    }

    // Shallow merge template and immediate overrides, but ensure nested fakeOptions are merged
    const mergedTemplate = { ...baseTemplate, ...(overrides || {}) }
    const baseAny = baseTemplate as any
    const overridesAny = overrides as any
    const mergedAny = mergedTemplate as any
    if (baseAny.fakeOptions || overridesAny?.fakeOptions) {
      mergedAny.fakeOptions = Object.assign({}, baseAny.fakeOptions || {}, overridesAny?.fakeOptions || {})
    }
    if (mergedAny.fieldName && !mergedAny.name) {
      mergedAny.name = mergedAny.fieldName
    }
    // Apply customOptions (per-name) and merge fakeOptions there as well
    const customOption = customOptions?.[name]
    if (customOption) {
      const customAny = customOption as any
      const result: any = { ...mergedAny, ...customOption }
      if (mergedAny.fakeOptions || customAny.fakeOptions) {
        result.fakeOptions = Object.assign({}, mergedAny.fakeOptions || {}, customAny?.fakeOptions || {})
      }
      return result
    }

    return { ...mergedAny, name: mergedAny.name || name }
  })
}

// 자주 사용하는 컬럼 세트들을 미리 정의
export const presetColumns = {
  basic: createColumnsFromNames(["id", "name", "email", "age", "status"]),
  user: createColumnsFromNames(["userId", "fullName", "email", "phone", "status"]),
  employee: createColumnsFromNames(["employeeId", "fullName", "department", "position", "joinDate"]),
  order: createColumnsFromNames(["orderId", "customerName", "orderDate", "amount", "orderStatus"]),
  product: createColumnsFromNames(["productId", "productName", "category", "price", "status"]),
  company: createColumnsFromNames(["id", "company", "department", "fullName", "position"]),
}

// 상품 관련 fake 데이터 소스 (확장된 소스 사용)
export const productFakeSource: FakeDataSource = extendedFakeSource

// 기본 컬럼들 (프리셋 사용)
export const defaultColumns = presetColumns.basic
export const employeeColumns = presetColumns.employee
export const productColumns = presetColumns.product
