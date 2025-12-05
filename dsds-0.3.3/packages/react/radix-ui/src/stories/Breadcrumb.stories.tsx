import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Breadcrumb,
  BreadcrumbElement,
  BreadcrumbSelect,
  BreadcrumbText,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui"

const dropdownMenu = (
  <DropdownMenuContent>
    <DropdownMenuItem>Menu_01-01</DropdownMenuItem>
    <DropdownMenuItem>Menu_01-02</DropdownMenuItem>
    <DropdownMenuItem>Menu_01-03</DropdownMenuItem>
    <DropdownMenuItem>Menu_01-04</DropdownMenuItem>
  </DropdownMenuContent>
)

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  component: Breadcrumb,
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
    ellipsis: {
      control: { type: "boolean" },
      description: "5개 이상의 요소에서 중간 부분을 생략하여 표시 (items 방식에서만 동작)",
    },
  },
  args: {
    ellipsis: false,
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    items: ["홈", "메뉴1", "메뉴2", "메뉴3", "메뉴4", "메뉴5"],
  },
  parameters: {
    docs: {
      description: {
        story: "기본적인 Breadcrumb 사용 예시입니다.",
      },
    },
  },
}

export const WithSelect: Story = {
  args: {
    children: (
      <>
        <BreadcrumbElement>
          <BreadcrumbText>홈</BreadcrumbText>
        </BreadcrumbElement>
        <BreadcrumbElement>
          <BreadcrumbSelect dropdownMenu={dropdownMenu}>메뉴1</BreadcrumbSelect>
        </BreadcrumbElement>
        <BreadcrumbElement isLast>
          <BreadcrumbText>메뉴2</BreadcrumbText>
        </BreadcrumbElement>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "드롭다운 메뉴가 있는 Breadcrumb 요소를 포함한 예시입니다.",
      },
    },
  },
}

export const WithEllipsis: Story = {
  args: {
    ellipsis: true,
    items: ["홈", "메뉴1", "메뉴2", "메뉴3", "메뉴4", "메뉴5", "메뉴6"],
  },
  parameters: {
    docs: {
      description: {
        story: "5개 이상의 요소에서 중간 부분을 생략하여 표시하는 예시입니다. (items 방식에서만 동작)",
      },
    },
  },
}

export const LongMenuText: Story = {
  name: "Long Menu Text",
  args: {
    children: (
      <>
        <BreadcrumbElement>
          <BreadcrumbText>Menu_01</BreadcrumbText>
        </BreadcrumbElement>
        <BreadcrumbElement>
          <BreadcrumbText>Menu_02</BreadcrumbText>
        </BreadcrumbElement>
        <BreadcrumbElement>
          <BreadcrumbText>Menu_01_Menu_01</BreadcrumbText>
        </BreadcrumbElement>
        <BreadcrumbElement isLast>
          <BreadcrumbText>Menu_00</BreadcrumbText>
        </BreadcrumbElement>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "메뉴 텍스트가 긴 경우의 breadcrumb 예시입니다. 텍스트가 자동으로 생략되고 툴팁이 표시됩니다.",
      },
    },
  },
}

export const SelectedStates: Story = {
  name: "Selected States",
  args: {
    children: (
      <>
        <BreadcrumbElement>
          <BreadcrumbText>홈</BreadcrumbText>
        </BreadcrumbElement>
        <BreadcrumbElement>
          <BreadcrumbText selected>선택된 메뉴</BreadcrumbText>
        </BreadcrumbElement>
        <BreadcrumbElement>
          <BreadcrumbSelect selected dropdownMenu={dropdownMenu}>
            선택된 드롭다운
          </BreadcrumbSelect>
        </BreadcrumbElement>
        <BreadcrumbElement isLast>
          <BreadcrumbText>다음 메뉴</BreadcrumbText>
        </BreadcrumbElement>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "BreadcrumbText와 BreadcrumbSelect의 선택 상태를 보여주는 예시입니다.",
      },
    },
  },
}
