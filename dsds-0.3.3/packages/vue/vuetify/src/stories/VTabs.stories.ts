import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref } from "vue"
import {
  VCard,
  VCardText,
  VTabs,
  VTab,
  VTabsWindow,
  VTabsWindowItem,
  VTabsContainer,
  tabsVariantsConfig,
} from "@/components/ui"

const meta: Meta<typeof VTabs> = {
  title: "Components/Tabs",
  component: VTabs,
  parameters: {
    layout: "fullscreen",
    docs: {
      codePanel: true,
      description: {
        component: `
DSDS 표준 탭 네비게이션 컴포넌트입니다.
Vuetify의 \`v-tabs\` API와 호환되는 방식으로 설계되었습니다.

### 주요 기능 <features />
- **Vuetify 호환성**: v-tabs, v-tab, v-tabs-items, v-tab-item API와 거의 동일
- **다양한 스타일**: Default (underline) 및 Button 변형 지원
- **크기 옵션**: Medium과 Small 크기 지원
- **접근성**: ARIA 속성과 키보드 네비게이션 지원
- **반응형**: v-model을 통한 양방향 바인딩
- **Disabled 상태**: 비활성화된 탭 지원
- **격리된 컨텍스트**: VTabsContainer로 여러 탭 그룹 안전하게 격리
- **defaultValue 지원**: v-model 없이도 기본 탭 값 설정 가능
- **items 프로퍼티**: 배열 기반으로 탭을 선언적으로 생성 가능

### 사용 방법 <usages />

#### 1. 기본 사용법 (Vuetify 3 스타일)
\`\`\`html
<!-- Vuetify 3 방식과 동일 -->
<VTabs v-model="activeTab" variant="default" size="medium">
  <VTab value="tab-1">Tab 1</VTab>
  <VTab value="tab-2">Tab 2</VTab>
  <VTab value="tab-3" disabled>Disabled Tab</VTab>
</VTabs>

<VTabsWindow v-model="activeTab">
  <VTabsWindowItem value="tab-1">
    <div class="p-4">Tab 1 Content</div>
  </VTabsWindowItem>
  <VTabsWindowItem value="tab-2">
    <div class="p-4">Tab 2 Content</div>
  </VTabsWindowItem>
</VTabsWindow>
\`\`\`

#### 2. VTabsContainer 사용법 (DSDS 특화)
\`\`\`html
<!-- 격리된 컨텍스트와 defaultValue 지원 -->
<VTabsContainer defaultValue="tab-1">
  <VTabs variant="default" size="medium">
    <VTab value="tab-1">Tab 1</VTab>
    <VTab value="tab-2">Tab 2</VTab>
    <VTab value="tab-3">Tab 3</VTab>
  </VTabs>

  <VTabsWindow>
    <VTabsWindowItem value="tab-1">
      <div class="p-4">Tab 1 Content</div>
    </VTabsWindowItem>
    <VTabsWindowItem value="tab-2">
      <div class="p-4">Tab 2 Content</div>
    </VTabsWindowItem>
    <VTabsWindowItem value="tab-3">
      <div class="p-4">Tab 3 Content</div>
    </VTabsWindowItem>
  </VTabsWindow>
</VTabsContainer>
\`\`\`

> **참고**: Vue는 CamelCase 컴포넌트 이름을 자동으로 kebab-case로 변환합니다.
> 따라서 \`VTabs\`를 템플릿에서 \`v-tabs\`로 작성해도 정상 동작합니다!
>
> **VTabsContainer 사용 시 장점**:
> - 여러 탭 그룹이 같은 페이지에 있어도 컨텍스트 충돌 없음
> - React의 Radix UI Tabs처럼 \`defaultValue\`로 간단하게 사용 가능
> - 기존 Vuetify API와 완전 호환되면서도 향상된 DX 제공

### Props 설명 <props />
- \`modelValue\` (string, optional): 현재 활성 탭 값 (v-model)
- \`variant\` ('default' | 'button', default: 'default'): 탭 스타일 변형
- \`size\` ('medium' | 'small', default: 'medium'): 탭 크기
- \`class\` (string, optional): 추가 CSS 클래스

#### VTab Props
- \`href\` (string, optional): 탭 식별자 (Vuetify 호환성)
- \`value\` (string, optional): 탭 식별자 (href가 없을 때)
- \`disabled\` (boolean, default: false): 비활성화 상태

### Variants <variants />
- **Default**: 하단에 underline이 표시되는 기본 스타일
- **Button**: 버튼 형태의 탭 스타일

### 이벤트 <events />
- \`@update:modelValue\`: 활성 탭 변경 시 발생

### 접근성 <accessibility />
- **키보드 지원**: Tab 키로 탭 영역으로 이동, 방향키로 탭 간 이동
- **방향키 이동**: \`←\` \`→\` 또는 \`↑\` \`↓\` 키로 탭 간 이동
- **탭 선택**: \`Space\` 또는 \`Enter\` 키로 탭 선택
- **첫/마지막 이동**: \`Home\`/\`End\` 키로 첫 번째/마지막 탭으로 이동
- **ARIA 속성**: role, aria-selected, aria-labelledby 등 완전 지원
- **포커스 관리**: 활성 탭만 포커스 가능하도록 tabindex 관리
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: Object.keys(tabsVariantsConfig.variant),
      description: "탭 스타일 변형",
    },
    size: {
      control: { type: "select" },
      options: Object.keys(tabsVariantsConfig.size),
      description: "탭 크기",
    },
    modelValue: {
      control: { type: "text" },
      description: "현재 활성 탭 값",
    },
    items: {
      control: { type: "object" },
      description: "슬롯 대신 사용할 탭 항목 배열",
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "기본 탭",
  parameters: {
    docs: {
      description: {
        story: `
기본 underline 스타일의 탭 컴포넌트입니다. 하단에 underline이 표시되어 현재 활성 탭을 명확히 구분할 수 있습니다.

**특징**
- Underline 스타일의 시각적 구분
- Hover 효과로 사용자 피드백 제공
- 깔끔하고 미니멀한 디자인
        `,
      },
      source: {
        code: `<template>
  <div class="h-full w-full p-4">
    <VTabs v-model="activeTab" variant="default" size="medium">
      <VTab value="tab-1">탭 1</VTab>
      <VTab value="tab-2">탭 2</VTab>
      <VTab value="tab-3">탭 3</VTab>
    </VTabs>

    <VTabsWindow v-model="activeTab">
      <VTabsWindowItem value="tab-1">
        <div class="flex flex-col gap-2 py-2">
          <h3 class="mb-2 text-lg font-semibold">탭 1 내용</h3>
          <p class="text-gray-600">탭 1의 내용입니다. 여기에 Vue 컴포넌트를 자유롭게 넣을 수 있어요.</p>
        </div>
      </VTabsWindowItem>
      <VTabsWindowItem value="tab-2">
        <div class="flex flex-col gap-2 py-2">
          <h3 class="mb-2 text-lg font-semibold">탭 2 내용</h3>
          <p class="text-gray-600">탭 2의 내용입니다. 여기에 Vue 컴포넌트를 자유롭게 넣을 수 있어요.</p>
        </div>
      </VTabsWindowItem>
      <VTabsWindowItem value="tab-3">
        <div class="flex flex-col gap-2 py-2">
          <h3 class="mb-2 text-lg font-semibold">탭 3 내용</h3>
          <p class="text-gray-600">탭 3의 내용입니다. 여기에 Vue 컴포넌트를 자유롭게 넣을 수 있어요.</p>
        </div>
      </VTabsWindowItem>
    </VTabsWindow>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VTabs, VTab, VTabsWindow, VTabsWindowItem } from '@/components/ui'

const activeTab = ref('tab-1')
</script>`,
      },
    },
  },
  render: (args) => ({
    components: { VTabs, VTab, VTabsWindow, VTabsWindowItem },
    setup() {
      const activeTab = ref("tab-1")
      return { activeTab, args }
    },
    template: `
      <div class="h-full w-full p-4 ">
        <VTabs v-model="activeTab" v-bind="args" class="w-full">
          <VTab value="tab-1">Tab 1</VTab>
          <VTab value="tab-2">Tab 2</VTab>
          <VTab value="tab-3">Tab 3</VTab>
        </VTabs>

        <VTabsWindow v-model="activeTab">
          <VTabsWindowItem value="tab-1">
            <div class="flex flex-col gap-2 py-2">
              <h3 class="mb-2 text-lg font-semibold">탭 1 내용</h3>
              <p class="text-gray-600">탭 1의 내용입니다. 여기에 Vue 컴포넌트를 자유롭게 넣을 수 있어요.</p>
            </div>
          </VTabsWindowItem>
          <VTabsWindowItem value="tab-2">
            <div class="flex flex-col gap-2 py-2">
              <h3 class="mb-2 text-lg font-semibold">탭 2 내용</h3>
              <p class="text-gray-600">탭 2의 내용입니다. 여기에 Vue 컴포넌트를 자유롭게 넣을 수 있어요.</p>
            </div>
          </VTabsWindowItem>
          <VTabsWindowItem value="tab-3">
            <div class="flex flex-col gap-2 py-2">
              <h3 class="mb-2 text-lg font-semibold">탭 3 내용</h3>
              <p class="text-gray-600">탭 3의 내용입니다. 여기에 Vue 컴포넌트를 자유롭게 넣을 수 있어요.</p>
            </div>
          </VTabsWindowItem>
        </VTabsWindow>
      </div>
    `,
  }),
  args: {
    variant: "default",
    size: "medium",
  },
}

export const Button: Story = {
  name: "버튼 스타일",
  parameters: {
    docs: {
      description: {
        story: `
버튼 스타일의 탭 컴포넌트입니다. 더 굵은 테두리와 버튼 같은 외관을 가집니다.

**특징**
- 버튼 형태의 시각적 구분
- 테두리와 배경색으로 상태 표시
- 더 강조된 디자인
        `,
      },
      source: {
        code: `<template>
  <div class="h-full w-full p-4">
    <VTabs v-model="activeTab" variant="button" size="medium">
      <VTab value="tab-1">대시보드</VTab>
      <VTab value="tab-2">분석</VTab>
      <VTab value="tab-3">설정</VTab>
    </VTabs>

    <VTabsWindow v-model="activeTab">
      <VTabsWindowItem value="tab-1">
        <div class="flex flex-col gap-2 py-2">
          <h3 class="mb-2 text-lg font-semibold">대시보드</h3>
          <p class="text-gray-600">버튼 스타일로 표시된 대시보드 탭입니다.</p>
        </div>
      </VTabsWindowItem>
      <VTabsWindowItem value="tab-2">
        <div class="flex flex-col gap-2 py-2">
          <h3 class="mb-2 text-lg font-semibold">분석</h3>
          <p class="text-gray-600">분석 데이터를 확인할 수 있습니다.</p>
        </div>
      </VTabsWindowItem>
      <VTabsWindowItem value="tab-3">
        <div class="flex flex-col gap-2 py-2">
          <h3 class="mb-2 text-lg font-semibold">설정</h3>
          <p class="text-gray-600">애플리케이션 설정을 관리합니다.</p>
        </div>
      </VTabsWindowItem>
    </VTabsWindow>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VTabs, VTab, VTabsWindow, VTabsWindowItem } from '@/components/ui'

const activeTab = ref('tab-1')
</script>`,
      },
    },
  },
  render: (args) => ({
    components: { VTabs, VTab, VTabsWindow, VTabsWindowItem },
    setup() {
      const activeTab = ref("tab-1")
      return { activeTab, args }
    },
    template: `
      <div class="h-full w-full p-4 ">
        <VTabs v-model="activeTab" v-bind="args" class="w-full">
          <VTab value="tab-1">Tab 1</VTab>
          <VTab value="tab-2">Tab 2</VTab>
          <VTab value="tab-3">Tab 3</VTab>
        </VTabs>

        <VTabsWindow v-model="activeTab">
          <VTabsWindowItem value="tab-1">
            <div class="flex flex-col gap-2 py-2">
              <h3 class="mb-2 text-lg font-semibold">탭 1 내용</h3>
              <p class="text-gray-600">탭 1의 내용입니다. 여기에 Vue 컴포넌트를 자유롭게 넣을 수 있어요.</p>
            </div>
          </VTabsWindowItem>
          <VTabsWindowItem value="tab-2">
            <div class="flex flex-col gap-2 py-2">
              <h3 class="mb-2 text-lg font-semibold">탭 2 내용</h3>
              <p class="text-gray-600">탭 2의 내용입니다. 여기에 Vue 컴포넌트를 자유롭게 넣을 수 있어요.</p>
            </div>
          </VTabsWindowItem>
          <VTabsWindowItem value="tab-3">
            <div class="flex flex-col gap-2 py-2">
              <h3 class="mb-2 text-lg font-semibold">탭 3 내용</h3>
              <p class="text-gray-600">탭 3의 내용입니다. 여기에 Vue 컴포넌트를 자유롭게 넣을 수 있어요.</p>
            </div>
          </VTabsWindowItem>
        </VTabsWindow>
      </div>
    `,
  }),
  args: {
    variant: "button",
    size: "medium",
  },
}

export const Small: Story = {
  name: "작은 크기",
  parameters: {
    docs: {
      description: {
        story: `
작은 크기의 탭 컴포넌트입니다. 더 컴팩트한 디자인에 적합합니다.

**특징**
- 더 작은 패딩과 폰트 크기
- 제한된 공간에서 사용하기 적합
- 미니멀한 디자인
        `,
      },
      source: {
        code: `<template>
  <div class="h-full w-full p-4">
    <VTabs v-model="activeTab" variant="default" size="small">
      <VTab value="tab-1">알림</VTab>
      <VTab value="tab-2">메시지</VTab>
    </VTabs>

    <VTabsWindow v-model="activeTab">
      <VTabsWindowItem value="tab-1">
        <div class="flex flex-col gap-2 py-2">
          <h3 class="mb-2 text-lg font-semibold">알림</h3>
          <p class="text-gray-600">새로운 알림이 도착했어요! 🔔</p>
        </div>
      </VTabsWindowItem>
      <VTabsWindowItem value="tab-2">
        <div class="flex flex-col gap-2 py-2">
          <h3 class="mb-2 text-lg font-semibold">메시지</h3>
          <p class="text-gray-600">메시지를 확인해보세요. 💬</p>
        </div>
      </VTabsWindowItem>
    </VTabsWindow>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VTabs, VTab, VTabsWindow, VTabsWindowItem } from '@/components/ui'

const activeTab = ref('tab-1')
</script>`,
      },
    },
  },
  render: (args) => ({
    components: { VTabs, VTab, VTabsWindow, VTabsWindowItem },
    setup() {
      const activeTab = ref("tab-1")
      return { activeTab, args }
    },
    template: `
      <div class="h-full w-full p-4 ">
        <VTabs v-model="activeTab" v-bind="args" class="w-full">
          <VTab value="tab-1">알림</VTab>
          <VTab value="tab-2">메시지</VTab>
        </VTabs>

        <VTabsWindow v-model="activeTab">
          <VTabsWindowItem value="tab-1">
            <div class="flex flex-col gap-2 py-2">
              <h3 class="mb-2 text-lg font-semibold">알림</h3>
              <p class="text-gray-600">새로운 알림이 도착했어요! 🔔</p>
            </div>
          </VTabsWindowItem>
          <VTabsWindowItem value="tab-2">
            <div class="flex flex-col gap-2 py-2">
              <h3 class="mb-2 text-lg font-semibold">메시지</h3>
              <p class="text-gray-600">메시지를 확인해보세요. 💬</p>
            </div>
          </VTabsWindowItem>
        </VTabsWindow>
      </div>
    `,
  }),
  args: {
    variant: "default",
    size: "small",
  },
}

export const WithDisabled: Story = {
  name: "비활성화",
  parameters: {
    docs: {
      description: {
        story: `
비활성화된 탭이 포함된 예시입니다. disabled 탭은 클릭할 수 없고, 시각적으로 비활성 상태임을 표시합니다.

**특징**
- disabled 속성으로 탭 비활성화
- 시각적 피드백으로 상태 표시
- 접근성을 위한 적절한 ARIA 속성
        `,
      },
      source: {
        code: `<template>
  <div class="h-full w-full p-4">
    <VTabs v-model="activeTab" variant="default" size="medium">
      <VTab value="tab-1">활성 탭</VTab>
      <VTab value="tab-2" disabled>비활성 탭</VTab>
      <VTab value="tab-3">다른 탭</VTab>
    </VTabs>

    <VTabsWindow v-model="activeTab">
      <VTabsWindowItem value="tab-1">
        <div class="flex flex-col gap-2 py-2">
          <h3 class="mb-2 text-lg font-semibold">활성 탭 내용</h3>
          <p class="text-gray-600">이 탭은 정상적으로 동작합니다.</p>
        </div>
      </VTabsWindowItem>
      <VTabsWindowItem value="tab-3">
        <div class="flex flex-col gap-2 py-2">
          <h3 class="mb-2 text-lg font-semibold">다른 탭 내용</h3>
          <p class="text-gray-600">이 탭도 정상적으로 동작합니다.</p>
        </div>
      </VTabsWindowItem>
    </VTabsWindow>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VTabs, VTab, VTabsWindow, VTabsWindowItem } from '@/components/ui'

