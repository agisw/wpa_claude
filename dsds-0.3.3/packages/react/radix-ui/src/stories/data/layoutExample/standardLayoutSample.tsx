import { Args } from "@/stories/LayoutExamples.stories"
import { Markdown } from "@storybook/addon-docs/blocks"

import { GearIcon } from "@/components/icons"
import { Footer, Header, Lnb } from "@/components/ui"

import { basicHierarchySample } from "../lnb"

const layoutDescriptionMarkdown = `
# 일반적인 웹 애플리케이션 레이아웃

이 예제는 현대적인 웹 애플리케이션에서 가장 일반적으로 사용되는 4단 레이아웃 구조를 보여줍니다.

## 레이아웃 구성 요소

### 1. Header (상단 영역)
- **위치**: 화면 최상단에 고정
- **역할**:
  - 브랜드/로고 표시
  - 전역 네비게이션 (GNB)
  - 사용자 유틸리티 (알림, 프로필, 로그인 등)
  - 검색 기능

### 2. LNB (Left Navigation Bar, 좌측 네비게이션)
- **위치**: 화면 왼쪽에 세로로 배치
- **역할**:
  - 섹션별 상세 네비게이션
  - 계층적 메뉴 구조 제공
  - 현재 위치 표시
- **특징**:
  - 아코디언 형태의 접기/펼치기 기능
  - 리사이즈 가능한 너비 조절
  - 숨김/표시 토글 기능

### 3. Content (메인 콘텐츠 영역)
- **위치**: Header와 LNB를 제외한 나머지 영역
- **역할**:
  - 실제 페이지 콘텐츠 표시
- **특징**:
  - 스크롤 가능한 영역

### 4. Footer (하단 영역)
- **위치**: 화면 최하단에 배치
- **역할**:
  - 저작권 정보 표시
  - 법적 고지사항 링크 (개인정보 처리 방침, 이용약관 등)
- **특징**:
  - 모든 페이지에서 공통으로 표시
  - 컴팩트한 높이로 공간 효율성 확보
  - 테마에 따른 색상 변경 지원

## 사용 사례

- **관리자 대시보드**: 복잡한 기능들을 계층적으로 정리
- **문서 사이트**: 카테고리별 문서 분류 및 탐색
- **업무 시스템**: 부서별, 기능별 메뉴 구성
- **포털 사이트**: 다양한 서비스를 체계적으로 분류

`

/**
 * Header, LNB, Content, Footer로 구성된 가장 일반적인 웹 애플리케이션 레이아웃입니다.
 */
export const StandardLayoutSample = (args: Args) => (
  <div className="flex h-screen w-full flex-col overflow-hidden">
    {/* Header */}
    <Header
      logo="MyApp"
      theme={args.headerTheme}
      size={args.headerSize}
      gnb={[
        {
          type: "tenant",
          content: "Memory",
          items: [
            { content: "Memory", value: "memory" },
            { content: "Foundry", value: "foundry" },
          ],
        },
        { type: "divider" },
        { type: "searchbox" },
        { type: "divider" },
        {
          type: "menu",
          content: "Dashboard",
          items: [
            { content: "메인 대시보드", value: "main" },
            { content: "분석 대시보드", value: "analytics" },
          ],
        },
        { type: "divider" },
      ]}
      utility={[
        { type: "searchbox" },
        { type: "button", content: "알림", props: { badge: true } },
        { type: "button", content: "공지사항", props: { notiCount: args.notiCount } },
        { type: "link", content: "도움말", href: "/help" },
        { type: "divider" },
        {
          type: "button",
          content: "이삼성",
          props: {
            className: "mr-[-8px]",
            icon: <GearIcon />,
            iconOption: "after",
            onClick: () => alert("Settings clicked"),
          },
        },
      ]}
    />

    {/* Main Layout Container - flex-1으로 남은 공간을 차지하고 min-h-0으로 shrink 허용 */}
    <div className="flex min-h-0 flex-1 overflow-hidden">
      {/* LNB */}
      <Lnb
        className="lnb-with-header"
        data={{
          title: "프로젝트 메뉴",
          items: basicHierarchySample.items,
        }}
        hidden={args.hideLnb}
        defaultSelectedItemId="1-2-1-2-2"
        defaultOpenPath={["1-1"]}
        onSelectionChange={(value, data) => {
          console.log("선택된 메뉴:", value, data)
        }}
      />

      {/* Content Area */}
      <main className="scrollbar-thin bg-page-padding flex-1 overflow-auto">
        <Markdown className="markdown elevation-page-content m-5 max-w-none rounded-md bg-white p-8 py-4 font-sans text-sm">
          {layoutDescriptionMarkdown}
        </Markdown>
      </main>
    </div>

    {/* Footer - flex-shrink-0으로 크기 고정 */}
    <Footer
      theme={args.footerTheme}
      size={args.footerSize}
      className="flex-shrink-0"
      items={[
        { type: "text", content: "상태: 완료" },
        { type: "divider" },
        {
          type: "button",
          content: "개인정보 처리 방침",
          props: { onClick: () => alert("개인정보 처리 방침 클릭") },
        },
        { type: "link", href: "/terms", content: "이용약관" },
        { type: "copyright", content: "2025 Samsung" },
      ]}
    />
  </div>
)
