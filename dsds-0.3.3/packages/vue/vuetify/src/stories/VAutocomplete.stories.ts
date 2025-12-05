import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref } from "vue"

import { VAutocomplete } from "@/components/ui"
import { radioControl } from "./utils"

const meta: Meta = {
  title: "Components/Autocomplete",
  component: VAutocomplete,
  tags: ["autodocs"],
  argTypes: {
    badgePosition: radioControl(["before", "after"]),
  },
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: `

Vuetify의 VAutocomplete를 DSDS 디자인 시스템 스타일로 래핑한 자동완성 컴포넌트입니다.

### 주요 기능 <features />
- **자동완성 검색**: 입력 텍스트에 따라 항목 필터링
- **단일/다중 선택**: single/multiple 모드 지원
- **커스터마이징**: 다양한 크기와 스타일 옵션
- **전체 선택**: multiple 모드에서 \`All\` 옵션 제공
- **키보드 네비게이션**: ESC 키로 메뉴 제어 지원
- **접근성**: ARIA 속성 및 키보드 네비게이션 지원
- **전체 선택/해제**: DSDS 디자인 시스템의 편의 기능으로, Vuetify에는 없는 사용자 경험 개선 기능입니다:
  - 다중 선택 모드에서 \`All\` 옵션을 제공하여 모든 항목을 한 번에 선택하거나 해제할 수 있습니다
  - 체크박스 형태로 직관적인 UI를 제공합니다
  - \`showAll\` prop 으로 설정 가능합니다.

### 디자인 일관성 정책 <policy />
DSDS 디자인 시스템의 일관성을 위해 다음과 같은 Vuetify VAutocomplete의 기능들을 **의도적으로 지원하지 않습니다**:
- **색상 커스터마이징**: color prop을 통한 색상 변경
- **밀도 조절**: density prop을 통한 컴포넌트 밀도 조절
- **칩 스타일 표시**: chips prop을 통한 칩 스타일 선택 표시

이러한 기능들은 DSDS 디자인 시스템의 일관된 사용자 경험을 위해 제한되며, 필요한 경우 상위 컴포넌트 레벨에서 처리하는 것을 권장합니다.

### 사용 방법 <usages />

#### 1. 기본 자동완성
\`\`\`html
<template>
  <VAutocomplete v-model="selectedValue"
                 :items="items"
                 placeholder="검색어를 입력하세요" />
</template>

<script setup>
import { ref } from 'vue'
import { VAutocomplete } from '@/components/ui'

const selectedValue = ref('')
const items = ref([
  { title: '옵션 1', value: 'option1' },
  { title: '옵션 2', value: 'option2' },
  { title: '옵션 3', value: 'option3' }
])
</script>
\`\`\`

#### 2. 다중 선택 자동완성
\`\`\`html
<template>
  <VAutocomplete v-model="selectedValues"
                 :items="items"
                 multiple
                 placeholder="여러 항목을 선택하세요" />
</template>

<script setup>
import { ref } from 'vue'
const selectedValues = ref([])
const items = ref([
  { title: '항목 A', value: 'a' },
  { title: '항목 B', value: 'b' },
  { title: '항목 C', value: 'c' }
])
</script>
\`\`\`

#### 3. 전체 선택 기능 (**DSDS 고유 기능**)
\`\`\`html
<template>
  <VAutocomplete v-model="selectedValues"
                 :items="items"
                 multiple
                 show-all
                 placeholder="전체 선택 가능" />
</template>

<script setup>
import { ref } from 'vue'
const selectedValues = ref([])
const items = ref([
  { title: '선택지 1', value: '1' },
  { title: '선택지 2', value: '2' },
  { title: '선택지 3', value: '3' }
])
</script>
\`\`\`

**특징**: \`showAll\` prop을 활성화하면 다중 선택 모드에서 \`All\` 옵션이 표시되어 모든 항목을 한 번에 선택하거나 해제할 수 있습니다. 이는 Vuetify의 기본 기능이 아닌 DSDS만의 특별한 사용자 경험 개선 기능입니다.

### Props 설명 <props />
- \`variant\` (string, optional): Select 스타일 변형 - 'default', 'ghost'
- \`size\` (string, optional): Select 크기 - 'small', 'medium', 'large'
- \`disabled\` (boolean, optional): Select 비활성화 상태
- \`items\` (array, optional): 선택 항목 배열
- \`modelValue\` (any, optional): 선택된 값 (v-model)
- \`placeholder\` (string, optional): 플레이스홀더 텍스트
- \`clearable\` (boolean, optional): 선택값 클리어 가능 여부
- \`multiple\` (boolean, optional): 다중 선택 가능 여부
- \`itemTitle\` (string, optional): 아이템 표시 텍스트 속성명 (기본값: 'title')
- \`itemValue\` (string, optional): 아이템 값 속성명 (기본값: 'value')
- \`itemSelection\` (string, optional): 단일 선택 시 표시 텍스트 속성명
- \`width\` (number, optional): Select 너비 (px 단위)
- \`maxWidth\` (number, optional): Select 최대 너비
- \`showAll\` (boolean, optional): **DSDS 고유 기능** - 전체 선택/해제 기능 표시 여부 (multiple 모드에서 모든 항목을 한 번에 선택/해제할 수 있는 특별한 기능)
- \`filter\` (Function, optional): 필터링 함수
- \`autocomplete\` (boolean, optional): 자동완성 기능 활성화

### v-model
VAutocomplete은 Vue 3의 defineModel을 사용하여 양방향 바인딩을 지원합니다:

\`\`\`html
<!-- 단일 선택 -->
<VAutocomplete v-model="selectedValue" :items="items" />

<!-- 다중 선택 -->
<VAutocomplete v-model="selectedValues" :items="items" multiple />
\`\`\`

### 이벤트 <events />
- \`@update:modelValue\`: 선택 값 변경 이벤트
- \`@update:focused\`: 포커스 상태 변경 이벤트
- \`@update:menu\`: 드롭다운 메뉴 상태 변경 이벤트


### 접근성 <accessibility />
- 키보드 네비게이션
  - **ESC 키**: 메뉴가 열려있을 때 ESC를 누르면 입력상자로 포커스가 이동하고 메뉴가 다시 열립니다
  - **화살표 키**: 메뉴 항목 간 이동
  - **Enter/Space**: 항목 선택
  - **Tab**: 다음 요소로 포커스 이동
- 스크린 리더 지원을 위한 ARIA 속성 자동 적용
- 포커스 표시 지원
- 라벨과 셀렉트의 올바른 연결

### 슬롯 <slots />
> ⚠️ **주의**: DSDS 디자인 시스템의 일관성을 위해 selection 및 item 슬롯을 통한 커스터마이징을 권장하지 않습니다. 필요한 경우 상위 컴포넌트 레벨에서 별도의 구현을 고려해주세요.

- \`#selection\`: 선택된 항목 표시 커스터마이징 (권장하지 않음)
- \`#item\`: 드롭다운 항목 표시 커스터마이징 (권장하지 않음)
- \`#prepend-item\`: 드롭다운 상단에 추가 콘텐츠
- \`#append-inner\`: 입력 영역 우측에 추가 콘텐츠

### 스타일링 <styling />
DSDS 디자인 시스템의 디자인 토큰을 사용하여 일관된 스타일을 제공합니다. 추가적인 커스터마이징이 필요한 경우 class prop을 통해 CSS 클래스를 적용할 수 있습니다.
        `,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const sampleItems = Array.from({ length: 20 }, (_, i) => {
  const item = i === 0 ? "selected" : `selected${i}`
  return {
    title: item,
    value: item,
    shortTitle: item.substring(3),
  }
})

const defaultArgs: Story["args"] = {
  variant: "default",
  size: "medium",
  disabled: false,
  clearable: false,
  multiple: false,
  showAll: false,
  placeholder: "Hint",
  itemTitle: "title",
  itemValue: "value",
  badgePosition: "after",
  width: 120,
  items: sampleItems,
}

const VAUTOCOMPLETE_BASE_TEMPLATE = '<VAutocomplete v-bind="args" v-model="selected" />'

const VAUTOCOMPLETE_SIZES_TEMPLATE = `
  <div class="flex flex-col gap-3">
    <VAutocomplete v-bind="args" width="120" v-model="largeSel" size="large" placeholder="Large" />
    <VAutocomplete v-bind="args" width="120" v-model="mediumSel" size="medium" placeholder="Medium" />
    <VAutocomplete v-bind="args" width="108" v-model="smallSel" size="small" placeholder="Small" />
  </div>
`

const VAUTOCOMPLETE_AUTO_SELECT_TEMPLATE = `
  <VAutocomplete
    v-bind="args"
    v-model="selected"
    @update:search="search = $event"
  />
`

/**
 * 기본 Default Select입니다. DSDS 표준 스타일을 적용합니다.
 */
export const Default: Story = {
  name: "기본",
  args: {
    ...defaultArgs,
  },
  parameters: {
    docs: {
      description: {
        story: "기본 Default Select입니다.",
      },
      source: {
        code: VAUTOCOMPLETE_BASE_TEMPLATE,
      },
    },
  },
}

export const Disabled: Story = {
  name: "비활성화",
  args: {
    ...defaultArgs,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "기본 Default Select입니다.",
      },
      source: {
        code: VAUTOCOMPLETE_BASE_TEMPLATE,
      },
    },
  },
}
// Render function binds a local reactive `selected` so choosing an item updates state in the story
Default.render = (args) => ({
  components: { VAutocomplete },
  setup() {
    const selected = ref<any>(null)
    return { args, selected }
  },
  template: VAUTOCOMPLETE_BASE_TEMPLATE,
})

