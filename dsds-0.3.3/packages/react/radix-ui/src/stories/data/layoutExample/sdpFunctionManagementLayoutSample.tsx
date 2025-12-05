import { Args } from "@/stories/LayoutExamples.stories"

import { ScrollableTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { ConfidentialIcon, GearIcon, InformationIcon, PdfIcon } from "@/components/icons"
import {
  Button,
  Footer,
  Header,
  Page,
  PageContent,
  PageContentTools,
  PageHeader,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui"

/**
 * Header, LNB, Content, Footer로 구성된 가장 일반적인 웹 애플리케이션 레이아웃입니다.
 */

const FunctionManagementColExamples = [
  {
    title: "Preview",
    assignee: "이삼성",
    coWorker: "김삼성",
    linkedErs: "5",
    relatedErs: "3",
    features: "1",
    sor: (
      <Button variant="secondary" size="small">
        View SOR
      </Button>
    ),
    microArch: (
      <Button variant="secondary" size="small">
        View μARCH
      </Button>
    ),
    import: (
      <Button variant="secondary" size="small">
        Import Function
      </Button>
    ),
  },
]

const FunctionManagementCols = Array.from({ length: 30 }, (_, i) => {
  // 0 ~ templates.length-1 범위의 인덱스 랜덤 선택
  const randomIndex = Math.floor(Math.random() * FunctionManagementColExamples.length)
  // 새로운 객체로 복사하여 참조 공유 문제 방지
  return { index: i + 1, ...FunctionManagementColExamples[randomIndex] }
})

export const sdpFunctionManagementLayoutSample = (args: Args) => (
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
        <PageHeader title="Function Management" tooltipContent="Function Management" />
        <PageContent>
          <PageContentTools>
            <Button size="small" variant="secondary" className="ml-auto" iconOption="before" icon={<PdfIcon />}>
              다운로드
            </Button>
            <div className="mx-[6px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
            Total: 340
          </PageContentTools>
          <ScrollableTable>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[53px]">Title</TableHead>
                <TableHead className="w-[241px]">Assignee</TableHead>
                <TableHead className="w-[74px]">Co-Worker</TableHead>
                <TableHead className="w-[99px]">
                  <div className="flex flex-row items-center gap-[2px]">
                    Linked ERS
                    <Tooltip place="bottom-start">
                      <TooltipTrigger>
                        <InformationIcon />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-bold">Tooltip Title</p>
                        <p>Tooltip Content</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="w-[89px]">
                  <div className="flex flex-row items-center gap-[2px]">
                    Linked ERS
                    <Tooltip place="bottom-start">
                      <TooltipTrigger>
                        <InformationIcon />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-bold">Tooltip Title</p>
                        <p>Tooltip Content</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="w-[115px]">Features</TableHead>
                <TableHead className="w-[115px]">SOR</TableHead>
                <TableHead className="w-[115px]">μARCH</TableHead>
                <TableHead className="w-[115px]">Import</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="typo-sok-caption-12-400 overflow-auto">
              {FunctionManagementCols.map((col) => (
                <TableRow key={col.index}>
                  <TableCell>{col.title}</TableCell>
                  <TableCell>{col.assignee}</TableCell>
                  <TableCell>{col.coWorker}</TableCell>
                  <TableCell>{col.linkedErs}</TableCell>
                  <TableCell>{col.relatedErs}</TableCell>
                  <TableCell>{col.features}</TableCell>
                  <TableCell>{col.sor}</TableCell>
                  <TableCell>{col.microArch}</TableCell>
                  <TableCell>{col.import}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ScrollableTable>
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
