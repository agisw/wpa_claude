import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { computed, ref } from "vue"

import {
  ModalHeader,
  Markdown,
  PageTabs,
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  Modal,
  VSpacer,
  type PageTabItem,
} from "@/components/ui"

const components = {
  Markdown,
  PageTabs,
  VBtn,
  Modal,
  ModalHeader,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VSpacer,
}

const meta: Meta<typeof PageTabs> = {
  title: "Layouts/PageTabs",
  component: PageTabs,
  parameters: {
    layout: "fullscreen",
    docs: {
      codePanel: true,
      canvas: {
        sourceState: "none",
      },
      description: {
        component: `
하단 애플리케이션 탭 네비게이션을 위한 PageTabs 컴포넌트입니다. 현재 활성 탭을 \`v-model\`로 관리하고 탭 목록을 \`items\` 프로퍼티로 전달합니다. DSDS 접근성/인터랙션 표준을 그대로 따릅니다.

### 주요 기능 <features />
- **값 기반 제어**: \`v-model\`로 현재 활성 탭의 value를 양방향 바인딩하고 \`v-model:items\`로 탭 목록을 동기화
- **동적 탭 관리**: \`v-model:items\`를 사용하면 @close 핸들러 없이도 탭 추가/삭제가 자동 반영되며, 필요 시 이벤트로 커스텀 로직 구현 가능
- **오버플로우 내비게이션**: Prev/Next 컨트롤과 Ellipsis 드롭다운으로 많은 탭을 빠르게 탐색
- **키보드 접근성**: 방향키, Home/End, Delete 지원으로 키보드만으로 탭 전환/닫기 가능
- **컨트롤 패널 이벤트**: \`@ellipsis\`, \`@options\`, \`@controlsClose\` 등으로 커스텀 핸들링

### 사용 방법 <usages />

#### 1. 기본 탭 바인딩
\`\`\`html
<script setup lang="ts">
import { ref } from 'vue'
import { PageTabs, type PageTabItem } from '@/components/ui'

const items = ref<PageTabItem[]>([
  { value: 'dashboard', label: '대시보드', closable: false },
  { value: 'activity', label: '활동 로그' },
  { value: 'reports', label: '리포트' },
])
const modelValue = ref('dashboard')
</script>

<template>
  <PageTabs v-model="modelValue" v-model:items="items" />
</template>
\`\`\`

#### 2. 탭 추가/닫기 상태 관리
\`\`\`html
<script setup lang="ts">
import { computed, ref } from 'vue'
import { PageTabs, type PageTabItem, VBtn } from '@/components/ui'

const items = ref<PageTabItem[]>([
  { value: 'overview', label: 'Overview', closable: false },
  { value: 'analytics', label: 'Analytics', closable: true },
])
const modelValue = ref('overview')

const activeLabel = computed(() => items.value.find((tab) => tab.value === modelValue.value)?.label ?? '없음')
const nextIndex = ref(items.value.length + 1)

const addTab = () => {
  const index = nextIndex.value++
  const newTab: PageTabItem = { value: \`dynamic-\${index}\`, label: \`추가 탭 \${index}\`, closable: true }
  items.value.push(newTab)
  modelValue.value = newTab.value
}

</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2 text-sm">
      <span>현재 탭: {{ activeLabel }}</span>
      <VBtn size="small" @click="addTab">탭 추가</VBtn>
    </div>
    <PageTabs v-model="modelValue" v-model:items="items" />
  </div>
</template>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

const createInitialTabs = (): PageTabItem[] => [
  { value: "dashboard", label: "대시보드", closable: false },
  { value: "activity", label: "활동 로그" },
  { value: "reports", label: "리포트" },
  { value: "settings", label: "설정" },
]

const getStoryContainerClass = (viewMode?: string) =>
  viewMode === "docs" ? "flex min-h-[360px] flex-col bg-neutral-50" : "flex h-screen flex-col bg-neutral-50"

export const Default: Story = {
  name: "기본 사용",
  render: (_, { viewMode }) => ({
    components,
    setup() {
      const items = ref<PageTabItem[]>(createInitialTabs())
      const modelValue = ref("dashboard")
      const activeLabel = computed(() => items.value.find((tab) => tab.value === modelValue.value)?.label ?? "없음")
      const nextIndex = ref(items.value.length + 1)
      const containerClass = getStoryContainerClass(viewMode)

      const addTab = () => {
        const index = nextIndex.value
        nextIndex.value += 1

        const newTab: PageTabItem = {
          value: `dynamic-${index}`,
          label: `추가 탭 ${index}`,
        }

        items.value = [...items.value, newTab]
        modelValue.value = newTab.value
      }

      return {
        items,
        modelValue,
        activeLabel,
        addTab,
        containerClass,
      }
    },
    template: `
      <div :class="containerClass">
        <div class="flex-1 overflow-auto p-6">
          <h3 class="flex items-center text-base font-semibold text-neutral-900">
            현재 활성 페이지
            <VBtn size="small" class="ml-auto" @click="addTab">탭 추가</VBtn>
          </h3>
          <p class="mt-1 text-sm text-neutral-600">{{ activeLabel }}</p>
          <div class="mt-4 rounded-sm border border-dashed border-neutral-300 bg-white p-4">
            <h4 class="mb-2 text-sm font-semibold text-neutral-900">열린 탭 목록</h4>
            <ul class="space-y-1 text-sm text-neutral-600">
              <li v-for="tab in items" :key="tab.value" class="flex items-center justify-between">
                <span :class="tab.value === modelValue ? 'font-semibold text-neutral-900' : ''">{{ tab.label }}</span>
                <span class="text-xs uppercase tracking-wide text-neutral-400" v-if="tab.value === modelValue">ACTIVE</span>
              </li>
            </ul>
          </div>
        </div>
        <PageTabs v-model="modelValue" v-model:items="items" />
      </div>
    `,
  }),
}

export const TabStatesOverview: Story = {
  name: "탭 상태 요약",
  render: (_, { viewMode }) => ({
    components,
    setup() {
      const items = ref<PageTabItem[]>([
        { value: "active", label: "활성 탭", closable: true },
        { value: "regular", label: "일반 탭", closable: true },
        { value: "pinned", label: "고정 탭", closable: false },
        { value: "disabled", label: "비활성 탭", disabled: true, closable: true },
      ])
      const modelValue = ref("active")

      const tabsJson = computed(() => JSON.stringify(items.value, null, 2))
      const containerClass = getStoryContainerClass(viewMode)

      const markdown = computed(
        () => `### 탭 상태 비교 <tabStateComparison />

PageTabs 컴포넌트가 제공하는 주요 상태를 한눈에 확인할 수 있습니다.

- **enabled** 상태는 일반적인 탭으로, 클릭과 닫기를 모두 지원합니다.
- **active** 상태는 현재 선택된 탭으로 강조 표시됩니다.
- **disabled** 상태는 클릭 및 키보드 이동 대상에서 제외됩니다.
- **closable: false** 상태는 닫기 버튼이 숨겨져 탭을 닫을 수 없습니다.

\`\`\`json
${tabsJson.value}
\`\`\`
`
      )
      return {
        items,
        modelValue,
        markdown,
        containerClass,
      }
    },
    template: `
      <div :class="containerClass">
        <div class="flex-1 overflow-auto p-6 space-y-4">
          <Markdown :content="markdown" />
        </div>
        <PageTabs v-model="modelValue" v-model:items="items" />
      </div>
    `,
  }),
}

