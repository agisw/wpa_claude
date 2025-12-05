import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { computed, ref } from "vue"

import { ScrollableTable, Markdown } from "@/components/ui"
import { booleanControl, rangeControl } from "./utils"
import { generateGpmCheckRows, summarizeGpmRows, type GpmStatus } from "./examples/ehw/faker"

const components = { ScrollableTable, Markdown }

const meta: Meta<typeof ScrollableTable> = {
  title: "Components/ScrollableTable",
  component: ScrollableTable,
  tags: ["autodocs"],
  args: {
    hideFooterLine: false,
  },
  argTypes: {
    hideFooterLine: booleanControl,
    // @ts-ignore
    rowCount: rangeControl(0, 100, "생성할 행 개수"),
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      codePanel: true,
      description: {
        component: `
**ScrollableTable** 컴포넌트는 \`table\` 마크업을 유지하면서 내부에서는 CSS Grid(\`.dsds-table.grid\`) 로 레이아웃을 구성합니다.

- \`class\` 또는 \`style\` 으로 \`grid-template-columns\` 를 지정해야 열 너비가 정해집니다. 예: \`grid-cols-[240px_120px_auto]\`
- 헤더(thead)는 고정되고 본문(tbody)만 스크롤되어 좁은 공간에서도 긴 데이터를 보여줄 수 있습니다.
- 같은 마크업을 \`<table class="dsds-table grid">\` 형태로 사용하면 일반 고정 테이블로 쉽게 전환할 수 있습니다.
- tbody가 없을 때는 기본 슬롯을 이용해 빈 상태 뷰를 구성할 수 있습니다.
  `,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const STATUS_BADGE_STYLE = {
  정상: { backgroundColor: "#D4F1D7", color: "#145C1C" },
  확인필요: { backgroundColor: "#FFE9C8", color: "#80591C" },
  미사용: { backgroundColor: "#E4E9ED", color: "#565E66" },
} satisfies Record<GpmStatus, { backgroundColor: string; color: string }>

const FALLBACK_BADGE_STYLE = STATUS_BADGE_STYLE["미사용"]

function resolveBadgeStyle(status: GpmStatus) {
  return STATUS_BADGE_STYLE[status] ?? FALLBACK_BADGE_STYLE
}

const DEFAULT_EXAMPLE_TPL = `
<div class="flex flex-col w-full p-3 gap-2 overflow-hidden" :class="containerClass">
  <div class="flex flex-col gap-1">
    <h3 class="text-md font-semibold text-gray-900">예제 테이블: <code>grid-cols-[240px_120px_120px_120px_120px_auto]</code></h3>
    <p class="text-caption text-gray-600">
      <code class="rounded bg-gray-100 px-1">ScrollableTable</code>은 헤더를 고정하고 본문만 스크롤합니다.
      (가용 영역은 자동으로 계산됨)
    </p>
  </div>
  <ScrollableTable
    v-bind="args"
    class="w-full grid-cols-[240px_120px_120px_120px_120px_auto]"
  >
    <thead>
      <tr>
        <th>메뉴</th>
        <th>상태</th>
        <th>Reference</th>
        <th>Compare</th>
        <th>Ref Only</th>
        <th>명령</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.menuCode">
        <td class="truncate font-medium text-indigo-600">{{ row.menuName }}</td>
        <td>
          <span
            class="flex min-w-[6rem] justify-center rounded-full px-2 py-0.5! font-semibold"
            :style="resolveBadgeStyle(row.status)"
          >
            {{ row.status }}
          </span>
        </td>
        <td class="text-right tabular-nums">{{ row.referenceCount }}</td>
        <td class="text-right tabular-nums">{{ row.compareCount }}</td>
        <td class="text-right tabular-nums">{{ row.viewCount }}</td>
        <td class="text-gray-700">{{ row.command }}</td>
      </tr>
    </tbody>
  </ScrollableTable>
</div>
`

export const Default: Story = {
  name: "기본 예시",
  args: {
    // @ts-ignore
    rowCount: 50,
  },
  argTypes: {
    // @ts-ignore
    rowCount: rangeControl(0, 100, "생성할 행 개수"),
  },
  parameters: {
    docs: {
      description: {
        story: "EHW GPM 다이얼로그에서 사용하는 구조를 간단히 재현한 예시입니다.",
      },
      source: {
        code: DEFAULT_EXAMPLE_TPL,
      },
    },
  },
  render: (args, context) => ({
    components,
    setup() {
      // @ts-ignore
      const rows = computed(() => generateGpmCheckRows(args.rowCount))
      const summary = computed(() => summarizeGpmRows(rows.value))
      const containerClass = computed(() => (context.viewMode === "docs" ? "max-h-[400px]" : "h-screen"))

      return {
        args,
        rows,
        containerClass,
        summary,
        resolveBadgeStyle,
      }
    },
    template: DEFAULT_EXAMPLE_TPL,
  }),
}

const EMPTY_STATE_EXAMPLE_TPL = `
<div class="flex flex-col w-full p-3 gap-2 overflow-hidden" :class="containerClass">
  <ScrollableTable v-bind="args" class="w-full flex-1 grid-cols-6">
    <thead>
      <tr>
        <th>메뉴</th>
        <th>상태</th>
        <th>Reference</th>
        <th>Compare</th>
        <th>Ref Only</th>
        <th>명령</th>
      </tr>
    </thead>
    <tbody v-if="rows.length">
      <tr v-for="row in rows" :key="row.menuCode">
        <td class="truncate font-medium text-indigo-600">{{ row.menuName }}</td>
        <td class="py-0.5!">
          <span
            class="flex min-w-[6rem] justify-center rounded-full px-2 py-0.5! font-semibold"
            :style="resolveBadgeStyle(row.status)"
          >
            {{ row.status }}
          </span>
        </td>
        <td class="text-right tabular-nums">{{ row.referenceCount }}</td>
        <td class="text-right tabular-nums">{{ row.compareCount }}</td>
        <td class="text-right tabular-nums">{{ row.viewCount }}</td>
        <td class="text-gray-700">{{ row.command }}</td>
      </tr>
    </tbody>
    <template #empty>
      <td class="flex flex-1 flex-col items-center justify-center gap-1 py-10 text-center">
        <p class="text-sm text-gray-600">표시할 데이터가 없습니다.</p>
        <p class="text-xs text-gray-500">검색 조건을 조정하거나 새로운 항목을 추가해 주세요.</p>
      </td>
    </template>
  </ScrollableTable>
</div>
`

export const EmptyState: Story = {
  name: "빈 상태",
  args: {
    // @ts-ignore
    rowCount: 0,
  },
  argTypes: {
    // @ts-ignore
    rowCount: rangeControl(0, 100, "생성할 행 개수"),
  },
  parameters: {
    docs: {
      source: {
        code: EMPTY_STATE_EXAMPLE_TPL,
      },
      description: {
        story: "새로 추가된 `#empty` 슬롯을 활용해 데이터가 없을 때의 뷰를 구성하는 예시입니다.",
      },
    },
  },
  render: (args, context) => ({
    components,
    setup() {
      // @ts-ignore
      const rows = computed(() => generateGpmCheckRows(args.rowCount))
      const containerClass = computed(() => (context.viewMode === "docs" ? "max-h-[400px]" : "h-screen"))

      return { args, rows, containerClass, resolveBadgeStyle }
    },
    template: EMPTY_STATE_EXAMPLE_TPL,
  }),
}

const STATIC_TABLE_COMPARISON_TPL = `
<div class="grid gap-6 md:grid-cols-2 p-3">
  <section class="rounded-sm border border-outer bg-surface p-4">
    <h4 class="mb-2 text-sm font-semibold text-gray-900">ScrollableTable (스크롤 가능)</h4>
    <Markdown class="typo-caption mb-3">
      \`grid-cols-[...]\` 클래스로 열 너비를 지정합니다.
    </Markdown>
    <div class="max-h-60 overflow-hidden">
      <ScrollableTable
        v-bind="args"
        class="w-full grid-cols-[200px_110px_110px_110px_110px_minmax(120px,1fr)]"
        header-class="bg-gray-50"
        body-wrapper-class="bg-white"
      >
        <thead>
          <tr>
            <th>메뉴</th>
            <th>상태</th>
            <th>Reference</th>
            <th>Compare</th>
            <th>Ref Only</th>
            <th>명령</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.menuCode">
            <td class="truncate text-indigo-600">{{ row.menuName }}</td>
            <td>{{ row.status }}</td>
            <td class="text-right">{{ row.referenceCount }}</td>
            <td class="text-right">{{ row.compareCount }}</td>
            <td class="text-right">{{ row.viewCount }}</td>
            <td>{{ row.command }}</td>
          </tr>
        </tbody>
      </ScrollableTable>
    </div>
  </section>
  <section class="rounded-sm border border-outer bg-surface p-4">
    <h4 class="mb-2 text-sm font-semibold text-gray-900">일반 테이블 (고정)</h4>
    <Markdown class="typo-caption mb-3">
      \`ScrollableTable\` 컴포넌트를 제거하고 동일한 \`table\` 마크업을 사용하면 스크롤 없이 렌더링됩니다."
    </Markdown>
    <div class="overflow-auto scrollbar-thin">
      <table class="dsds-table grid w-full grid-cols-[200px_110px_110px_110px_110px_minmax(120px,1fr)]">
        <thead>
          <tr>
            <th>메뉴</th>
            <th>상태</th>
            <th>Reference</th>
            <th>Compare</th>
            <th>Ref Only</th>
            <th>명령</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.menuCode">
            <td class="truncate text-indigo-600">{{ row.menuName }}</td>
            <td>{{ row.status }}</td>
            <td class="text-right">{{ row.referenceCount }}</td>
            <td class="text-right">{{ row.compareCount }}</td>
            <td class="text-right">{{ row.viewCount }}</td>
            <td>{{ row.command }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</div>
`

export const StaticTableComparison: Story = {
  name: "정적 테이블 변환",
  args: {
    // @ts-ignore
    rowCount: 50,
  },
  argTypes: {
    // @ts-ignore
    rowCount: rangeControl(0, 100, "생성할 행 개수"),
  },
  parameters: {
    docs: {
      source: {
        code: STATIC_TABLE_COMPARISON_TPL,
      },
      description: {
        story:
          '동일한 마크업을 \`<table class="dsds-table grid"\`> 로 사용해 스크롤 없는 고정 테이블로 렌더링하는 모습입니다.',
      },
    },
  },
  render: (args) => ({
    components,
    setup() {
      // @ts-ignore
      const rows = ref(generateGpmCheckRows(args.rowCount))
      return {
        args,
        rows,
      }
    },
    template: STATIC_TABLE_COMPARISON_TPL,
  }),
}