/**
 * 다중 선택(Multiple) + 체크박스 표시 예시입니다.
 */
export const Multiple: Story = {
  name: "다중 선택",
  args: {
    ...defaultArgs,
    multiple: true,
    width: 180,
  },
  parameters: {
    docs: {
      description: {
        story: "multiple 옵션 활성화 시, 드롭다운 항목 왼쪽에 체크박스가 표시되고 상태에 따라 선택/해제가 동작합니다.",
      },
      source: {
        code: VAUTOCOMPLETE_BASE_TEMPLATE,
      },
    },
  },
}

Multiple.render = (args) => ({
  components: { VAutocomplete },
  setup() {
    const selected = ref<any[]>(["selected1", "selected3"]) // Pre-select some items to show comma-separated display
    return { args, selected }
  },
  template: VAUTOCOMPLETE_BASE_TEMPLATE,
})

/**
 * `show-all` prop 예시: multiple 모드에서 선택된 항목이 많을 때 전체 표시를 켜는 경우를 보여줍니다.
 */
export const ShowAll: Story = {
  name: "전체 선택 토글",
  args: {
    ...defaultArgs,
    multiple: true,
    width: 140,
    showAll: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "**DSDS 고유 기능** - `showAll`을 활성화하면 다중 선택 모드에서 'All' 옵션이 표시되어 모든 항목을 한 번에 선택하거나 해제할 수 있습니다. 이는 Vuetify의 기본 기능이 아닌 DSDS만의 특별한 사용자 경험 개선 기능입니다.",
      },
      source: {
        code: VAUTOCOMPLETE_BASE_TEMPLATE,
      },
    },
  },
}

