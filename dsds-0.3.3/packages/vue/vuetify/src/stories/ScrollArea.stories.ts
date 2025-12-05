import type { Meta, StoryObj } from "@storybook/vue3-vite"

import { ScrollArea, VBtn, VCheckbox } from "@/components/ui"
import { pad } from "@/lib/utils"

const components = { ScrollArea, VBtn, VCheckbox }

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      codePanel: true,
      description: {
        component: `
DSDS ScrollArea 컴포넌트는 긴 콘텐츠를 **커스텀 스크롤바**와 함께 표시하는 레이아웃 래퍼입니다. 가로/세로 방향을 모두 지원하며,
플로팅 형태의 스크롤바로 콘텐츠 영역을 침범하지 않고 사용자에게 스크롤 힌트를 제공합니다.

### 주요 기능 <features />
- 수직/수평 스크롤 모두 지원 (\`horizontal\`)
- 지연 시간을 제어할 수 있는 플로팅 스크롤바 (\`scrollHideDelay\`)
- 디자인 토큰 기반 스타일과 Tailwind 유틸리티 클래스 호환
- 스크롤 영역과 컨테이너 역할을 분리하여 접근성 확보

### 사용 시나리오 <usages />
- 텍스트나 리스트 같이 높이가 긴 콘텐츠를 제한된 공간에 표시할 때
- 데이터 테이블/그리드의 가로 스크롤 처리
- 사이드 패널, 모달 등의 내부 스크롤 영역 구현

### 구성 요소 <composition />
- \`ScrollArea\`: 스크롤 컨테이너를 제공하는 래퍼
- 내부 슬롯 콘텐츠: 실제 스크롤 대상이 되는 DOM 구조
        `.trim(),
      },
    },
  },
  argTypes: {
    class: {
      control: "text",
      description: "추가 CSS 클래스",
    },
    horizontal: {
      control: "boolean",
      description: "수평 스크롤바 표시 여부",
    },
    scrollHideDelay: {
      control: "number",
      description: "스크롤바 숨김 지연 시간 (ms)",
    },
  },
  decorators: [
    (Story) => ({
      components: { Story },
      template: `
        <div class="flex h-[500px] items-center justify-center p-8">
          <story />
        </div>
      `,
    }),
  ],
} satisfies Meta<typeof ScrollArea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "기본",
  args: {
    class: "h-[200px] w-[350px] rounded-xs bg-surface-primary",
    scrollHideDelay: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "기본 ScrollArea 컴포넌트입니다. 긴 텍스트 내용을 스크롤하여 볼 수 있습니다.",
      },
    },
  },
  render: (args) => ({
    components,
    setup: () => ({ args }),
    template: `
      <ScrollArea v-bind="args">
        <div class="space-y-4">
          <h3 class="typo-sok-h6-14-700 text-heading">샘플 텍스트 콘텐츠</h3>
          <div class="typo-body text-body text-justify leading-relaxed hyphens-auto">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
              eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>
          </div>
        </div>
      </ScrollArea>
    `,
  }),
}

export const HorizontalScroll: Story = {
  name: "수평 스크롤",
  args: {
    horizontal: true,
    class: "w-[400px] h-[300px] rounded-xs bg-surface-primary",
    scrollHideDelay: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "가로 스크롤 예제입니다. 넓은 테이블 형태의 콘텐츠를 가로로 스크롤할 수 있습니다.",
      },
    },
  },
  render: (args) => ({
    components,
    setup: () => ({ args, pad }),
    template: `
      <ScrollArea v-bind="args">
        <div class="space-y-4">
          <div class="p-4">
            <h3 class="typo-sok-h6-14-700 text-heading mb-2">Horizontal Scroll Demo</h3>
            <p class="typo-body text-body mb-4">This demonstrates horizontal scrolling with a wide content area.</p>
          </div>

          <div class="w-[800px] space-y-2 p-4">
            <div class="flex gap-4 border-b pb-2 font-semibold">
              <div class="w-[100px]">Name</div>
              <div class="w-[150px]">Email</div>
              <div class="w-[120px]">Department</div>
              <div class="w-[100px]">Role</div>
              <div class="w-[120px]">Start Date</div>
              <div class="w-[100px]">Status</div>
              <div class="w-[100px]">Actions</div>
            </div>

            <div v-for="index in 15"
                 :key="index"
                 class="flex gap-4 border-b border-gray-100 py-2">
              <div class="typo-body w-[100px]">User {{ index }}</div>
              <div class="typo-body w-[150px]">user{{ index }}@example.com</div>
              <div class="typo-body w-[120px]">Engineering</div>
              <div class="typo-body w-[100px]">Developer</div>
              <div class="typo-body w-[120px]">2025-01-{{ pad(index, 2) }}</div>
              <div class="w-[100px]">
                <span class="typo-caption rounded-xs bg-green-100 px-2 py-1 text-green-800">Active</span>
              </div>
              <div class="w-[100px]">
                <VBtn variant="ghostLink"
                      size="small">
                  Edit
                </VBtn>
              </div>
            </div>
          </div>

          <div class="w-[800px] rounded-xs border border-blue-200 bg-blue-50 p-4">
            <p class="typo-body text-body">
              The horizontal scrollbar appears at the bottom when content exceeds the container width. Just like the vertical scrollbar,
              it floats above the content without taking up space.
            </p>
          </div>
        </div>
      </ScrollArea>
    `,
  }),
}

