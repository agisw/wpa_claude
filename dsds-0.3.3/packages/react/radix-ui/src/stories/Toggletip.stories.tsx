import { CloseIconGhost } from "@/index.esm"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { toPublishedSourceCode } from "@/lib/utils"
import {
  Button,
  Toggletip,
  ToggletipContent,
  ToggletipFooter,
  ToggletipFrame,
  ToggletipFrameProps,
  ToggletipPage,
  ToggletipPages,
  ToggletipTitle,
  ToggletipTrigger,
} from "@/components/ui"

import ToggletipTemplateSource from "./templates/ToggletipTemplate?raw"
import { selectControl } from "./utils"

type ToggletipStoryArgs = Pick<ToggletipFrameProps, "side" | "align" | "title" | "size" | "content"> & {
  trigger: string
  footer: boolean
}

const ToggletipDecorator = (_: unknown, context: { args: ToggletipStoryArgs }) => {
  const { trigger = "button", side = "top", size = "medium", align = "center", footer = false } = context.args
  const pages = [
    <ToggletipPage>
      <ToggletipTitle>TextInputplace</ToggletipTitle>
      <ToggletipContent>
        Lorem ipsum dolor sit amet, a consectetur adipisicing elit, sed do eiusmod tempor incididunt u
      </ToggletipContent>
      <ToggletipTitle>TextInputplace</ToggletipTitle>
      <ToggletipContent>
        Lorem ipsum dolor sit amet, a consectetur adipisicing elit, sed do eiusmod tempor incididunt u
      </ToggletipContent>
    </ToggletipPage>,
    <ToggletipPage>
      <ToggletipTitle>TextInputplace</ToggletipTitle>
      <ToggletipContent>
        Lorem ipsum dolor sit amet, a consectetur adipisicing elit, sed do eiusmod tempor incididunt u
      </ToggletipContent>
    </ToggletipPage>,
    <ToggletipPage>
      <ToggletipTitle>TextInputplace</ToggletipTitle>
      <ToggletipContent>
        Lorem ipsum dolor sit amet, a consectetur adipisicing elit, sed do eiusmod tempor incididunt u
      </ToggletipContent>
    </ToggletipPage>,
    <ToggletipPage>
      <ToggletipTitle>TextInputplace</ToggletipTitle>
      <ToggletipContent>
        Lorem ipsum dolor sit amet, a consectetur adipisicing elit, sed do eiusmod tempor incididunt u
      </ToggletipContent>
    </ToggletipPage>,
    <ToggletipPage>
      <ToggletipTitle>TextInputplace</ToggletipTitle>
      <ToggletipContent>
        Lorem ipsum dolor sit amet, a consectetur adipisicing elit, sed do eiusmod tempor incididunt u
      </ToggletipContent>
    </ToggletipPage>,
  ]
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center">
        <Toggletip defaultOpen>
          <ToggletipTrigger>
            {trigger == "button" && <Button children="Open Toggletip" size="large" variant="secondary" />}
            {trigger == "icon" && <CloseIconGhost />}
            {trigger == "text" && <div>Open Toggletip</div>}
          </ToggletipTrigger>
          <ToggletipFrame side={side} size={size} align={align}>
            <ToggletipPages pages={pages} currentPage={1} />
            {footer && (
              <ToggletipFooter page={pages.length} currentPage={1}>
                <Button size="medium" variant="secondary">
                  min
                </Button>
                <Button size="medium" variant="primary">
                  min
                </Button>
              </ToggletipFooter>
            )}
          </ToggletipFrame>
        </Toggletip>
      </div>
    </div>
  )
}

const meta: Meta<ToggletipStoryArgs> = {
  title: "Components/Toggletip",
  tags: ["autodocs"],
  component: Toggletip,
  parameters: {
    docs: {
      codePanel: true,
    },
  },
  args: {},
  argTypes: {},
}

export default meta

type Story = StoryObj<ToggletipStoryArgs>

const defaultArgs = {
  title: "TitleInputplace",
  content: "Lorem ipsum dolor sit amet, a consectetur adipisicing elit, sed do eiusmod tempor incididunt u",
  trigger: "button",
  footer: true,
}

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  decorators: [ToggletipDecorator],
  argTypes: {
    trigger: selectControl(["button", "icon", "text"]),
    side: selectControl(["top", "right", "bottom", "left"]),
    size: selectControl(["small", "medium"]),
    align: selectControl(["start", "center", "end"]),
  },
  parameters: {
    docs: {
      source: {
        code: toPublishedSourceCode(ToggletipTemplateSource),
      },
    },
  },
}

export const WithoutFooter: Story = {
  args: {
    ...defaultArgs,
    footer: false,
  },
  decorators: [ToggletipDecorator],
  argTypes: {
    trigger: selectControl(["button", "icon", "text"]),
    side: selectControl(["top", "right", "bottom", "left"]),
    size: selectControl(["small", "medium"]),
    align: selectControl(["start", "center", "end"]),
  },
  parameters: {
    docs: {
      source: {
        code: toPublishedSourceCode(ToggletipTemplateSource),
      },
    },
  },
}
