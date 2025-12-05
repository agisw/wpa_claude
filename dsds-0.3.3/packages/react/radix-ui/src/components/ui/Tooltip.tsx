"use client"

import React, { useContext } from "react"

import { cn } from "@/lib/utils"

import * as TooltipPrimitive from "./_components/tooltip"
import { TooltipAlign, TooltipPlace, TooltipSide } from "./types"

/**
 * Tooltip 컴포넌트의 Provider 컴포넌트입니다.
 * 모든 Tooltip 컴포넌트들을 감싸는 최상위 컴포넌트입니다.
 *
 * @param delayDuration 툴팁 표시 지연 시간 (밀리초)
 * @param props 기타 TooltipPrimitive.Provider props
 * @example
 * ```tsx
 * <TooltipProvider delayDuration={300}>
 *   <App />
 * </TooltipProvider>
 * ```
 */
function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />
}

/**
 * Tooltip 컴포넌트의 props 타입입니다.
 * @property {TooltipPlace} [place] - 툴팁 표시 위치 ("top", "bottom", "left", "right" 등)
 * @property {boolean} [defaultOpen] - 초기 표시 상태
 * @property {boolean} [open] - 제어형 표시 상태
 * @property {(open: boolean) => void} [onOpenChange] - 표시 상태 변경 콜백
 * @property {number} [delayDuration] - 표시 지연 시간
 * @property {boolean} [disableHoverableContent] - 호버 가능 콘텐츠 비활성화
 * @property {boolean} [persistent] - 테스트용으로 툴팁을 항상 표시하는 모드
 */
export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> & {
  place?: TooltipPlace
  persistent?: boolean
}

/**
 * Tooltip 컴포넌트의 메인 컨테이너입니다.
 * 툴팁의 표시 위치와 동작을 제어합니다.
 *
 * - `place` prop으로 툴팁의 표시 위치를 지정할 수 있습니다.
 * - Radix UI의 Tooltip을 기반으로 하여 접근성과 키보드 네비게이션을 지원합니다.
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <Tooltip>
 *   <TooltipTrigger>
 *     <Button>Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     This is a tooltip
 *   </TooltipContent>
 * </Tooltip>
 *
 * // 위치 지정
 * <Tooltip place="bottom">
 *   <TooltipTrigger>
 *     <Button>Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     Bottom tooltip
 *   </TooltipContent>
 * </Tooltip>
 *
 * // 제어형 사용
 * const [open, setOpen] = useState(false)
 * <Tooltip open={open} onOpenChange={setOpen}>
 *   <TooltipTrigger>
 *     <Button>Click me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     Controlled tooltip
 *   </TooltipContent>
 * </Tooltip>
 *
 * // Persistent mode (테스트용)
 * <Tooltip persistent>
 *   <TooltipTrigger>
 *     <Button>Always show tooltip</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     This tooltip is always visible
 *   </TooltipContent>
 * </Tooltip>
 * ```
 *
 * @see TooltipProps
 * @see TooltipTrigger
 * @see TooltipContent
 */
function Tooltip({ place = "top", persistent = false, ...props }: TooltipProps) {
  const rootProps = persistent ? { ...props, open: true } : props

  return (
    <TooltipProvider>
      <TooltipPlaceContext.Provider value={place}>
        <TooltipPrimitive.Root data-slot="tooltip" {...rootProps} />
      </TooltipPlaceContext.Provider>
    </TooltipProvider>
  )
}

/**
 * place를 side와 align으로 변환하는 헬퍼 함수입니다.
 * @private
 */
function mapPlaceToSideAlign(place: TooltipPlace = "top"): {
  side?: TooltipSide
  align?: TooltipAlign
} {
  if (!place) return { side: "auto", align: "auto" }
  const [sidePart] = place.split("-")
  const side = sidePart as TooltipSide
  if (place.endsWith("-start")) return { side, align: "start" }
  if (place.endsWith("-end")) return { side, align: "end" }
  return { side, align: "center" }
}

/**
 * Tooltip 컴포넌트의 트리거 요소입니다.
 * 이 요소에 마우스를 올리거나 포커스하면 툴팁이 표시됩니다.
 *
 * @param props TooltipPrimitive.Trigger의 props
 * @example
 * ```tsx
 * <TooltipTrigger asChild>
 *   <Button>Hover me</Button>
 * </TooltipTrigger>
 * ```
 */
function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

/**
 * Tooltip 컴포넌트의 콘텐츠 영역입니다.
 * 툴팁에 표시될 내용을 포함합니다.
 *
 * @param className 추가 CSS 클래스
 * @param children 툴팁 콘텐츠 (body, optional)
 * @param title 툴팁 제목 (required)
 * @param props 기타 TooltipPrimitive.Content props
 * @example
 * ```tsx
 * <TooltipContent>
 *   <p>This is tooltip content</p>
 * </TooltipContent>
 *
 * <TooltipContent title="Tooltip Title">
 *   <p>This is tooltip body</p>
 * </TooltipContent>
 *
 * <TooltipContent className="max-w-xs">
 *   <div>
 *     <h3>Title</h3>
 *     <p>Description</p>
 *   </div>
 * </TooltipContent>
 * ```
 */
function TooltipContent({
  className,
  children,
  title: tooltipTitle,
  ...props
}: Omit<React.ComponentProps<typeof TooltipPrimitive.Content>, "title"> & {
  title?: React.ReactNode
}) {
  // title이나 children 중 하나는 반드시 있어야 함
  if (!tooltipTitle && !children) {
    throw new Error("TooltipContent: Either 'title' or 'children' prop must be provided")
  }

  const place = useContext(TooltipPlaceContext)
  const { side, align } = mapPlaceToSideAlign(place)

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        side={side === "auto" ? undefined : side}
        align={align === "auto" ? undefined : align}
        sideOffset={side === "top" ? 4 : side === "bottom" ? 4 : side === "left" ? 4 : side === "right" ? 4 : 4}
        alignOffset={side === "left" ? -4 : side === "right" ? -4 : 4}
        className={cn("dsds-tooltip", className)}
        {...props}
      >
        <TooltipPrimitive.Arrow asChild>
          <svg className="dsds-tooltip-arrow" width="10" height="5" viewBox="0 0 30 10" preserveAspectRatio="none">
            <polygon points="0,0 30,0 15,10"></polygon>
          </svg>
        </TooltipPrimitive.Arrow>
        {tooltipTitle && children ? (
          /* Title + Body 일 경우 상단 8+4=12px 하단 8+8=16px Padding으로 조정합니다. */
          <div className="flex flex-col gap-1 pt-1 pb-2">
            <div className="dsds-tooltip-title">{tooltipTitle}</div>
            <div className="dsds-tooltip-body">{children}</div>
          </div>
        ) : tooltipTitle ? (
          /* Title만 있는 경우 */
          <div className="dsds-tooltip-title">{tooltipTitle}</div>
        ) : (
          /* Children만 있는 경우 */
          <div className="dsds-tooltip-body">{children}</div>
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

const TooltipPlaceContext = React.createContext<TooltipPlace | undefined>(undefined)

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
