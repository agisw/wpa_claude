import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref, computed } from "vue"

import { VCheckbox } from "@/components/ui"

const meta: Meta = {
  title: "Components/Checkbox",
  component: VCheckbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: `

Vuetify의 VCheckbox를 DSDS 디자인 시스템 스타일로 래핑한 체크박스 컴포넌트입니다.

### 주요 기능 <features />
- 체크/언체크 상태와 **불확정(\`indeterminate\`) 상태** 지원
- **v-model 지원**: 단일 값과 배열 기반 양방향 바인딩
- **접근성**: ARIA 속성 및 키보드 네비게이션 지원
- **커스터마이징**: 라벨, 값, 상태 등 기본적인 옵션
- **반응형 디자인**: 모바일과 데스크톱 최적화

### 디자인 일관성 정책 <policy />
DSDS 디자인 시스템의 일관성을 위해 다음과 같은 Vuetify VCheckbox의 기능들을 **의도적으로 지원하지 않습니다**:
- **유효성 검사**: rules prop을 통한 커스텀 검증 기능
- **에러 표시**: error, errorMessages prop을 통한 에러 상태 표시
- **색상 커스터마이징**: color prop을 통한 색상 변경
- **밀도 조절**: density prop을 통한 컴포넌트 밀도 조절
- **세부 정보 숨김**: hideDetails prop을 통한 메시지 표시 제어

이러한 기능들은 DSDS 디자인 시스템의 일관된 사용자 경험을 위해 제한되며, 필요한 경우 상위 컴포넌트 레벨에서 처리하는 것을 권장합니다.

### 사용 방법 <usages />

**1. 기본 체크박스**
\`\`\`html
<template>
  <VCheckbox v-model="checked" label="기본 체크박스" />
</template>

<script setup>
import { ref } from 'vue'
const checked = ref(false)
</script>
\`\`\`

**2. 불확정 상태**
\`\`\`html
<template>
  <div>
    <VCheckbox v-model="allSelected"
               :indeterminate="isIndeterminate"
               label="전체 선택"
               @click="toggleAll" />
    <div v-for="item in items" :key="item.id">
      <VCheckbox v-model="selectedItems"
                 :value="item.id"
                 :label="item.name" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const items = ref([
  { id: 1, name: '항목 1' },
  { id: 2, name: '항목 2' },
  { id: 3, name: '항목 3' }
])
const selectedItems = ref([])

const allSelected = computed({
  get: () => selectedItems.value.length === items.value.length,
  set: (value) => {
    selectedItems.value = value ? items.value.map(item => item.id) : []
  }
})

const isIndeterminate = computed(() =>
  selectedItems.value.length > 0 && selectedItems.value.length < items.value.length
)

const toggleAll = () => {
  allSelected.value = !allSelected.value
}
</script>
\`\`\`

### Props 설명 <props />
- \`label\` (string, optional): 체크박스 옆에 표시할 라벨 텍스트
- \`value\` (any, optional): 체크박스의 값 (배열 기반 v-model에서 사용)
- \`disabled\` (boolean, optional): 체크박스 비활성화 상태
- \`readonly\` (boolean, optional): 읽기 전용 상태
- \`required\` (boolean, optional): 필수 입력 표시
- \`indeterminate\` (boolean, optional): 중간 상태 표시
- \`trueValue\` (any, optional): 체크된 상태의 값 (기본값: true)
- \`falseValue\` (any, optional): 체크 해제된 상태의 값 (기본값: false)
- \`id\` (string, optional): HTML id 속성
- \`class\` (string, optional): 추가 CSS 클래스
- \`tabindex\` (string|number, optional): 탭 인덱스

### v-model
VCheckbox는 Vue 3의 defineModel을 사용하여 양방향 바인딩을 지원합니다.

#### 단일 값 바인딩
\`\`\`html
<VCheckbox v-model="isChecked" label="동의합니다" />
\`\`\`

#### 배열 기반 바인딩
\`\`\`html
<VCheckbox v-model="selectedItems" value="item1" label="항목 1" />
<VCheckbox v-model="selectedItems" value="item2" label="항목 2" />
\`\`\`

### 이벤트 <events />
- \`@click\`: 체크박스 클릭 이벤트
- \`@focus\`: 포커스 이벤트
- \`@blur\`: 블러 이벤트

### 접근성 <accessibility />
- 키보드 네비게이션 지원 (Tab, Space, Enter)
- 스크린 리더 지원을 위한 ARIA 속성 자동 적용
- 포커스 표시 지원
- 라벨과 체크박스의 올바른 연결 (label의 for 속성과 input의 id)
- 에러 상태에서의 적절한 ARIA 속성 제공

### 불확정 상태 <indeterminate />
체크박스의 세 가지 상태를 지원합니다:
- **Unchecked**: 체크 해제 상태
- **Checked**: 체크된 상태
- **Indeterminate**: 일부 하위 항목만 선택된 상태 (부모 체크박스에서 사용)

### 스타일링 <styling />
DSDS 디자인 시스템의 디자인 토큰을 사용하여 일관된 스타일을 제공합니다. 추가적인 커스터마이징이 필요한 경우 class prop을 통해 CSS 클래스를 적용할 수 있습니다.
        `,
      },
    },
  },
} satisfies Meta<typeof VCheckbox>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs: any = {
  disabled: false,
}

