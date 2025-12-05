import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { Markdown } from "@/components/ui"
import { dedent } from "@/lib/utils"

const MARKDOWN_BASIC_TEMPLATE = `<Markdown v-bind="args" />`

const BASIC_CONTENT = dedent(`
  # Markdown 컴포넌트 소개

  **DSDS Markdown** 컴포넌트는 Markdown 문자열을 Vue 컴포넌트 형태로 렌더링합니다.

  - typography와 spacing이 디자인 토큰으로 정의되어 있어 일관된 스타일을 보장합니다.
  - 코드 블록은 내부적으로 DSDS \`CodeBlock\` 컴포넌트를 통해 하이라이트됩니다.
  - 일반 텍스트, 리스트, 인라인 강조 등 Markdown 전반을 지원합니다.
`)

const MARKDOWN_SLOT_TEMPLATE = `
  <Markdown v-bind="args">
    ## Slot 기반 Markdown

    > 기본 슬롯에 문자열을 전달하면 \`content\` prop 없이도 Markdown을 렌더링할 수 있습니다.

    - 외부 CMS나 CMS-less 환경에서 빠르게 마크다운을 작성할 때 유용합니다.
    - \`\\n\` 줄바꿈을 포함한 텍스트를 그대로 사용할 수 있습니다.
  </Markdown>
`

const MARKDOWN_CODE_SAMPLE_TEMPLATE = `
  <Markdown :content="codeContent" theme="dark" />
`

const CODE_SAMPLE_CONTENT = dedent(`
  ### 코드 블록 하이라이트

  > Markdown 컴포넌트는 \`vue-markdown\`과 \`CodeBlock\`을 결합해 스타일이 적용된 코드 출력을 제공합니다.

  \`\`\`ts
  export function greet(name: string) {
    return \`Hello, \${name}\`
  }
  \`\`\`
`)

const MARKDOWN_THEME_COMPARISON_TEMPLATE = `
  <div class="grid gap-6 md:grid-cols-2">
    <section class="rounded-sm border border-neutral-200 bg-surface-primary p-4">
      <h3 class="typo-sok-h6-14-700 mb-3">Dark Theme</h3>
      <Markdown :content="darkContent" theme="dark" />
    </section>
    <section class="rounded-sm border border-neutral-200 bg-surface-secondary p-4">
      <h3 class="typo-sok-h6-14-700 mb-3">Light Theme</h3>
      <Markdown :content="lightContent" theme="light" />
    </section>
  </div>
`

const DARK_THEME_CONTENT = dedent(`
  **Dark 테마**는 Storybook Docs 영역과 동일한 대비를 유지합니다.

  - 배경: surface-primary
  - 텍스트: typo-body / text-body
  - 코드 블록: Night Owl 기반 DSDS 테마
`)

const LIGHT_THEME_CONTENT = dedent(`
  **Light 테마**는 밝은 배경 레이아웃에 적합합니다.

  - 배경: surface-secondary
  - 텍스트: typo-body / text-body
  - 코드 블록: GitHub Plus 테마
`)

const meta: Meta<typeof Markdown> = {
  title: "Advanced/Markdown",
  component: Markdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: `
DSDS Markdown 컴포넌트는 Markdown 문자열과 기본 슬롯 콘텐츠를 디자인 시스템 스타일로 렌더링합니다. vue-markdown을 기반으로 하며, 코드 블록은 DSDS \`CodeBlock\`과 동일한 하이라이팅 테마를 공유합니다.

### 주요 기능 <features />
- \`content\` prop 또는 기본 슬롯을 통한 Markdown 렌더링
- 다크/라이트 테마 토큰 연동 (\`theme\`)
- 인라인 코드 및 코드 블록 하이라이트 자동 적용
- Typography, 리스트, 인용구 등 표준 Markdown 요소 지원
- Storybook Docs와 동일한 스타일이 유지되어 문서에서 재사용 가능

### 사용 시나리오 <usages />
- Storybook에서 컴포넌트 사용 가이드를 Markdown으로 제공할 때
- 실제 제품 화면에서 정책/가이드 문구를 Markdown으로 관리할 때
- CMS 없이도 빠르게 마크다운 기반 컨텐츠를 렌더링해야 할 때

### 팁 <tips />
- 테마에 따라 코드 블록 하이라이트 테마가 자동으로 전환됩니다.
- 기본 슬롯을 활용하면 SFC 내부에서 템플릿 리터럴 없이 Markdown을 작성할 수 있습니다.
- 긴 콘텐츠는 외부에서 dedent 유틸리티를 사용해 개행을 깔끔히 정리하세요.
        `.trim(),
      },
    },
  },
  args: {
    content: BASIC_CONTENT,
    theme: "dark",
  },
  argTypes: {
    content: {
      control: "text",
      description: "렌더링할 Markdown 문자열",
    },
    theme: {
      control: { type: "radio" },
      options: ["dark", "light"],
      description: "코드 블록과 텍스트 대비를 제어하는 테마",
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: "기본",
  parameters: {
    docs: {
      description: {
        story: "\\`content\\` prop으로 전달된 Markdown 문자열을 렌더링하는 가장 단순한 예제입니다.",
      },
      source: {
        code: MARKDOWN_BASIC_TEMPLATE,
      },
    },
  },
  render: (args) => ({
    components: { Markdown },
    setup() {
      return { args }
    },
    template: MARKDOWN_BASIC_TEMPLATE,
  }),
}

export const SlotContent: Story = {
  name: "슬롯 콘텐츠",
  args: {
    theme: "dark",
  },
  parameters: {
    docs: {
      description: {
        story: "기본 슬롯에 Markdown 텍스트를 직접 작성해 prop 없이 렌더링하는 방법입니다.",
      },
      source: {
        code: MARKDOWN_SLOT_TEMPLATE.trim(),
      },
    },
  },
  render: (args) => ({
    components: { Markdown },
    setup() {
      return { args }
    },
    template: MARKDOWN_SLOT_TEMPLATE,
  }),
}

export const CodeSample: Story = {
  name: "코드 하이라이트",
  parameters: {
    docs: {
      description: {
        story: "코드 블록이 DSDS \\`CodeBlock\\` 스타일로 하이라이트되는 예제입니다.",
      },
      source: {
        code: MARKDOWN_CODE_SAMPLE_TEMPLATE.trim(),
      },
    },
  },
  render: () => ({
    components: { Markdown },
    setup() {
      return { codeContent: CODE_SAMPLE_CONTENT }
    },
    template: MARKDOWN_CODE_SAMPLE_TEMPLATE,
  }),
}

export const ThemeComparison: Story = {
  name: "테마 비교",
  parameters: {
    docs: {
      description: {
        story: "dark/light 테마별 대비와 배경 조합을 한 화면에서 비교할 수 있는 예제입니다.",
      },
      source: {
        code: MARKDOWN_THEME_COMPARISON_TEMPLATE.trim(),
      },
    },
  },
  render: () => ({
    components: { Markdown },
    setup() {
      return {
        darkContent: DARK_THEME_CONTENT,
        lightContent: LIGHT_THEME_CONTENT,
      }
    },
    template: MARKDOWN_THEME_COMPARISON_TEMPLATE,
  }),
}
