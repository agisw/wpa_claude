import { useState } from "react"
import { Button, Header, Lnb } from "@dsds/react-radix-ui"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex h-screen w-full flex-col">
      <Header
        gnb={[
          {
            content: "기흥/화성",
            items: [
              {
                content: "기흥/화성",
                value: "gh",
              },
              {
                content: "평택",
                value: "pt",
              },
            ],
            type: "tenant",
          },
          {
            type: "divider",
          },
          {
            content: "대시보드",
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
            type: "menu",
          },
        ]}
        logo="MyApp"
        size="cozy"
        theme="dark"
        utility={[
          {
            type: "searchbox",
          },
          {
            content: "알림",
            props: {
              badge: true,
            },
            type: "button",
          },
          {
            content: "도움말",
            href: "/help",
            type: "link",
          },
          {
            type: "divider",
          },
          {
            props: {
              alt: "User Avatar",
              className: "w-8 h-8 rounded-full",
              src: "https://github.com/shadcn.png",
            },
            type: "image",
          },
        ]}
      />
      <div className="flex flex-1 overflow-hidden">
        <Lnb
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
            ],
          }}
        />
        <main className="scrollbar-thin flex-1 overflow-auto bg-gray-50">
          <div className="flex h-full w-full flex-col items-center justify-center p-4">
            <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
