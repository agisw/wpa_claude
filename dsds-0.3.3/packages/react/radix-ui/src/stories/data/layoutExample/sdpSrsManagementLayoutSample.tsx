import { Args } from "@/stories/LayoutExamples.stories"

import { ConfidentialIcon, GearIcon, SemiconductorIcon } from "@/components/icons"
import {
  Button,
  Footer,
  Header,
  PageContent,
  PageContentBody,
  PageContentHeader,
  PageContentTools,
  PageHeader,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui"

import { MatrixCheckTable, SRSListTable } from "./sdpPages/sdpSrsManagementLayoutPage"

/**
 * Header, LNB, Content, Footer로 구성된 가장 일반적인 웹 애플리케이션 레이아웃입니다.
 */

export const sdpSrsManagementLayoutSample = (args: Args) => (
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
    <main className="flex-col-0 flex h-[calc(100vh-40px)] min-h-0 flex-1 overflow-hidden">
      {/* Content Area */}
      <Tabs
        variant="default"
        size="medium"
        defaultValue="matrix-check"
        className="w-full gap-0 [role=tabpanel]:overflow-hidden!"
      >
        <PageHeader title="SRS Management" tooltipContent="SRS Management">
          <div className="flex w-full items-center justify-between">
            <TabsList className="typo-bold-medium w-fit">
              <TabsTrigger value="matrix-check">
                <div className="pt-[10px]">Matrix Check</div>
              </TabsTrigger>
              <TabsTrigger value="srs-list">
                <div className="pt-[10px]">SRS List</div>
              </TabsTrigger>
            </TabsList>
          </div>
        </PageHeader>
        <TabsContent value="matrix-check" className="flex flex-col overflow-hidden">
          <PageContent className="pt-0">
            <PageContentHeader title="Matrix Check" tooltip={{ title: "Tooltip Title", content: "Tooltip Content" }} />
            <PageContentTools>
              <SemiconductorIcon />
              Functional
              <div className="border-tag-progress ml-[8px] h-[10px] w-[10px] bg-[#CCF0F9] text-[#007492]" />
              In Progress
              <div className="border-tag-approval ml-[8px] h-[10px] w-[10px] bg-[#FFE1B5] text-[#AB772A]" />
              In Approval
              <div className="border-tag ml-[8px] h-[10px] w-[10px] bg-[var(--colors-neutral-neutral-04)] text-[var(--colors-neutral-neutral-15))]" />
              Done
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-[8px]"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <rect x="0.5" y="0.5" width="9" height="9" fill="#F7F9FB" stroke="#E4E9ED" />
                <rect x="3" y="5" width="4" height="1" fill="#DADFE4" />
              </svg>
              None
              <div className="mx-[8px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
              <Button size="small" variant="secondary">
                Export
              </Button>
              <Button size="small" variant="secondary" className="ml-auto">
                Table Option
              </Button>
              <div className="mx-[8px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
              진행율/완료율(Coverage): 42/420(10%)
            </PageContentTools>
            <PageContentBody className="overflow-hidden">
              <MatrixCheckTable />
            </PageContentBody>
          </PageContent>
        </TabsContent>
        <TabsContent value="srs-list">
          <PageContent>
            <PageContentHeader title="SRS List" tooltip={{ title: "Tooltip Title", content: "Tooltip Content" }} />
            <PageContentTools>
              <Button
                size="small"
                variant="secondary"
                icon={<div className="h-[12px] w-[12px] rounded-xs border border-[var(--colors-neutral-neutral-09)]" />}
                iconOption="before"
              >
                과거 이력 포함 보기
              </Button>
              <Button
                size="small"
                variant="secondary"
                active
                icon={
                  <div className="bg-brand flex h-[12px] w-[12px] items-center justify-center rounded-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                      <path d="M1 3.72727L3.1875 6L7.5 1.5" stroke="white" stroke-width="1.8" />
                    </svg>
                  </div>
                }
                iconOption="before"
                className="ml-[6px]"
              >
                과거 이력 포함 보기
              </Button>
              <Button size="small" variant="secondary" className="ml-auto">
                Table Option
              </Button>
              <div className="mx-[6px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
              <Button size="small" variant="secondary">
                Export
              </Button>
              <div className="mx-[6px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
              Total: 340
            </PageContentTools>
            <PageContentBody className="overflow-hidden">
              <SRSListTable />
            </PageContentBody>
          </PageContent>
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
