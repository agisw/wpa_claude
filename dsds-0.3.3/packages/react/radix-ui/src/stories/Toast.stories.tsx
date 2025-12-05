import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button, showToast, Toast } from "@/components/ui"

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  tags: ["autodocs"],
  component: Toast,
  parameters: {
    layout: "fullscreen",
    docs: {
      codePanel: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-60 flex-col items-start justify-center gap-4 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-5">
      <Button
        className="w-[100px]"
        onClick={() =>
          showToast({
            title: "타이틀 성공",
            body: "시작일로부터 60일 이내 데이터가 다운로드 되었습니다.",
            link: "/",
            linkText: "Linked Text",
            type: "success",
          })
        }
      >
        Success
      </Button>
      <Toast />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "성공 상태의 토스트 알림 예시입니다.",
      },
    },
  },
}

export const Fail: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-5">
      <Button
        className="w-[100px]"
        variant="danger"
        onClick={() =>
          showToast({
            title: "타이틀 실패",
            body: "시작일로부터 60일 이내 데이터가 다운로드 되었습니다.",
            link: "/",
            linkText: "Linked Text",
            type: "fail",
          })
        }
      >
        Fail
      </Button>
      <Toast />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "실패 상태의 토스트 알림 예시입니다.",
      },
    },
  },
}

export const Warning: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-5">
      <Button
        className="w-[100px]"
        variant="warning"
        onClick={() =>
          showToast({
            title: "타이틀 경고",
            body: "시작일로부터 60일 이내 데이터가 다운로드 되었습니다.",
            link: "/",
            linkText: "Linked Text",
            type: "warning",
          })
        }
      >
        Warning
      </Button>
      <Toast />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "경고 상태의 토스트 알림 예시입니다.",
      },
    },
  },
}

export const Inform: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-5">
      <Button
        className="w-[100px]"
        variant="secondary"
        onClick={() =>
          showToast({
            title: "타이틀 정보",
            body: "시작일로부터 60일 이내 데이터가 다운로드 되었습니다.",
            link: "/",
            linkText: "Linked Text",
            type: "inform",
          })
        }
      >
        Inform
      </Button>
      <Toast />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "정보 상태의 토스트 알림 예시입니다.",
      },
    },
  },
}

export const BodyOnly: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-5">
      <div className="text-muted-foreground text-center text-sm">타이틀 없이 내용만 있는 토스트가 표시됩니다.</div>
      <Toast />
    </div>
  ),
  play: async () => {
    showToast(
      {
        body: "타이틀 없이 내용만 표시되는 토스트 알림입니다.",
        type: "inform",
      },
      { duration: Infinity }
    )
  },
  parameters: {
    docs: {
      description: {
        story: "타이틀 없이 본문 내용만 표시되는 토스트 알림 예시입니다.",
      },
    },
  },
}

export const WithLink: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-5">
      <div className="text-muted-foreground text-center text-sm">링크가 포함된 토스트 알림이 표시됩니다.</div>
      <Toast />
    </div>
  ),
  play: async () => {
    showToast(
      {
        title: "링크 포함 알림",
        body: "자세한 내용은 링크를 클릭하세요.",
        link: "/details",
        linkText: "자세히 보기",
        type: "inform",
      },
      { duration: Infinity }
    )
  },
  parameters: {
    docs: {
      description: {
        story: "링크가 포함된 토스트 알림 예시입니다.",
      },
    },
  },
}

export const WithClickLink: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-5">
      <div className="text-muted-foreground text-center text-sm">
        클릭 가능한 링크가 포함된 토스트 알림이 표시됩니다.
      </div>
      <Toast />
    </div>
  ),
  play: async () => {
    showToast(
      {
        title: "작업 확인",
        body: "이 작업을 진행하시겠습니까?",
        type: "warning",
        linkText: "확인하기",
        onClickLink: () => {
          alert("링크가 클릭되었습니다!")
        },
      },
      { duration: Infinity }
    )
  },
  parameters: {
    docs: {
      description: {
        story: "클릭 콜백이 있는 링크를 포함한 토스트 알림 예시입니다.",
      },
    },
  },
}
