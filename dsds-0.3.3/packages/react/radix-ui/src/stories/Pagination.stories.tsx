import type { Meta, StoryObj } from "@storybook/react-vite"

import { Pagination, PaginationContent, PaginationDot, PaginationNumber } from "@/components/ui"

import { hideOnControls } from "./utils"
import { PaginationDemo } from "./views/PaginationDemo"

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  tags: ["autodocs"],
  component: Pagination,
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
    children: hideOnControls,
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Demo: Story = {
  tags: ["!dev"],
  render: () => <PaginationDemo />,
  parameters: {
    docs: {
      description: {
        story: "페이지네이션 데모입니다.",
      },
    },
  },
}

export const Number: Story = {
  args: {
    children: (
      <PaginationContent isDot={false}>
        <PaginationNumber chevron="first" disabled />
        <PaginationNumber chevron="left" disabled />
        <PaginationNumber page={1} isSelected />
        <PaginationNumber page={2} />
        <PaginationNumber page={3} />
        <PaginationNumber page={4} />
        <PaginationNumber page={5} />
        <PaginationNumber chevron="right" />
        <PaginationNumber chevron="last" />
      </PaginationContent>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "숫자 기반 페이지네이션 예시입니다.",
      },
    },
  },
}

export const NumberLarge: Story = {
  name: "Number Large",
  args: {
    children: (
      <PaginationContent isDot={false}>
        <PaginationNumber chevron="first" />
        <PaginationNumber chevron="left" />
        <PaginationNumber page={991} />
        <PaginationNumber page={992} />
        <PaginationNumber page={993} />
        <PaginationNumber page={994} />
        <PaginationNumber page={995} isSelected />
        <PaginationNumber page={996} />
        <PaginationNumber page={997} />
        <PaginationNumber page={998} />
        <PaginationNumber page={999} />
        <PaginationNumber chevron="right" />
        <PaginationNumber chevron="last" disabled />
      </PaginationContent>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "큰 숫자의 페이지네이션 예시입니다.",
      },
    },
  },
}

export const Dot: Story = {
  args: {
    children: (
      <PaginationContent isDot={true}>
        <PaginationDot isSelected />
        <PaginationDot />
        <PaginationDot />
        <PaginationDot />
        <PaginationDot />
      </PaginationContent>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "도트 스타일 페이지네이션 예시입니다.",
      },
    },
  },
}

export const States: Story = {
  args: {
    children: (
      <PaginationContent isDot={false}>
        <PaginationNumber chevron="first" disabled />
        <PaginationNumber chevron="left" disabled />
        <PaginationNumber page={1} />
        <PaginationNumber page={2} isSelected />
        <PaginationNumber page={3} />
        <PaginationNumber page={4} />
        <PaginationNumber page={5} />
        <PaginationNumber page={6} disabled />
        <PaginationNumber page={7} disabled />
        <PaginationNumber chevron="right" />
        <PaginationNumber chevron="last" />
      </PaginationContent>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "다양한 상태(선택됨, 비활성)를 보여주는 페이지네이션 예시입니다.\n선택된 페이지, 비활성 페이지, 비활성 화살표를 모두 확인할 수 있습니다.",
      },
    },
  },
}