export const OverflowControls: Story = {
  name: "탭이 많은 경우",
  render: (_, { viewMode }) => ({
    components,
    setup() {
      const items = ref<PageTabItem[]>(
        Array.from({ length: 12 }, (_, index) => ({
          value: `page-${index + 1}`,
          label: `페이지 ${index + 1}`,
        }))
      )
      const modelValue = ref("page-3")

      const activeLabel = computed(() => items.value.find((tab) => tab.value === modelValue.value)?.label ?? "없음")
      const containerClass = getStoryContainerClass(viewMode)

      return {
        items,
        modelValue,
        activeLabel,
        containerClass,
      }
    },
    template: `
      <div :class="containerClass">
        <div class="flex-1 overflow-auto p-6">
          <h3 class="text-base font-semibold text-neutral-900">활성 페이지</h3>
          <p class="mb-4 text-sm text-neutral-600">{{ activeLabel }} — Prev/Next 버튼으로 다른 탭에 빠르게 접근할 수 있습니다.</p>
          <p class="text-sm text-neutral-500">탭을 닫아보거나, 키보드 방향키로 이동해보세요.</p>
        </div>
        <PageTabs v-model="modelValue" v-model:items="items" />
      </div>
    `,
  }),
}

export const EnhancedControls: Story = {
  name: "컨트롤 패널 이벤트",
  render: (_, { viewMode }) => ({
    components,
    setup() {
      const items = ref<PageTabItem[]>(
        Array.from({ length: 9 }, (_, index) => ({
          value: `section-${index + 1}`,
          label: `섹션 ${index + 1}`,
          closable: index !== 0,
        }))
      )
      const modelValue = ref("section-5")

      const logs = ref<string[]>([])
      const nextIndex = ref(items.value.length + 1)
      const containerClass = getStoryContainerClass(viewMode)

      const pushLog = (message: string) => {
        logs.value = [`${new Date().toLocaleTimeString()} · ${message}`, ...logs.value].slice(0, 6)
      }

      const handleEllipsis = () => {
        pushLog("Ellipsis 버튼 클릭")
      }

      const handleOptions = (tab?: PageTabItem) => {
        pushLog(`Options 버튼 클릭 — 현재 탭: ${tab?.label ?? "없음"}`)
      }

      const handleControlsClose = (tab?: PageTabItem) => {
        pushLog(`컨트롤 영역에서 탭 닫기 — 대상: ${tab?.label ?? "없음"}`)
      }

      const addTab = () => {
        const index = nextIndex.value
        nextIndex.value += 1

        const newTab: PageTabItem = {
          value: `section-${index}`,
          label: `섹션 ${index}`,
          closable: true,
        }

        items.value = [...items.value, newTab]
        modelValue.value = newTab.value
        pushLog(`새 탭 추가: ${newTab.label}`)
      }

      return {
        items,
        modelValue,
        logs,
        handleEllipsis,
        handleOptions,
        handleControlsClose,
        addTab,
        containerClass,
      }
    },
    template: `
      <div :class="containerClass">
        <div class="flex-1 overflow-auto p-6 space-y-4">
          <div>
            <h3 class="flex items-center text-base font-semibold text-neutral-900">
              컨트롤 패널 상태
              <VBtn size="small" class="ml-auto" @click="addTab">탭 추가</VBtn>
            </h3>
            <p class="mt-1 text-sm text-neutral-600">
              Prev/Next 버튼은 오버플로우와 활성 탭 위치에 따라 자동으로 비활성화됩니다.
            </p>
            <p class="text-xs text-neutral-500">
              Settings 버튼은 <code>@options</code> 리스너를 전달했을 때만 표시됩니다.
            </p>
          </div>
          <div class="rounded-sm border border-neutral-200 bg-white p-4">
            <h4 class="text-sm font-semibold text-neutral-900">이벤트 로그</h4>
            <ul class="mt-2 space-y-1 text-xs text-neutral-600">
              <li v-if="logs.length === 0" class="text-neutral-400">이벤트가 아직 발생하지 않았습니다.</li>
              <li v-for="(entry, index) in logs" :key="index">{{ entry }}</li>
            </ul>
          </div>
        </div>
        <PageTabs
          v-model="modelValue"
          v-model:items="items"
          @ellipsis="handleEllipsis"
          @options="handleOptions"
          @controlsClose="handleControlsClose"
        />
      </div>
    `,
  }),
}

