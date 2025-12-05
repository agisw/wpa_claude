import type { Control } from "@storybook/addon-docs/blocks"

export const hideOnControls = { table: { disable: true } }
export const booleanControl = { table: { disable: false }, control: "boolean" } as { control: Control }
export const numberControl = { table: { disable: false }, control: "number" } as { control: Control }
export const radioControl = (options: string[]) =>
  ({
    table: { disable: false },
    control: "radio",
    options,
  }) as { control: Control }

export const textControl = (description?: string) =>
  ({
    table: { disable: false },
    control: "text",
    description,
  }) as { control: Control; description?: string }

export const rangeControl = (min: number, max: number, description?: string, defaultValue = 0) =>
  ({
    table: { disable: false },
    control: { type: "range", min, max },
    description,
    defaultValue,
  }) as { control: Control }

export const selectControl = (options: string[] | number[] | readonly string[]) =>
  ({
    table: { disable: false },
    control: "select",
    options,
  }) as { control: Control }

export function replaceTemplateContent(codeStr: string, newContent: string): string {
  // <template[^>]*> : <template> 태그 시작 (속성 포함 가능)
  // ([\s\S]*?) : 모든 문자(줄바꿈 포함)를 비탐욕적으로 캡처
  // </template> : 종료 태그
  const regex = /(<template[^>]*>)([\s\S]*?)(<\/template>)/

  return codeStr.replace(regex, (match, openTag, content, closeTag) => {
    return openTag + newContent + closeTag
  })
}

export function rgbToHex(rgb: string): string {
  const result = rgb.match(/\d+/g)
  if (!result || result.length !== 3) return rgb // 유효하지 않으면 원본 반환
  const [r, g, b] = result.map(Number)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function adjustProdImportPaths(code: string): string {
  return code
    .replace(/@\/components\/ui/g, "@dsds/vue-vuetify")
    .replace(/@\/faker/g, "@dsds/vue-vuetify/faker")
    .replace(/@\/lib\/utils/g, "@dsds/vue-vuetify/utils")
}
