import * as React from "react"

import { cn } from "@/lib/utils"

import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "../icons"

/**
 * Pagination 컴포넌트의 Props 인터페이스
 */
interface PaginationProps extends React.ComponentProps<"nav"> {
  className?: string
}

/**
 * Pagination 컴포넌트는 데이터 목록이나 콘텐츠의 페이지를 탐색할 수 있는 UI를 제공합니다.
 * 다음과 같은 서브 컴포넌트들을 조합하여 사용합니다:
 *
 * - `PaginationContent`: 페이지네이션 아이템들을 담는 컨테이너
 * - `PaginationNumber`: 개별 페이지 번호나 네비게이션 화살표 (first, last, left, right)
 * - `PaginationDot`: 도트 스타일 페이지네이션용 컴포넌트
 *
 * 두 가지 주요 스타일을 지원합니다:
 * 1. 숫자 기반: 페이지 번호와 화살표를 표시하는 전통적인 페이지네이션
 * 2. 도트 스타일: 작은 점으로 페이지를 표시하는 모던한 페이지네이션
 *
 * @example
 * ```tsx
 * // 숫자 기반 페이지네이션
 * <Pagination>
 *   <PaginationContent isDot={false}>
 *     <PaginationNumber chevron="first" />
 *     <PaginationNumber chevron="left" />
 *     <PaginationNumber page={1} isSelected />
 *     <PaginationNumber page={2} />
 *     <PaginationNumber chevron="right" />
 *     <PaginationNumber chevron="last" />
 *   </PaginationContent>
 * </Pagination>
 *
 * // 도트 스타일 페이지네이션
 * <Pagination>
 *   <PaginationContent isDot={true}>
 *     <PaginationDot isSelected />
 *     <PaginationDot />
 *     <PaginationDot />
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

export type PaginationContentProps = React.ComponentProps<"ul"> & {
  isDot: boolean
}

/**
 * PaginationContent 컴포넌트의 Props 인터페이스
 */
interface PaginationContentPropsInternal extends React.ComponentProps<"ul"> {
  /** 도트 스타일 페이지네이션인지 여부 */
  isDot: boolean
}

/**
 * PaginationContent 컴포넌트입니다.
 * 페이지네이션 아이템들을 담는 컨테이너 컴포넌트입니다.
 *
 * `isDot` prop에 따라 숫자 기반 또는 도트 스타일 레이아웃을 자동으로 적용합니다.
 * 숫자 기반일 때는 가로 정렬과 적절한 간격을, 도트 스타일일 때는 가운데 정렬을 제공합니다.
 *
 * @param isDot - 도트 스타일 페이지네이션인지 여부
 * @example
 * ```tsx
 * <PaginationContent isDot={false}>
 *   <PaginationNumber page={1} />
 *   <PaginationNumber page={2} isSelected />
 * </PaginationContent>
 * ```
 */
function PaginationContent({ children, className, isDot, ...props }: PaginationContentPropsInternal) {
  return (
    <nav
      data-slot="pagination-content"
      className={cn(
        "flex flex-row items-center justify-center bg-[var(--colors-neutral-neutral-01)]",
        !isDot && "gap-xs",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        // 유효한 React 요소인지 확인
        if (React.isValidElement(child)) {
          // 자식 요소를 복제하고 새로운 props를 추가
          return React.cloneElement(child)
        }
        // 텍스트 노드 등 React 요소가 아닌 경우는 그대로 반환
        return child
      })}
    </nav>
  )
}

/**
 * PaginationNumber 컴포넌트의 Props 인터페이스
 */
interface PaginationNumberPropsInternal {
  /** 선택된 페이지인지 여부 */
  isSelected?: boolean
  /** 비활성화 상태인지 여부 */
  disabled?: boolean
  /** 표시할 페이지 번호 */
  page?: number
  /** 화살표 방향 (선택사항) */
  chevron?: "left" | "right" | "first" | "last"
}

