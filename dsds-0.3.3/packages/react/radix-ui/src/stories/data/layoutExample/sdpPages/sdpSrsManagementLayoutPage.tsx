import { ScrollableTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { SemiconductorIcon } from "@/components/icons"
import { Tag } from "@/components/ui"

const MatrixCheckColExamples = [
  {
    ersTitle: "Project Overview",
    progress: "40",
    updated: "2025-08-13",
    support: (
      <div className="flex flex-row items-center gap-1 text-[var(--colors-wafer-blue-wafer-blue-10)]">
        <div className="h-[4px] w-[4px] bg-[var(--colors-wafer-blue-wafer-blue-10)]" />
        Accepted
      </div>
    ),
    apsElectric: <Tag title="-" className="border-tag-none bg-[#FAFBFC] text-[#B2B6BB]" />,
    apsOptic: "",
    analog: <Tag title="-" className="border-tag-none bg-[#FAFBFC] text-[#B2B6BB]" />,
    digital: (
      <Tag
        title="이삼성 외 1명"
        icon={<SemiconductorIcon color="#007492" />}
        className="border-tag-progress bg-[#CCF0F9] text-[#007492]"
      />
    ),
    fw: "",
    alpdp: <Tag title="-" className="border-tag-none bg-[#FAFBFC] text-[#B2B6BB]" />,
    pm: <Tag title="-" className="border-tag-none bg-[#FAFBFC] text-[#B2B6BB]" />,
  },
  {
    ersTitle: "Project Overview",
    progress: "40",
    updated: "2025-08-13",
    support: (
      <div className="flex flex-row items-center gap-1 text-[var(--colors-wafer-blue-wafer-blue-10)]">
        <div className="h-[4px] w-[4px] bg-[var(--colors-wafer-blue-wafer-blue-10)]" />
        Accepted
      </div>
    ),
    apsElectric: <Tag title="-" className="border-tag-none bg-[#FAFBFC] text-[#B2B6BB]" />,
    apsOptic: "",
    analog: <Tag title="-" className="border-tag-none bg-[#FAFBFC] text-[#B2B6BB]" />,
    digital: (
      <Tag
        title="이삼성 외 1명"
        icon={<SemiconductorIcon color="#007492" />}
        className="border-tag-progress bg-[#CCF0F9] text-[#007492]"
      />
    ),
    fw: "",
    alpdp: <Tag title="-" className="border-tag-none bg-[#FAFBFC] text-[#B2B6BB]" />,
    pm: <Tag title="-" className="border-tag-none bg-[#FAFBFC] text-[#B2B6BB]" />,
  },
  {
    ersTitle: "Expectation ABCD",
    progress: "50",
    updated: "2025-10-13",
    support: (
      <div className="flex flex-row items-center gap-1 text-[var(--colors-copper-yellow-cu-yellow-10)]">
        <div className="h-[4px] w-[4px] bg-[var(--colors-copper-yellow-cu-yellow-10)]" />
        Pending
      </div>
    ),
    apsElectric: "",
    apsOptic: (
      <Tag
        title="이삼성 외 1명"
        icon={<SemiconductorIcon color="#AB772A" />}
        className="border-tag-approval bg-[#FFE1B5] text-[#AB772A]"
      />
    ),
    analog: <Tag title="-" className="border-tag-none bg-[#FAFBFC] text-[#B2B6BB]" />,
    digital: <Tag title="-" className="border-tag-none bg-[#FAFBFC] text-[#B2B6BB]" />,
    fw: <Tag title="-" className="border-tag-none bg-[#FAFBFC] text-[#B2B6BB]" />,
    alpdp: "",
    pm: "",
  },
  {
    ersTitle: "Expectation EFGHI",
    progress: "50",
    updated: "2025-10-13",
    support: (
      <div className="flex flex-row items-center gap-1 text-[var(--colors-oxygen-red-o-red-10)]">
        <div className="h-[4px] w-[4px] bg-[var(--colors-oxygen-red-o-red-10)]" />
        Rejected
      </div>
    ),
    apsElectric: <Tag title="-" className="border-tag-none bg-[#FAFBFC] text-[#B2B6BB]" />,
    apsOptic: "",
    analog: "",
    digital: "",
    fw: <Tag title="이삼성 외 1명" icon={<SemiconductorIcon />} />,
    alpdp: <Tag title="-" className="border-tag-none bg-[#FAFBFC] text-[#B2B6BB]" />,
    pm: "",
  },
  {
    ersTitle: "Purpose",
    progress: "",
    updated: "",
    support: "",
    apsElectric: "",
    apsOptic: "",
    analog: "",
    digital: "",
    fw: "",
    alpdp: "",
    pm: "",
  },
]

const SRSListColExamples = [
  {
    srsTitle: "SRS Title Name 955",
    linkedErs: "1.8 Specification Notes 86",
    usedDate: "2025-10-13",
    support: (
      <div className="flex flex-row items-center gap-1 text-[var(--colors-wafer-blue-wafer-blue-10)]">
        <div className="h-[4px] w-[4px] bg-[var(--colors-wafer-blue-wafer-blue-10)]" />
        Accepted
      </div>
    ),
    supportComment: "진행을 위해 Accept 합니다.",
    department: "Analog",
    assignee: "Samsung.lee",
    expected: "ATOPP55",
  },
  {
    srsTitle: "SRS Title Name 955",
    linkedErs: "1.8 Specification Notes 86",
    usedDate: "2025-10-13",
    support: (
      <div className="flex flex-row items-center gap-1 text-[var(--colors-wafer-blue-wafer-blue-10)]">
        <div className="h-[4px] w-[4px] bg-[var(--colors-wafer-blue-wafer-blue-10)]" />
        Accepted
      </div>
    ),
    supportComment: "진행을 위해 Accept 합니다.",
    department: "Analog",
    assignee: "Samsung.lee",
    expected: "ATOPP55",
  },

  {
    srsTitle: "SRS Title Name 955",
    linkedErs: "2.3.3 Specification Notes 86",
    usedDate: "2025-10-13",
    support: (
      <div className="flex flex-row items-center gap-1 text-[var(--colors-copper-yellow-cu-yellow-10)]">
        <div className="h-[4px] w-[4px] bg-[var(--colors-copper-yellow-cu-yellow-10)]" />
        Pending
      </div>
    ),
    supportComment: "ERS 확인이 필요한 상황입니다.",
    department: "Digital",
    assignee: "Heungmin.Son",
    expected: "BBC1TIER",
  },
  {
    srsTitle: "SRS Title Name 955",
    linkedErs: "",
    usedDate: "2025-10-13",
    support: (
      <div className="flex flex-row items-center gap-1 text-[var(--colors-oxygen-red-o-red-10)]">
        <div className="h-[4px] w-[4px] bg-[var(--colors-oxygen-red-o-red-10)]" />
        Rejected
      </div>
    ),
    supportComment: "",
    department: "Virtual",
    assignee: "",
    expected: "",
  },
]

const MatrixCheckCols = Array.from({ length: 20 }, (_, i) => {
  // 0 ~ templates.length-1 범위의 인덱스 랜덤 선택
  const randomIndex = Math.floor(Math.random() * MatrixCheckColExamples.length)
  // 새로운 객체로 복사하여 참조 공유 문제 방지
  return { index: i + 1, ...MatrixCheckColExamples[randomIndex] }
})

const SRSListCols = Array.from({ length: 20 }, (_, i) => {
  // 0 ~ templates.length-1 범위의 인덱스 랜덤 선택
  const randomIndex = Math.floor(Math.random() * SRSListColExamples.length)
  // 새로운 객체로 복사하여 참조 공유 문제 방지
  return { no: i + 1, ...SRSListColExamples[randomIndex] }
})

export const MatrixCheckTable = () => {
  return (
    <ScrollableTable>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead className="text-center" colSpan={4}>
            ERS
          </TableHead>
          <TableHead className="text-center" colSpan={8}>
            SRS
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="w-[53px]">Index</TableHead>
          <TableHead className="w-[241px]">ERS Title</TableHead>
          <TableHead className="w-[74px]">진행률</TableHead>
          <TableHead className="w-[99px]">Updated</TableHead>
          <TableHead className="w-[89px]">Support</TableHead>
          <TableHead className="w-[115px]">APS(Electric)</TableHead>
          <TableHead className="w-[115px]">APS(Optic)</TableHead>
          <TableHead className="w-[115px]">Analog</TableHead>
          <TableHead className="w-[115px]">Digital(Chip설계)</TableHead>
          <TableHead className="w-[115px]">FW</TableHead>
          <TableHead className="w-[115px]">ALPDP</TableHead>
          <TableHead className="w-[115px]">PM</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="typo-sok-caption-12-400 scrollbar-thin max-h-[800px] overflow-auto">
        {MatrixCheckCols.map((col) => (
          <TableRow key={col.index}>
            <TableCell>{col.index}</TableCell>
            <TableCell>{col.ersTitle}</TableCell>
            <TableCell>{col.progress}</TableCell>
            <TableCell>{col.updated}</TableCell>
            <TableCell>{col.support}</TableCell>
            <TableCell>{col.apsElectric}</TableCell>
            <TableCell>{col.apsOptic}</TableCell>
            <TableCell>{col.analog}</TableCell>
            <TableCell>{col.digital}</TableCell>
            <TableCell>{col.fw}</TableCell>
            <TableCell>{col.alpdp}</TableCell>
            <TableCell>{col.pm}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </ScrollableTable>
  )
}

export const SRSListTable = () => {
  return (
    <ScrollableTable>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[53px]">No</TableHead>
          <TableHead className="w-[241px]">SRS Title</TableHead>
          <TableHead className="w-[74px]">Linked ERS</TableHead>
          <TableHead className="w-[99px]">Used Date</TableHead>
          <TableHead className="w-[89px]">Support</TableHead>
          <TableHead className="w-[115px]">Support Comment</TableHead>
          <TableHead className="w-[115px]">Department</TableHead>
          <TableHead className="w-[115px]">Assignee</TableHead>
          <TableHead className="w-[115px]">Expected</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="typo-sok-caption-12-400 max-h-[800px] overflow-auto">
        {SRSListCols.map((col) => (
          <TableRow key={col.no}>
            <TableCell>{col.no}</TableCell>
            <TableCell>{col.srsTitle}</TableCell>
            <TableCell>{col.linkedErs}</TableCell>
            <TableCell>{col.usedDate}</TableCell>
            <TableCell>{col.support}</TableCell>
            <TableCell>{col.supportComment}</TableCell>
            <TableCell>{col.department}</TableCell>
            <TableCell>{col.assignee}</TableCell>
            <TableCell>{col.expected}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </ScrollableTable>
  )
}
