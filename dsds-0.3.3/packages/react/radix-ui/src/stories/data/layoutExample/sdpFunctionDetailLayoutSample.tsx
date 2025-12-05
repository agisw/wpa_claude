import { Args } from "@/stories/LayoutExamples.stories"

import { ConfidentialIcon, GearIcon } from "@/components/icons"
import {
  Button,
  DetailPageContent,
  DetailPageContentHeader,
  DetailPageHeader,
  Footer,
  Header,
  Lnb,
  Page,
} from "@/components/ui"

import { LoremIpsumContent } from "./_components/LoremIpsum"

/**
 * Header, LNB, Content, Footer로 구성된 가장 일반적인 웹 애플리케이션 레이아웃입니다.
 */

export const sdpFunctionDetailLayoutSample = (args: Args) => (
  <div className="flex h-screen w-full flex-col overflow-hidden">
    {/* Header */}
    <Header
      logo="SDP"
      theme={args.headerTheme}
      style={{ "--color-header-bg": "var(--colors-gate-purple-gate-purple-11)" } as React.CSSProperties}
      size={args.headerSize}
      gnb={[
        { content: "SENSDES-RND", items: [{ content: "테넌트 관리", value: "tenant" }], type: "tenant" },
        { type: "divider" },
        {
          type: "menu",
          content: "My Task",
          items: [
            { content: "API 문서", value: "api" },
            { content: "가이드", value: "guide" },
          ],
        },
        {
          type: "menu",
          content: "Management",
          items: [
            { content: "API 문서", value: "api" },
            { content: "가이드", value: "guide" },
          ],
        },
        {
          type: "menu",
          content: "Test Design",
          items: [
            { content: "API 문서", value: "api" },
            { content: "가이드", value: "guide" },
          ],
        },
      ]}
      utility={[
        { type: "button", content: "알림", props: { notiCount: args.notiCount } },
        { type: "button", content: "User Guide" },
        { type: "button", content: "VOC" },
        { type: "button", content: "Confluence" },
        { type: "button", content: "Jira" },
        { type: "divider" },
        { type: "button", content: "Admin" },
        {
          type: "button",
          content: "이삼성",
          props: {
            className: "mr-[-8px]",
            icon: <GearIcon />,
            iconOption: "after",
            onClick: () => {},
          },
        },
        {
          content: <ConfidentialIcon color="dark" />,
          props: {
            className: "ml-auto pl-1 flex flex-col justify-center",
          },
          type: "custom",
        },
      ]}
    />

    {/* Main Layout Container - flex-1으로 남은 공간을 차지하고 min-h-0으로 shrink 허용 */}
    <main className="flex h-[calc(100vh-40px)] min-h-0 flex-1 overflow-hidden">
      {/* Simple Tree LNB */}

      {/* Content Area */}
      <Page>
        <DetailPageHeader
          title="Function Detail Title"
          className="border-b border-[var(--color-border-btn-2ndary-border-default)]"
          tooltipContent="This is a tooltip"
          children={<Button>Create SRS</Button>}
        />
        <div className="typo-sok-h6-14-700 flex flex-row items-center border-b border-[var(--color-border-btn-2ndary-border-default)] bg-white p-[15px]">
          <div className="mr-auto">SOR List</div>
          <div className="flex flex-row items-center gap-[6px]">
            <Button size="small">Edit</Button>
            <div className="h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
            <Button variant="secondary" size="small">
              Export PDF
            </Button>
            <Button variant="secondary" size="small">
              Load Template
            </Button>
            <Button variant="secondary" size="small">
              Version History
            </Button>
          </div>
        </div>

        <div className="flex flex-row overflow-hidden">
          <Lnb
            className="h-[calc(100vh-150px)] bg-white"
            selectedItemId="3-2-2"
            data={{
              items: [
                {
                  id: "1",
                  content: "1. Overview",
                  items: [],
                },
                {
                  id: "2",
                  content: "2. Summary",
                  items: [],
                },
                {
                  id: "3",
                  content: "3. Change Point",
                  items: [
                    {
                      id: "3-1",
                      content: "3.1 Block Diagram",
                      items: [],
                    },
                    {
                      id: "3-2",
                      content: "3.2 Block Features",
                      items: [
                        {
                          id: "3-2-1",
                          content: "3.2.1 Detail A",
                          type: "item",
                        },
                        {
                          id: "3-2-2",
                          content: "3.2.2 Detail B001A",
                          type: "item",
                        },
                        {
                          id: "3-2-3",
                          content: "3.2.3 Detail C",
                          type: "item",
                        },
                        {
                          id: "3-2-4",
                          content: "3.2.4 Detail D",
                          type: "item",
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "4",
                  content: "4. Interface",
                  items: [],
                },
                {
                  id: "5",
                  content: "5. Data Flow",
                  items: [],
                },
              ],
            }}
          />
          <DetailPageContent>
            <DetailPageContentHeader title="3.2.2 Detail B001A" />
            <LoremIpsumContent className="flex-1" />
          </DetailPageContent>
        </div>
      </Page>
    </main>

    {/* Footer - flex-shrink-0으로 크기 고정 */}
    <Footer
      theme={args.footerTheme}
      size={args.footerSize || "compact"}
      className="flex-shrink-0"
      items={[
        { type: "link", href: "/", content: "Textinputplace" },
        { type: "link", href: "/", content: "개인정보 처리방침" },
        { type: "link", href: "/", content: "이용약관" },
        { type: "copyright", content: "2025 Samsung" },
      ]}
    />
  </div>
)