export const OptionsModalExample: Story = {
  name: "옵션 다이얼로그",
  render: (_, { viewMode }) => ({
    components,
    setup() {
      const items = ref<PageTabItem[]>(createInitialTabs())
      const modelValue = ref("dashboard")
      const dialogOpen = ref(false)
      const selectedTab = ref<PageTabItem | undefined>()
      const containerClass = getStoryContainerClass(viewMode)

      const message = computed(() =>
        selectedTab.value ? `${selectedTab.value.label} 탭의 설정을 확인하세요.` : "선택된 탭이 없습니다."
      )

      const handleOptions = (tab?: PageTabItem) => {
        selectedTab.value = tab
        dialogOpen.value = true
      }

      const closeModal = () => {
        dialogOpen.value = false
      }

      return {
        items,
        modelValue,
        dialogOpen,
        message,
        handleOptions,
        closeModal,
        containerClass,
      }
    },
    template: `
      <div :class="containerClass">
        <div class="flex-1 overflow-auto p-6 space-y-4">
          <div>
            <h3 class="text-base font-semibold text-neutral-900">옵션 버튼 연동</h3>
            <p class="mt-1 text-sm text-neutral-600">
              Settings 버튼을 클릭하면 간단한 다이얼로그가 열립니다.
            </p>
          </div>
        </div>
        <PageTabs
          v-model="modelValue"
          v-model:items="items"
          @options="handleOptions"
        />
        <Modal v-bind="args" v-model="dialogOpen" size="xs">
          <v-card>
            <v-card-title><ModalHeader v-model="dialogOpen">PageTabs 설정</ModalHeader></v-card-title>
            <v-card-text>PageTabs 설정입니다.</v-card-text>
            <v-card-actions><v-spacer /><VBtn @click="dialogOpen=false">닫기</VBtn></v-card-actions>
          </v-card>
        </Modal>
      </div>
    `,
  }),
}

