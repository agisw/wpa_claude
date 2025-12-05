import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { computed, onBeforeUnmount, onMounted, ref } from "vue"

import { Splitter, SplitterPanel, SplitterHandle, VBtn, Markdown } from "@/components/ui"

const components = { Splitter, SplitterPanel, SplitterHandle, Markdown }

const meta = {
  title: "Components/Splitter",
  component: Splitter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      codePanel: true,
      description: {
        component: `

Reka UI SplitterGroup을 DSDS 디자인 토큰과 접근성 가이드에 맞춰 래핑한 Splitter 컴포넌트입니다. [WAI-ARIA Window Splitter 패턴](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/)을 그대로 따르며, 컨테이너 측정을 기반으로 한 픽셀·백분율 혼합 제어를 지원합니다.

### 주요 기능 <features />
- **가로/세로 분할**: \`direction\`만 바꿔 동일한 API로 너비와 높이를 제어
- **키보드 접근성**: \`keyboardResizeBy\` 단위로 방향키 리사이즈, Home/End, Shift 조합 지원
- **픽셀 기반 패널 크기**: \`defaultWidth\`, \`minWidth\`, \`maxWidth\` 등 픽셀 props를 자동으로 백분율로 변환
- **레이아웃 저장**: \`autoSaveId\`와 커스텀 storage로 사용자가 조정한 레이아웃 유지
- **레이아웃 이벤트 제어**: Splitter가 발행하는 \`layout\` 이벤트를 구독하고, \`layoutDebounce\`로 발생 간격을 제어

### 사용 방법 <usages />

#### 1. 기본 사용법 (Percentage 기반 크기 지정)
\`\`\`html
<template>
  <Splitter class="flex h-[280px] w-full rounded-xs border border-outline" direction="horizontal">
    <SplitterPanel :default-size="40" :min-size="25" class="p-4">좌측 콘텐츠</SplitterPanel>
    <SplitterHandle aria-label="패널 너비 조절" />
    <SplitterPanel :default-size="60" :min-size="35" class="p-4">
      <Splitter>
        <SplitterPanel direction="vertical" :default-size="30">
          우측 상단 서브패널
        </SplitterPanel>
        <SplitterHandle />
        <SplitterPanel>우측 하단 서브패널</SplitterPanel>
      </Splitter>
    </SplitterPanel>
  </Splitter>
</template>
\`\`\`

#### 2. 픽셀 기반 크기 지정
\`\`\`html
<template>
  <Splitter class="flex h-[280px] w-full rounded-xs border border-outline" direction="horizontal">
    <SplitterPanel :default-width="280" :min-width="240" :max-width="400" class="p-4">사이드바</SplitterPanel>
    <SplitterHandle />
    <SplitterPanel class="p-4">메인 영역</SplitterPanel>
  </Splitter>
</template>
\`\`\`

#### 3. 레이아웃 저장
\`\`\`html
<script setup lang="ts">
const autoSaveId = 'my-layout'
const storage = {
  getItem: (key: string) => window.localStorage.getItem(key),
  setItem: (key: string, value: string) => window.localStorage.setItem(key, value),
  deleteItem: (key: string) => window.localStorage.removeItem(key),
}
</script>

<template>
  <Splitter :auto-save-id="autoSaveId" :storage="storage" class="flex h-[260px] w-full rounded-xs border" direction="horizontal">
    <SplitterPanel :default-size="30" collapsible class="p-4" />
    <SplitterHandle />
    <SplitterPanel :default-size="70" class="p-4" />
  </Splitter>
</template>
\`\`\`

`,
      },
    },
  },
  argTypes: {
    direction: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: "패널 배치 방향",
    },
    keyboardResizeBy: {
      control: { type: "number" },
      description: "키보드 화살표로 리사이즈할 때 변경되는 크기(%)",
    },
    layoutDebounce: {
      control: { type: "number" },
      description: "layout 이벤트를 상위로 전달하기 전 대기할 시간(ms)",
    },
    autoSaveId: {
      control: { type: "text" },
      description: "layout을 저장할 때 사용할 고유 ID",
    },
    storage: {
      control: false,
      description: "getItem / setItem 인터페이스를 구현한 커스텀 저장소 객체",
    },
  },
  args: {
    direction: "horizontal" as const,
    keyboardResizeBy: 10,
    layoutDebounce: 500,
  },
} satisfies Meta<typeof Splitter>

