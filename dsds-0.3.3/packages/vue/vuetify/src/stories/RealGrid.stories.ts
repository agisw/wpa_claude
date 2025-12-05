import { RealGrid, VBtn } from "@/components/ui"
import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { type LayoutItem, SelectionStyle } from "realgrid"
import { ref } from "vue"
import { createColumnsFromNames, type ExtendedColumn, createFields, createRealGridColumns } from "@/faker/realgrid"

const meta: Meta = {
  title: "DataTable/RealGrid 사용 가이드",
  component: RealGrid,
  parameters: {
    docs: {
      codePanel: true,
      description: {
        component: `
이 문서는 RealGrid의 다양한 설정 방법과 패턴을 보여줍니다.
각 스토리는 실제 PEMS 프로젝트에서 사용된 패턴들을 바탕으로 구성되었습니다.

## 기본 구조

RealGrid는 \`GridView\`와 \`LocalDataProvider\`를 조합하여 사용하며,
RealGrid 컴포넌트는 이를 래핑하여 쉽게 사용할 수 있게 해줍니다.

> **주의**: \`v-model\`로 바인딩되는 \`modelValue\`는 반드시 \`shallowRef\`로 선언해야 합니다.
>
> Vue의 \`ref\` 는 객체 속성을 recursive하게 반응형으로 만들기 때문에
> RealGrid의 내부 동작에 문제를 유발합니다.

## 주요 설정

### 1. 기본 설정 (RealGrid Props)
- \`columns\`: 컬럼 정의
- \`columnLayout\`: 컬럼 레이아웃 (그룹핑, 다중 헤더)
- \`checkBar\`: 체크박스 표시 여부
- \`editable\`: 편집 가능 여부
- \`selectionStyle\`: 선택 스타일
- \`hideIndicator\`: 행 번호 숨기기

### 2. GridView 내부 설정 (DSDS 표준 적용)
- 행 높이: 23px (고정)
- 헤더 높이: 29px (고정)
- \`fitStyle: GridFitStyle.EVEN_FILL\`: 컬럼 너비 자동 조정
- \`columnMovable: false\`: 컬럼 이동 비활성화
- \`sortingOptions.enabled: false\`: 정렬 비활성화
- \`filteringOptions.enabled: true\`: 필터링 활성화

### 3. 데이터 관리
RealGrid는 데이터 관리를 외부에서 수행합니다:
- \`setData(data)\`: 데이터 설정
- \`clearData()\`: 데이터 클리어
- \`getGridView()\`: GridView 인스턴스 획득
- \`getDataProvider()\`: DataProvider 인스턴스 획득
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RealGrid>

export default meta
type Story = StoryObj<typeof meta>

const basicColumns = createColumnsFromNames([
  ["id", { width: "80", header: { text: "ID" } }],
  ["fullName", { width: "120", header: { text: "이름" } }],
  ["email", { width: "200", header: { text: "이메일" } }],
  ["phone", { width: "120", header: { text: "전화번호" } }],
  ["department", { width: "100", header: { text: "부서" } }],
])

// 샘플 데이터
const sampleData = [
  { id: 1, fullName: "홍길동", email: "hong@example.com", phone: "010-1234-5678", department: "개발팀" },
  { id: 2, fullName: "김철수", email: "kim@example.com", phone: "010-2345-6789", department: "디자인팀" },
  { id: 3, fullName: "이영희", email: "lee@example.com", phone: "010-3456-7890", department: "기획팀" },
  { id: 4, fullName: "박민수", email: "park@example.com", phone: "010-4567-8901", department: "개발팀" },
  { id: 5, fullName: "정수진", email: "jung@example.com", phone: "010-5678-9012", department: "마케팅팀" },
]

export const BasicConfiguration: Story = {
  name: "기본 설정",
  parameters: {
    docs: {
      description: {
        story: `
### 기본 RealGrid 설정

RealGrid에서 기본적으로 적용되는 DSDS 표준 설정들입니다:

\`\`\`html
<template>
  <RealGrid ref="gridRef" v-model="gridViewRef" :columns="columns" :fields="fields" />
</template>

<script setup lang="ts">
import { ref, shallowRef, watch } from "vue"
import { GridView } from "realgrid"
import { RealGrid } from "@dsds/vue-vuetify"

const gridRef = ref<InstanceType<typeof RealGrid> | null>(null)
const gridView = gridRef.value?.getGridView()
// v-model 사용시 반드시 shallowRef로 사용해야 합니다!
const gridViewRef = shallowRef<GridView>()

// DSDS 표준 Display Options
gridView.setDisplayOptions({
  showEmptyMessage: true,
  emptyMessage: "데이터가 없습니다.",
  fitStyle: GridFitStyle.EVEN_FILL,
  rowHeight: 23, // DSDS 표준
  columnMovable: false,
  selectionStyle: SelectionStyle.BLOCK,
  rowFocusType: RowMaskType.FILL
})

// 편집 옵션
gridView.setEditOptions({
  appendable: true,
  insertable: true,
  updatable: true,
  editable: false
})

// 기타 설정
gridView.sortingOptions.enabled = false
gridView.setFilteringOptions({ enabled: true })
gridView.setCopyOptions({ enabled: true })
</script>
\`\`\`
        `,
      },
    },
  },
  args: {
    columns: createRealGridColumns(basicColumns),
    fields: createFields(basicColumns),
    initialData: sampleData,
  },
  decorators: [
    (story, context) => ({
      components: { story },
      setup() {
        const containerClass = context.viewMode === "docs" ? "h-50" : "h-screen"
        return { containerClass }
      },
      template: `<div :class="['flex flex-col w-full p-3!', containerClass]"><story /></div>`,
    }),
  ],
}

