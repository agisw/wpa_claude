import { readFileSync, unlinkSync, writeFileSync } from "fs"
import path from "path"

export function replaceAppFiles(projectRoot: string, templateAppPath: string) {
  // 1. App.css 삭제
  const appCssPath = path.join(projectRoot, "src", "App.css")
  try {
    unlinkSync(appCssPath)
  } catch {
    // 파일이 없으면 무시
  }

  // 2. App.tsx 대체
  const appTsxPath = path.join(projectRoot, "src", "App.tsx")
  const template = readFileSync(templateAppPath, "utf-8")
  writeFileSync(appTsxPath, template, "utf-8")
}
