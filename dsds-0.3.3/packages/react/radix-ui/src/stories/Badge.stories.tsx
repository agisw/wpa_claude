import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "@/components/ui"

import { selectControl, textControl } from "./utils"

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  tags: ["autodocs"],
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  argTypes: {
    kind: {
      control: { type: "select" },
      options: ["notification", "count", "text"],
      description: "배지 종류",
    },
    color: {
      control: { type: "select" },
      options: ["default", "blue"],
      description: "텍스트 배지의 색상 (kind가 'text'일 때만 적용)",
    },
    children: {
      control: { type: "text" },
      description: "표시할 내용 (count와 text에서 사용)",
    },
  },
  args: {
    kind: "notification",
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  tags: ["!dev"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Badge 컴포넌트의 다양한 사용 예시입니다.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {/* 알림 배지들 */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">알림 배지</h3>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">새 알림</span>
            <Badge kind="notification" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">알림 개수</span>
            <Badge kind="count">5</Badge>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">많은 알림</span>
            <Badge kind="count">120</Badge>
          </div>
        </div>
      </div>

      {/* 텍스트 배지들 */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">텍스트 배지</h3>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">기본</span>
            <Badge kind="text">Label</Badge>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">파란색</span>
            <Badge kind="text" color="blue">
              Status
            </Badge>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">긴 텍스트</span>
            <Badge kind="text">Text_Inputplace</Badge>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Notification: Story = {
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
  args: {
    kind: "count",
    children: "32",
  },
  argTypes: {
    children: textControl(),
  },
  parameters: {
    docs: {
      description: {
        story: `알림 개수를 표시하는 배지입니다. 99 이상의 숫자는 99+로 표시되며,
        숫자가 아닌 값은 오류를 발생시킵니다.`,
      },
    },
  },
}

export const Text: Story = {
  args: {
    kind: "text",
    children: "Text_Inputplace",
    color: "default",
  },
  argTypes: {
    children: textControl(),
    color: selectControl(["default", "blue"]),
  },
  parameters: {
    docs: {
      description: {
        story: "텍스트를 표시하는 배지입니다.",
      },
    },
  },
}