const activeTab = ref('tab-1')
</script>`,
      },
    },
  },
  render: (args) => ({
    components: { VTabs, VTab, VTabsWindow, VTabsWindowItem },
    setup() {
      const activeTab = ref("tab-1")
      return { activeTab, args }
    },
    template: `
      <div class="h-full w-full p-4 ">
        <VTabs v-model="activeTab" v-bind="args" class="w-full">
          <VTab value="tab-1">활성 탭</VTab>
          <VTab value="tab-2" :disabled="true">비활성 탭</VTab>
          <VTab value="tab-3">일반 탭</VTab>
        </VTabs>

        <VTabsWindow v-model="activeTab">
          <VTabsWindowItem value="tab-1">
            <div class="flex flex-col gap-2 py-2">
              <h3 class="mb-2 text-lg font-semibold">활성 탭</h3>
              <p class="text-gray-600">이 탭은 정상적으로 동작합니다.</p>
            </div>
          </VTabsWindowItem>
          <VTabsWindowItem value="tab-2">
            <div class="flex flex-col gap-2 py-2">
              <h3 class="mb-2 text-lg font-semibold">비활성 탭</h3>
              <p class="text-gray-600">이 탭은 disabled 상태라서 접근할 수 없습니다.</p>
            </div>
          </VTabsWindowItem>
          <VTabsWindowItem value="tab-3">
            <div class="flex flex-col gap-2 py-2">
              <h3 class="mb-2 text-lg font-semibold">일반 탭</h3>
              <p class="text-gray-600">이 탭도 정상적으로 동작합니다.</p>
            </div>
          </VTabsWindowItem>
        </VTabsWindow>
      </div>
    `,
  }),
  args: {
    variant: "default",
    size: "medium",
  },
}

export const WithItems: Story = {
  name: "items 프로퍼티",
  parameters: {
    docs: {
      description: {
        story: `
