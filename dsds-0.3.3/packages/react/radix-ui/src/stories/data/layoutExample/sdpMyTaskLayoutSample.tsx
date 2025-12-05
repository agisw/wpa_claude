import { Args } from "@/stories/LayoutExamples.stories"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { ChevronDownIcon, ConfidentialIcon, GearIcon } from "@/components/icons"
import {
  Button,
  Footer,
  Header,
  Modal,
  ModalClose,
  PageContent,
  PageContentBody,
  PageContentHeader,
  PageContentTools,
  PageHeader,
  Searchbox,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui"

import { InterestERS, MyERSLowerTable, MyERSUpperTable } from "./sdpPages/sdpMyTaskLayoutPage"

/**
 * Header, LNB, Content, Footer로 구성된 가장 일반적인 웹 애플리케이션 레이아웃입니다.
 */

const modalContent = (
  <div className="w-full">
    <Searchbox className="w-fit" placeholder="ERS 제목을 검색하세요." />
    <Table className="mt-[6px]">
      <TableHeader>
        <TableRow>
          <TableHead>Index</TableHead>
          <TableHead>ERS Title</TableHead>
          <TableHead>Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="typo-sok-caption-12-400 max-h-[800px] overflow-auto">
        {Array.from({ length: 5 }, (_, index) => (
          <TableRow key={index}>
            <TableCell>1.1.{index + 2}</TableCell>
            <TableCell>Project Overview</TableCell>
            <TableCell>2025-10-13</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div className="my-[20px] flex w-full items-center justify-center">
      <Button variant="secondary" icon={<ChevronDownIcon />} />
    </div>
    <p>추가된 List</p>
    <Table className="mt-[6px]">
      <TableHeader>
        <TableRow>
          <TableHead>Index</TableHead>
          <TableHead>ERS Title</TableHead>
          <TableHead>Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="typo-sok-caption-12-400 max-h-[800px] overflow-auto">
        {Array.from({ length: 5 }, (_, index) => (
          <TableRow key={index}>
            <TableCell>1.1.{index + 2}</TableCell>
            <TableCell>Project Overview</TableCell>
            <TableCell>2025-10-13</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)

const modalFooter = (
  <div className="flex h-[60px] items-center justify-end gap-[6px]">
    <ModalClose>
      <Button variant="primary">저장</Button>
    </ModalClose>
    <ModalClose>
      <Button variant="secondary">닫기</Button>
    </ModalClose>
  </div>
)

export const sdpMyTaskLayoutSample = (args: Args) => (
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
        defaultValue="my-ers"
        className="w-full gap-0 [role=tabpanel]:overflow-hidden!"
      >
        <PageHeader title="My Task" tooltipContent="My Task">
          <div className="flex w-full items-center justify-between">
            <TabsList className="typo-bold-medium w-fit">
              <TabsTrigger value="my-ers">
                <div className="pt-[10px]">나의 ERS</div>
              </TabsTrigger>
              <TabsTrigger value="favorite-ers">
                <div className="pt-[10px]">관심 ERS</div>
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto">
              <Modal
                title="관심 ERS 추가"
                size="sm"
                content={modalContent}
                trigger={
                  <Button variant="secondary" size="small" className="">
                    관심 ERS 추가
                  </Button>
                }
                footer={modalFooter}
                // className={className}
              />
            </div>
          </div>
        </PageHeader>
        <TabsContent value="my-ers" className="flex flex-col overflow-hidden">
          <PageContent className="scrollbar-thin overflow-y-auto pt-0">
            <PageContentBody>
              <PageContentHeader
                title="Assigned ERS-SRS"
                tooltip={{ title: "Tooltip Title", content: "Tooltip Content" }}
              />
              <PageContentTools>
                <Button size="small" variant="secondary">
                  Matrix Check 바로가기
                </Button>
                <div className="text-neutral-3rd ml-auto flex flex-row items-center">
                  Total: 24
                  <div className="mx-[8px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
                  In Progress: 12 In Approval: 1 Done: 11
                </div>
              </PageContentTools>
              <MyERSUpperTable />
              <div className="h-[1px] w-full bg-[var(--color-border-border-2-outer)]" />
              <PageContentHeader
                title="Assigned Function"
                tooltip={{ title: "Tooltip Title", content: "Tooltip Content" }}
              />
              <PageContentTools>
                <Button size="small" variant="secondary">
                  Function Management 바로가기
                </Button>
                <div className="text-neutral-3rd ml-auto flex flex-row items-center">Total: n개</div>
              </PageContentTools>
              <MyERSLowerTable />
            </PageContentBody>
          </PageContent>
        </TabsContent>
        <TabsContent value="favorite-ers" className="flex flex-col overflow-hidden">
          <InterestERS />
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
