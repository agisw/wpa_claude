import type { Meta, StoryObj } from "@storybook/vue3-vite"

import { Tag } from "@/components/ui"
import { InformationIcon } from "@/components/icons"
import { booleanControl } from "./utils"

const meta: Meta = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: `

Tag 컴포넌트는 콘텐츠를 분류하거나 강조하기 위한 작은 라벨 컴포넌트입니다.

- **기본 태그**: 간단한 텍스트 라벨
- **아이콘 태그**: 아이콘과 텍스트 조합
- **해시태그**: # 기호가 포함된 태그
- **닫기 버튼**: 제거 가능한 태그
- **둥근 태그**: 완전히 둥근 모양의 태그
- **비활성화 태그**: 회색으로 표시된 비활성 상태

### 사용 방법 <usages />

#### 1. 기본 태그
\`\`\`html
<template>
  <Tag title="기본 태그" />
</template>
\`\`\`

#### 2. 아이콘과 함께
\`\`\`html
<template>
  <Tag title="아이콘 태그">
    <template #icon>
      <StarIcon />
    </template>
  </Tag>
</template>
\`\`\`

#### 3. 해시태그 스타일
\`\`\`html
<template>
  <Tag title="해시태그" :hashtag="true" />
</template>
\`\`\`

#### 4. 닫기 버튼 포함
\`\`\`html
<template>
  <Tag title="닫기 가능" :close-icon="true" @close="handleClose" />
</template>

<script setup>
const handleClose = () => {
  console.log('Tag closed')
}
</script>
\`\`\`

#### 5. 둥근 모양
\`\`\`html
<template>
  <Tag title="둥근 태그" :round="true" />
</template>
\`\`\`

#### 6. 비활성화 상태
\`\`\`html
<template>
  <Tag title="비활성 태그" :disabled="true" />
</template>
\`\`\`

### Props 설명 <props />
- \`title\` (string, required): 태그에 표시될 텍스트
- \`round\` (boolean, optional): 둥근 모양의 태그로 표시할지 여부
- \`hashtag\` (boolean, optional): 해시태그 스타일로 표시할지 여부 (# 기호 추가)
- \`closeIcon\` (boolean, optional): 닫기 버튼을 표시할지 여부
- \`disabled\` (boolean, optional): 비활성화 상태로 표시할지 여부

### Events <events />
- \`close\`: 닫기 버튼 클릭 시 발생하는 이벤트

### Slots <slots />
- \`icon\`: 태그 앞에 표시할 아이콘

### 스타일링 <styling />
DSDS 디자인 시스템의 디자인 토큰을 사용하여 일관된 스타일을 제공합니다. 추가적인 커스터마이징이 필요한 경우 class 속성을 통해 CSS 클래스를 적용할 수 있습니다.
        `,
      },
    },
  },
  decorators: [
    (Story) => ({
      components: { Story },
      template: `
        <div class="flex flex-col items-center justify-center gap-4 p-4">
          <story />
        </div>
      `,
    }),
  ],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "태그에 표시될 텍스트",
    },
    round: booleanControl,
    hashtag: booleanControl,
    closeIcon: booleanControl,
    disabled: booleanControl,
  },
  args: {
    title: "태그",
  },
} satisfies Meta<typeof Tag>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs: Story["args"] = {
  title: "태그",
  round: false,
  hashtag: false,
  closeIcon: false,
  disabled: false,
}

/**
 * 다양한 태그 변형들을 한눈에 비교할 수 있는 데모입니다.
 */