\`:items\` 프로퍼티로 탭 목록을 선언적으로 렌더링하는 예시입니다. 슬롯에 \`<VTab>\`을 직접 나열하지 않아도 되고, 항목 배열만으로 탭을 구성할 수 있습니다.

**특징**
- 배열 기반 선언형 구성
- 슬롯과 동일한 스타일/상태 동기화
- disabled 항목 지원
        `,
      },
      source: {
        code: `<template>
  <div class="h-full w-full p-4">
    <VTabs v-model="activeTab" :items="items" variant="default" size="medium" />

    <VTabsWindow v-model="activeTab">
      <VTabsWindowItem :value="item.value" v-for="(item, idx) in items" :key="item.value">
        <div class="flex flex-col gap-2 py-2">
          <h3 class="mb-2 text-lg font-semibold">{{ item.label }}</h3>
          <p class="text-gray-600">items 배열로 생성된 {{ idx + 1 }} 번째 탭입니다.</p>
        </div>
      </VTabsWindowItem>
    </VTabsWindow>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VTabs, VTabsWindow, VTabsWindowItem } from '@/components/ui'

const activeTab = ref('summary')
const items = ref([
  { value: 'summary', label: '요약' },
  { value: 'activity', label: '활동' },
  { value: 'settings', label: '설정', disabled: true },
])
</script>`,
      },
    },
  },
  render: (args) => ({
    components: { VTabs, VTabsWindow, VTabsWindowItem },
    setup() {
      const activeTab = ref("summary")
      const items = ref([
        { value: "summary", label: "요약" },
        { value: "activity", label: "활동" },
        { value: "settings", label: "설정", disabled: true },
      ])

      return { activeTab, args, items }
    },
    template: `
      <div class="h-full w-full p-4 ">
        <VTabs v-model="activeTab" v-bind="args" :items="items" class="w-full" />

        <VTabsWindow v-model="activeTab">
          <VTabsWindowItem :value="item.value" v-for="(item, idx) in items" :key="item.value">
            <div class="flex flex-col gap-2 py-2">
              <h3 class="mb-2 text-lg font-semibold">{{ item.label }}</h3>
              <p class="text-gray-600">items 배열로 생성된 {{ idx + 1 }} 번째 탭입니다.</p>
            </div>
          </VTabsWindowItem>
        </VTabsWindow>
      </div>
    `,
  }),
  args: {
    variant: "default",
    size: "medium",
  },
}