export const ConfirmCloseFallback: Story = {
  name: "모든 탭 닫기 전 확인",
  render: (_, { viewMode }) => ({
    components,
    setup() {
      const items = ref<PageTabItem[]>([
        { value: "overview", label: "Overview" },
        { value: "analytics", label: "Analytics" },
        { value: "reports", label: "Reports" },
        { value: "settings", label: "Settings" },
      ])
      const modelValue = ref("overview")

      const logs = ref<string[]>([])
      const containerClass = getStoryContainerClass(viewMode)

      const pushLog = (message: string) => {
        logs.value = [`${new Date().toLocaleTimeString()} · ${message}`, ...logs.value].slice(0, 6)
      }

      const handleChange = (tab?: PageTabItem) => {
        pushLog(`활성 탭 변경: ${tab?.label ?? "없음"}`)
      }

      const handleClose = (tab: PageTabItem) => {
        pushLog(`탭 닫힘: ${tab.label}`)
      }

      return {
        items,
        modelValue,
        logs,
        handleChange,
        handleClose,
        containerClass,
      }
    },
    template: `
      <div :class="containerClass">
        <div class="flex-1 overflow-auto p-6 space-y-4">
          <div>
            <h3 class="text-base font-semibold text-neutral-900">컨트롤 핸들러 미지정 시 모든 탭 닫기 버튼의 기본 동작</h3>
            <p class="mt-1 text-sm text-neutral-600">
              Close 버튼을 누르면 확인 다이얼로그가 표시되고, 확인 시 closable 탭이 모두 닫힙니다.
            </p>
          </div>
          <div class="rounded-sm border border-neutral-200 bg-white p-4">
            <h4 class="text-sm font-semibold text-neutral-900">이벤트 로그</h4>
            <ul class="mt-2 space-y-1 text-xs text-neutral-600">
              <li v-if="logs.length === 0" class="text-neutral-400">이벤트가 아직 발생하지 않았습니다.</li>
              <li v-for="(entry, index) in logs" :key="index">{{ entry }}</li>
            </ul>
          </div>
        </div>
        <PageTabs
          v-model="modelValue"
          v-model:items="items"
          @change="handleChange"
          @close="handleClose"
        />
      </div>
    `,
  }),
}
