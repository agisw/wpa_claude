"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dsds/react-radix-ui"

export default function MainView() {
  const tabItems = [
    { value: "react", title: "React" },
    { value: "vue", title: "Vue" },
  ]

  return (
    <div className="flex px-4 py-4">
      <div className="container-left mr-10 flex-1">
        <h2 className="mt-1 font-sans text-[36px] leading-9 font-bold">DS 컴포넌트를 한 곳에서, 한번에</h2>
        <div className="my-6">
          DS 표준 디자인 시스템을 준수하는 MES 표준 UI 컴포넌트와 자주 사용되는 레이아웃을
          <br />
          주요 모던 웹 프레임워크(React, Vue)용으로 구현하여, 설치가능한 패키지로 제공합니다.
        </div>
        <Tabs variant="button" defaultValue="react" className="m-[-4px] p-[4px]">
          <TabsList className="border-b-1 border-gray-100 pb-1">
            {tabItems.map((item, i) => (
              <TabsTrigger key={i} value={item.value}>
                <div>{item.title}</div>
              </TabsTrigger>
            ))}
          </TabsList>
          {tabItems.map((item, i) => (
            <TabsContent key={i} value={item.value} className="p-1">
              <div>{item.title} 컴포넌트 소개</div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
