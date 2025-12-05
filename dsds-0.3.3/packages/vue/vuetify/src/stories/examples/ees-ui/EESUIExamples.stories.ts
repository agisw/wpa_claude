import type { Meta, StoryObj } from "@storybook/vue3-vite"
import {
  Breadcrumb,
  PageBody,
  PageHeader,
  PageHeaderFilter,
  Pagination,
  VBtn,
  Modal,
  Toast,
  VSelect,
} from "@/components/ui"
import EESUIExampleLayout from "./_components/EESUIExampleLayout.vue"
import EESUIExampleLayoutCode from "./_components/EESUIExampleLayout.vue?raw"
import EESAlarmSummaryPageCode from "./_components/EESAlarmSummaryPage.vue?raw"
import EESAlarmSummaryPageSideFilterCode from "./_components/EESAlarmSummaryPageSideFilter.vue?raw"
import { hideOnControls } from "@/stories/utils"

const components = {
  PageHeaderFilter,
  PageHeader,
  PageBody,
  Pagination,
  Breadcrumb,
  Modal,
  VSelect,
  VBtn,
  Toast,
  EESUIExampleLayout,
}

const meta: Meta = {
  title: "Examples/EES-UI/AlarmSummary",
  parameters: {
    layout: "fullscreen",
    docs: { codePanel: true },
  },
  argTypes: {
    onAction: { action: "action", ...hideOnControls },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const BasicLayout: Story = {
  name: "Basic Layout",
  argTypes: {
    emptyState: {
      control: { type: "boolean" },
      description: "Toggle empty state for the grid",
    },
  },
  args: {
    emptyState: false,
  },
  render: (args: any) => ({
    components,
    setup() {
      return { args }
    },
    template: `
      <EESUIExampleLayout @action="args.onAction" />
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `
<!-- Main Code -->
${EESUIExampleLayoutCode}

<!-- EESAlarmSummaryPageCode -->

${EESAlarmSummaryPageCode}

<!-- EESAlarmSummaryPageSideFilter -->

${EESAlarmSummaryPageSideFilterCode}
        `,
      },
    },
  },
}
