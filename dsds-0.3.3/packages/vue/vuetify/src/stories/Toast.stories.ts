import type { Meta, StoryObj } from "@storybook/vue3-vite"

import { VBtn, Toast, showToast } from "@/components/ui"

const components = { VBtn, Toast }

const meta = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: `
DSDS Toast 컴포넌트는 알림 메시지를 **레이어 형태로** 표시하는 UI입니다. Radix UI 패턴을 기반으로 Vue에 맞게 래핑했으며,
디자인 토큰과 애니메이션 규칙을 그대로 적용해 일관된 브랜드 경험을 제공합니다.

### 주요 기능 <features />
- 상단/하단 + 좌/우/센터를 아우르는 6가지 위치 (\`position\`)
- 동시에 표시할 토스트 수와 간격 제어 (\`visibleToasts\`, \`gap\`)
- 토스트 확장 모드와 자동 숨김 시간 설정 (\`expand\`, \`duration\`)
- 버튼 클릭으로 호출 가능한 \`showToast\` 헬퍼 제공
- React 구현과 동일한 Look & Feel 재현

### 사용 시나리오 <usages />
- 폼 제출, 저장, 삭제 등 결과 알림
- 시스템 오류/경고와 같이 즉각적인 피드백 필요 시
- 링크나 CTA가 포함된 인라인 공지 전달

### 접근성 <accessibility />
- 라이브 영역 속성을 활용해 스크린리더 대응
- 포커스 트랩 없이도 키보드 접근이 가능하도록 설계
        `.trim(),
      },
    },
  },
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["top-left", "top-right", "bottom-left", "bottom-right", "top-center", "bottom-center"],
      description: "토스트의 위치",
    },
    expand: {
      control: { type: "boolean" },
      description: "토스트 확장 여부",
    },
    duration: {
      control: { type: "number" },
      description: "토스트 표시 시간 (ms)",
    },
    visibleToasts: {
      control: { type: "number" },
      description: "동시에 표시할 수 있는 최대 토스트 수",
    },
    gap: {
      control: { type: "number" },
      description: "토스트 간 간격",
    },
    offset: {
      control: { type: "text" },
      description: "토스트 오프셋",
    },
  },
} satisfies Meta<typeof Toast>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs: Story["args"] = {
  position: "top-right",
  expand: true,
  duration: 2000,
  visibleToasts: 4,
  gap: 12,
  offset: "20px",
}

/**
 * 기본 토스트 타입들입니다.
 */
export const Default: Story = {
  name: "기본",
  args: {
    ...defaultArgs,
  },
  render: () => ({
    components,
    setup() {
      const showSuccessToast = () => {
        showToast("데이터가 성공적으로 저장되었습니다.", {
          type: "success",
          title: "작업 완료",
          link: "https://example.com",
        })
      }

      const showErrorToast = () => {
        showToast("데이터 저장 중 오류가 발생했습니다.", {
          type: "fail",
          title: "작업 실패",
        })
      }

      const showWarningToast = () => {
        showToast("일부 데이터가 누락되었습니다.", {
          type: "warning",
          title: "주의 필요",
        })
      }

      const showInfoToast = () => {
        showToast("새로운 업데이트가 있습니다.", {
          type: "inform",
          title: "알림",
          link: "https://example.com/updates",
        })
      }

      return {
        showSuccessToast,
        showErrorToast,
        showWarningToast,
        showInfoToast,
      }
    },
    template: `
      <div class="w-full h-full">
        <Toast v-bind="args" />
        <div class="flex flex-col gap-4">
          <VBtn @click="showSuccessToast">성공 토스트</VBtn>
          <VBtn @click="showErrorToast" variant="danger">오류 토스트</VBtn>
          <VBtn @click="showWarningToast" variant="warning">경고 토스트</VBtn>
          <VBtn @click="showInfoToast" variant="secondary">정보 토스트</Vbtn>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "커스텀 토스트 예시입니다. 제목, 본문, 링크를 포함한 다양한 토스트를 확인할 수 있습니다.",
      },
    },
  },
}
