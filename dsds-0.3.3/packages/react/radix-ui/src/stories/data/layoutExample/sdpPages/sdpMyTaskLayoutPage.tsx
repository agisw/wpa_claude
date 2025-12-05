import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { InformationIcon } from "@/components/icons"
import {
  Button,
  Lnb,
  PageContent,
  PageContentBody,
  PageContentHeader,
  PageContentTools,
  Pagination,
  PaginationContent,
  PaginationNumber,
  Tag,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui"

const MyTaskCol1Examples = [
  {
    ersTitle: "Project Overview",
    progress: <Tag title="In Progress" className="border-tag-progress bg-[#CCF0F9] text-[#007492]" />,
    srsTitle: "SRS Concept Test EltrProject Overview",
    support: (
      <div className="flex flex-row items-center gap-1 text-[var(--colors-wafer-blue-wafer-blue-10)]">
        <div className="h-[4px] w-[4px] bg-[var(--colors-wafer-blue-wafer-blue-10)]" />
        Accepted
      </div>
    ),
    assignDate: "2025-08-13",
    lastUpdated: "2025-08-13",
    coWorker: "이삼성, 김섬성",
  },
  {
    ersTitle: "Production",
    progress: <Tag title="In Approval" className="border-tag-approval bg-[#FFE1B5] text-[#AB772A]" />,
    srsTitle: "Production W123",
    support: (
      <div className="flex flex-row items-center gap-1 text-[var(--colors-copper-yellow-cu-yellow-10)]">
        <div className="h-[4px] w-[4px] bg-[var(--colors-copper-yellow-cu-yellow-10)]" />
        Pending
      </div>
    ),
    assignDate: "2025-08-13",
    lastUpdated: "2025-08-13",
    coWorker: "이삼성, 김섬성",
  },
]

const MyTaskCol2Examples = [
  {
    functionTitle: "Project Overview",
    progress: <Tag title="In Progress" className="border-tag-progress bg-[#CCF0F9] text-[#007492]" />,
    linkedErs: "40",
    assignDate: "2025-08-13",
    lastUpdated: "2025-08-13",
    coWorker: "이삼성, 김섬성",
  },
  {
    functionTitle: "Expectation ABCD",
    progress: <Tag title="In Approval" className="border-tag-approval bg-[#FFE1B5] text-[#AB772A]" />,
    linkedErs: "50",
    assignDate: "2025-08-13",
    lastUpdated: "2025-08-13",
    coWorker: "이삼성, 김섬성",
  },
]

const MyTaskCols1 = Array.from({ length: 8 }, (_, i) => {
  // 0 ~ templates.length-1 범위의 인덱스 랜덤 선택
  const randomIndex = Math.floor(Math.random() * MyTaskCol1Examples.length)
  // 새로운 객체로 복사하여 참조 공유 문제 방지
  return { index: i + 1, ...MyTaskCol1Examples[randomIndex] }
})

const MyTaskCols2 = Array.from({ length: 8 }, (_, i) => {
  // 0 ~ templates.length-1 범위의 인덱스 랜덤 선택
  const randomIndex = Math.floor(Math.random() * MyTaskCol2Examples.length)
  // 새로운 객체로 복사하여 참조 공유 문제 방지
  return { index: i + 1, ...MyTaskCol2Examples[randomIndex] }
})

export const MyERSUpperTable = () => (
  <div className="flex flex-1 flex-col overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[53px]">Index</TableHead>
          <TableHead className="w-[241px]">ERS Title</TableHead>
          <TableHead className="w-[74px]">Progress</TableHead>
          <TableHead className="w-[99px]">SRS Title</TableHead>
          <TableHead className="w-[89px]">Support</TableHead>
          <TableHead className="w-[115px]">Assign Date</TableHead>
          <TableHead className="w-[115px]">Last Updated</TableHead>
          <TableHead className="w-[115px]">Co-Worker</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="typo-sok-caption-12-400 max-h-[800px] overflow-auto">
        {MyTaskCols1.map((col) => (
          <TableRow key={col.index}>
            <TableCell>{col.index}</TableCell>
            <TableCell>{col.ersTitle}</TableCell>
            <TableCell>{col.progress}</TableCell>
            <TableCell>{col.srsTitle}</TableCell>
            <TableCell>{col.support}</TableCell>
            <TableCell>{col.assignDate}</TableCell>
            <TableCell>{col.lastUpdated}</TableCell>
            <TableCell>{col.coWorker}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
  </div>
)

export const MyERSLowerTable = () => (
  <div className="flex flex-1 flex-col overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[455px]">Function Title</TableHead>
          <TableHead className="w-[120px]">Progress</TableHead>
          <TableHead className="w-[99px]">Linked ERS</TableHead>
          <TableHead className="w-[99px]">Linked ERS</TableHead>
          <TableHead className="w-[99px]">Linked ERS</TableHead>
          <TableHead className="w-[115px]">Assign Date</TableHead>
          <TableHead className="w-[115px]">Last Updated</TableHead>
          <TableHead className="w-[115px]">Co-Worker</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="typo-sok-caption-12-400 max-h-[800px] overflow-auto">
        {MyTaskCols2.map((col) => (
          <TableRow key={col.index}>
            <TableCell>{col.functionTitle}</TableCell>
            <TableCell>{col.progress}</TableCell>
            <TableCell>{col.linkedErs}</TableCell>
            <TableCell>{col.linkedErs}</TableCell>
            <TableCell>{col.linkedErs}</TableCell>
            <TableCell>{col.assignDate}</TableCell>
            <TableCell>{col.lastUpdated}</TableCell>
            <TableCell>{col.coWorker}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
  </div>
)
export const MyERS = () => {
  return (
    <div className="flex flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[53px]">Index</TableHead>
            <TableHead className="w-[241px]">ERS Title</TableHead>
            <TableHead className="w-[74px]">Progress</TableHead>
            <TableHead className="w-[99px]">SRS Title</TableHead>
            <TableHead className="w-[89px]">Support</TableHead>
            <TableHead className="w-[115px]">Assign Date</TableHead>
            <TableHead className="w-[115px]">Last Updated</TableHead>
            <TableHead className="w-[115px]">Co-Worker</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="typo-sok-caption-12-400 max-h-[800px] overflow-auto">
          {MyTaskCols1.map((col) => (
            <TableRow key={col.index}>
              <TableCell>{col.index}</TableCell>
              <TableCell>{col.ersTitle}</TableCell>
              <TableCell>{col.progress}</TableCell>
              <TableCell>{col.srsTitle}</TableCell>
              <TableCell>{col.support}</TableCell>
              <TableCell>{col.assignDate}</TableCell>
              <TableCell>{col.lastUpdated}</TableCell>
              <TableCell>{col.coWorker}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

      <div className="h-[1px] w-full bg-[var(--color-border-border-2-outer)]" />

      <div className="typo-sok-h6-14-700 flex flex-row items-center gap-[4px] py-[12px]">
        Assigned Function
        <Tooltip place="bottom-start">
          <TooltipTrigger>
            <InformationIcon />
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-bold">Tooltip Title</p>
            <p>Tooltip Content</p>
          </TooltipContent>
        </Tooltip>{" "}
      </div>
      <div className="typo-sok-footnote-11-400 flex flex-row items-center gap-[4px] pb-[8px] text-[var(--colors-neutral-neutral-15)]">
        <Button size="small" variant="secondary">
          Function Management 바로가기
        </Button>
        <div className="text-neutral-3rd ml-auto flex flex-row items-center">Total: n개</div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[455px]">Function Title</TableHead>
            <TableHead className="w-[120px]">Progress</TableHead>
            <TableHead className="w-[99px]">Linked ERS</TableHead>
            <TableHead className="w-[99px]">Linked ERS</TableHead>
            <TableHead className="w-[99px]">Linked ERS</TableHead>
            <TableHead className="w-[115px]">Assign Date</TableHead>
            <TableHead className="w-[115px]">Last Updated</TableHead>
            <TableHead className="w-[115px]">Co-Worker</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="typo-sok-caption-12-400 max-h-[800px] overflow-auto">
          {MyTaskCols2.map((col) => (
            <TableRow key={col.index}>
              <TableCell>{col.functionTitle}</TableCell>
              <TableCell>{col.progress}</TableCell>
              <TableCell>{col.linkedErs}</TableCell>
              <TableCell>{col.linkedErs}</TableCell>
              <TableCell>{col.linkedErs}</TableCell>
              <TableCell>{col.assignDate}</TableCell>
              <TableCell>{col.lastUpdated}</TableCell>
              <TableCell>{col.coWorker}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    </div>
  )
}

export const InterestERS = () => {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden bg-white">
      {/* Simple Tree LNB */}
      <Lnb
        selectedItemId="ers-list-title1"
        data={{
          title: "ERS 구독 List",
          items: [
            {
              id: "ers-list-title1",
              content: "ERS List Title",
              type: "item",
            },
            {
              id: "ers-list-title2",
              content: "ERS List Title",
              type: "item",
            },

            {
              id: "ers-list-title3",
              content: "ERS List Title",
              type: "item",
            },

            {
              id: "ers-list-title4",
              content: "ERS List Title",
              type: "item",
            },

            {
              id: "ers-list-title5",
              content: "ERS List Title",
              type: "item",
            },
          ],
        }}
        withoutAccordion={true}
      />
      <PageContent className="scrollbar-thin overflow-y-auto">
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
    </div>
  )
}
