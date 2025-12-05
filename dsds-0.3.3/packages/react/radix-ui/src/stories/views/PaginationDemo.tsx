import { Pagination, PaginationContent, PaginationDot, PaginationNumber } from "@/components/ui"

export function PaginationDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold text-gray-700">숫자 페이지: 1 ~ 99</h4>
        <Pagination>
          <PaginationContent isDot={false}>
            <PaginationNumber chevron="first" disabled href="" />
            <PaginationNumber chevron="left" disabled href="" />
            {Array.from({ length: 10 }, (_, i) => i + 1).map((page) => (
              <PaginationNumber key={page} page={page} href="" isSelected={page === 1} />
            ))}
            <PaginationNumber chevron="right" href="" />
            <PaginationNumber chevron="last" href="" />
          </PaginationContent>
        </Pagination>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold text-gray-700">숫자 페이지: 100 ~ 999</h4>
        <Pagination>
          <PaginationContent isDot={false}>
            <PaginationNumber chevron="first" href="" />
            <PaginationNumber chevron="left" href="" />
            {Array.from({ length: 10 }, (_, i) => i + 991).map((page) => (
              <PaginationNumber key={page} page={page} href="" isSelected={page === 995} />
            ))}
            <PaginationNumber chevron="right" href="" />
            <PaginationNumber chevron="last" disabled href="" />
          </PaginationContent>
        </Pagination>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold text-gray-700">Dot 페이지</h4>
        <Pagination>
          <PaginationContent isDot={true}>
            <PaginationDot href="" isSelected />
            <PaginationDot href="" />
            <PaginationDot href="" />
            <PaginationDot href="" />
            <PaginationDot href="" />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
