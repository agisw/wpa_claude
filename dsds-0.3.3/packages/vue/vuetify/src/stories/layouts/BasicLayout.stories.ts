import type { Meta, StoryObj } from "@storybook/vue3-vite"
import BasicLayout from "./_components/BasicLayout.vue"
import BasicLayoutSource from "./_components/BasicLayout.vue?raw"
import { adjustProdImportPaths } from "@/stories/utils"

const meta: Meta<typeof BasicLayout> = {
  title: "Layouts/BasicLayout",
  component: BasicLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      canvas: {
        sourceState: "none",
      },
      codePanel: true,
      description: {
        component: `
DSDS 애플리케이션에서 가장 많이 사용하는 기본 페이지 레이아웃 조합입니다. Header, LNB, 콘텐츠 영역, PageTabs, Footer를 한 화면에서 어떻게 배치하는지 보여줍니다.

### 포함된 구성 요소 <includedComponents />
- **Header**: 글로벌 내비게이션과 유틸리티 영역
- **LNB**: 좌측 탐색 패널
- **PageHeader / PageBody**: 상단 상세 정보와 콘텐츠 컨테이너
- **PageTabs**: 하단 탭 전환 영역
- **Footer**: 공통 푸터 링크

### 활용 가이드 <usageGuide />
- 헤더/푸터/탭 데이터는 props나 상위 스토리에서 주입해 확장할 수 있습니다.
- LNB 선택과 PageTabs 활성 탭을 연동하여 전체 레이아웃 상태를 동기화합니다.
- 디자인 토큰과 Tailwind 유틸리티를 활용해 빠르게 브랜드 스타일을 조정하세요.
        `.trim(),
      },
    },
  },
  argTypes: {
    logo: {
      control: "text",
      description: "헤더 로고 텍스트",
    },
    theme: {
      control: { type: "radio" },
      options: ["light", "dark"],
      description: "헤더 테마",
    },
    fullHeight: {
      table: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Minimal: Story = {
  name: "기본 조합",
  args: {
    logo: "DSDS Console",
    theme: "dark",
  },
  parameters: {
    docs: {
      description: {
        story: "실제 서비스에서 바로 사용할 수 있는 최소 레이아웃 예시입니다.",
      },
      source: {
        code: adjustProdImportPaths(BasicLayoutSource),
      },
    },
  },
  render: (args, { viewMode }) => ({
    components: { BasicLayout },
    setup() {
      const containerClass = viewMode === "docs" ? "min-h-[400px]!" : "h-screen"
      return { args, containerClass }
    },
    template: `
      <BasicLayout v-bind="args" :class="containerClass" />
    `,
  }),
}
