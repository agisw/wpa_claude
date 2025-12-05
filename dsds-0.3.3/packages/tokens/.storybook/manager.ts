import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"

import { baseTheme } from "./settings"
import { config } from "./theme"

const theme = create({
  ...baseTheme,
  ...config,
})

const nameTranslation: Record<string, string> = {
  Home: "소개",
  "Getting Started": "시작하기",
  Installation: "설치방법",
  "Design Tokens": "디자인 토큰",
  Tools: "개발도구",
  "MCP Server": "MCP 서버",
  Examples: "예제코드",
  Layouts: "레이아웃",
  Doing: "진행중",
  Done: "완료",
  "Layout Examples": "레이아웃 예제",
  Components: "컴포넌트",
  Accessibility: "접근성 (Accessibility)",
  Contributing: "기여하기",
  "Dev Guide": "개발 가이드",
  Testing: "테스트 개발",
  "Code of Conduct": "기본지침",
  Communication: "커뮤니케이션",
  Implementation: "구현지침",
  "Commit Strategy": "커밋 전략",
  "Project Structure": "프로젝트 구조",
  Naming: "이름 규칙",
  Overview: "개요",
}

addons.setConfig({
  theme,
  sidebar: {
    renderLabel: ({ name }) => {
      if (name in nameTranslation) {
        return nameTranslation[name]
      }
      return name
    },
  },
})
