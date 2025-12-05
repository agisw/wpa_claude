import { ModalTemplate } from "@/stories/templates/ModalTemplate"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { toPublishedSourceCode } from "@/lib/utils"

import ModalTemplateSource from "./templates/ModalTemplate?raw"
import { hideOnControls, selectControl, textControl } from "./utils"

const meta: Meta = {
  title: "Components/Modal",
  // autodocs 사용 시 한 번에 전부 켜지는 문제
  // tags: ["autodocs"],
  component: ModalTemplate,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  args: {},
  argTypes: {
    isMessage: {
      table: { disable: true },
    },
  },
}
export default meta

type Story = StoryObj

const defaultItemArgs = { title: "Title_Inputplace" }

export const Modal: Story = {
  args: {
    ...defaultItemArgs,
    isMessage: false,
    size: "xs",
    content: "",
  },
  argTypes: {
    size: selectControl(["xs", "sm", "md", "lg", "xl", "2xl"]),
    title: textControl,
    content: textControl,
  },
  parameters: {
    docs: {
      source: {
        code: toPublishedSourceCode(ModalTemplateSource),
      },
    },
  },
}

export const Message: Story = {
  args: {
    ...defaultItemArgs,
    isMessage: true,
    message: "Text Inputplace",
  },
  argTypes: {
    message: textControl,
    title: hideOnControls,
  },
  parameters: {
    docs: {
      source: {
        code: toPublishedSourceCode(ModalTemplateSource),
      },
    },
  },
}

export const Modal_Exception: Story = {
  args: {
    ...defaultItemArgs,
    isMessage: false,
    size: "xs",
    content: "예외-반응형 모달\n브라우저 크기를 변경하여 보세요.",
    className: "max-h-[calc(100vh-40px)] max-w-[calc(100vw-40px)] overflow-hidden",
  },
  argTypes: {
    size: selectControl(["xs", "sm", "md", "lg", "xl", "2xl"]),
    title: textControl,
    content: textControl,
  },
  parameters: {
    docs: {
      source: {
        code: toPublishedSourceCode(ModalTemplateSource),
      },
    },
  },
}

export const Message_Exception: Story = {
  args: {
    ...defaultItemArgs,
    isMessage: true,
    message: "예외-반응형 모달\n브라우저 크기를 변경하여 보세요.",
    className: "max-h-[min(calc(100vh-40px),340px)] max-w-[calc(100vw-40px)] overflow-hidden",
  },
  argTypes: {
    message: textControl,
    title: hideOnControls,
  },
  parameters: {
    docs: {
      source: {
        code: toPublishedSourceCode(ModalTemplateSource),
      },
    },
  },
}
