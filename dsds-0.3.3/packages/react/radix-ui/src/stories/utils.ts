import type { Control } from "@storybook/addon-docs/blocks"
import { Theme } from "storybook/theming"

export const hideOnControls = { table: { disable: true } }
export const booleanControl = { control: "boolean" } as { control: Control }
export const numberControl = { control: "number" } as { control: Control }
export const radioControl = (options: string[]) =>
  ({
    control: "radio",
    options,
  }) as { control: Control }

export const textControl = (description?: string) =>
  ({
    control: "text",
    description,
  }) as { control: Control; description?: string }

export const rangeControl = (min: number, max: number, description?: string, defaultValue = 0) =>
  ({
    control: { type: "range", min, max },
    description,
    defaultValue,
  }) as { control: Control }

export const selectControl = (options: string[] | number[] | readonly string[]) =>
  ({
    control: "select",
    options,
  }) as { control: Control }

export const theme = {
  typography: {
    fonts: {
      base: '"Malgun Gothic", "Segoe UI Emoji", "Segoe UI Symbol", "Apple SD Gothic Neo", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Apple Color Emoji", sans-serif',
      mono: 'D2Coding, Consolas, "Courier New", ui-monospace, monospace',
    },
  },
} as Partial<Theme>
