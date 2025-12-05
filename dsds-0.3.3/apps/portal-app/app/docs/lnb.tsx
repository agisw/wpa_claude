"use client"

import { usePathname, useRouter } from "next/navigation"
import { Lnb } from "@dsds/react-radix-ui"

export const LnbNavigation = () => {
  const router = useRouter()
  const pathname = usePathname()

  // 프로그래밍적 방식으로 routeMap 생성 (개선된 버전)
  const generateRouteMap = (): Record<string, string> => {
    const map: Record<string, string> = { home: "/" }

    // ID를 파싱하여 경로 생성하는 함수
    const parseIdToPath = (id: string): string | null => {
      const parts = id.split(":")
      if (parts.length >= 2) {
        const [prefix, ...suffixes] = parts
        const prefixParts = prefix.split("-")
        if (prefixParts.length >= 2) {
          const framework = prefixParts[1]
          const section = prefixParts.length > 2 ? prefixParts.slice(2).join("-") : ""
          const item = suffixes.join(":")
          if (section) {
            return `/docs/${framework}/${section}/${item}`
          } else {
            return `/docs/${framework}/${item}`
          }
        }
      }
      return null
    }

    // 프레임워크별 라우팅 생성 함수
    const createRoutes = (framework: string, specialMappings: Record<string, string> = {}) => {
      const baseRoutes = {
        "getting-started": "getting-started",
        installation: "install-guide",
        "quick-start": "quick-start",
        configuration: "configuration",
        components: "components",
        buttons: "buttons",
        forms: "forms",
        layout: "layout",
      }

      const routes: Record<string, string> = {}
      Object.entries(baseRoutes).forEach(([key, defaultPath]) => {
        const path = specialMappings[key] || defaultPath
        routes[`docs-${framework}:${key}`] = `/docs/${framework}/${path}`
      })

      return routes
    }

    // 공통 특수 매핑
    const commonSpecialMappings = { installation: "install-guide" }
    const frameworks = ["react", "vue"]

    // routeMap 생성
    const routeMap = { home: "/" }
    frameworks.forEach((framework) => {
      Object.assign(routeMap, createRoutes(framework, commonSpecialMappings))
    })

    Object.entries(routeMap).forEach(([id, path]) => {
      map[id] = path
    })

    // 새로운 패턴 지원을 위한 예시 ID들 (데이터 구조 변경 시 사용)
    const newPatternIds = [
      "docs-react-components:buttons",
      "docs-react-components:forms",
      "docs-react-components:layouts",
    ]

    newPatternIds.forEach((id) => {
      const path = parseIdToPath(id)
      if (path) {
        map[id] = path
      }
    })

    return map
  }

  const routeMap = generateRouteMap()

  // 역매핑 객체 생성
  const reverseRouteMap: Record<string, string> = Object.fromEntries(
    Object.entries(routeMap).map(([key, value]) => [value, key])
  )

  const handleSelectionChange = (itemId: string) => {
    const path = routeMap[itemId]
    if (path) {
      router.push(path)
    }
  }

  const getCurrentSelectedId = () => {
    return reverseRouteMap[pathname] || "home"
  }

  return (
    <Lnb
      defaultSelectedItemId={getCurrentSelectedId()}
      onSelectionChange={handleSelectionChange}
      data={{
        title: "문서",
        items: [
          {
            id: "docs-react:home-group",
            content: "홈",
            items: [
              {
                id: "home",
                content: "소개",
              },
            ],
          },
          {
            id: "docs-react",
            content: "React Radix UI",
            items: [
              {
                content: "가이드",
                id: "docs-react:guide-group",
                items: [
                  { id: "docs-react:getting-started", content: "시작하기", type: "item" },
                  { id: "docs-react:installation", content: "설치", type: "item" },
                  { id: "docs-react:quick-start", content: "빠른 시작", type: "item" },
                  { id: "docs-react:configuration", content: "설정", type: "item" },
                ],
              },
              {
                id: "docs-react:components-group",
                content: "컴포넌트",
                items: [
                  { id: "docs-react:components", content: "소개", type: "item" },
                  { id: "docs-react-components:buttons", content: "버튼", type: "item" },
                  { id: "docs-react-components:forms", content: "폼", type: "item" },
                  { id: "docs-react-components:layouts", content: "레이아웃", type: "item" },
                ],
              },
            ],
          },
          {
            id: "docs-vue",
            content: "Vue / Vuetify",
            items: [
              {
                content: "가이드",
                id: "docs-vue:guide-group",
                items: [
                  { id: "docs-vue:getting-started", content: "시작하기", type: "item" },
                  { id: "docs-vue:installation", content: "설치", type: "item" },
                  { id: "docs-vue:quick-start", content: "빠른 시작", type: "item" },
                ],
              },
            ],
          },
        ],
      }}
    />
  )
}
