import { execSync } from "child_process"
import { cpSync, existsSync, readFileSync, writeFileSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"
import inquirer from "inquirer"

import { patchIndexCss } from "./patchIndexCss"
import { patchViteConfig } from "./patchViteConfig"
import { replaceAppFiles } from "./replaceAppFiles"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// package.json에서 버전 읽기
const packageJsonPath = path.resolve(__dirname, "../package.json")
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))
const version = packageJson.version

function isValidPackageName(name: string) {
  // npm 패키지명 규칙: https://docs.npmjs.com/cli/v10/configuring-npm/package-json#name
  return /^([a-z0-9-~][a-z0-9-._~]*)$/.test(name)
}

async function main() {
  // 명령행 인자 파싱
  const argv = process.argv.slice(2)

  let projectName = ""
  let template = ""

  // --help나 -h가 포함되어 있으면 바로 도움말 출력
  if (argv.includes("--help") || argv.includes("-h")) {
    console.log(`
DSDS 프로젝트 생성 도구 v${version}

사용법:
  pnpm create @dsds <project-name> [--template=<template-name>]

옵션:
  --template=<template-name>  사용할 템플릿 지정 (예: vuetify)
  --help, -h                 이 도움말 표시

예시:
  pnpm create @dsds my-app
  pnpm create @dsds my-app --template=vuetify
`)
    process.exit(0)
  }

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg.startsWith("-")) {
      if (arg === "--template") {
        template = argv[i + 1] || ""
        i++ // 다음 인자 건너뛰기
      } else if (arg.startsWith("--template=")) {
        template = arg.split("=")[1] || ""
      } else {
        console.error(`\n❌ 허용되지 않은 옵션: ${arg}`)
        console.error("사용법: pnpm create @dsds <project-name> [--template=<template-name>]")
        process.exit(1)
      }
    } else {
      if (!projectName) {
        projectName = arg
      } else {
        console.error(`\n❌ 추가 인자: ${arg}`)
        console.error("사용법: pnpm create @dsds <project-name> [--template=<template-name>]")
        process.exit(1)
      }
    }
  }

  if (!projectName || !isValidPackageName(projectName)) {
    const result = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "생성할 프로젝트 이름을 입력하세요:",
        validate: (input) =>
          !!input && isValidPackageName(input)
            ? true
            : "유효한 npm 패키지명을 입력하세요 (소문자, 숫자, 하이픈, 언더스코어만 허용)",
      },
    ])
    projectName = result.projectName
  }

  if (existsSync(projectName)) {
    console.error(`\n❌ 이미 해당 폴더가 존재합니다: ${projectName}`)
    process.exit(1)
  }

  if (template) {
    if (template === "vuetify") template += "-default"

    // 커스텀 템플릿 사용
    const templateDir = path.resolve(__dirname, `../dist/templates/dsds-${template}`)
    if (!existsSync(templateDir)) {
      console.error(`\n❌ 템플릿 폴더가 존재하지 않습니다: ${templateDir}`)
      process.exit(1)
    }

    console.log(`\n📦 (1/2) 템플릿 복사 중... (${template})`)
    cpSync(templateDir, projectName, {
      recursive: true,
    })

    // package.json 수정
    console.log(`\n📦 (2/2) 내용 패치 중... (${template})`)
    const packageJsonPath = path.resolve(projectName, "package.json")
    let packageJson = readFileSync(packageJsonPath, "utf-8")
    packageJson = packageJson.replace(`"name": "dsds-${template}"`, `"name": "${projectName}"`)
    writeFileSync(packageJsonPath, packageJson)

    // vite.config.mts 수정 (allowedHosts 제거)
    const viteConfigPath = path.resolve(projectName, "vite.config.mts")
    if (existsSync(viteConfigPath)) {
      let viteConfig = readFileSync(viteConfigPath, "utf-8")
      viteConfig = viteConfig.replace(/,\s*allowedHosts: \[.*?\]/, "")
      writeFileSync(viteConfigPath, viteConfig)
    }

    process.chdir(projectName)

    console.log("\n✅ 커스텀 템플릿 프로젝트가 생성되었습니다.")
    console.log(`\ncd ${projectName}\npnpm install\npnpm dev\n`)
  } else {
    // 기존 React 프로젝트 생성
    template = "react-ts"

    // 1. Vite 템플릿 생성
    console.log(`\n📦 (1/5) Vite 템플릿 생성 중... (${template})`)
    execSync(`pnpm create vite --template=${template} ${projectName}`, { stdio: "inherit" })
    process.chdir(projectName)

    // 2. DSDS 및 Tailwind 의존성 설치
    console.log("\n📦 (2/5) DSDS 및 Tailwind CSS 의존성 설치 중...")
    execSync("pnpm add @dsds/react-radix-ui @dsds/fonts", { stdio: "inherit" })
    execSync("pnpm add -D tailwindcss @tailwindcss/vite", { stdio: "inherit" })

    // 3. vite.config.ts 패치
    console.log("\n🔧 (3/5) Vite 설정 파일 패치 중...")
    patchViteConfig(path.resolve("vite.config.ts"))

    // 4. src/index.css 패치
    console.log("\n🎨 (4/5) CSS 파일 패치 중...")
    patchIndexCss(path.resolve("src/index.css"))

    // 5. App.tsx 파일 대체
    const templatePath = path.resolve(__dirname, "../dist/templates/DefaultLayout.tsx")
    console.log("\n📄 (5/5) App.tsx 파일 대체 중...")
    replaceAppFiles(process.cwd(), templatePath)

    // 6. 완료 안내
    console.log("\n✅ DSDS React 프로젝트가 생성되었습니다. 다음 명령어로 개발서버를 시작하세요!")
    console.log(`\ncd ${projectName}\npnpm install\npnpm dev\n`)
  }
}

main()
