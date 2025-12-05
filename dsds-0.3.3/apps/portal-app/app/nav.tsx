"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Footer, Header } from "@dsds/react-radix-ui"

export const HeaderNavigation: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()

  const getActiveTabFromPath = (pathname: string) => {
    // 가장 마지막 슬래시를 기준으로 좌, 우 문자열을 나눔
    pathname = pathname.replace(/^\//, "") // 맨 앞의 슬래시 제거
    const lastSlashIndex = pathname.lastIndexOf("/")
    if (lastSlashIndex === -1) return "home" // 슬래시가 없는 경우 홈으로 처리

    // 마지막 슬래시 기준 좌측 문자열을 Tab의 value로 사용
    // 우측 문자열은 페이지 이름으로 사용
    // 예: docs/react/getting-started → docs-react:getting-started
    // 예: docs/vue/components/buttons → docs-vue:components/buttons

    const tabValue = pathname.substring(0, lastSlashIndex).replace(/\//g, "-")
    const pageName = pathname.substring(lastSlashIndex + 1)

    console.log("Tab Value:", tabValue, "Page Name:", pageName)

    // 슬래시를 대시('-') 로 변경하여 Tab 내 선택된 메뉴로 치환
    return `${tabValue}:${pageName}`
  }

  const [activeTab, setActiveTab] = useState(getActiveTabFromPath(pathname))

  useEffect(() => {
    setActiveTab(getActiveTabFromPath(pathname))
  }, [pathname])

  return (
    <Header
      logo="DSDS Portal"
      theme="dark"
      withTabs
      onLogoClick={() => router.push("/")}
      gnb={[
        {
          content: "Tenant",
          items: [
            {
              content: "메인 대시보드",
              value: "main",
            },
            {
              content: "분석 대시보드",
              value: "analytics",
            },
          ],
          type: "tenant",
        },
      ]}
      utility={[
        {
          type: "searchbox",
        },
        {
          content: "알림",
          props: {
            notiCount: 1,
          },
          type: "button",
        },
        {
          content: "도움말",
          href: "/help",
          type: "link",
        },
      ]}
      tabs={[
        {
          type: "menu",
          content: "홈",
          value: "home",
          items: [],
        },
        {
          type: "menu",
          value: "docs",
          content: "문서",
          items: [
            {
              value: "docs-react:getting-started",
              content: "React / Radix-UI 시작하기",
            },
            {
              value: "docs-vue:getting-started",
              content: "Vue / Vuetify 시작하기",
            },
          ],
        },
      ]}
      onTabSelect={(value) => {
        setActiveTab(value)
        if (value === "home") {
          router.push("/")
          return
        }
        const [parentPaths, pageName] = value.split(":")
        const parentPath = "/" + parentPaths.replace(/-/g, "/")
        router.push(`${parentPath}/${pageName}`)
      }}
      activeTab={activeTab}
    />
  )
}

export const FooterNavigation: React.FC = (props: { size?: "cozy" | "compact"; align?: "center" | "right" }) => {
  return (
    <Footer
      size={props.size}
      className="flex-shrink-0"
      align={props.align}
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
  )
}
