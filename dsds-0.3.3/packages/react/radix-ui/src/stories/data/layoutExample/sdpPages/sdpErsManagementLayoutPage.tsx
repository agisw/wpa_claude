import { useEffect, useRef, useState } from "react"
import { ScrollArea } from "@radix-ui/react-scroll-area"

import { ScrollableTable, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { InformationIcon, PlusIcon, UnionIcon } from "@/components/icons"
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui"

const ERSListColExamples = [
  {
    ersTitle: "Project Overview",
    progress: "40",
    qna: "0/0",
    subErs: (
      <Button icon={<PlusIcon />} iconOption="before" variant="secondary" size="small">
        Add
      </Button>
    ),
  },
  {
    ersTitle: "Test",
    progress: "50",
    qna: "2/2",
    subErs: (
      <Button icon={<PlusIcon />} iconOption="before" variant="secondary" size="small">
        Add
      </Button>
    ),
  },
]

const ERSCompareColExamples = [
  {
    newErs: "Project Overview",
    oldErs: "40",
    compare: "0/0",
    status: (
      <Button icon={<PlusIcon />} iconOption="before" variant="secondary" size="small">
        Add
      </Button>
    ),
  },
]

const ERSListCols = Array.from({ length: 30 }, (_, i) => {
  // 0 ~ templates.length-1 범위의 인덱스 랜덤 선택
  const randomIndex = Math.floor(Math.random() * ERSListColExamples.length)
  // 새로운 객체로 복사하여 참조 공유 문제 방지
  return { index: i + 1, ...ERSListColExamples[randomIndex] }
})

const ERSCompareCols = Array.from({ length: 30 }, (_, i) => {
  // 0 ~ templates.length-1 범위의 인덱스 랜덤 선택
  const randomIndex = Math.floor(Math.random() * ERSCompareColExamples.length)
  // 새로운 객체로 복사하여 참조 공유 문제 방지
  return { index: i + 1, ...ERSCompareColExamples[randomIndex] }
})

export const ERSListTable = ({ className }: { className?: string }) => (
  <ScrollableTable className={className}>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[53px]">Index</TableHead>
        <TableHead className="w-[241px]">ERS Title</TableHead>
        <TableHead className="w-[74px]">Q&A</TableHead>
        <TableHead className="w-[30px]">Sub ERS</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody className="typo-sok-caption-12-400 overflow-auto">
      {ERSListCols.map((col) => (
        <TableRow key={col.index}>
          <TableCell>{col.index}</TableCell>
          <TableCell>{col.ersTitle}</TableCell>
          <TableCell>{col.qna}</TableCell>
          <TableCell>{col.subErs}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </ScrollableTable>
)

export const ERSList = () => {
  const [leftWidth, setLeftWidth] = useState(50) // 퍼센트
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault() // 초기 텍스트 선택 방지
    setIsDragging(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      e.preventDefault() // 드래그 중 텍스트 선택 방지

      const rect = containerRef.current.getBoundingClientRect()
      const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100

      // 최소/최대 크기 제한
      if (newLeftWidth >= 20 && newLeftWidth <= 80) {
        setLeftWidth(newLeftWidth)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      // 텍스트 선택 방지 해제
      document.body.style.userSelect = ""
      document.body.style.webkitUserSelect = ""
    }

    if (isDragging) {
      // 드래그 중 전체 페이지 텍스트 선택 방지
      document.body.style.userSelect = "none"
      document.body.style.webkitUserSelect = "none"

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      // 정리 시에도 텍스트 선택 방지 해제
      document.body.style.userSelect = ""
      document.body.style.webkitUserSelect = ""

      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      ref={containerRef}
      className="flex h-[calc(100vh-100px)] w-full"
      style={{ cursor: isDragging ? "col-resize" : "default" }}
    >
      <div className="h-[calc(100vh-100px)] bg-white px-[12px]" style={{ width: `${leftWidth}%` }}>
        <div className="typo-sok-h6-14-700 flex flex-row items-center gap-[4px] py-[12px]">
          ERS List
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
        <div className="typo-sok-footnote-11-400 flex flex-row items-center gap-[4px] pb-[12px] text-[var(--colors-neutral-neutral-15)]">
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
        </div>
        <ScrollArea className="flex h-[calc(100vh-150px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[53px]">Index</TableHead>
                <TableHead className="w-[241px]">ERS Title</TableHead>
                <TableHead className="w-[74px]">Q&A</TableHead>
                <TableHead className="w-[30px]">Sub ERS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="typo-sok-caption-12-400 overflow-auto">
              {ERSListCols.map((col) => (
                <TableRow key={col.index}>
                  <TableCell>{col.index}</TableCell>
                  <TableCell>{col.ersTitle}</TableCell>
                  <TableCell>{col.qna}</TableCell>
                  <TableCell>{col.subErs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      <div
        className="flex w-[6px] cursor-col-resize items-center justify-center border-s border-e border-[var(--color-border-border-2-outer)] bg-white"
        onMouseDown={handleMouseDown}
      >
        <UnionIcon />
      </div>
      <div className="flex-1 overflow-auto bg-white">
        <div className="w-full px-[16px] py-[14px]">
          <div className="flex flex-row items-center">
            <div className="typo-sok-h6-14-700 mr-auto">1.2.2.2 Expectation BCDF</div>
            <Button variant="secondary" size="small" className="mr-[13px]">
              Q&A View(2/3)
            </Button>
            <Button variant="secondary" size="small" disabled>
              Edit
            </Button>
          </div>
          <div className="my-[14px] h-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
          <div className="typo-sok-body-14-400 overflow-auto border border-[var(--color-border-btn-2ndary-border-default)] px-[8px] py-[6px] whitespace-pre-wrap">
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
              Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
              Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
              (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of
              ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
              amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
              by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914
              translation by H. Rackham.
            </p>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
              Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
              Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
              (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of
              ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
              amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
              by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914
              translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
              in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
              Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,
              consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,
              discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
              Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise
              on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum
              dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the
              1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
              Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from
              the 1914 translation by H. Rackham.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ERSCompare = () => {
  const [leftWidth, setLeftWidth] = useState(50) // 퍼센트
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault() // 초기 텍스트 선택 방지
    setIsDragging(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      e.preventDefault() // 드래그 중 텍스트 선택 방지

      const rect = containerRef.current.getBoundingClientRect()
      const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100

      // 최소/최대 크기 제한
      if (newLeftWidth >= 20 && newLeftWidth <= 80) {
        setLeftWidth(newLeftWidth)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      // 텍스트 선택 방지 해제
      document.body.style.userSelect = ""
      document.body.style.webkitUserSelect = ""
    }

    if (isDragging) {
      // 드래그 중 전체 페이지 텍스트 선택 방지
      document.body.style.userSelect = "none"
      document.body.style.webkitUserSelect = "none"

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      // 정리 시에도 텍스트 선택 방지 해제
      document.body.style.userSelect = ""
      document.body.style.webkitUserSelect = ""

      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div ref={containerRef} className="flex h-screen w-full" style={{ cursor: isDragging ? "col-resize" : "default" }}>
      <div className="h-screen bg-white px-[12px]" style={{ width: `${leftWidth}%` }}>
        <div className="typo-sok-h6-14-700 flex flex-row items-center gap-[4px] py-[12px]">
          Compare Workspace
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
        <div className="typo-sok-footnote-11-400 flex flex-row items-center gap-[4px] pb-[12px] text-[var(--colors-neutral-neutral-15)]">
          <Button size="small" variant="secondary">
            Import New ERS
          </Button>
          <div className="mx-[6px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
          <Button size="small" variant="secondary">
            Show Only Different
          </Button>
          <Button size="small" variant="secondary">
            Show Only Unknown
          </Button>
          <div className="text-neutral-3rd ml-auto flex flex-row items-center">Compare: New ERS Name Ver.1.2</div>
        </div>
        <ScrollArea className="flex h-[calc(100vh-150px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[53px]">Index</TableHead>
                <TableHead className="w-[241px]">New ERS</TableHead>
                <TableHead className="w-[74px]">Old ERS</TableHead>
                <TableHead className="w-[74px]">Compare</TableHead>
                <TableHead className="w-[30px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="typo-sok-caption-12-400 overflow-auto">
              {ERSCompareCols.map((col) => (
                <TableRow key={col.index}>
                  <TableCell>{col.index}</TableCell>
                  <TableCell>{col.newErs}</TableCell>
                  <TableCell>{col.oldErs}</TableCell>
                  <TableCell>{col.compare}</TableCell>
                  <TableCell>{col.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      <div
        className="flex w-[6px] cursor-col-resize items-center justify-center border-s border-e border-[var(--color-border-border-2-outer)] bg-white"
        onMouseDown={handleMouseDown}
      >
        <UnionIcon />
      </div>
      <div className="flex-1 overflow-auto bg-white">
        <div className="w-full px-[16px] py-[14px]">
          <div className="flex flex-col">
            <div className="typo-sok-h6-14-700 mr-auto">1.2.2.2 Expectation BCDF</div>
            <div className="typo-sok-caption-12-400 mt-[14px] flex flex-row items-center">
              ERS 연결 상태
              <Button variant="secondary" size="small" className="ml-[4px]">
                Unknown
              </Button>
              <Button variant="secondary" size="small">
                Link
              </Button>
              <Button variant="secondary" size="small">
                Pass
              </Button>
              <div className="mx-[6px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
              <Button variant="primary" size="small">
                Apply
              </Button>
            </div>
          </div>
          <div className="my-[14px] h-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
          <div className="typo-sok-footnote-11-400 flex flex-row items-center gap-[4px] pb-[12px] text-[var(--colors-neutral-neutral-15)]">
            <div className="h-[10px] w-[10px] bg-[var(--colors-nitrogen-green-n-green-04)]" />
            Add
            <div className="ml-[8px] h-[10px] w-[10px] bg-[var(--colors-dioxide-film-blue-df-blue-04)]" />
            Change
            <div className="ml-[8px] h-[10px] w-[10px] bg-[var(--colors-oxygen-red-o-red-04)]" />
            Delete
          </div>

          <div className="flex flex-row">
            <div className="typo-sok-caption-12-400 flex flex-row items-center gap-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">New</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="typo-sok-caption-12-400 overflow-auto whitespace-pre-wrap">
                  <TableRow>
                    <TableCell className="leading-normal whitespace-normal">
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                      classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                      professor at{" "}
                      <mark className="bg-[var(--colors-nitrogen-green-n-green-04)]">
                        Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,
                        from a Lorem Ipsum passage,
                      </mark>{" "}
                      and going through the cites of the word in classical literature, discovered the undoubtable
                      source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                      (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory
                      of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
                      sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since
                      the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus
                      Bonorum et Malorum" by Cicero are also reproduced in their exact original form,{" "}
                      <mark className="bg-[var(--colors-dioxide-film-blue-df-blue-04)]">
                        accompanied by English versions from the 1914 translation by H. Rackham.Contrary to popular
                        belief
                      </mark>
                      , Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                      from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
                      College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem
                      Ipsum passage, and going through the cites of the word in classical literature, discovered the
                      undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                      Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on
                      the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem
                      ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum
                      used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from
                      "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,
                      accompanied by English versions from the 1914 translation by H. Rackham.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table className="typo-sok-body-14-400">
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Old</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="typo-sok-caption-12-400 overflow-auto whitespace-pre-wrap">
                  <TableRow>
                    <TableCell className="leading-normal whitespace-pre-wrap">
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                      classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                      professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,
                      consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical
                      literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
                      of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
                      This book is a treatise on the theory of ethics, very popular during the Renaissance. The first
                      line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The
                      standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                      Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                      their exact original form, accompanied by English versions from the 1914 translation by H.
                      Rackham.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
                      of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
                      Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin
                      words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in
                      classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32
                      and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written
                      in 45 BC. This book is a treatise on the theory of ethics,{" "}
                      <mark className="bg-[var(--colors-oxygen-red-o-red-04)] line-through">
                        very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
                        amet..",{" "}
                      </mark>
                      comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
                      reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
                      Malorum" by Cicero are also reproduced in their exact original form, accompanied by English
                      versions from the 1914 translation by H. Rackham.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