// Wafer Slot 컬럼들 생성 (1-25번)
const waferColumns = Array.from(
  { length: 25 },
  (_, i) =>
    [
      "count",
      {
        fieldName: `wafer${String(i + 1).padStart(2, "0")}Yn`,
        width: 24,
        header: {
          text: `${i + 1}`,
          styleName: "dsds-realgrid-compact-header",
        },
        styleCallback: (grid: any, dataCell: any) => {
          if (parseInt(dataCell.value) === i + 1 && dataCell.item?.dataRow === Math.floor(i / 2)) {
            return "dsds-realgrid-cell-compact-center dsds-realgrid-cell-bg-selected"
          } else {
            return "dsds-realgrid-cell-compact-center dsds-realgrid-cell-text-disabled"
          }
        },
      },
    ] as [string, Partial<ExtendedColumn>]
)

const multiHeaderColumns = createColumnsFromNames([
  ["count", { width: 50, header: { text: "Lot Cnt." } }],
  ["groupId", { width: 70 }],
  ["lotIds", { header: { text: "Lot" }, width: 310 }],
  ["isYn", { width: 65, header: { text: "Random\nY/N" } }],
  ["count", { width: 50, fieldName: "wfCnt", header: { text: "WF Cnt." }, fakeOptions: { min: 1, max: 5 } }],
  ...waferColumns,
])

const multiHeaderColumnLayout = [
  "groupId",
  "lotIds",
  "isYn",
  "wfCnt",
  {
    name: "Slot",
    direction: "horizontal" as const,
    header: {
      text: "Slot IDs (1-25)",
      styleName: "border-r-0!",
    },
    items: Array.from({ length: 25 }, (_, i) => `wafer${String(i + 1).padStart(2, "0")}Yn`),
  } as LayoutItem,
]

// Wafer 데이터 생성
const createWaferData = () => {
  const data: any = {}
  for (let i = 1; i <= 25; i++) {
    data[`wafer${String(i).padStart(2, "0")}Yn`] = Math.random() > 0.7 ? i : ""
  }
  return data
}

const multiHeaderSampleData = [
  { groupId: "G001", lotIds: "LOT001,LOT002", isYn: "Y", wfCnt: 2, ...createWaferData() },
  { groupId: "G002", lotIds: "LOT003", isYn: "N", wfCnt: 1, ...createWaferData() },
  { groupId: "G003", lotIds: "LOT004,LOT005,LOT006", isYn: "Y", wfCnt: 3, ...createWaferData() },
]