export const VuetifyCompatible: Story = {
  name: "Vuetify 호환 사용법",
  parameters: {
    docs: {
      description: {
        story: `
Vuetify v-tabs API와 호환되는 사용법 예시입니다. 기존 Vuetify 코드를 거의 그대로 사용할 수 있습니다.

### Vuetify 마이그레이션 <migration />
기존 Vuetify 코드에서 컴포넌트 이름만 변경하면 됩니다:
- \`v-tabs\` → \`VTabs\`
- \`v-tab\` → \`VTab\`
- \`v-tabs-items\` → \`VTabItems\`
- \`v-tab-item\` → \`VTabItem\`

### href 속성 사용 <href />
Vuetify와 동일하게 href 속성을 사용하여 탭을 식별할 수 있습니다.

### 키보드 네비게이션 데모 <keyboard />
이 예시에서 키보드 네비게이션을 테스트해보세요:
1. **Tab 키**로 탭 영역으로 포커스 이동
2. **방향키**로 탭 간 이동
3. **Space/Enter**로 탭 선택
4. **Home/End**로 처음/마지막 탭으로 이동
        `,
      },
      source: {
        code: `<template>
  <div class="h-full w-full p-4">
    <!-- Vuetify 스타일 사용법 -->
    <VTabs v-model="tab" variant="default" size="medium">
      <VTab href="#tab-1">Overview</VTab>
      <VTab href="#tab-2">Details</VTab>
      <VTab href="#tab-3">Settings</VTab>
    </VTabs>

    <VTabsWindow v-model="tab">
      <VTabsWindowItem value="tab-1">
        <div class="flex flex-col gap-2 py-2">
          <h3 class="mb-2 text-lg font-semibold">개요</h3>
          <p class="text-gray-600">Vuetify href 속성을 사용한 탭입니다.</p>
        </div>
      </VTabsWindowItem>
      <VTabsWindowItem value="tab-2">
        <div class="flex flex-col gap-2 py-2">
          <h3 class="mb-2 text-lg font-semibold">상세 정보</h3>
          <p class="text-gray-600">키보드 네비게이션을 테스트해보세요!</p>
        </div>
      </VTabsWindowItem>
      <VTabsWindowItem value="tab-3">
        <div class="flex flex-col gap-2 py-2">
          <h3 class="mb-2 text-lg font-semibold">설정</h3>
          <p class="text-gray-600">W3C ARIA 표준을 준수합니다.</p>
        </div>
      </VTabsWindowItem>
    </VTabsWindow>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VTabs, VTab, VTabsWindow, VTabsWindowItem } from '@/components/ui'

const tab = ref('tab-1')
</script>`,
      },
    },
  },
  render: (args) => ({
    components: { VTabs, VTab, VTabsWindow, VTabsWindowItem },
    setup() {
      const tab = ref("tab-1")
      return { tab, args }
    },
    template: `
      <div class="h-full w-full p-4 ">
        <!-- Vuetify 스타일 사용법 -->
        <VTabs v-model="tab" v-bind="args" class="w-full0">
          <VTab value="tab-1">
            Recent
            <span class="ml-1">📞</span>
          </VTab>
          <VTab value="tab-2">
            Favorites
            <span class="ml-1">❤️</span>
          </VTab>
          <VTab value="tab-3">
            Nearby
            <span class="ml-1">📍</span>
          </VTab>
        </VTabs>

        <VTabsWindow v-model="tab">
          <VTabsWindowItem value="tab-1">
            <div class="p-4 bg-gray-50 rounded">
              <h3 class="font-semibold mb-2">Recent Calls</h3>
              <p class="text-gray-600">최근 통화 목록을 여기에 표시합니다.</p>
            </div>
          </VTabsWindowItem>
          <VTabsWindowItem value="tab-2">
            <div class="p-4 bg-gray-50 rounded">
              <h3 class="font-semibold mb-2">Favorite Contacts</h3>
              <p class="text-gray-600">즐겨찾기 연락처를 여기에 표시합니다.</p>
            </div>
          </VTabsWindowItem>
          <VTabsWindowItem value="tab-3">
            <div class="p-4 bg-gray-50 rounded">
              <h3 class="font-semibold mb-2">Nearby Places</h3>
              <p class="text-gray-600">주변 장소를 여기에 표시합니다.</p>
            </div>
          </VTabsWindowItem>
        </VTabsWindow>
      </div>
    `,
  }),
  args: {
    variant: "default",
    size: "medium",
  },
}

