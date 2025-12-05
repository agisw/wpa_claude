import { Args } from "@/stories/LayoutExamples.stories"

import { ConfidentialIcon, GearIcon } from "@/components/icons"
import {
  Button,
  DetailPageContent,
  DetailPageContentHeader,
  Footer,
  Header,
  PageContent,
  PageContentHeader,
  PageContentTools,
  PageHeader,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui"

import { LoremIpsumContent } from "./_components/LoremIpsum"
import { ERSCompare, ERSListTable } from "./sdpPages/sdpErsManagementLayoutPage"

/**
 * Header, LNB, Content, Footer로 구성된 가장 일반적인 웹 애플리케이션 레이아웃입니다.
 */

export const sdpErsManagementLayoutSample = (args: Args) => (
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
      {/* Content Area */}
      <Tabs
        variant="default"
        size="medium"
        defaultValue="ers-list"
        className="w-full gap-0 [role=tabpanel]:overflow-hidden!"
      >
        <PageHeader title="ERS Management" tooltipContent="ERS Management">
          <div className="flex w-full items-center justify-between">
            <TabsList className="typo-bold-medium w-fit">
              <TabsTrigger value="ers-list">
                <div className="pt-[10px]">ERS List</div>
              </TabsTrigger>
              <TabsTrigger value="ers-compare">
                <div className="pt-[10px]">ERS Compare</div>
              </TabsTrigger>
            </TabsList>
            <Button className="typo-sok-body-14-400" size="small" variant="secondary">
              Parse ERS File
            </Button>
          </div>
        </PageHeader>
        <TabsContent value="ers-list" className="flex flex-col overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
              <PageContent className="pt-0">
                <PageContentHeader title="ERS List" tooltip={{ title: "Tooltip Title", content: "Tooltip Content" }}>
                  <PageContentTools>
                    <Button size="small" variant="secondary">
                      Add Index
                    </Button>
                    <div className="mx-[6px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
                    <Button size="small" variant="secondary">
                      Version History
                    </Button>
                    <div className="text-neutral-3rd ml-auto flex flex-row items-center">
                      Total: 24
                      <div className="mx-[8px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
                      In Progress: 12 In Approval: 1 Done: 11
                    </div>
                  </PageContentTools>
                </PageContentHeader>
                <ERSListTable className="flex-1" />
              </PageContent>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="flex">
              <DetailPageContent>
                <DetailPageContentHeader title="1.2.2.2 Expectation BCDF">
                  <Button variant="secondary" size="small" className="mr-[13px]">
                    Q&A View(2/3)
                  </Button>
                  <Button variant="secondary" size="small" disabled>
                    Edit
                  </Button>
                </DetailPageContentHeader>
                <LoremIpsumContent className="flex-1" />
              </DetailPageContent>
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>
        <TabsContent value="ers-compare" className="flex flex-col overflow-hidden">
          <ERSCompare />
        </TabsContent>
      </Tabs>
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