ShowAll.render = (args) => ({
  components: { VAutocomplete },
  setup() {
    const selected = ref<any[]>(["selected", "selected1", "selected2"]) // Pre-select several items to demonstrate full display
    return { args, selected }
  },
  template: VAUTOCOMPLETE_BASE_TEMPLATE,
})

/**
 * Sizes: small, medium, large 를 세로로 나란히 보여주는 예제입니다.
 */
export const Sizes: Story = {
  name: "크기 변형",
  args: {
    ...defaultArgs,
  },
  parameters: {
    docs: {
      description: {
        story: "지원되는 size(small, medium, large)를 한 번에 비교할 수 있도록 세로로 배열한 예제입니다.",
      },
      source: {
        code: VAUTOCOMPLETE_SIZES_TEMPLATE.trim(),
      },
    },
  },
}

Sizes.render = (args) => ({
  components: { VAutocomplete },
  setup() {
    const smallSel = ref<any>(null)
    const mediumSel = ref<any>(null)
    const largeSel = ref<any>(null)
    return { args, smallSel, mediumSel, largeSel }
  },
  template: VAUTOCOMPLETE_SIZES_TEMPLATE,
})

export const AutoSelectFirst: Story = {
  name: "자동 첫 항목 선택",
  args: {
    ...defaultArgs,
    autoSelectFirst: true,
    autocomplete: "on",
    width: 220,
    placeholder: "제품명을 입력하세요",
    items: [
      { title: "Galaxy Book4 Pro", value: "galaxy-book4-pro" },
      { title: "Galaxy Book4 Ultra", value: "galaxy-book4-ultra" },
      { title: "Galaxy Book4 360", value: "galaxy-book4-360" },
      { title: "Galaxy Book3 Pro", value: "galaxy-book3-pro" },
      { title: "Galaxy Tab S10", value: "galaxy-tab-s10" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "검색어와 일치하는 문자열은 항상 강조 표시되며, `autoSelectFirst`를 켜면 필터된 목록의 첫 번째 항목이 자동으로 활성화됩니다.",
      },
      source: {
        code: VAUTOCOMPLETE_AUTO_SELECT_TEMPLATE.trim(),
      },
    },
  },
}

AutoSelectFirst.render = (args) => ({
  components: { VAutocomplete },
  setup() {
    const selected = ref<any>(null)
    const search = ref("")
    return { args, selected, search }
  },
  template: VAUTOCOMPLETE_AUTO_SELECT_TEMPLATE,
})