export const Vuetify3Style: Story = {
  name: "Vuetify 3 공식 예제",
  parameters: {
    docs: {
      description: {
        story: `
Vuetify 3의 공식 문서에서 제공하는 탭 예제를 그대로 구현한 스토리입니다.

**특징**
- \`v-card\`와 \`v-card-text\`를 사용한 레이아웃
- 지원되지 않는 \`bg-color="primary"\` 속성 무시됨
- Vuetify 3 공식 API 완전 호환
- 원본 Vuetify 컴포넌트와 동일한 구조

### 원본 코드 <original />
이 예제는 Vuetify 3 공식 문서의 탭 예제와 완전히 동일합니다.
        `,
      },
      source: {
        code: `<template>
  <v-card>
    <!--지원되지 않는 bg-color 속성은 무시됩니다-->
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab value="one">Item One</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          One
        </v-tabs-window-item>

        <v-tabs-window-item value="two">
          Two
        </v-tabs-window-item>

        <v-tabs-window-item value="three">
          Three
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('one')
</script>`,
      },
    },
  },
  render: (args) => ({
    components: { VTabs, VTab, VTabsWindow, VTabsWindowItem, VCard, VCardText },
    setup() {
      const tab = ref("one")
      return { tab, args }
    },
    template: `
      <VCard class="m-4">
        <VTabs
          v-model="tab"
          bg-color="primary"
          class="p-2"
        >
          <VTab value="one">Item One</VTab>
          <VTab value="two">Item Two</VTab>
          <VTab value="three">Item Three</VTab>
        </VTabs>

        <VCardText>
          <VTabsWindow v-model="tab">
            <VTabsWindowItem value="one">
              One
            </VTabsWindowItem>

            <VTabsWindowItem value="two">
              Two
            </VTabsWindowItem>

            <VTabsWindowItem value="three">
              Three
            </VTabsWindowItem>
          </VTabsWindow>
        </VCardText>
      </VCard>
    `,
  }),
  args: {
    variant: "default",
    size: "medium",
  },
}

