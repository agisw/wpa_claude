import { readFileSync, writeFileSync } from "fs"

export function patchViteConfig(filePath: string) {
  let content = readFileSync(filePath, "utf-8")
  // 이미 react(), tailwindcss()가 있으면 중복 추가 방지
  if (!content.includes("tailwindcss()")) {
    content = content.replace(/plugins:\s*\[react\(\)/, "plugins: [react(), tailwindcss(), ")
  }
  // import tailwindcss from '@tailwindcss/vite' 추가
  if (!content.includes("import tailwindcss from '@tailwindcss/vite'")) {
    content = `import tailwindcss from '@tailwindcss/vite'\n` + content
  }
  writeFileSync(filePath, content, "utf-8")
}