export default meta

type Story = StoryObj<typeof meta>

const baseArgs = {
  direction: "horizontal" as const,
  keyboardResizeBy: 10,
  layoutDebounce: 500,
}

const createMemoryStorage = () => {
  const map = new Map<string, string>()
  return {
    getItem(name: string) {
      return map.get(name) ?? null
    },
    setItem(name: string, value: string) {
      map.set(name, value)
    },
    deleteItem(name: string) {
      map.delete(name)
    },
  }
}

const parseLayout = (value: string | null): number[] => {
  if (!value) return []
  try {
    return JSON.parse(value) as number[]
  } catch (error) {
    console.warn("Failed to parse saved layout", error)
    return []
  }
}

export const HorizontalResizing: Story = {
  name: "기본 - 가로 패널",
  args: { ...baseArgs },
  parameters: {
    docs: {
      description: {
        story: "`defaultSize`, `minSize`, `maxSize` 조합으로 좌우 패널 크기를 관리하는 기본 예제입니다.",
      },
    },
  },
  render: (args) => ({
    components,
    setup() {
      const layout = ref<number[]>([40, 60])

      const handleLayout = (value: number[]) => {
        layout.value = value
      }

      return {
        args,
        layout,
        code: `\`\`\`html\n<SplitterPanel :defaultSize="40" :minSize="25" :maxSize="70">\n\`\`\``,
        handleLayout,
      }
    },
    template: `
      <section class="flex w-full p-3 flex-col gap-3">
        <p class="typo-caption text-secondary">
          최소/최대 크기를 제한하면 패널이 주어진 범위 안에서만 드래그 및 키보드 이동됩니다.
        </p>
        <p class="typo-caption text-secondary">
          Splitter는 layout 이벤트로 현재 패널 비율 배열을 전달하며, layoutDebounce (현재 {{ args.layoutDebounce }}ms) 값으로 이벤트 빈도를 제어합니다.
        </p>
        <div class="rounded-xs border border-outline-variant p-4">
          <h4 class="typo-caption">설정값</h4>
          <dl class="mt-2 grid grid-cols-3 gap-3 typo-body">
            <div>
              <dt class="font-semibold text-heading">defaultSize</dt>
              <dd>왼쪽 40% / 오른쪽 60%</dd>
            </div>
            <div>
              <dt class="font-semibold text-heading">minSize</dt>
              <dd>왼쪽 25%, 오른쪽 30%</dd>
            </div>
            <div>
              <dt class="font-semibold text-heading">maxSize</dt>
              <dd>왼쪽 70%, 오른쪽 제한 없음</dd>
            </div>
          </dl>
          <Markdown :content="code" theme="light" class="rounded-xs border border-gray-300" />
        </div>
        <div class="h-[280px] rounded-xs border border-outline bg-surface-primary">
          <Splitter v-bind="args"
                    class="flex h-full w-full rounded-xs"
                    @layout="handleLayout">
            <SplitterPanel :default-size="40"
                           :min-size="25"
                           :max-size="70"
                           class="flex flex-col gap-2 p-4">
              <h3 class="typo-sok-h6-14-700 text-heading">왼쪽 패널</h3>
              <p class="typo-body text-secondary">
                기본 40%, 최소 25%, 최대 70% 범위로 동작합니다.
              </p>
              <p class="typo-caption text-secondary">
                현재 크기: {{ layout.length ? layout[0].toFixed(1) : '측정 중' }}%
              </p>
            </SplitterPanel>
            <SplitterHandle aria-label="패널 너비 조절" />
            <SplitterPanel :default-size="60"
                           :min-size="30"
                           class="flex flex-col gap-2 p-4">
              <h3 class="typo-sok-h6-14-700 text-heading">오른쪽 패널</h3>
              <p class="typo-body text-secondary">
                화살표 키를 사용하면 keyboardResizeBy 값(10%) 단위로 이동합니다.
              </p>
              <p class="typo-caption text-secondary">
                현재 크기: {{ layout.length ? layout[1].toFixed(1) : '측정 중' }}%
              </p>
            </SplitterPanel>
          </Splitter>
        </div>
      </section>
    `,
  }),
}