export const ListContent: Story = {
  name: "목록 콘텐츠",
  args: {
    class: "h-[300px] w-[350px] rounded-xs bg-surface-primary",
    scrollHideDelay: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "여러 리스트 아이템을 스크롤하여 표시하는 예제입니다.",
      },
    },
  },
  render: (args) => ({
    components,
    setup: () => ({ args }),
    template: `
      <ScrollArea v-bind="args">
        <div>
          <h3 class="typo-sok-h6-14-700 text-heading p-2">목록 아이템</h3>
          <ul class="space-y-1">
            <li v-for="index in 50"
                :key="index"
                class="hover:bg-hover-bg gap-sm flex cursor-pointer flex-col rounded-xs p-2">
              <div class="typo-body text-primary font-bold">아이템 {{ index }}</div>
              <div class="typo-caption text-secondary">아이템 {{ index }}에 대한 설명</div>
            </li>
          </ul>
        </div>
      </ScrollArea>
    `,
  }),
}

export const Compact: Story = {
  name: "소형",
  args: {
    class: "h-[150px] w-[250px] rounded-xs bg-surface-primary",
    scrollHideDelay: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "작은 크기의 ScrollArea 예제입니다.",
      },
    },
  },
  render: (args) => ({
    components,
    setup: () => ({ args }),
    template: `
      <ScrollArea v-bind="args">
        <div>
          <h3 class="typo-sok-h6-14-700 text-heading p-2">목록 아이템</h3>
          <ul class="space-y-1">
            <li v-for="index in 25"
                :key="index"
                class="hover:bg-hover-bg gap-sm flex cursor-pointer flex-col rounded-xs p-2">
              <div class="typo-body text-primary">항목 {{ index }}</div>
            </li>
          </ul>
        </div>
      </ScrollArea>
    `,
  }),
}

export const FloatingScrollbarDemo: Story = {
  name: "플로팅 스크롤바 데모",
  args: {
    class: "h-[300px] w-[350px] rounded-xs bg-surface-primary",
    scrollHideDelay: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Floating scrollbar의 특성을 보여주는 데모입니다. 스크롤바가 콘텐츠 영역을 차지하지 않고 overlay 형태로 표시되는 것을 확인할 수 있습니다.",
      },
    },
  },
  render: (args) => ({
    components,
    setup: () => ({ args }),
    template: `
      <ScrollArea v-bind="args">
        <div class="space-y-4">
          <div class="rounded-xs border border-blue-200 bg-blue-50 p-4">
            <h3 class="typo-sok-h6-14-700 text-heading mb-2">플로팅 스크롤바 데모</h3>
            <p class="typo-body text-body mb-4 text-justify">
              스크롤 막대가 오버레이로 나타나 콘텐츠 공간을 차지하지 않는 점을 확인하세요. 이 텍스트는 컨테이너의 가장자리까지 확장되어
              스크롤 막대가 사용 가능한 너비를 줄이지 않고 콘텐츠 위에 떠 있는 것을 보여줍니다.
            </p>
          </div>

          <div class="rounded-xs border border-yellow-200 bg-yellow-50 p-4">
            <h4 class="typo-sok-h6-14-700 text-heading mb-2">네이티브 스크롤바와 사용자 정의 스크롤바 비교</h4>
            <p class="typo-body text-body text-justify">
              콘텐츠 너비를 줄이는 네이티브 스크롤바와 비교해 보세요. 이 사용자 정의 스크롤바는 모든 플랫폼에서 부드러운 스크롤 경험을 제공하면서 전체 너비를 유지합니다.
              스크롤바는 호버링하거나 적극적으로 스크롤할 때만 나타납니다.
            </p>
          </div>

          <div class="space-y-2">
            <div v-for="index in 20"
                 :key="index"
                 class="gap-sm flex flex-col rounded-xs border bg-gray-50 p-3">
              <div class="typo-body text-primary">Item {{ index }} - 컨테이너의 전체 너비로 확장됩니다.</div>
              <div class="typo-caption text-secondary">플로팅 스크롤바는 사용 가능한 공간을 줄이지 않습니다.</div>
            </div>
          </div>
        </div>
      </ScrollArea>
    `,
  }),
}

export const MixedContent: Story = {
  name: "혼합 콘텐츠",
  args: {
    class: "h-[350px] w-[400px] rounded-xs bg-surface-primary",
    scrollHideDelay: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "텍스트, 리스트, 인터랙티브 요소가 혼합된 복잡한 내용을 스크롤하여 표시하는 예제입니다.",
      },
    },
  },
  render: (args) => ({
    components,
    setup: () => ({ args }),
    template: `
      <ScrollArea v-bind="args">
        <div class="space-y-6">
          <div class="p-4">
            <h2 class="typo-sok-h5-16-700 text-heading mb-4">혼합 콘텐츠 데모</h2>
            <div class="typo-body text-body mb-6 leading-relaxed">
              다양한 콘텐츠 유형이 포함된 ScrollArea 예제입니다.
            </div>
          </div>

          <div class="border-l-accent bg-surface-secondary p-4">
            <h3 class="typo-sok-h6-14-700 text-accent mb-2">정보</h3>
            <p class="typo-body text-body">스크롤 가능한 콘텐츠 내부의 정보 섹션입니다.</p>
          </div>

          <div class="px-4">
            <h3 class="typo-sok-h6-14-700 text-heading mb-3">목록</h3>
            <ul class="space-y-2">
              <li v-for="index in 10"
                  :key="index"
                  class="hover:bg-hover-bg flex items-center gap-3 rounded-xs p-2">
                <VCheckbox :model-value="index % 3 === 0"
                           :readonly="true" />
                <span class="typo-body text-primary flex-1">항목 {{ index }}</span>
                <VBtn variant="ghostLink"
                      size="small">
                  편집
                </VBtn>
              </li>
            </ul>
          </div>
        </div>
      </ScrollArea>
    `,
  }),
}
