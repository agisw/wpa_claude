import { Args } from "@/stories/LayoutExamples.stories"
import { Markdown } from "@storybook/addon-docs/blocks"

import { ConfidentialIcon, ExternalIcon, GearIcon } from "@/components/icons"
import { Footer, Header, Lnb } from "@/components/ui"

const TwoLineHeaderLayoutDescription = `
# 2단 헤더 레이아웃

이 레이아웃은 Header가 2단 모드로 구성되어 더 많은 네비게이션 옵션을 제공합니다.

## Header 구성

### 상단 (1단)
- **로고**: "TheAPP" 으로 표시
- **GNB**: Tenant 선택, 제품/공정 메뉴
- **Utility**: 검색, 알림, 프로필

### 하단 (2단) - 탭 영역
- **즐겨찾기**: 자주 사용하는 대시보드, 리포트, 분석, 설정
- **업무함**: 작업 관리, 승인 요청, 알림함, 완료된 작업
- **서비스**: 웨이퍼/테스트/품질/생산 관리
- **설정**: 일반/사용자/권한/시스템 설정
- **새창**: 새 창으로 열기 버튼

## 특징

- **확장된 네비게이션**: 1단 헤더보다 더 많은 메뉴를 체계적으로 정리
- **탭 기반 구조**: 업무 영역별로 탭을 분리하여 사용자 경험 향상
- **컨텍스트 인식**: 선택된 탭에 따라 LNB 메뉴가 동적으로 변경
- **활성 상태 표시**: 현재 선택된 탭과 메뉴가 시각적으로 강조
- **반응형 지원**: 다양한 화면 크기에서 최적화된 레이아웃

## 사용 사례

- **복잡한 업무 시스템**: 다양한 기능 영역을 가진 엔터프라이즈 애플리케이션
- **대시보드 시스템**: 여러 유형의 대시보드와 분석 도구
- **관리자 콘솔**: 시스템 관리, 사용자 관리, 설정 등이 필요한 관리 도구
- **업무 협업 도구**: 프로젝트, 업무함, 알림 등이 통합된 워크스페이스

이 레이아웃은 정보 밀도가 높은 애플리케이션에서 사용자가 빠르게 원하는 기능에 접근할 수 있도록 도와줍니다.
`

/**
 * Header, LNB, Content, Footer로 구성된 가장 일반적인 웹 애플리케이션 레이아웃입니다.
 */
export const TwoLineHeaderLayoutExample = (args: Args) => (
  <div className="flex h-screen w-full flex-col overflow-hidden">
    {/* 2단 모드 Header */}
    <Header
      logo="MyAPP"
      theme="dark"
      style={{ "--color-header-bg": "var(--colors-photo-resist-green-pr-green-12)" } as React.CSSProperties}
      withTabs
      activeTab="inbox-tasks"
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
      ]}
      utility={[
        { type: "button", content: "알림", props: { badge: true } },
        { type: "button", content: "공지사항", props: { notiCount: args.notiCount } },
        { type: "link", href: "/manual", content: "매뉴얼" },
        { type: "button", content: "S-VOC", props: { badge: true } },
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
      tabs={[
        {
          type: "menu",
          content: "Favorites",
          selected: "favorite-dashboard",
          items: [
            { content: "대시보드", value: "favorite-dashboard" },
            { content: "주요 리포트", value: "favorite-reports" },
            { content: "자주 사용하는 분석", value: "favorite-analytics" },
            { content: "개인 설정", value: "favorite-settings" },
          ],
        },
        { type: "divider" },
        {
          type: "menu",
          content: "업무함",
          selected: "inbox-tasks",
          items: [
            { content: "대기중인 작업", value: "inbox-tasks" },
            { content: "승인 요청", value: "inbox-approvals" },
            { content: "알림함", value: "inbox-notifications" },
            { content: "완료된 작업", value: "inbox-completed" },
          ],
        },
        {
          type: "menu",
          content: "서비스",
          selected: "service-wafer",
          items: [
            { content: "웨이퍼 관리", value: "service-wafer" },
            { content: "테스트 시스템", value: "service-test" },
            { content: "품질 관리", value: "service-quality" },
            { content: "생산 계획", value: "service-production" },
          ],
        },
        {
          type: "menu",
          content: "설정",
          selected: "setting-general",
          items: [
            { content: "일반 설정", value: "setting-general" },
            { content: "사용자 관리", value: "setting-users" },
            { content: "권한 설정", value: "setting-permissions" },
            { content: "시스템 설정", value: "setting-system" },
          ],
        },
        {
          type: "button",
          content: "새창",
          props: { value: "new-window", icon: <ExternalIcon />, iconOption: "after" },
        },
        {
          type: "custom",
          content: <ConfidentialIcon color="red" />,
          props: { className: "ml-auto pl-1 flex flex-col justify-center" },
        },
      ]}
      onTabSelect={(value) => console.log("Tab selected:", value)}
    />

    {/* Main Layout Container - flex-1으로 남은 공간을 차지하고 min-h-0으로 shrink 허용 */}
    <div className="flex min-h-0 flex-1 overflow-hidden">
      {/* LNB */}
      <Lnb
        className="lnb-with-header"
        data={{
          title: "즐겨찾기 대시보드",
          items: [
            {
              id: "dashboard",
              content: "대시보드",
              items: [
                { id: "overview", content: "전체 개요" },
                { id: "production", content: "생산 현황" },
                { id: "quality", content: "품질 지표" },
                { id: "alerts", content: "알림 현황" },
              ],
            },
            {
              id: "analytics",
              content: "분석",
              items: [
                { id: "trends", content: "추세 분석" },
                { id: "performance", content: "성능 분석" },
                { id: "forecast", content: "예측 분석" },
              ],
            },
            {
              id: "reports",
              content: "리포트",
              items: [
                { id: "daily", content: "일일 리포트" },
                { id: "weekly", content: "주간 리포트" },
                { id: "monthly", content: "월간 리포트" },
              ],
            },
          ],
        }}
        hidden={args.hideLnb}
        defaultSelectedItemId="overview"
        defaultOpenPath={["dashboard"]}
        onSelectionChange={(value, data) => {
          console.debug("선택된 메뉴:", value, data)
        }}
      />

      {/* Content Area */}
      <main className="scrollbar-thin bg-page-padding flex-1 overflow-auto">
        <Markdown className="markdown elevation-page-content m-5 max-w-none rounded-md bg-white p-8 py-4 font-sans text-sm">
          {TwoLineHeaderLayoutDescription}
        </Markdown>
      </main>
    </div>

    {/* Footer - flex-shrink-0으로 크기 고정 */}
    <Footer
      theme={args.footerTheme}
      size={args.footerSize}
      className="flex-shrink-0"
      items={[
        { type: "text", content: "Memory Division" },
        { type: "divider" },
        {
          type: "button",
          content: "안전 가이드라인",
          props: { onClick: () => alert("안전 가이드라인 클릭") },
        },
        { type: "link", href: "/quality", content: "품질 규정" },
        { type: "copyright", content: "2025 Samsung" },
      ]}
    />
  </div>
)