export const PixelSizedDefaults: Story = {
  name: "픽셀 기반 초기 너비",
  args: { ...baseArgs },
  parameters: {
    docs: {
      description: {
        story:
          "`defaultWidth`, `minWidth`, `maxWidth` 픽셀 값을 전달하면 Splitter가 컨테이너 크기에 맞춰 자동으로 백분율을 계산합니다.",
      },
    },
  },
  render: (args) => ({
    components: { Splitter, SplitterPanel, SplitterHandle, Markdown },
    setup() {
      const layout = ref<number[]>([])
      const containerRef = ref<HTMLElement | null>(null)
      const containerWidth = ref(0)

      let resizeObserver: ResizeObserver | null = null

      const observeContainer = () => {
        if (!containerRef.value || typeof ResizeObserver === "undefined") return

        const element = containerRef.value
        const updateWidth = () => {
          containerWidth.value = element.getBoundingClientRect().width
        }

        updateWidth()

        resizeObserver = new ResizeObserver((entries) => {
          const entry = entries[0]
          if (!entry) return
          containerWidth.value = entry.contentRect.width
        })
        resizeObserver.observe(element)
      }

      onMounted(() => {
        observeContainer()
      })

      onBeforeUnmount(() => {
        resizeObserver?.disconnect()
        resizeObserver = null
      })

      const handleLayout = (value: number[]) => {
        layout.value = value
      }

      const sidebarWidth = computed(() => {
        if (!layout.value.length || !containerWidth.value) return null
        return (layout.value[0] / 100) * containerWidth.value
      })

      const contentWidth = computed(() => {
        if (!layout.value.length || !containerWidth.value) return null
        return (layout.value[1] / 100) * containerWidth.value
      })

      return {
        args,
        layout,
        containerRef,
        containerWidth,
        sidebarWidth,
        contentWidth,
        code: `\`\`\`html\n<SplitterPanel :defaultWidth="280" :minWidth="240" :maxWidth="400">\n\`\`\``,
        handleLayout,
      }
    },
    template: `
      <section class="flex w-full p-3 flex-col gap-3">
        <p class="typo-caption text-secondary">
          픽셀 단위 값을 주면 컨테이너 너비에 따라 자동 변환되는 백분율을 확인할 수 있습니다.
        </p>
        <div class="rounded-xs border border-outline-variant p-4">
          <h4 class="typo-caption">설정값</h4>
          <dl class="mt-2 grid grid-cols-3 gap-3 typo-body">
            <div>
              <dt class="font-semibold text-heading">defaultWidth</dt>
              <dd>왼쪽 280px</dd>
            </div>
            <div>
              <dt class="font-semibold text-heading">minWidth · maxWidth</dt>
              <dd>좌측 240px ~ 400px</dd>
            </div>
            <div>
              <dt class="font-semibold text-heading">컨테이너</dt>
              <dd>{{ containerWidth ? containerWidth.toFixed(0) : '측정 중' }}px</dd>
            </div>
          </dl>
          <Markdown :content="code" theme="light" class="rounded-xs border border-gray-300" />
        </div>
        <div ref="containerRef" class="h-[280px] rounded-xs border border-outline bg-surface-primary">
          <Splitter v-bind="args"
                    class="flex h-full w-full rounded-xs"
                    @layout="handleLayout">
            <SplitterPanel :default-width="280"
                           :min-width="240"
                           :max-width="400"
                           class="flex flex-col gap-2 p-4">
              <h3 class="typo-sok-h6-14-700 text-heading">픽셀 기반 사이드바</h3>
              <p class="typo-body text-secondary">
                defaultWidth를 280px로 제공하면 컨테이너 너비에 맞춰 백분율이 동적으로 계산됩니다.
              </p>
              <p class="typo-caption text-secondary">
                현재 크기: {{ sidebarWidth ? sidebarWidth.toFixed(0) : '측정 중' }}px ({{ layout.length ? layout[0].toFixed(1) : '측정 중' }}%)
              </p>
            </SplitterPanel>
            <SplitterHandle aria-label="패널 너비 조절" />
            <SplitterPanel class="flex flex-col gap-2 p-4">
              <h3 class="typo-sok-h6-14-700 text-heading">콘텐츠</h3>
              <p class="typo-body text-secondary">
                나머지 영역은 자동으로 확장되며, 픽셀 기반 패널과 동일한 방식으로 리사이즈됩니다.
              </p>
              <p class="typo-caption text-secondary">
                현재 크기: {{ contentWidth ? contentWidth.toFixed(0) : '측정 중' }}px ({{ layout.length ? layout[1].toFixed(1) : '측정 중' }}%)
              </p>
            </SplitterPanel>
          </Splitter>
        </div>
      </section>
    `,
  }),
}