/**
 * PaginationNumber 컴포넌트입니다.
 * 개별 페이지 번호나 네비게이션 화살표를 표시하는 컴포넌트입니다.
 *
 * 페이지 번호 표시, 네비게이션 화살표(처음, 마지막, 이전, 다음), 선택 상태,
 * 비활성화 상태 등을 지원합니다. 페이지 번호가 2자리 이상일 경우 자동으로 너비가 조정됩니다.
 *
 * @param isSelected - 선택된 페이지인지 여부
 * @param disabled - 비활성화 상태인지 여부
 * @param page - 표시할 페이지 번호
 * @param chevron - 화살표 방향 ('left' | 'right' | 'first' | 'last')
 * @example
 * ```tsx
 * // 페이지 번호
 * <PaginationNumber page={1} />
 * <PaginationNumber page={2} isSelected />
 *
 * // 화살표
 * <PaginationNumber chevron="left" />
 * <PaginationNumber chevron="right" />
 * <PaginationNumber chevron="first" disabled />
 * <PaginationNumber chevron="last" disabled />
 * ```
 */
function PaginationNumber({
  className,
  isSelected,
  disabled,
  page,
  chevron,
  ...props
}: PaginationNumberPropsInternal & React.ComponentProps<"a">) {
  return (
    <a
      aria-current={isSelected ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isSelected}
      aria-disabled={disabled}
      className={cn(
        "typo-button-label-medium flex h-[24px] w-[24px] items-center justify-center rounded-xs text-[var(--color-text-on-btn-ghost-on-ghost-default)] tabular-nums",
        // Page가 두자리 수 이상일 때 너비 조정
        page && page.toString().length > 1 && "w-[32px]",
        // 시각적 보정
        page && page.toString().length == 1 && "pl-[1.5px]",
        // Selected
        isSelected && "text-brand bg-[var(--color-bg-on-ghost-button-ghostbtn-activated)]",
        // Hover
        !disabled && "hover:bg-[var(--color-bg-on-ghost-button-ghostbtn-hover)]",
        // Focus
        !disabled &&
          "focus-visible:outline-ring-0 focus-visible:text-brand focus-visible:bg-[var(--color-bg-on-ghost-button-ghostbtn-hover)]",
        // Disabled
        disabled && "cursor-not-allowed text-[var(--colors-neutral-neutral-09)]",
        chevron && chevron == "first" && "mr-[-2px]",
        chevron && chevron == "left" && "mr-[4px]",
        chevron && chevron == "right" && "ml-[4px]",
        chevron && chevron == "last" && "mr-[-2px]",
        className
      )}
      {...props}
    >
      {page}
      {chevron && chevron == "first" && <ChevronsLeftIcon disabled={disabled} />}
      {chevron && chevron == "last" && <ChevronsRightIcon disabled={disabled} />}
      {chevron && chevron == "left" && <ChevronLeftIcon disabled={disabled} />}
      {chevron && chevron == "right" && <ChevronRightIcon disabled={disabled} />}
    </a>
  )
}

/**
 * PaginationDot 컴포넌트입니다.
 * 도트 스타일 페이지네이션을 위한 컴포넌트입니다.
 *
 * 작은 원형 도트로 페이지를 표시하며, 선택된 페이지와 선택되지 않은 페이지를
 * 시각적으로 구분합니다. 모던한 디자인의 페이지네이션에 적합합니다.
 *
 * @param isSelected - 선택된 페이지인지 여부
 * @param disabled - 비활성화 상태인지 여부
 * @example
 * ```tsx
 * <PaginationDot />
 * <PaginationDot isSelected />
 * ```
 */
function PaginationDot({ className, isSelected, ...props }: PaginationNumberPropsInternal & React.ComponentProps<"a">) {
  return (
    <div className="flex h-[16px] w-[16px] items-center justify-center">
      <a
        aria-current={isSelected ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isSelected}
        className={cn(
          "flex h-[8px] w-[8px] items-center justify-center rounded-full bg-[var(--colors-neutral-neutral-08)]",
          // Selected
          isSelected && "text-brand bg-brand",
          // Hover
          !isSelected && "not-[:disabled]:hover:border not-[:disabled]:hover:border-[var(--colors-neutral-neutral-11)]",
          // Focus
          "not-[:disabled]:focus-visible:outline-ring not-[:disabled]:focus-visible:bg-[var(--colors-neutral-neutral-08)]",
          // Disabled
          "disabled:cursor-not-allowed disabled:text-[var(--color-text-on-btn-ghost-on-ghost-disabled)]",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Pagination, PaginationContent, PaginationNumber, PaginationDot }
