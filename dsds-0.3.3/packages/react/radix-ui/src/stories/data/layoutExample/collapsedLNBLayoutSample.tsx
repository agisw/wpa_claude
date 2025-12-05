import { Args } from "@/stories/LayoutExamples.stories"
import { Markdown } from "@storybook/addon-docs/blocks"

import { Footer, Header, Lnb } from "@/components/ui"

import { basicHierarchySample } from "../lnb"

const collapsedLNBLayoutDescription = `
# LNB 숨김 레이아웃

이 레이아웃은 LNB가 숨겨진 상태로, 모바일 환경이나 좁은 화면에서 사용됩니다.

## 특징

- **전체 화면 활용**: LNB가 숨겨져 콘텐츠 영역이 전체 너비를 사용합니다.
- **햄버거 메뉴**: Header에 햄버거 메뉴 버튼을 통해 숨겨진 네비게이션에 접근할 수 있습니다.
- **컴팩트 헤더**: 공간 절약을 위해 더 낮은 높이의 헤더를 사용합니다.
- **반응형 대응**: 화면 크기에 따라 자동으로 LNB를 숨기거나 표시할 수 있습니다.

## 사용 시나리오

- 모바일 디바이스에서의 접근
- 태블릿의 세로 모드
- 작은 창 크기에서의 사용
- 콘텐츠에 집중해야 하는 상황
`

/**
 * Header, LNB, Content, Footer로 구성된 가장 일반적인 웹 애플리케이션 레이아웃입니다.
 */
export const collapsedLNBLayoutExample = (args: Args) => (
  <div className="flex h-screen w-full flex-col overflow-hidden">
    {/* Header */}
    <Header
      logo="MyApp"
      theme={args.headerTheme}
      size={args.headerSize}
      gnb={[{ type: "hamburger", content: "☰" }, { type: "divider" }, { type: "searchbox" }]}
      utility={[
        { type: "button", content: "알림", props: { badge: true } },
        { type: "button", content: "공지사항", props: { notiCount: args.notiCount } },
        {
          type: "image",
          props: {
            src: "https://github.com/shadcn.png",
            alt: "User Avatar",
            className: "w-6 h-6 rounded-full ml-4",
          },
        },
      ]}
    />

    {/* Main Layout Container - flex-1으로 남은 공간을 차지하고 min-h-0으로 shrink 허용 */}
    <div className="flex min-h-0 flex-1 overflow-hidden">
      {/* Hidden LNB */}
      <Lnb
        className="lnb-with-header"
        data={{
          title: "프로젝트 메뉴",
          items: basicHierarchySample.items,
        }}
        defaultSelectedItemId="1-2-1-2-1"
        defaultOpenPath={["1-1"]}
        hidden={args.hideLnb}
      />

      {/* Content Area - Full Width */}
      <main className="scrollbar-thin bg-page-padding flex-1 overflow-auto">
        <Markdown className="markdown elevation-page-content m-5 max-w-none rounded-md bg-white px-8 py-4 font-sans text-sm">
          {collapsedLNBLayoutDescription}
        </Markdown>
      </main>
    </div>

    {/* Footer - flex-shrink-0으로 크기 고정 */}
    <Footer
      theme={args.footerTheme}
      size={args.footerSize || "compact"}
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