export const MultiHeaderLayout: Story = {
  name: "다중 헤더 레이아웃",
  parameters: {
    docs: {
      description: {
        story: `
### 2줄 헤더와 컬럼 그룹핑

\`columnLayout\`을 사용하여 컬럼을 그룹화하고 다중 헤더를 만들 수 있습니다.
PEMS의 LotArrangeRequestModalBody에서 사용된 패턴입니다.

\`\`\`typescript
const columnLayout = [
  "groupId",
  "lotIds",
  {
    name: "Slot",
    direction: "horizontal",
    header: {
      text: "Slot IDs",
      styleName: "border-r-0!",
    },
    items: Array.from({ length: 25 }, (_, i) => \`wafer\${i+1}Yn\`),
  } as LayoutItem,
]
\`\`\`
        `,
      },
    },
  },
  args: {
    columns: createRealGridColumns(multiHeaderColumns),
    fields: createFields(multiHeaderColumns),
    columnLayout: multiHeaderColumnLayout,
    initialData: multiHeaderSampleData,
  },
  decorators: [
    (story, context) => ({
      components: { story },
      setup() {
        const containerClass = context.viewMode === "docs" ? "h-50" : "h-screen"
        return { containerClass }
      },
      template: `<div :class="['flex flex-col w-full p-3!', containerClass]"><story /></div>`,
    }),
  ],
}

const styledColumns = createColumnsFromNames([
  ["employeeId", { width: "100", header: { text: "사번" } }],
  ["fullName", { width: "120", header: { text: "이름" } }],
  ["department", { width: "100", header: { text: "부서" } }],
  [
    "count",
    {
      fieldName: "score",
      header: { text: "점수" },
      width: "80",
      styleCallback: (grid: any, dataCell: any) => {
        const value = parseInt(dataCell.value)
        if (value >= 90) {
          return "bg-success"
        } else if (value >= 70) {
          return "bg-warning"
        } else {
          return "bg-error"
        }
      },
    },
  ],
  [
    "status",
    {
      fieldName: "grade",
      header: { text: "등급" },
      width: "80",
      styleCallback: (grid: any, dataCell: any) => {
        const grade = dataCell.value
        switch (grade) {
          case "A":
            return "text-success font-bold"
          case "B":
            return "text-primary font-bold"
          case "C":
            return "text-warning font-bold"
          case "D":
            return "text-error font-bold"
          case "F":
            return "font-bold bg-red-50"
          default:
            return ""
        }
      },
    },
  ],
])

const styleCallbackSampleData = [
  { employeeId: "EMP001", fullName: "홍길동", department: "개발팀", score: 95, grade: "A" },
  { employeeId: "EMP002", fullName: "김철수", department: "디자인팀", score: 87, grade: "B" },
  { employeeId: "EMP003", fullName: "이영희", department: "기획팀", score: 92, grade: "A" },
  { employeeId: "EMP004", fullName: "박민수", department: "개발팀", score: 78, grade: "C" },
  { employeeId: "EMP005", fullName: "정수진", department: "마케팅팀", score: 65, grade: "D" },
  { employeeId: "EMP006", fullName: "강호동", department: "영업팀", score: 55, grade: "F" },
  { employeeId: "EMP007", fullName: "유재석", department: "개발팀", score: 88, grade: "B" },
  { employeeId: "EMP008", fullName: "신동엽", department: "디자인팀", score: 91, grade: "A" },
]

export const CustomStyleCallback: Story = {
  name: "커스텀 스타일 콜백",
  parameters: {
    docs: {
      description: {
        story: `
### styleCallback을 활용한 조건부 스타일링

각 셀의 값에 따라 다른 스타일을 적용할 수 있습니다.

\`\`\`typescript
{
  styleCallback: (grid, dataCell) => {
    const value = parseInt(dataCell.value)
    if (value > 80) {
      return "dsds-realgrid-cell-bg-success"
    } else if (value > 60) {
      return "dsds-realgrid-cell-bg-warning"
    } else {
      return "dsds-realgrid-cell-bg-error"
    }
  }
}
\`\`\`
        `,
      },
    },
  },
  args: {
    columns: createRealGridColumns(styledColumns),
    fields: createFields(styledColumns),
    initialData: styleCallbackSampleData,
  },
  decorators: [
    (story, context) => ({
      components: { story },
      setup() {
        const containerClass = context.viewMode === "docs" ? "h-50" : "h-screen"
        return { containerClass }
      },
      template: `
      <div :class="['p-4 flex flex-col w-full', containerClass]">
        <div class="mb-4">
          <p class="text-sm text-gray-600 mt-2">
            * 점수에 따라 배경색이 다르게 표시됩니다 (90↑: 초록, 70↑: 노랑, 미만: 빨강)
          </p>
          <p class="text-sm text-gray-600">
            * 등급에 따라 텍스트 스타일이 다르게 표시됩니다
          </p>
        </div>
        <story />
      </div>
    `,
    }),
  ],
}

