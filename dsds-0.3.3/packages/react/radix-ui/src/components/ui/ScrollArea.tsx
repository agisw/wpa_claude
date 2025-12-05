import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

/**
 * ScrollArea 컴포넌트는 커스텀 스크롤바를 제공하는 스크롤 가능한 영역입니다.
 *
 * - **플로팅 스크롤바**로 콘텐츠 영역을 차지하지 않음
 * - **크로스 플랫폼**에서 일관된 스크롤바 스타일 제공
 * - **접근성** 지원 (키보드 네비게이션, 스크린 리더)
 * - 수직/수평 스크롤 모두 지원
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <ScrollArea className="h-[200px] w-[350px]">
 *   <div className="p-4">
 *     <p>긴 텍스트 콘텐츠...</p>
 *   </div>
 * </ScrollArea>
 *
 * // 수평 스크롤
 * <ScrollArea horizontal className="w-[300px]">
 *   <div className="w-[600px] p-4">
 *     <p>가로로 긴 콘텐츠...</p>
 *   </div>
 * </ScrollArea>
 * ```
 *
 * @see ScrollAreaProps
 */
const ScrollArea = ({ className, children, scrollHideDelay = 0, ...props }: ScrollAreaProps) => {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      scrollHideDelay={scrollHideDelay}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:outline-ring size-full rounded-[inherit] transition-[color,box-shadow] outline-none"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      {props.horizontal && <ScrollBar orientation="horizontal" />}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

ScrollArea.displayName = "ScrollArea"

export type ScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  horizontal?: boolean
}

/**
 * ScrollAreaProps 타입입니다.
 * @property {boolean} [horizontal] - 수평 스크롤바 표시 여부
 * @property {string} [className] - 추가 CSS 클래스
 * @property {React.ReactNode} children - 스크롤할 콘텐츠
 * @property {number} [scrollHideDelay] - 스크롤바 숨김 지연 시간 (기본값: 0)
 */

/**
 * ScrollBar 컴포넌트입니다.
 * ScrollArea 내부에서 사용되는 커스텀 스크롤바입니다.
 *
 * - 수직/수평 방향 지원
 * - 스크롤바에 마우스 호버 크기를 살짝 증가시켜 사용자 경험 향상
 *
 * @example
 * ```tsx
 * // 수직 스크롤바 (기본값)
 * <ScrollBar />
 *
 * // 수평 스크롤바
 * <ScrollBar orientation="horizontal" />
 * ```
 */
const ScrollBar = ({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) => {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-[1px] transition-colors select-none",
        orientation === "vertical" && "h-full w-[8px] border-l border-l-transparent hover:w-[10px]",
        orientation === "horizontal" && "h-[8px] flex-col border-t border-t-transparent hover:h-[10px]",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-scrollbar hover:bg-scrollbar-hover relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

ScrollBar.displayName = "ScrollBar"

export { ScrollArea, ScrollBar }