/**
 * 기본 체크박스 (uncontrolled 예시)
 */
export const Default: Story = {
  name: "기본",
  args: {
    ...defaultArgs,
  },
  parameters: {
    docs: {
      description: {
        story: `
기본 체크박스입니다. 가장 간단한 형태의 체크박스로, v-model을 통해 상태를 관리합니다.

**특징**
- 기본적인 체크/체크해제 기능
- 라벨 텍스트 지원
- DSDS 디자인 시스템 스타일 적용
        `,
      },
    },
  },
}

Default.render = (args) => ({
  components: { VCheckbox },
  setup() {
    const checked = ref(false)
    return { args, checked }
  },
  template: `<VCheckbox v-bind="args" v-model="checked" />`,
})

/**
 * 미리 체크된 상태 예시
 */
export const Checked: Story = {
  name: "체크됨",
  args: {
    ...defaultArgs,
  },
  parameters: {
    docs: {
      description: {
        story: `
초기 상태가 체크된 체크박스입니다. 페이지 로드 시 특정 옵션이 선택되어 있어야 하는 경우에 사용합니다.

**특징**
- 초기값이 true로 설정된 상태
- 사용자가 즉시 체크 해제할 수 있음
- 기본적인 체크박스와 동일한 스타일 적용
        `,
      },
    },
  },
}

Checked.render = (args) => ({
  components: { VCheckbox },
  setup() {
    const checked = ref(true)
    return { args, checked }
  },
  template: `<VCheckbox v-bind="args" v-model="checked" />`,
})

/**
 * Disabled 상태 예시
 */
export const Disabled: Story = {
  name: "비활성화",
  args: {
    ...defaultArgs,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
비활성화된 체크박스입니다. 특정 조건에서만 선택 가능하도록 할 때 사용합니다.

**특징**
- 클릭 및 키보드 입력 모두 비활성화
- 시각적으로 비활성화 상태 표시 (색상 변경)
- 접근성을 위해 disabled 속성 적용
- 값 변경 불가능
        `,
      },
    },
  },
}

Disabled.render = (args) => ({
  components: { VCheckbox },
  setup() {
    const checked = ref(false)
    return { args, checked }
  },
  template: `<VCheckbox v-bind="args" v-model="checked" />`,
})

/**
 * Indeterminate(중간) 상태 예시
 */
export const Indeterminate: Story = {
  name: "불확정",
  args: {
    ...defaultArgs,
    indeterminate: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Indeterminate(중간) 상태의 체크박스입니다. 일부 하위 항목만 선택되었을 때 부모 체크박스에 사용됩니다.

**특징**
- 체크, 미체크, 중간 상태의 3가지 상태 지원
- 주로 트리 구조나 그룹 선택에서 사용
- 시각적으로 '-' 기호로 중간 상태 표시
- 클릭 시 다음 상태로 순환 (unchecked → checked → indeterminate → unchecked)

**사용 예시**
계층적 선택 UI에서 자주 사용됩니다:
- 모든 하위 항목 선택: 체크 상태
- 일부 하위 항목만 선택: 중간 상태
- 하위 항목 모두 미선택: 미체크 상태
        `,
      },
    },
  },
}

Indeterminate.render = (args) => ({
  components: { VCheckbox },
  setup() {
    // three-state cycle: 'unchecked' -> 'checked' -> 'indeterminate' -> 'unchecked'
    const state = ref<"unchecked" | "checked" | "indeterminate">("indeterminate")

    const modelValue = computed<boolean>({
      get() {
        return state.value === "checked"
      },
      set() {
        // called when VCheckbox is clicked (v-model update)
        if (state.value === "unchecked") state.value = "checked"
        else if (state.value === "checked") state.value = "indeterminate"
        else state.value = "unchecked"
      },
    })

    return { args, state, modelValue }
  },
  template: `
      <VCheckbox v-bind="args" :indeterminate="state === 'indeterminate'" v-model="modelValue" />
  `,
})