const editableColumns = createColumnsFromNames([
  ["employeeId", { width: "100", editable: false, header: { text: "사번 (읽기전용)" } }],
  ["fullName", { width: "120", editable: true, header: { text: "이름 (편집가능)" } }],
  ["email", { width: "180", editable: true, header: { text: "이메일 (편집가능)" } }],
  ["phone", { width: "120", editable: true, header: { text: "전화번호 (편집가능)" } }],
  ["department", { width: "100", editable: false, header: { text: "부서 (읽기전용)" } }],
])

const editableSampleData = [
  {
    employeeId: "EMP001",
    fullName: "홍길동",
    email: "hong@example.com",
    phone: "010-1234-5678",
    department: "개발팀",
  },
  {
    employeeId: "EMP002",
    fullName: "김철수",
    email: "kim@example.com",
    phone: "010-2345-6789",
    department: "디자인팀",
  },
  {
    employeeId: "EMP003",
    fullName: "이영희",
    email: "lee@example.com",
    phone: "010-3456-7890",
    department: "기획팀",
  },
  {
    employeeId: "EMP004",
    fullName: "박민수",
    email: "park@example.com",
    phone: "010-4567-8901",
    department: "개발팀",
  },
  {
    employeeId: "EMP005",
    fullName: "정수진",
    email: "jung@example.com",
    phone: "010-5678-9012",
    department: "마케팅팀",
  },
]

export const EditableGrid: Story = {
  name: "편집 가능한 그리드",
  parameters: {
    docs: {
      description: {
        story: `
### 편집 가능한 그리드 설정

\`editable: true\` 속성으로 그리드를 편집 가능하게 만들 수 있습니다.
개별 컬럼의 \`editable\` 속성으로 컬럼별 편집 가능 여부를 제어할 수 있습니다.

\`\`\`typescript
// 그리드 전체 편집 가능
<RealGrid :editable="true" />

// 특정 컬럼만 편집 가능/불가능
{
  fieldName: "name",
  editable: true  // 이 컬럼만 편집 가능
}
\`\`\`
        `,
      },
    },
  },
  args: {
    columns: createRealGridColumns(editableColumns),
    fields: createFields(editableColumns),
    initialData: editableSampleData,
    editable: true,
  },
  decorators: [
    (story, context) => ({
      components: { story },
      setup() {
        const containerClass = context.viewMode === "docs" ? "h-50" : "h-screen"
        return { containerClass }
      },
      template: `
      <div :class="['p-4 flex flex-col w-full', containerClass]">
        <div class="mb-4 flex gap-2">
          <p class="text-sm text-gray-600 mt-2">
            편집가능 컬럼들을 더블클릭하여 편집해보세요.
          </p>
        </div>
        <story />
      </div>
    `,
    }),
  ],
}

