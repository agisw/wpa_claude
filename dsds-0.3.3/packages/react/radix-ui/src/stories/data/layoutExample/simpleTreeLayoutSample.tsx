import { Args } from "@/stories/LayoutExamples.stories"
import { Markdown } from "@storybook/addon-docs/blocks"

import { Footer, Header, Lnb } from "@/components/ui"

const simpleTreeLayoutDescription = `
# 심플 트리 레이아웃

이 레이아웃은 아코디언 없이 트리 구조만을 사용하는 간단한 형태입니다.

Header와 Footer는 편안함을 제공하기 위해 "cozy" 사이즈로 지정되었습니다.

## 특징

- **단순한 구조**: 아코디언의 복잡성 없이 트리 구조만 사용
- **cozy 사이즈**: 편안한 Header / Footer 크기로 사용자 경험 향상
- **빠른 접근**: 모든 메뉴 항목이 처음부터 보여져 빠른 네비게이션 가능
- **플랫 네비게이션**: 상대적으로 얕은 계층 구조에 적합
- **시각적 명료함**: 불필요한 토글 없이 깔끔한 메뉴 구조

## 적합한 사용 사례

- **문서 사이트**: 카테고리가 명확하고 항목 수가 적절한 경우
- **포트폴리오**: 작품이나 프로젝트를 분류할 때
- **소규모 애플리케이션**: 기능이 많지 않은 간단한 앱
- **랜딩 페이지**: 제품 소개나 서비스 안내 페이지

트리만 사용하는 이 방식은 사용자가 전체 구조를 한눈에 파악할 수 있어
사용성이 뛰어나지만, 메뉴 항목이 많아질 경우 아코디언 구조를 고려해야 합니다.
`

/**
 * Header, LNB, Content, Footer로 구성된 가장 일반적인 웹 애플리케이션 레이아웃입니다.
 */
export const simpleTreeLayoutExample = (args: Args) => (
  <div className="flex h-screen w-full flex-col overflow-hidden">
    {/* Header */}
    <Header
      logo="Simple App"
      theme={args.headerTheme}
      size={args.headerSize}
      gnb={[
        { type: "searchbox" },
        {
          type: "menu",
          content: "문서",
          items: [
            { content: "API 문서", value: "api" },
            { content: "가이드", value: "guide" },
          ],
        },
      ]}
      utility={[
        { type: "link", content: "GitHub", href: "https://github.com" },
        { type: "button", content: "알림", props: { badge: true } },
        { type: "button", content: "공지사항", props: { notiCount: args.notiCount } },
        {
          type: "button",
          content: "로그인",
          props: { className: "ml-2", onClick: () => console.log("로그인 clicked") },
        },
      ]}
    />

    {/* Main Layout Container - flex-1으로 남은 공간을 차지하고 min-h-0으로 shrink 허용 */}
    <div className="flex min-h-0 flex-1 overflow-hidden">
      {/* Simple Tree LNB */}
      <Lnb
        className="lnb-with-header"
        defaultSelectedItemId="installation"
        data={{
          title: "문서",
          items: [
            {
              id: "getting-started",
              content: "시작하기",
              items: [
                { id: "installation", content: "설치" },
                { id: "quick-start", content: "빠른 시작" },
                { id: "configuration", content: "설정" },
              ],
            },
            {
              id: "components",
              content: "컴포넌트",
              items: [
                { id: "buttons", content: "버튼" },
                { id: "forms", content: "폼" },
                { id: "layout", content: "레이아웃" },
              ],
            },
            {
              id: "advanced",
              content: "고급 기능",
              items: [
                { id: "theming", content: "테마" },
                { id: "customization", content: "커스터마이징" },
              ],
            },
          ],
        }}
        hidden={args.hideLnb}
        withoutAccordion={true}
      />

      {/* Content Area */}
      <main className="scrollbar-thin bg-page-padding flex-1 overflow-auto">
        <Markdown className="markdown elevation-page-content m-5 max-w-none rounded-md bg-white p-8 py-2 font-sans text-sm">
          {simpleTreeLayoutDescription}
        </Markdown>
      </main>
    </div>

    {/* Footer - flex-shrink-0으로 크기 고정 */}
    <Footer
      theme={args.footerTheme}
      size={args.footerSize || "cozy"}
      className="flex-shrink-0"
      items={[
        { type: "text", content: "상태: 완료" },
        { type: "divider" },
        { type: "link", href: "/privacy", content: "개인정보 처리 방침" },
        { type: "link", href: "/terms", content: "이용약관" },
        { type: "button", content: "고객지원", props: { onClick: () => console.log("고객지원 clicked") } },
        { type: "copyright", content: "2025 Samsung" },
      ]}
    />
  </div>
)
