"use client"

import React, { useEffect, useRef, useState } from "react"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"
import { BreadcrumbSelectboxDisabledIcon, BreadcrumbSelectboxIcon, BreadcrumbSlashIcon } from "@/components/icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui"

const disabledStyle = "pointer-events-none text-[var(--color-text-on-btn-ghost-on-ghost-disabled)]"

/**
 * Breadcrumb 컴포넌트의 Props 인터페이스
 */
interface BreadcrumbProps {
  /** BreadcrumbElement 컴포넌트들의 배열 (children 방식) */
  children?: React.ReactNode
  /** 문자열 배열로 간단하게 breadcrumb을 생성 (items 방식) */
  items?: string[]
  /** true일 경우 5개 이상의 요소에서 중간 부분을 생략하여 표시 (items 방식에서만 동작) */
  ellipsis?: boolean
}

/**
 * Breadcrumb는 네비게이션 경로를 표시하는 컴포넌트로, 여러 단계의 메뉴 구조를 시각적으로 표현합니다.
 *
 * 두 가지 사용 방식이 지원됩니다:
 * - **children 방식**: `BreadcrumbElement` 컴포넌트들을 직접 `children`으로 전달
 * - **items 방식**: `items` prop에 문자열 배열을 전달하여 간단하게 사용하는 방식
 *   - `ellipsis` (5개 이상 경로의 경우 `...` 으로 축약) 기능을 지원합다다.
 *
 * @example
 * ```tsx
 * // children 방식
 * <Breadcrumb>
 *   <BreadcrumbElement>
 *     <BreadcrumbText>홈</BreadcrumbText>
 *   </BreadcrumbElement>
 *   <BreadcrumbElement>
 *     <BreadcrumbText>메뉴1</BreadcrumbText>
 *   </BreadcrumbElement>
 *   <BreadcrumbElement>
 *     <BreadcrumbText>메뉴2</BreadcrumbText>
 *   </BreadcrumbElement>
 * </Breadcrumb>
 *
 * // items 방식 (ellipsis 기능 지원)
 * <Breadcrumb items={['홈', '메뉴1', '메뉴2', '메뉴3', '메뉴4', '메뉴5']} ellipsis />
 * ```
 */
function Breadcrumb({ children, items, ellipsis, ...props }: BreadcrumbProps) {
  // items 방식: 문자열 배열을 BreadcrumbElement + BreadcrumbText로 변환
  const processedChildren = items
    ? items.map((item, index) => (
        <BreadcrumbElement key={index}>
          <BreadcrumbText>{item}</BreadcrumbText>
        </BreadcrumbElement>
      ))
    : children

  const childrenArray = React.Children.toArray(processedChildren)
  const commonStyle =
    "typo-caption flex flex-row items-center gap-[3px] text-[var(--color-text-on-btn-ghost-on-ghost-default)]"

  // 마지막 Element에 Separator를 추가하지 않도록 수정
  const modifiedChildren = childrenArray.map((child, index) =>
    React.isValidElement(child) && index === childrenArray.length - 1
      ? React.cloneElement(child as React.ReactElement<{ isLast?: boolean }>, { isLast: true })
      : child
  )
  // 총 개수가 5개 미만이거나 Ellipsis를 설정하지 않은 경우 전체를 보여줌
  if (modifiedChildren.length <= 5 || !ellipsis) {
    return (
      <div className={commonStyle} {...props}>
        {modifiedChildren}
      </div>
    )
  }
  // 총 개수가 5개 이상이고 Ellipsis가 설정된 경우 Ellipsis를 적용하여 중간 부분을 생략
  else {
    const first = modifiedChildren[0]
    const lastThree = modifiedChildren.slice(-3)
    const ellipsis = (
      <BreadcrumbElement>
        <div className="pointer-events-none px-[6px] pl-0">...</div>
      </BreadcrumbElement>
    )
    return (
      <div className={commonStyle} {...props}>
        {first}
        {ellipsis}
        {lastThree}
      </div>
    )
  }
}

/**
 * BreadcrumbElement 컴포넌트의 Props 인터페이스
 */
interface BreadcrumbElementProps {
  /** 내부에 표시될 콘텐츠 (BreadcrumbText 또는 BreadcrumbSelect) */
  children: React.ReactNode
  /** 마지막 요소인지 여부 (자동으로 설정되며, 수동 설정 필요 없음) */
  isLast?: boolean
}

/**
 * BreadcrumbElement 컴포넌트입니다.
 * Breadcrumb 내 개별 요소를 감싸는 컨테이너 컴포넌트입니다.
 * 마지막 요소가 아닌 경우 자동으로 구분선(/)을 추가합니다.
 *
 * @example
 * ```tsx
 * <BreadcrumbElement>
 *   <BreadcrumbText>홈</BreadcrumbText>
 * </BreadcrumbElement>
 * ```
 */
