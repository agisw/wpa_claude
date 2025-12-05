import { writeFileSync } from "fs"

export function patchIndexCss(filePath: string) {
  const css = `@import "tailwindcss";
@import "@dsds/fonts";
@import "@dsds/react-radix-ui/styles.css";
`
  writeFileSync(filePath, css, "utf-8")
}
