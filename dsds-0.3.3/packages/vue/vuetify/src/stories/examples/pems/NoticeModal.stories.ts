import { Modal, Toast, RichTextEditor } from "@/components/ui"
import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref } from "vue"
import NoticeModalBody from "./_components/NoticeModalBody.vue"
import NoticeModalBodyRaw from "./_components/NoticeModalBody.vue?raw"
import NoticeRegModalBody from "./_components/NoticeRegModalBody.vue"
import NoticeRegModalBodyRaw from "./_components/NoticeRegModalBody.vue?raw"

const components = { Modal, NoticeModalBody, NoticeRegModalBody, Toast, RichTextEditor }

// Function to extract template content from raw Vue file
function extractTemplate(rawVue: string): string {
  const templateStartRegex = /^<template>/m
  const templateEndRegex = /^<\/template>/m
  const startMatch = rawVue.match(templateStartRegex)
  const endMatch = rawVue.match(templateEndRegex)
  if (!startMatch || !endMatch) {
    throw new Error("Template not found in Vue file")
  }
  const startIndex = startMatch.index! + startMatch[0].length
  const endIndex = endMatch.index!
  return rawVue.substring(startIndex, endIndex).trim()
}

// Function to create dialog template with extracted component template
function createModalTemplate(
  tpl: string,
  searchStr: string | RegExp,
  componentRaw: string,
  options?: {
    indentLevel?: number
  }
): string {
  let componentTemplate = extractTemplate(componentRaw)
  if (options?.indentLevel) {
    const indent = " ".repeat(options.indentLevel)
    componentTemplate = componentTemplate
      .split("\n")
      .map((line) => (line.trim() ? indent + line : line))
      .join("\n")
  }
  return tpl.replace(searchStr, componentTemplate)
}

const meta: Meta = {
  title: "Examples/PEMS/Notice Modal",
  component: NoticeModalBody,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "공지사항 관리 다이얼로그 컴포넌트입니다.",
      },
      codePanel: true,
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const NOTICE_DIALOG_TPL = `
<div class="flex flex-col items-center">
  <Toast v-bind="args" />
  <Modal v-bind="args" v-model="open" size="2xl">
    <NoticeModalBody :emptyState="args.emptyState" />
  </Modal>
</div>
`

export const Default: Story = {
  name: "Default",
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
      const modalOpen = ref(true)
      return { args, open: modalOpen }
    },
    template: NOTICE_DIALOG_TPL,
  }),
  parameters: {
    docs: {
      source: {
        code: createModalTemplate(NOTICE_DIALOG_TPL, /<NoticeModalBody.*\/>/, NoticeModalBodyRaw),
      },
    },
  },
}

const NOTICE_REG_DIALOG_TPL = `
<div class="flex flex-col items-center">
  <Toast v-bind="args" />
  <Modal v-bind="args" v-model="open" size="medium" height="520">
    <NoticeRegModalBody v-model="noticeForm.open" />
  </Modal>
</div>
`

export const NoticeRegisterModal: Story = {
  name: "Notice Registration Modal",
  args: {
    noticeForm: {
      lineId: null,
      procName: null,
      procId: null,
      noticeTitle: "",
      noticeCont: "<p>공지사항 내용을 입력하세요.</p>",
    },
  },
  render: (args: any) => ({
    components,
    setup() {
      const modalOpen = ref(true)
      const noticeForm = ref(args.noticeForm)
      return { args, open: modalOpen, noticeForm }
    },
    template: NOTICE_REG_DIALOG_TPL,
  }),
  parameters: {
    docs: {
      source: {
        code: createModalTemplate(NOTICE_REG_DIALOG_TPL, /<NoticeRegModalBody.*\/>/, NoticeRegModalBodyRaw),
      },
    },
  },
}
