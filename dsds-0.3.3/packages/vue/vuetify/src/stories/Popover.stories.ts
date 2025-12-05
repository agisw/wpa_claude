import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref, watch } from "vue"
import Popover from "@/components/ui/Popover.vue"
import { VBtn } from "@/components/ui"
import { hideOnControls, textControl } from "./utils"

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: `Radix Popover 패턴을 Vuetify \`VMenu\` 기반으로 구현한 DSDS Popover 컴포넌트입니다. 타이틀과 본문 슬롯, 트리거 슬롯을 제공하며 닫기 버튼으로만 종료되도록 설계되어 있습니다

**예제 코드**

\`\`\`html
<Popover v-model:open="open" title="Title_Inputplace">
  <template #activator="{ props }">
    <VBtn variant="secondary" size="large" v-bind="props">
      Open popover
    </VBtn>
  </template>
  <p class="text-sm text-neutral-1st whitespace-pre-line">
    사용자에게 추가 정보나 작업 흐름을 안내할 때 활용합니다.
  </p>
</Popover>
\`\`\`
          `,
      },
    },
  },
  argTypes: {
    headerClass: textControl(),
    titleClass: textControl(),
    bodyClass: textControl(),
    contentClass: textControl(),
    triggerLabel: textControl(),
    closeButtonLabel: textControl("스크린 리더용 닫기 버튼 레이블"),
    index: hideOnControls,
    display: hideOnControls,
  },
}

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  title: "Title_Inputplace",
  open: true,
  triggerLabel: "Open popover",
  closeButtonLabel: "팝오버 닫기",
  body: "사용자에게 추가 정보나 작업 흐름을 안내할 때 활용합니다.\n모달보다 가볍고, 닫기 버튼으로만 닫히도록 고정되어 있습니다.",
  headerClass: "",
  titleClass: "",
  bodyClass: "",
  contentClass: "",
  index: 0,
}

const POPOVER_DEFAULT_TEMPLATE = `
  <div class="flex h-[320px] w-full items-center justify-center bg-[var(--color-bg-surface-base)]">
    <Popover v-model:open="open"
             :title="args.title"
             :header-class="args.headerClass"
             :title-class="args.titleClass"
             :body-class="args.bodyClass"
             :content-class="args.contentClass"
             :trigger-label="args.triggerLabel"
             :close-button-label="args.closeButtonLabel"
             :index="args.index"
             :display="handleDisplay">
      <template #activator="{ props }">
        <VBtn variant="secondary"
              size="large"
              v-bind="props">
          {{ args.triggerLabel }}
        </VBtn>
      </template>
      <p class="text-sm text-neutral-1st whitespace-pre-line">
        {{ args.body }}
      </p>
    </Popover>
  </div>
`

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  parameters: {
    docs: {
      source: {
        code: POPOVER_DEFAULT_TEMPLATE.trim(),
      },
    },
  },
  render: (args) => ({
    components: { Popover, VBtn },
    setup() {
      const open = ref(args.open ?? false)

      watch(
        () => args.open,
        (value) => {
          if (typeof value === "boolean") {
            open.value = value
          }
        }
      )

      const handleDisplay = (value: boolean) => {
        open.value = value
      }

      return { args, open, handleDisplay }
    },
    template: POPOVER_DEFAULT_TEMPLATE,
  }),
}

export const Closed: Story = {
  args: {
    ...defaultArgs,
    open: false,
  },
  parameters: {
    docs: {
      source: {
        code: POPOVER_DEFAULT_TEMPLATE.trim(),
      },
    },
  },
  render: Default.render,
}
