import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { RichTextEditor } from "@/components/ui"
import RichTextEditorSource from "@/components/ui/RichTextEditor.vue?raw"
import VueMarkdown from "vue-markdown-render"
import markdownItHighlightJs from "markdown-it-highlightjs"
import "highlight.js/styles/github.css" // 원하는 테마 선택

const meta: Meta<typeof RichTextEditor> = {
  title: "Advanced/RichTextEditor",
  component: RichTextEditor,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
RichTextEditor 컴포넌트는 TipTap 기반의 강력한 리치 텍스트 에디터입니다.
다양한 서식 옵션과 직관적인 툴바를 제공하며, Vue 3의 양방향 데이터 바인딩을 지원합니다.

### 주요 특징 <features />

#### 기본 기능
- **v-model 지원**: Vue 3 Composition API 완전 지원
- **TypeScript**: 완전한 타입 안전성 제공
- **접근성**: 키보드 네비게이션 및 스크린 리더 지원
- **커스터마이징**: 높이, 플레이스홀더 텍스트 조정 가능

#### 편집기
- **TipTap 기반**: 강력하고 확장 가능한 리치 텍스트 편집기
- **Headless 아키텍처**: TipTap의 Headless 특성을 활용하여 DSDS 표준 디자인으로 완전히 커스터마이징
- **실시간 미리보기**: 입력과 동시에 서식 적용 결과 확인
- **실행 취소/다시 실행**: 편집 히스토리 관리 (Ctrl+Z / Ctrl+Y)

#### 서식 옵션
- **텍스트 서식**: 굵게(B), 기울임(I), 취소선(S), 코드(&lt;/&gt;)
- **제목 스타일**: H1, H2, H3, H4, H5, H6 레벨의 제목 (DSDS 타이포그래피 스케일 적용)
- **목록**: 글머리 기호 목록(•), 번호 목록(1, 2, 3...)
- **인용구**: 블록 인용구 스타일
- **이미지**: 클립보드 이미지 붙여넣기 지원 (Base64 자동 인코딩)

### 디자인 커스터마이징 <customization />

TipTap의 Headless 특성을 활용하여 다음과 같이 DSDS 표준 디자인으로 완전히 커스터마이징되었습니다:

- **색상 시스템**: DSDS 색상 변수 사용 (#1a1a1a, #6b7280 등)
- **타이포그래피**: DSDS 폰트 스케일 적용 (1.75rem → 1rem)
- **컴포넌트 스타일**: VBtn 컴포넌트와 통합된 툴바 디자인
- **레이아웃**: Flexbox 기반 반응형 레이아웃
- **테마 지원**: TailwindCSS 변수 기반 다크모드 지원 가능

### Props <props />

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`modelValue\` | \`string\` | \`""\` | v-model로 바인딩되는 HTML 콘텐츠 값 |
| \`placeholder\` | \`string\` | \`"내용을 입력하세요."\` | 에디터가 비어있을 때 표시할 플레이스홀더 텍스트 |
| \`height\` | \`string \\| number\` | \`"255px"\` | 에디터 컨테이너의 높이 |
| \`class\` | \`string\` | \`undefined\` | 추가 CSS 클래스 |

### 사용 예제 <usages />

#### 기본 사용법
\`\`\`html
<template>
  <RichTextEditor v-model="content" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RichTextEditor from '@/components/ui/RichTextEditor.vue'

const content = ref('')
</script>
\`\`\`

#### 초기 콘텐츠와 함께 사용
\`\`\`html
<template>
  <RichTextEditor
    v-model="content"
    placeholder="공지사항 내용을 입력하세요."
    height="300px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<h1>제목</h1><p>내용을 입력하세요.</p>')
</script>
\`\`\`

#### 폼과 함께 사용
\`\`\`html
<template>
  <form @submit="handleSubmit">
    <FormField label="내용">
      <RichTextEditor
        v-model="formData.content"
        placeholder="상세 내용을 입력하세요."
      />
    </FormField>
    <VBtn type="submit">저장</VBtn>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formData = reactive({
  content: ''
})

const handleSubmit = () => {
  console.log('저장된 콘텐츠:', formData.content)
}
</script>
\`\`\`

#### 다양한 서식 적용
\`\`\`html
<template>
  <RichTextEditor v-model="content" />
</template>

<script setup lang="ts">
const content = ref(\`
  <h1>큰 제목</h1>
  <p>일반 텍스트와 <strong>굵은 텍스트</strong>, <em>기울임 텍스트</em></p>
  <ul>
    <li>목록 항목 1</li>
    <li>목록 항목 2</li>
  </ul>
  <blockquote>인용구 스타일</blockquote>
\`)
</script>
\`\`\`

### 이미지 붙여넣기 <imagepaste />

클립보드에서 이미지를 복사하여 에디터에 붙여넣을 수 있습니다:

1. **이미지 복사**: 웹페이지나 파일에서 이미지 복사 (Ctrl+C)
2. **에디터에 붙여넣기**: RichTextEditor에서 붙여넣기 (Ctrl+V)
3. **자동 처리**: Base64로 인코딩되어 자동 삽입

###  키보드 단축키 <shortcuts />

| 단축키 | 기능 |
|--------|------|
| \`Ctrl+B\` | 굵게 토글 |
| \`Ctrl+I\` | 기울임 토글 |
| \`Ctrl+Shift+X\` | 취소선 토글 |
| \`Ctrl+Shift+\` \` | 코드 토글 |
| \`Ctrl+Shift+7\` | 번호 목록 토글 |
| \`Ctrl+Shift+8\` | 글머리 기호 목록 토글 |
| \`Ctrl+Shift+>\` | 인용구 토글 |
| \`Ctrl+Z\` | 실행 취소 |
| \`Ctrl+Y\` | 다시 실행 |

### 스타일링 <styling />

컴포넌트는 TailwindCSS를 기반으로 스타일링되며, 다음과 같은 특징을 가집니다:

- **반응형 디자인**: 다양한 화면 크기에 적응
- **접근성**: WCAG 2.1 AA 준수
- **일관성**: 디자인 시스템과의 통합
- **커스터마이징**: CSS 변수 및 Tailwind 클래스 활용

### 참고 자료 <references />

- [TipTap 공식 문서](https://tiptap.dev/)
        `,
      },
    },
  },
  argTypes: {
    modelValue: {
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    placeholder: {
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"내용을 입력하세요."' },
      },
    },
    height: {
      control: "text",
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: '"255px"' },
      },
    },
  },
  args: {
    modelValue: "",
    placeholder: "내용을 입력하세요.",
    height: "255px",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "기본",
  args: {
    modelValue: "",
  },
}

