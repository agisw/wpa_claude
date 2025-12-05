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
  Examples: "예제코드",
  Releases: "릴리즈 노트",
  Layouts: "화면 구성하기",
  Doing: "진행중",
  Done: "완료",
  Patterns: "활용 패턴",
  Advanced: "고급 컴포넌트",
  BasicLayout: "기본 레이아웃",
  DataTable: "데이터테이블",
  FakeRealGrid: "Fake 그리드 데이터 예제",
  "Clean Lot Dashboard List": "Clean Lot 목록 대시보드",
  "Auth Manage Modal": "권한 관리",
  "Lot Arrange Request": "Lot Arrange 요청",
  "Layout Examples": "레이아웃 예제",
  "Notice Modal": "공지사항 관리",
  "Notice Registration Modal": "공지사항 등록",
  "MCP Server": "MCP 서버",
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