export const VerticalStack: Story = {
  name: "기본 - 세로 패널",
  args: { ...baseArgs, direction: "vertical" as const },
  parameters: {
    docs: {
      description: {
        story: "방향을 `vertical`로 지정하면 패널 높이를 조절하는 UI가 됩니다.",
      },
    },
  },
  render: (args) => ({
    components: { Splitter, SplitterPanel, SplitterHandle },
    setup: () => ({ args }),
    template: `
      <section class="flex w-full p-3 max-w-[640px] flex-col gap-3">
        <p class="typo-caption text-secondary">
          세로 방향에서도 동일한 API로 초기 높이와 최소/최대 값을 제어합니다.
        </p>
        <div class="h-[320px] rounded-xs border border-outline bg-surface-primary">
          <Splitter v-bind="args" class="flex h-full w-full flex-col rounded-xs">
            <SplitterPanel :default-size="55"
                           :min-size="35"
                           class="flex flex-col gap-3 p-4">
              <h3 class="typo-sok-h6-14-700 text-heading">헤더 영역</h3>
              <p class="typo-body text-secondary">
                위쪽 패널은 최소 35% 높이까지 유지되고, 나머지 공간을 아래 패널이 사용합니다.
              </p>
            </SplitterPanel>
            <SplitterHandle aria-label="패널 높이 조절" />
            <SplitterPanel :default-size="45"
                           :min-size="25"
                           class="flex flex-col gap-3 p-4">
              <h3 class="typo-sok-h6-14-700 text-heading">세부 내용</h3>
              <p class="typo-body text-secondary">
                방향 변경만으로 동일한 Splitter 구성 요소를 재사용할 수 있습니다.
              </p>
            </SplitterPanel>
          </Splitter>
        </div>
      </section>
    `,
  }),
}

