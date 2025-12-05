import type { Meta, StoryObj } from "@storybook/react-vite"

import { DummyIcon } from "@/components/icons"
import { Tag } from "@/components/ui"

import { booleanControl } from "./utils"
import { TagDemo } from "./views/TagDemo"

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  tags: ["autodocs"],
  component: Tag, // 실제 Tag 컴포넌트를 지정하여 JSDoc을 사용하도록 함
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <Story />
      </div>
    ),
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
    icon: {
      control: false,
      description: "태그 앞에 표시할 아이콘 (Decorator에서 제공)",
    },
  },
  args: {
    title: "태그",
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

const defaultArgs = {
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
        story: "모든 태그 변형을 한눈에 볼 수 있는 컴프리헨시브 예시입니다.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {/* 기본 태그들 */}
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-semibold text-gray-700">기본 태그</h4>
        <div className="flex flex-wrap gap-2">
          <Tag title="기본" />
          <Tag title="둥근" round />
          <Tag title="해시태그" hashtag />
          <Tag title="닫기" closeIcon />
          <Tag title="비활성" disabled />
        </div>
      </div>

      {/* 아이콘 포함 태그들 */}
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-semibold text-gray-700">아이콘 포함</h4>
        <div className="flex flex-wrap gap-2">
          <Tag title="아이콘" icon={<DummyIcon />} />
          <Tag title="아이콘+둥근" icon={<DummyIcon />} round />
          <Tag title="아이콘+닫기" icon={<DummyIcon />} closeIcon />
          <Tag title="아이콘+비활성" icon={<DummyIcon />} disabled />
        </div>
      </div>

      {/* 해시태그 변형들 */}
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-semibold text-gray-700">해시태그 변형</h4>
        <div className="flex flex-wrap gap-2">
          <Tag title="해시태그" hashtag />
          <Tag title="해시+둥근" hashtag round />
          <Tag title="해시+닫기" hashtag closeIcon />
          <Tag title="해시+비활성" hashtag disabled />
        </div>
      </div>
    </div>
  ),
}

/**
 * 기본 태그 컴포넌트입니다. 간단한 텍스트 라벨로 콘텐츠를 분류하거나 강조할 때 사용합니다.
 */
export const Default: Story = {
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
  args: {
    ...defaultArgs,
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center justify-center gap-4">
        <Story />
        <div className="text-sm text-gray-500">아이콘은 Decorator에서 제공됩니다</div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "아이콘과 텍스트가 함께 표시되는 태그입니다. 더 풍부한 시각적 정보를 제공합니다.",
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Tag {...args} icon={<DummyIcon />} />
      <Tag {...args} icon={<DummyIcon />} round />
    </div>
  ),
}

/**
 * 해시태그 스타일의 태그입니다. # 기호가 자동으로 추가되어 해시태그처럼 표시됩니다.
 */
export const Hashtag: Story = {
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

export const AllCombinations: Story = {
  tags: ["!dev"],
  parameters: {
    layout: "padded",
  },
  render: () => <TagDemo />,
}