export const AllVariantsDemo: Story = {
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        story: "모든 태그 변형을 한눈에 볼 수 있는 포괄적인 예시입니다.",
      },
    },
  },
  render: () => ({
    components: { Tag, InformationIcon },
    template: `
      <div class="flex flex-col gap-6">
        <!-- 기본 태그들 -->
        <div class="flex flex-col gap-2">
          <h4 class="text-sm font-semibold text-gray-700">기본 태그</h4>
          <div class="flex flex-wrap gap-2">
            <Tag title="기본" />
            <Tag title="둥근" :round="true" />
            <Tag title="해시태그" :hashtag="true" />
            <Tag title="닫기" :close-icon="true" />
            <Tag title="비활성" :disabled="true" />
          </div>
        </div>

        <!-- 아이콘 포함 태그들 -->
        <div class="flex flex-col gap-2">
          <h4 class="text-sm font-semibold text-gray-700">아이콘 포함</h4>
          <div class="flex flex-wrap gap-2">
            <Tag title="아이콘">
              <template #icon>
                <InformationIcon />
              </template>
            </Tag>
            <Tag title="아이콘+둥근" :round="true">
              <template #icon>
                <InformationIcon />
              </template>
            </Tag>
            <Tag title="아이콘+닫기" :close-icon="true">
              <template #icon>
                <InformationIcon />
              </template>
            </Tag>
            <Tag title="아이콘+비활성" :disabled="true">
              <template #icon>
                <InformationIcon />
              </template>
            </Tag>
          </div>
        </div>

        <!-- 해시태그 변형들 -->
        <div class="flex flex-col gap-2">
          <h4 class="text-sm font-semibold text-gray-700">해시태그 변형</h4>
          <div class="flex flex-wrap gap-2">
            <Tag title="해시태그" :hashtag="true" />
            <Tag title="해시+둥근" :hashtag="true" :round="true" />
            <Tag title="해시+닫기" :hashtag="true" :close-icon="true" />
            <Tag title="해시+비활성" :hashtag="true" :disabled="true" />
          </div>
        </div>
      </div>
    `,
  }),
}

/**
 * 기본 태그 컴포넌트입니다. 간단한 텍스트 라벨로 콘텐츠를 분류하거나 강조할 때 사용합니다.
 */
export const Default: Story = {
  name: "기본",
  args: {
    ...defaultArgs,
  },
  parameters: {
    docs: {
      description: {
        story: "가장 기본적인 태그 형태입니다. 텍스트만 포함된 간단한 라벨입니다.",
      },
    },
  },
}

/**
 * 둥근 모양의 태그입니다. 더 부드러운 외관을 위해 완전히 둥근 모양으로 표시됩니다.
 */
export const Round: Story = {
  name: "둥근",
  args: {
    ...defaultArgs,
    round: true,
  },
  parameters: {
    docs: {
      description: {
        story: "완전히 둥근 모양의 태그입니다. 더 부드러운 디자인을 원할 때 사용합니다.",
      },
    },
  },
}

/**
 * 아이콘이 포함된 태그입니다. 시각적 구분을 위해 아이콘과 텍스트를 함께 표시합니다.
 */
export const WithIcon: Story = {
  name: "아이콘",
  args: {
    ...defaultArgs,
  },
  parameters: {
    docs: {
      description: {
        story: "아이콘과 텍스트가 함께 표시되는 태그입니다. 더 풍부한 시각적 정보를 제공합니다.",
      },
    },
  },
  render: (args) => ({
    components: { Tag, InformationIcon },
    setup() {
      return { args }
    },
    template: `
      <div class="flex flex-col gap-2">
        <Tag v-bind="args">
          <template #icon>
            <InformationIcon />
          </template>
        </Tag>
        <Tag v-bind="args" :round="true">
          <template #icon>
            <InformationIcon />
          </template>
        </Tag>
      </div>
    `,
  }),
}

/**
 * 해시태그 스타일의 태그입니다. # 기호가 자동으로 추가되어 해시태그처럼 표시됩니다.
 */
export const Hashtag: Story = {
  name: "해시태그",
  args: {
    ...defaultArgs,
    hashtag: true,
  },
  parameters: {
    docs: {
      description: {
        story: "기호가 포함된 해시태그 스타일 태그입니다. 소셜 미디어 스타일의 태깅에 적합합니다.",
      },
    },
  },
}

/**
 * 닫기 버튼이 포함된 태그입니다. 사용자가 태그를 제거할 수 있는 인터랙티브한 태그입니다.
 */
export const WithCloseIcon: Story = {
  name: "닫기",
  args: {
    ...defaultArgs,
    closeIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: "닫기 버튼이 포함된 태그입니다. 필터나 선택 항목에서 제거할 때 사용합니다.",
      },
    },
  },
}

/**
 * 비활성화된 태그입니다. 회색으로 표시되어 비활성 상태임을 나타냅니다.
 */
export const Disabled: Story = {
  name: "비활성",
  args: {
    ...defaultArgs,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "비활성화된 태그입니다. pointer-events가 none으로 설정되어 클릭할 수 없습니다.",
      },
    },
  },
}
