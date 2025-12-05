import type { Meta, StoryObj } from "@storybook/vue3-vite"

import Badge from "@/components/ui/Badge.vue"
import { selectControl, textControl } from "./utils"

const meta: Meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    kind: selectControl(["notification", "count", "text"]),
    color: selectControl(["default", "blue"]),
  },
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: `

Badge 컴포넌트는 알림, 개수 표시, 텍스트 라벨링 등 다양한 목적으로 사용할 수 있는
유연한 배지 컴포넌트입니다. \`kind\` prop을 통해 다음과 같은 유형을 지원합니다:

- \`notification\`: 새로운 알림이나 업데이트를 표시하는 배지 (아이콘 포함)
- \`count\`: 숫자나 텍스트를 표시하는 원형 배지 (알림 개수 등에 사용)
  -  99보다 클 경우 "99+"로 표시됩니다.
- \`text\`: 텍스트 라벨을 표시하는 직사각형 배지 (상태 표시 등에 사용)

### 사용 방법 <usage />

#### 1. 알림 배지
\`\`\`html
<template>
  <Badge kind="notification" />
</template>

<script setup>
import { Badge } from '@/components/ui'
</script>
\`\`\`

#### 2. 개수 표시 배지
\`\`\`html
<template>
  <Badge kind="count">5</Badge>
  <Badge kind="count">30</Badge>
  <!-- 99보다 클 경우 \`99+\` 로 표시됨  -->
  <Badge kind="count">300</Badge>
</template>

<script setup>
import { Badge } from '@/components/ui'
</script>
\`\`\`

#### 3. 텍스트 배지
\`\`\`html
<template>
  <Badge kind="text">Label</Badge>
  <Badge kind="text" color="blue">Status</Badge>
</template>

<script setup>
import { Badge } from '@/components/ui'
</script>
\`\`\`

### Props 설명 <props />
- \`kind\` (string, required): 배지 종류 - 'notification', 'count', 'text'
- \`color\` (string, optional): 텍스트 배지의 색상 - 'default', 'blue' (kind가 'text'일 때만 적용)

### 스타일링 <styling />
DSDS 디자인 시스템의 디자인 토큰을 사용하여 일관된 스타일을 제공합니다. 추가적인 커스터마이징이 필요한 경우 class 속성을 통해 CSS 클래스를 적용할 수 있습니다.
        `,
      },
    },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs: Story["args"] = {
  kind: "notification",
}

const BADGE_OVERVIEW_TEMPLATE = `
  <div class="flex flex-col gap-8">
    <!-- 알림 배지들 -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold">알림 배지</h3>
      <div class="flex items-center gap-4">
        <div class="flex flex-col items-center gap-2">
          <span class="text-sm text-gray-600">새 알림</span>
          <Badge kind="notification" />
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-sm text-gray-600">알림 개수</span>
          <Badge kind="count">5</Badge>
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-sm text-gray-600">많은 알림</span>
          <Badge kind="count">120</Badge>
        </div>
      </div>
    </div>

    <!-- 텍스트 배지들 -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold">텍스트 배지</h3>
      <div class="flex items-center gap-4">
        <div class="flex flex-col items-center gap-2">
          <span class="text-sm text-gray-600">기본</span>
          <Badge kind="text">Label</Badge>
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-sm text-gray-600">파란색</span>
          <Badge kind="text" color="blue">Status</Badge>
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-sm text-gray-600">긴 텍스트</span>
          <Badge kind="text">Text_Inputplace</Badge>
        </div>
      </div>
    </div>
  </div>
`

const BADGE_COUNT_TEMPLATE = `
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <span class="text-sm text-gray-600">일반 개수</span>
        <Badge kind="count">32</Badge>
      </div>
      <div class="flex flex-col items-center gap-2">
        <span class="text-sm text-gray-600">99+ 표시</span>
        <Badge kind="count">150</Badge>
      </div>
    </div>
    <div class="text-sm text-gray-600 mt-4">
      <strong>참고:</strong> count 배지는 숫자만 허용하며, 99 이상은 99+로 표시됩니다.
    </div>
  </div>
`

const BADGE_TEXT_TEMPLATE = '<Badge kind="text" color="default">Text_Inputplace</Badge>'

/**
 * 기본 Badge 컴포넌트입니다. DSDS 표준 스타일을 적용합니다.
 */
export const Default: Story = {
  name: "기본",
  args: {
    ...defaultArgs,
  },
  parameters: {
    docs: {
      description: {
        story: "기본 Badge 컴포넌트입니다.",
      },
    },
  },
}

export const Overview: Story = {
  name: "개요",
  tags: ["!dev"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Badge 컴포넌트의 다양한 사용 예시입니다.",
      },
      source: {
        code: BADGE_OVERVIEW_TEMPLATE.trim(),
      },
    },
  },
  render: () => ({
    components: { Badge },
    template: BADGE_OVERVIEW_TEMPLATE,
  }),
}

export const Notification: Story = {
  name: "알림",
  args: {
    kind: "notification",
  },
  parameters: {
    docs: {
      description: {
        story: "새로운 알림을 표시하는 배지입니다.",
      },
    },
  },
}

export const Count: Story = {
  name: "개수",
  parameters: {
    docs: {
      description: {
        story: "알림 개수를 표시하는 배지입니다. 99 이상의 숫자는 99+로 표시됩니다.",
      },
      source: {
        code: BADGE_COUNT_TEMPLATE.trim(),
      },
    },
  },
  render: () => ({
    components: { Badge },
    template: BADGE_COUNT_TEMPLATE,
  }),
}

export const Text: Story = {
  name: "텍스트",
  parameters: {
    docs: {
      description: {
        story: "텍스트를 표시하는 배지입니다.",
      },
      source: {
        code: BADGE_TEXT_TEMPLATE,
      },
    },
  },
  render: () => ({
    components: { Badge },
    template: BADGE_TEXT_TEMPLATE,
  }),
}
