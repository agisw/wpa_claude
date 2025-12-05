import type { Meta, StoryObj } from "@storybook/vue3-vite"

import { VRating } from "@/components/ui"

const meta = {
  title: "Components/Rating",
  component: VRating,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `DSDS 스타일이 적용된 평가(별점) 컴포넌트입니다. Vuetify의 VRating을 래핑하여 일관된 색상과 크기 규칙을 제공합니다.`,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
      description: "아이콘 크기",
    },
    modelValue: {
      control: { type: "number" },
      description: "현재 선택된 값",
    },
    length: {
      control: { type: "number" },
      description: "아이콘 개수",
    },
    hover: {
      control: { type: "boolean" },
      description: "호버 미리보기 활성화",
    },
    clearable: {
      control: { type: "boolean" },
      description: "같은 값을 다시 선택해 0점으로 초기화",
    },
    halfIncrements: {
      control: { type: "boolean" },
      description: "0.5 단위 선택 허용",
    },
  },
} satisfies Meta<typeof VRating>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  name: "기본 사용법",
  args: {
    modelValue: 3,
    length: 5,
    size: "medium",
    hover: true,
    clearable: true,
  },
  render: (args) => ({
    components: { VRatings: VRating },
    setup() {
      return { args }
    },
    template: `<VRatings v-bind="args" @update:modelValue="(value) => (args.modelValue = value)" />`,
  }),
  parameters: {
    docs: {
      description: {
        story: "기본 별점 컴포넌트입니다. 아이콘을 눌러 값을 조절해보세요.",
      },
    },
  },
}

export const Sizes: Story = {
  name: "크기 비교",
  args: {
    length: 5,
    hover: true,
  },
  render: (args) => ({
    components: { VRatings: VRating },
    setup() {
      return { args }
    },
    template: `
      <div class="grid grid-cols-[200px_1fr] gap-y-3 items-center">
        <strong class="text-sm text-left">작은 크기</strong>
        <VRatings v-bind="args" size="small" :model-value="2" />
        <strong class="text-sm text-left">중간 크기 (기본)</strong>
        <VRatings v-bind="args" size="medium" :model-value="3" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "작은 크기와 기본 크기를 나란히 비교할 수 있는 예시입니다.",
      },
    },
  },
}

export const HoverPreview: Story = {
  name: "호버 미리보기",
  args: {
    modelValue: 2,
    length: 5,
    size: "medium",
    hover: true,
  },
  render: (args) => ({
    components: { VRatings: VRating },
    setup() {
      return { args }
    },
    template: `
      <div class="flex flex-col gap-4 text-left">
        <p class="text-sm text-neutral-500">
          <code>hover</code> prop을 사용하면 마우스를 올린 아이콘까지 채워져 미리보기가 표시됩니다.
        </p>
        <VRatings
          v-bind="args"
          @update:modelValue="(value) => (args.modelValue = value)"
        />
        <p class="text-xs text-neutral-500">현재 값: {{ args.modelValue }}</p>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "마우스를 이동하며 아이콘 채워짐 효과를 직접 확인해보세요.",
      },
    },
  },
}