export const CollapsiblePanel: Story = {
  name: "Collapsible 패널",
  args: { ...baseArgs },
  parameters: {
    docs: {
      description: {
        story:
          "`collapsible`와 `collapsedSize` 조합으로 사이드바를 접거나 펼칠 수 있습니다. `SplitterPanel` 인스턴스는 `collapse`, `expand`, `isCollapsed` API를 노출합니다.",
      },
    },
  },
  render: (args) => ({
    components: { Splitter, SplitterPanel, SplitterHandle, VBtn },
    setup() {
      const sidebarRef = ref<any>(null)
      const isCollapsed = computed(() => sidebarRef.value?.isCollapsed?.value ?? false)

      const toggleSidebar = () => {
        if (!sidebarRef.value) return
        if (isCollapsed.value) sidebarRef.value.expand()
        else sidebarRef.value.collapse()
      }

      const collapseSidebar = () => sidebarRef.value?.collapse()
      const expandSidebar = () => sidebarRef.value?.expand()

      return {
        args,
        sidebarRef,
        isCollapsed,
        toggleSidebar,
        collapseSidebar,
        expandSidebar,
      }
    },
    template: `
      <section class="flex w-full p-3 flex-col gap-3">
        <p class="typo-caption text-secondary">
          collapsedSize(8%)까지 축소되며, 버튼이나 키보드/마우스로 동일하게 제어할 수 있습니다.
        </p>
        <div class="flex gap-2">
          <VBtn size="small" variant="secondary" @click="toggleSidebar">
            {{ isCollapsed ? '사이드바 펼치기' : '사이드바 접기' }}
          </VBtn>
          <VBtn size="small" variant="ghost" @click="collapseSidebar">강제 접기</VBtn>
          <VBtn size="small" variant="ghost" @click="expandSidebar">강제 펼치기</VBtn>
        </div>
        <div class="h-[260px] rounded-xs border border-outline bg-surface-primary">
          <Splitter v-bind="args" class="flex h-full w-full rounded-xs">
            <SplitterPanel ref="sidebarRef"
                           collapsible
                           :collapsed-size="8"
                           :default-size="28"
                           :min-size="18"
                           class="flex flex-col gap-2 p-4">
              <template #default="{ isCollapsed }">
                <h3 class="typo-sok-h6-14-700 text-heading">사이드바</h3>
                <p class="typo-body text-secondary">
                  현재 상태: <strong>{{ isCollapsed ? '접힘' : '열림' }}</strong>
                </p>
                <p class="typo-caption text-secondary">
                  패널을 핸들 기준으로 더 줄이면 collapsedSize(8%) 지점에서 자동으로 접힙니다.
                </p>
              </template>
            </SplitterPanel>
            <SplitterHandle aria-label="사이드바 너비 조절" />
            <SplitterPanel :default-size="72"
                           :min-size="40"
                           class="flex flex-col gap-2 p-4">
              <h3 class="typo-sok-h6-14-700 text-heading">콘텐츠</h3>
              <p class="typo-body text-secondary">
                사이드바가 접히면 남은 영역이 모두 확장됩니다.
              </p>
            </SplitterPanel>
          </Splitter>
        </div>
      </section>
    `,
  }),
}

export const PersistentLayout: Story = {
  name: "레이아웃 저장 (autoSaveId)",
  args: { ...baseArgs },
  parameters: {
    docs: {
      description: {
        story:
          "`autoSaveId`와 커스텀 `storage`를 제공하면 패널 배치가 영속 저장됩니다. Storybook에서는 메모리 스토리지를 사용해 동작을 확인합니다.",
      },
    },
  },
  render: (args) => ({
    components: { Splitter, SplitterPanel, SplitterHandle, VBtn },
    setup() {
      const storage = createMemoryStorage()
      const storageKey = "storybook-splitter-persist"
      const initialSaved = storage.getItem(storageKey)
      const savedLayout = ref<string | null>(initialSaved)
      const layout = ref<number[]>(parseLayout(initialSaved))

      const argsWithPersistence = computed(() => ({
        ...args,
        autoSaveId: storageKey,
        storage,
      }))

      const handleLayout = (value: number[]) => {
        layout.value = value
        savedLayout.value = storage.getItem(storageKey)
      }

      const clearSaved = () => {
        storage.deleteItem(storageKey)
        savedLayout.value = storage.getItem(storageKey)
        layout.value = parseLayout(savedLayout.value)
      }

      return {
        argsWithPersistence,
        layout,
        savedLayout,
        handleLayout,
        clearSaved,
      }
    },
    template: `
      <section class="flex w-full p-3 flex-col gap-3">
        <div class="rounded-xs border border-outline bg-surface-primary p-4">
          <p class="typo-body text-secondary">
            저장된 layout: {{ savedLayout ?? '없음' }}
          </p>
          <p class="typo-caption text-secondary mt-2">
            handle을 움직이면 storage.setItem이 호출되어 layout이 저장됩니다.
          </p>
          <VBtn size="small" variant="ghost" class="mt-3" @click="clearSaved">
            저장된 레이아웃 비우기
          </VBtn>
        </div>
        <div class="h-[260px] rounded-xs border border-outline bg-surface-primary">
          <Splitter v-bind="argsWithPersistence"
                    class="flex h-full w-full rounded-xs"
                    @layout="handleLayout">
            <SplitterPanel :default-size="35" :min-size="20" class="flex flex-col gap-2 p-4">
              <h3 class="typo-sok-h6-14-700 text-heading">왼쪽 패널</h3>
              <p class="typo-body text-secondary">
                현재 layout: {{ layout.length ? layout.join(' / ') : '저장 대기' }}
              </p>
            </SplitterPanel>
            <SplitterHandle aria-label="레이아웃 저장 핸들" />
            <SplitterPanel :default-size="65" :min-size="30" class="flex flex-col gap-2 p-4">
              <h3 class="typo-sok-h6-14-700 text-heading">오른쪽 패널</h3>
              <p class="typo-body text-secondary">
                저장된 비율은 autoSaveId를 통해 동일한 컴포넌트가 다시 렌더링될 때 재사용됩니다.
              </p>
            </SplitterPanel>
          </Splitter>
        </div>
      </section>
    `,
  }),
}