export const CheckBarAndSelection: Story = {
  name: "체크박스와 선택 스타일",
  parameters: {
    docs: {
      description: {
        story: `
### 체크박스와 선택 스타일 옵션

- \`checkBar: true\`: 체크박스 컬럼 표시
- \`selectionStyle\`: 선택 스타일 (BLOCK, ROWS, COLUMNS, SINGLE)
- \`hideIndicator: true\`: 행 번호 숨기기

\`\`\`typescript
// 체크박스 설정
gridView.setCheckBar({
  visible: true,
  exclusive: false,  // 다중 선택 가능
  width: 30,
})

// 선택 스타일
gridView.displayOptions.selectionStyle = SelectionStyle.ROWS
\`\`\`
        `,
      },
    },
  },
  render: (args, context) => ({
    components: { RealGrid, VBtn },
    setup() {
      const gridRef = ref<InstanceType<typeof RealGrid> | null>(null)
      const selectionStyle = ref<SelectionStyle>(SelectionStyle.ROWS)
      const showCheckBar = ref(true)
      const hideIndicator = ref(false)

      const fakeColumns = createColumnsFromNames([
        ["employeeId", { width: "100" }],
        ["fullName", { width: "120" }],
        ["department", { width: "100" }],
        ["email", { width: "180" }],
        ["phone", { width: "120" }],
      ])

      const sampleData = [
        {
          employeeId: "EMP001",
          fullName: "홍길동",
          department: "개발팀",
          email: "hong@example.com",
          phone: "010-1234-5678",
        },
        {
          employeeId: "EMP002",
          fullName: "김철수",
          department: "디자인팀",
          email: "kim@example.com",
          phone: "010-2345-6789",
        },
        {
          employeeId: "EMP003",
          fullName: "이영희",
          department: "기획팀",
          email: "lee@example.com",
          phone: "010-3456-7890",
        },
        {
          employeeId: "EMP004",
          fullName: "박민수",
          department: "개발팀",
          email: "park@example.com",
          phone: "010-4567-8901",
        },
        {
          employeeId: "EMP005",
          fullName: "정수진",
          department: "마케팅팀",
          email: "jung@example.com",
          phone: "010-5678-9012",
        },
      ]

      const getCheckedRows = () => {
        const gridView = gridRef.value?.getGridView()
        if (gridView) {
          const checkedRows = gridView.getCheckedRows()
          alert(`체크된 행: ${checkedRows.length}개\n행 인덱스: ${checkedRows.join(", ")}`)
        }
      }

      const toggleSelectionStyle = () => {
        const styles = [SelectionStyle.BLOCK, SelectionStyle.ROWS, SelectionStyle.COLUMNS, SelectionStyle.SINGLE]
        const currentIndex = styles.indexOf(selectionStyle.value)
        selectionStyle.value = styles[(currentIndex + 1) % styles.length]
      }

      const getSelectionStyleName = (style: SelectionStyle) => {
        switch (style) {
          case SelectionStyle.BLOCK:
            return "BLOCK (셀 단위)"
          case SelectionStyle.ROWS:
            return "ROWS (행 단위)"
          case SelectionStyle.COLUMNS:
            return "COLUMNS (열 단위)"
          case SelectionStyle.SINGLE:
            return "SINGLE (단일 선택)"
          default:
            return "알 수 없음"
        }
      }

      const isLoading = ref(false)

      return {
        args,
        columns: createRealGridColumns(fakeColumns),
        fields: createFields(fakeColumns),
        initialData: sampleData,
        gridRef,
        selectionStyle,
        showCheckBar,
        hideIndicator,
        containerClass: context.viewMode === "docs" ? "h-100 overflow-hidden" : "h-screen",
        isLoading,
        getCheckedRows,
        toggleSelectionStyle,
        getSelectionStyleName,
      }
    },
    template: `
      <div class="p-4 flex flex-col" :class="containerClass">
        <div class="mb-4 flex gap-2 flex-wrap">
          <VBtn @click="getCheckedRows" color="info">
            체크된 행 확인
          </VBtn>
          <VBtn @click="toggleSelectionStyle" color="secondary">
            선택 스타일: {{ getSelectionStyleName(selectionStyle) }}
          </VBtn>
          <VBtn @click="showCheckBar = !showCheckBar" :color="showCheckBar ? 'success' : 'error'">
            체크박스: {{ showCheckBar ? 'ON' : 'OFF' }}
          </VBtn>
          <VBtn @click="hideIndicator = !hideIndicator" :color="hideIndicator ? 'warning' : 'info'">
            행번호: {{ hideIndicator ? 'OFF' : 'ON' }}
          </VBtn>
          <VSwitch v-model="isLoading" /> 로드중
        </div>
        <RealGrid
          ref="gridRef"
          :columns="columns"
          :fields="fields"
          :loading="isLoading"
          :initialData="initialData"
          :checkBar="showCheckBar"
          :selectionStyle="selectionStyle"
          :hideIndicator="hideIndicator"
        />
      </div>
    `,
  }),
}
