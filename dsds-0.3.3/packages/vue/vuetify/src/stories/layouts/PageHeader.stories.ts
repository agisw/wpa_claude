import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { PageHeader, VBtn, Breadcrumb } from "@/components/ui"
import type { PageTabItem } from "@/components/ui"
import { ref } from "vue"

import { textControl } from "../utils"

const meta: Meta = {
  title: "Layouts/Page/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      codePanel: true,
    },
  },
  argTypes: {
    title: textControl(),
    showFavorite: {
      control: { type: "boolean" },
      description: "즐겨찾기 토글을 노출할지 여부",
    },
  },
  args: {
    title: "Page Header Title",
    showFavorite: false,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageHeader>

export default meta

type Story = StoryObj<typeof meta>

export type Args = {
  title?: string
  tooltipContent?: React.ReactNode | string
  children?: React.ReactNode
  className?: string
}

/**
 * 타이틀만
 */
export const TitleOnly: Story = {
  name: "제목만",
  args: {
    title: "Page Header Title",
  },
  parameters: {
    docs: {
      description: {
        story: "PageHeader 컴포넌트는 페이지의 헤더를 구성하는 데 사용됩니다. 제목과 툴팁을 포함할 수 있습니다.",
      },
    },
  },
}

const withToolsTemplate = `
        <PageHeader title="Dashboard">
          <template #tools>
            <v-btn variant="primary" class="button primary" @click="openModal"> Arr 요청 </v-btn>
            <v-divider vertical />
            <v-btn variant="secondary" @click="openModalAuth">권한관리</v-btn>
            <v-btn variant="secondary" @click="openModalNotice">공지설정</v-btn>
            <v-btn variant="secondary" @click="openModalBanLot">금지Lot설정</v-btn>
            <v-divider vertical />
            <Breadcrumb :items="[
              { title: 'PEMS(Foundry)', href: '/link1', type: 'text' },
              { title: 'Eval Lot Arrange System', href: '/link1', type: 'text' },
              { title: ' Dashboard', href: '/link1', type:'text', selected: true },
            ]" ellipsis />
          </template>
        </PageHeader>
        `

export const WithTools: Story = {
  name: "도구 포함",
  args: { title: "Header with Tools" },
  render: (args) => ({
    components: { PageHeader, VBtn, Breadcrumb }, // VBtn 로컬 등록
    setup() {
      return { args }
    },
    template: withToolsTemplate,
  }),
  parameters: {
    docs: {
      // 코드 패널에 여기 적은 문자열을 그대로 보여줍니다
      source: {
        code: withToolsTemplate,
      },
      description: {
        story: "tools slot을 사용해 오른쪽(ml-auto)에 여러 도구들을 flex-row로 배치한 예시입니다.",
      },
    },
  },
}

export const FavoriteToggle: Story = {
  name: "즐겨찾기 토글",
  render: () => ({
    components: { PageHeader },
    setup() {
      const activeTab = ref<PageTabItem>({
        value: "dashboard",
        label: "대시보드",
        isFavorite: false,
      })

      return { activeTab }
    },
    template: `
      <div class="flex flex-col gap-4 bg-white p-6">
        <PageHeader
          v-model:pageTab="activeTab"
          showFavorite
          :title="activeTab.label"
        />
        <p class="text-sm text-neutral-600">
          현재 즐겨찾기 상태: {{ activeTab.isFavorite ? '설정됨' : '해제됨' }}
        </p>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "PageTabItem 객체와 바인딩하여 즐겨찾기를 토글하는 예시입니다.",
      },
    },
  },
}