export const AccessibilityGuidance: Story = {
  name: "접근성 가이드",
  args: { ...baseArgs },
  parameters: {
    docs: {
      description: {
        story:
          'ARIA `role="separator"`, `aria-orientation`, `aria-valuenow` 등의 속성이 자동으로 설정됩니다. 키보드 조작법은 WAI-ARIA Window Splitter 패턴과 동일합니다. 해당 패턴은 포커스 가능한 분리자와 방향키/Shift+방향키, Home/End, Space/Enter 입력을 정의해 보조기기 사용자에게 예측 가능한 레이아웃 리사이즈 경험을 제공합니다.',
      },
    },
  },
  render: (args) => ({
    components: { Splitter, SplitterPanel, SplitterHandle },
    setup() {
      const instructionsId = "splitter-a11y-instructions"
      const layout = ref<number[]>([])

      const handleLayout = (value: number[]) => {
        layout.value = value
      }

      return {
        args,
        instructionsId,
        layout,
        handleLayout,
      }
    },
    template: `
      <section class="flex w-full p-3 max-w-[680px] flex-col gap-3">
        <p :id="instructionsId"
           class="typo-caption text-secondary">
          Tab 키로 핸들을 포커스한 뒤, 방향키(←/→ 또는 ↑/↓)로 리사이즈하고 Shift를 함께 누르면 keyboardResizeBy 값만큼 이동합니다.
        </p>
        <div class="rounded-xs border border-outline bg-surface-primary p-4">
          <ol class="list-decimal space-y-1 pl-5 typo-body text-secondary">
            <li>SplitterHandle은 role="separator"와 aria-orientation 속성을 자동으로 가집니다.</li>
            <li>aria-valuenow/value-min/value-max는 현재 레이아웃 비율을 반영합니다.</li>
            <li>Space 또는 Enter 키를 누르면 드래그 모드가 시작되어 접근성 지침과 동일하게 동작합니다.</li>
          </ol>
        </div>
        <div class="h-[260px] rounded-xs border border-outline bg-surface-primary">
          <Splitter v-bind="args"
                    class="flex h-full w-full rounded-xs"
                    @layout="handleLayout">
            <SplitterPanel :default-size="50" :min-size="25" class="flex flex-col gap-2 p-4">
              <h3 class="typo-sok-h6-14-700 text-heading">패널 A</h3>
              <p class="typo-body text-secondary">
                현재 레이아웃: {{ layout.length ? layout.join(' / ') : '포커스로 핸들을 이동해 보세요' }}
              </p>
            </SplitterPanel>
            <SplitterHandle :aria-describedby="instructionsId"
                            aria-label="콘텐츠 영역 비율 조절" />
            <SplitterPanel :default-size="50" :min-size="25" class="flex flex-col gap-2 p-4">
              <h3 class="typo-sok-h6-14-700 text-heading">패널 B</h3>
              <p class="typo-body text-secondary">
                핸들을 드래그하거나 방향키로 이동하면 layout 이벤트가 발행됩니다.
              </p>
            </SplitterPanel>
          </Splitter>
        </div>
      </section>
    `,
  }),
}