function BreadcrumbElement({ children, isLast, ...props }: BreadcrumbElementProps) {
  return (
    <div className="flex h-[20px] flex-row items-center" {...props}>
      {children}
      {!isLast && <BreadcrumbSlashIcon />}
    </div>
  )
}

/**
 * BreadcrumbText 컴포넌트의 Props 인터페이스
 */
interface BreadcrumbTextProps {
  /** 클릭 시 이동할 URL */
  href?: string
  /** 표시될 텍스트 내용 */
  children: string
  /** 선택된 상태인지 여부 */
  selected?: boolean
  /** 비활성화 상태인지 여부 */
  disabled?: boolean
}

/**
 * BreadcrumbText 컴포넌트입니다.
 * Breadcrumb 내 텍스트 기반 네비게이션 요소를 표시하는 컴포넌트입니다.
 * 텍스트가 길 경우 자동으로 생략되며, 툴팁으로 전체 텍스트를 확인할 수 있습니다.
 *
 * @example
 * ```tsx
 * <BreadcrumbText href="/home" selected>
 *   홈
 * </BreadcrumbText>
 * ```
 */
function BreadcrumbText({ href, children, selected, disabled, ...props }: BreadcrumbTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    if (ref.current) {
      setShowTooltip(ref.current.scrollWidth > ref.current.clientWidth)
    }
  }, [children])

  return (
    <div className={cn(disabled && "cursor-not-allowed")}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            tabIndex={0}
            href={href}
            className={cn(
              "flex h-[18px] max-w-[110px] flex-row items-center rounded-xs px-[6px]",
              "hover:cursor-pointer hover:bg-[var(--color-bg-on-ghost-box-ghost-box-hover)]",
              !disabled && "focus-visible:outline-ring",
              selected && !disabled && "bg-[var(--color-bg-on-ghost-box-ghost-box-hover)]",
              disabled && disabledStyle
            )}
            {...props}
          >
            <span ref={ref} className="truncate">
              {children}
            </span>
          </a>
        </TooltipTrigger>
        {showTooltip && <TooltipContent>{children}</TooltipContent>}
      </Tooltip>
    </div>
  )
}

/**
 * BreadcrumbSelect 컴포넌트의 Props 인터페이스
 */
interface BreadcrumbSelectProps {
  /** 표시될 텍스트 내용 */
  children: string
  /** 선택된 상태인지 여부 */
  selected?: boolean
  /** 비활성화 상태인지 여부 */
  disabled?: boolean
  /** 드롭다운 메뉴 콘텐츠 (DropdownMenuContent) */
  dropdownMenu?: React.ReactNode
}

/**
 * BreadcrumbSelect 컴포넌트입니다.
 * Breadcrumb 내 드롭다운 메뉴가 있는 선택형 네비게이션 요소를 표시하는 컴포넌트입니다.
 * 텍스트가 길 경우 자동으로 생략되며, 툴팁으로 전체 텍스트를 확인할 수 있습니다.
 *
 * @example
 * ```tsx
 * <BreadcrumbSelect dropdownMenu={dropdownMenu}>
 *   메뉴 선택
 * </BreadcrumbSelect>
 * ```
 */
function BreadcrumbSelect({ children, selected, disabled, dropdownMenu, ...props }: BreadcrumbSelectProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    if (ref.current) {
      setShowTooltip(ref.current.scrollWidth > ref.current.clientWidth)
    }
  }, [children])

  return (
    <div className={cn("flex h-[20px] flex-row items-center", disabled && "cursor-not-allowed")} {...props}>
      <Tooltip {...props}>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex h-[20px] max-w-[110px] flex-row items-center rounded-xs px-[6px]",
                  "hover:cursor-pointer hover:bg-[var(--color-bg-on-ghost-box-ghost-box-hover)]",
                  selected && !disabled && "bg-[var(--color-bg-on-ghost-box-ghost-box-hover)]",
                  disabled && "pointer-events-none text-[var(--color-text-on-btn-ghost-on-ghost-disabled)]",
                  !disabled && "focus-visible:outline-ring"
                )}
              >
                <span ref={ref} className={cn("truncate pr-[5px]", disabled && disabledStyle)}>
                  {children}
                </span>
                {disabled ? <BreadcrumbSelectboxDisabledIcon /> : <BreadcrumbSelectboxIcon />}
              </button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          {dropdownMenu}
        </DropdownMenu>
        {showTooltip && !disabled && <TooltipContent>{children}</TooltipContent>}
      </Tooltip>
    </div>
  )
}
export { Breadcrumb, BreadcrumbElement, BreadcrumbText, BreadcrumbSelect }
