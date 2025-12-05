import { Args } from "@/stories/LayoutExamples.stories"

import { ScrollableTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { ChevronDownIcon, ConfidentialIcon, GearIcon } from "@/components/icons"
import {
  Button,
  Footer,
  Header,
  Page,
  PageContent,
  PageContentTools,
  PageHeader,
  Pagination,
  PaginationContent,
  PaginationNumber,
} from "@/components/ui"

/**
 * Header, LNB, Content, Footer로 구성된 가장 일반적인 웹 애플리케이션 레이아웃입니다.
 */

const FunctionComplianceColExamples = [
  {
    comTrackerId: "ABDD-MCKA-04",
    sortOrder: "1",
    ersReqId: "ABDD-MCKA-04",
    siRevision: "AA",
    category: "",
    description: "The Sensor",
    vendorAcceptance: "Accepted",
    comDetails: "[PM(과제PL) - Accepted]",
    srsIndex: "[SRS-63]",
    comDetailsCustomer: "[PM(과제PL) - Accepted]",
  },
]

const ComplianceMatrixCols = Array.from({ length: 30 }, (_, i) => {
  // 0 ~ templates.length-1 범위의 인덱스 랜덤 선택
  const randomIndex = Math.floor(Math.random() * FunctionComplianceColExamples.length)
  // 새로운 객체로 복사하여 참조 공유 문제 방지
  return { index: i + 1, ...FunctionComplianceColExamples[randomIndex] }
})

export const sdpComplianceMatrixLayoutSample = (args: Args) => (
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
      <Page>
        <PageHeader title="Compliance Matrix" tooltipContent="This is a tooltip" />
        <PageContent className="pb-0">
          <PageContentTools>
            <Button size="small" variant="secondary">
              Import
            </Button>
            <Button size="small" variant="secondary">
              Export
            </Button>
            <div className="mx-[2px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
            <Button size="small" variant="secondary">
              History
            </Button>
            <Button size="small" variant="secondary" className="ml-auto">
              Table Option
            </Button>
            <div className="mx-[2px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
            <Button size="small" variant="secondary" iconOption="after" icon={<ChevronDownIcon />}>
              30개씩 보기
            </Button>
            <div className="mx-[2px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
            Total: 340
          </PageContentTools>
          <ScrollableTable className="flex-1">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[53px]">Compliance Tracker ID</TableHead>
                <TableHead className="w-[241px]">Sort Order</TableHead>
                <TableHead className="w-[74px]">ERS Requirement ID</TableHead>
                <TableHead className="w-[99px]">Silicon Revision</TableHead>

                <TableHead className="w-[115px]">Category</TableHead>
                <TableHead className="w-[115px]">Description</TableHead>
                <TableHead className="w-[115px]">Vendor Acceptance</TableHead>
                <TableHead className="w-[115px]">Compliance Details</TableHead>
                <TableHead className="w-[115px]">SRS Index</TableHead>
                <TableHead className="w-[115px]">Compliance Details(Customer Comment)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="typo-sok-caption-12-400 max-h-[800px] overflow-auto">
              {ComplianceMatrixCols.map((col) => (
                <TableRow key={col.index}>
                  <TableCell>{col.comTrackerId}</TableCell>
                  <TableCell>{col.sortOrder}</TableCell>
                  <TableCell>{col.ersReqId}</TableCell>
                  <TableCell>{col.siRevision}</TableCell>
                  <TableCell>{col.category}</TableCell>
                  <TableCell>{col.description}</TableCell>
                  <TableCell>{col.vendorAcceptance}</TableCell>
                  <TableCell>{col.comDetails}</TableCell>
                  <TableCell>{col.srsIndex}</TableCell>
                  <TableCell>{col.comDetailsCustomer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ScrollableTable>
          <Pagination className="mt-[12px] mb-[16px]">
            <PaginationContent isDot={false}>
              <PaginationNumber chevron="first" href="" />
              <PaginationNumber chevron="left" href="" />
              {Array.from({ length: 10 }, (_, i) => i + 1).map((page) => (
                <PaginationNumber key={page} page={page} href="" isSelected={page === 1} />
              ))}
              <PaginationNumber chevron="right" href="" />
              <PaginationNumber chevron="last" href="" />
            </PaginationContent>
          </Pagination>
        </PageContent>
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
