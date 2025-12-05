import type { LNBInputItem } from "@/components/ui"

/**
 * 선택 콜백 기능을 보여주는 LNB 예제
 *
 * 주요 특징:
 * - 항목 선택 기능 테스트를 위한 구조
 * - onValueChange 콜백 테스트용
 * - 다양한 기준정보 카테고리
 * - 물류설비 하위에 선택된 항목 예시 포함
 */
export const selectionCallbackSample: LNBInputItem = {
  title: "Select Item Test",
  items: [
    {
      id: "1",
      content: "즐겨찾기",
      items: [],
    },
    {
      id: "2",
      content: "업무함",
      items: [],
    },
    {
      id: "3",
      content: "제조 기준정보",
      items: [],
    },
    {
      id: "4",
      content: "설비 기준정보",
      items: [
        {
          id: "4-1",
          content: "제조설비",
          items: [],
        },
        {
          id: "4-2",
          content: "물류설비",
          items: [
            {
              id: "4-2-1",
              content: "AMHS STK_ID",
            },
            {
              id: "4-2-2",
              content: "AMHS STG_GROUP_PLD",
            },
            {
              id: "4-2-3",
              content: "AMHS STG_HOLDLOT_STK",
            },
            {
              id: "4-2-4",
              content: "AMHS.FOUP_CHG_ASSIGN_STK",
            },
            {
              id: "4-2-5",
              content: "AMHS EXTENSION",
            },
            {
              id: "4-2-6",
              content: "AMHS NRFC_ID",
            },
            {
              id: "4-2-7",
              content: "CMCS PARAMETER",
            },
          ],
        },
        {
          id: "4-3",
          content: "분석설비",
          items: [],
        },
      ],
    },
    {
      id: "5",
      content: "원부자재 기준정보",
      items: [],
    },
    {
      id: "6",
      content: "일반 기준정보",
      items: [],
    },
    {
      id: "7",
      content: "APC 기준정보",
      items: [],
    },
    {
      id: "8",
      content: "타 시스템 자동발의 메뉴",
      items: [],
    },
  ],
}

export const selectionCallbackDescription = {
  title: "Selection Callback Example",
  description:
    "선택 콜백 기능을 보여주는 LNB 예제입니다. defaultSelectedItemId prop으로 초기 선택 상태를 설정하고, onSelectionChange 콜백을 통해 선택된 항목의 정보를 실시간으로 확인할 수 있습니다.",
  features: [
    "defaultSelectedItemId prop을 통한 초기 선택 상태 설정",
    "onSelectionChange 콜백을 통한 선택 이벤트 처리",
    "controlled/uncontrolled 컴포넌트 패턴 지원",
    "다양한 기준정보 카테고리",
    "물류설비 하위의 AMHS 관련 메뉴",
  ],
}

export const selectionCallbackExample = `
// Uncontrolled (기본 사용법)
<Lnb
  data={menuData}
  defaultSelectedItemId="4-2-2"
/>

// Controlled (외부에서 선택 상태 제어)
const [selectedId, setSelectedId] = useState("4-2-2")

<Lnb
  data={menuData}
  selectedItemId={selectedId}
  onSelectionChange={(id, item) => {
    setSelectedId(id)
    console.log('Selected item:', item)
  }}
/>
`