export const WithContent: Story = {
  name: "내용 포함",
  args: {
    modelValue:
      "<h1>제목 1</h1><p>이것은 <strong>굵은 텍스트</strong>와 <em>기울임 텍스트</em>입니다.</p><ul><li>목록 항목 1</li><li>목록 항목 2</li></ul>",
  },
}

export const CustomHeight: Story = {
  name: "커스텀 높이",
  args: {
    modelValue: "<p>커스텀 높이의 에디터입니다.</p>",
    height: "400px",
  },
}

export const CustomPlaceholder: Story = {
  name: "커스텀 플레이스홀더",
  args: {
    modelValue: "",
    placeholder: "여기에 내용을 입력해주세요...",
  },
}

const RICH_TEXT_EDITOR_SOURCE_TEMPLATE = `
  <div class="pa-2">
    <h2 class="text-xl font-bold mb-4">실제 구현 코드</h2>
    <p class="mb-4 text-gray-600">
      RichTextEditor 컴포넌트의 실제 구현 코드입니다. TipTap의 Headless 특성을 활용하여 DSDS 표준 디자인으로 완전히 커스터마이징된 모습을 확인할 수 있습니다.
    </p>
    <VueMarkdown :source="sourceCode" :plugins="plugins" />
  </div>
`

export const SourceCode: Story = {
  name: "소스 코드",
  render: () => ({
    components: { VueMarkdown },
    setup() {
      const plugins = [markdownItHighlightJs]
      const sourceCode = `\`\`\`html
${RichTextEditorSource}
\`\`\`
`
      return { sourceCode, plugins }
    },
    template: RICH_TEXT_EDITOR_SOURCE_TEMPLATE,
  }),
  parameters: {
    docs: {
      description: {
        story: "RichTextEditor 컴포넌트의 실제 구현 코드를 확인할 수 있습니다.",
      },
      source: {
        code: RICH_TEXT_EDITOR_SOURCE_TEMPLATE.trim(),
      },
    },
  },
}