export const WithContainer: Story = {
  name: "컨테이너 사용",
  parameters: {
    docs: {
      description: {
        story: `
VTabsContainer를 사용하여 여러 탭 그룹을 안전하게 격리하는 예시입니다.

### VTabsContainer의 장점 <advantages />
- **격리된 컨텍스트**: 여러 탭 그룹이 같은 페이지에 있어도 충돌하지 않음
- **defaultValue 지원**: v-model 없이도 기본값 설정 가능
- **React 유사 DX**: Radix UI Tabs처럼 직관적인 사용법

### 사용법 <usage />
\`\`\`html
<VTabsContainer defaultValue="tab1">
  <VTabs>
    <VTab value="tab1">탭 1</VTab>
    <VTab value="tab2">탭 2</VTab>
  </VTabs>

  <VTabsWindow>
    <VTabsWindowItem value="tab1">내용 1</VTabsWindowItem>
    <VTabsWindowItem value="tab2">내용 2</VTabsWindowItem>
  </VTabsWindow>
</VTabsContainer>
\`\`\`
        `,
      },
      source: {
        code: `<template>
  <div class="space-y-8">
    <!-- 첫 번째 탭 그룹 -->
    <div class="border rounded-lg p-4">
      <h3 class="text-lg font-semibold mb-4">첫 번째 탭 그룹</h3>
      <VTabsContainer defaultValue="tab1">
        <VTabs>
          <VTab value="tab1">대시보드</VTab>
          <VTab value="tab2">분석</VTab>
          <VTab value="tab3">설정</VTab>
        </VTabs>

        <VTabsWindow>
          <VTabsWindowItem value="tab1">
            <div class="p-4 bg-blue-50 rounded">대시보드 내용</div>
          </VTabsWindowItem>
          <VTabsWindowItem value="tab2">
            <div class="p-4 bg-green-50 rounded">분석 내용</div>
          </VTabsWindowItem>
          <VTabsWindowItem value="tab3">
            <div class="p-4 bg-purple-50 rounded">설정 내용</div>
          </VTabsWindowItem>
        </VTabsWindow>
      </VTabsContainer>
    </div>

    <!-- 두 번째 탭 그룹 -->
    <div class="border rounded-lg p-4">
      <h3 class="text-lg font-semibold mb-4">두 번째 탭 그룹</h3>
      <VTabsContainer defaultValue="item1">
        <VTabs>
          <VTab value="item1">사용자</VTab>
          <VTab value="item2">권한</VTab>
        </VTabs>

        <VTabsWindow>
          <VTabsWindowItem value="item1">
            <div class="p-4 bg-red-50 rounded">사용자 관리</div>
          </VTabsWindowItem>
          <VTabsWindowItem value="item2">
            <div class="p-4 bg-yellow-50 rounded">권한 설정</div>
          </VTabsWindowItem>
        </VTabsWindow>
      </VTabsContainer>
    </div>
  </div>
</template>

<script setup>
import { VTabsContainer, VTabs, VTab, VTabsWindow, VTabsWindowItem } from '@/components/ui'
</script>`,
      },
    },
  },
  render: (args) => ({
    components: { VTabsContainer, VTabs, VTab, VTabsWindow, VTabsWindowItem },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-8">
        <div class="p-4 pb-0">
        VTabsContainer를 사용하여 \`v-model\` 없이도 여러 탭 그룹을 안전하게 격리할 수 있습니다.
        </div>
        <!-- 첫 번째 탭 그룹 -->
        <div class="rounded-xs px-4">
          <h3 class="text-lg font-semibold mb-4">첫 번째 탭 그룹</h3>
          <VTabsContainer defaultValue="tab1">
            <VTabs v-bind="args">
              <VTab value="tab1">대시보드</VTab>
              <VTab value="tab2">분석</VTab>
              <VTab value="tab3">설정</VTab>
            </VTabs>

            <VTabsWindow>
              <VTabsWindowItem value="tab1">
                <div class="p-4 bg-blue-50 rounded">대시보드 내용</div>
              </VTabsWindowItem>
              <VTabsWindowItem value="tab2">
                <div class="p-4 bg-green-50 rounded">분석 내용</div>
              </VTabsWindowItem>
              <VTabsWindowItem value="tab3">
                <div class="p-4 bg-purple-50 rounded">설정 내용</div>
              </VTabsWindowItem>
            </VTabsWindow>
          </VTabsContainer>
        </div>

        <!-- 두 번째 탭 그룹 -->
        <div class="rounded-xs p-4">
          <h3 class="text-lg font-semibold mb-4">두 번째 탭 그룹</h3>
          <VTabsContainer defaultValue="item1">
            <VTabs v-bind="args">
              <VTab value="item1">사용자</VTab>
              <VTab value="item2">권한</VTab>
            </VTabs>

            <VTabsWindow>
              <VTabsWindowItem value="item1">
                <div class="p-4 bg-red-50 rounded">사용자 관리</div>
              </VTabsWindowItem>
              <VTabsWindowItem value="item2">
                <div class="p-4 bg-yellow-50 rounded">권한 설정</div>
              </VTabsWindowItem>
            </VTabsWindow>
          </VTabsContainer>
        </div>
      </div>
    `,
  }),
  args: {
    variant: "default",
    size: "medium",
  },
}
