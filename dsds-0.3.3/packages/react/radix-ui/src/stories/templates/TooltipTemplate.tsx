import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import {
  Button,
  showOnlyPlaces,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type TooltipAlign,
  type TooltipPlace,
  type TooltipProps,
  type TooltipSide,
} from "@/components/ui"

export type TooltipTemplateProps = {
  /** 시작시 툴팁 바로 표시 */
  defaultOpen?: boolean
  /** 테스트용으로 툴팁을 항상 표시하는 모드 */
  persistent?: boolean
  content?: ReactNode
  showOnly?: TooltipPlace[]
  className?: string
  rowClassName?: string
  tooltipClassName?: string
  defaultSide?: TooltipSide
  defaultAlign?: TooltipAlign
}

export type { TooltipPlace } from "@/components/ui/types"

export function TooltipTemplate({
  showOnly,
  className,
  rowClassName,
  tooltipClassName,
  ...props
}: TooltipTemplateProps) {
  const tooltipProps = {
    ...props,
    defaultOpen: props.defaultOpen ?? true,
    className: tooltipClassName,
  }

  const showOnlySet = showOnly
    ? new Set(showOnly)
    : showOnlyPlaces.reduce((acc, place) => acc.add(place), new Set<TooltipPlace>())

  return (
    <div className={cn("flex h-full w-full flex-col items-start justify-between gap-20 pt-10 pb-20", className)}>
      {(["top-start", "top", "top-end"] as TooltipPlace[]).some((it) => showOnlySet.has(it)) && (
        <div className={cn("flex w-full items-start justify-between px-50", rowClassName)}>
          {showOnlySet.has("top-start") && <TooltipButton {...tooltipProps} place="top-start" />}
          {showOnlySet.has("top") && <TooltipButton {...tooltipProps} place="top" />}
          {showOnlySet.has("top-end") && <TooltipButton {...tooltipProps} place="top-end" />}
        </div>
      )}
      {(["left-start", "auto-start", "right-start"] as TooltipPlace[]).some((it) => showOnlySet.has(it)) && (
        <div className={cn("flex w-full items-start justify-between px-40", rowClassName)}>
          {showOnlySet.has("left-start") && (
            <TooltipButton
              {...tooltipProps}
              place="left-start"
              tooltipTitle="Tooltip Title"
              tooltipContent={<p>Tooltip Body</p>}
            />
          )}
          {showOnlySet.has("auto-start") && (
            <TooltipButton
              {...tooltipProps}
              place="auto-start"
              tooltipTitle="Tooltip Title"
              tooltipContent={<p>Tooltip Body</p>}
            />
          )}
          {showOnlySet.has("right-start") && (
            <TooltipButton
              {...tooltipProps}
              place="right-start"
              tooltipTitle="Tooltip Title"
              tooltipContent={<p>Tooltip Body</p>}
            />
          )}
        </div>
      )}
      {(["left", "auto", "right"] as TooltipPlace[]).some((it) => showOnlySet.has(it)) && (
        <div className={cn("flex w-full items-start justify-between px-40", rowClassName)}>
          {showOnlySet.has("left") && (
            <TooltipButton
              {...tooltipProps}
              place="left"
              tooltipTitle="Tooltip Title"
              tooltipContent={<p>Tooltip Body</p>}
            />
          )}
          {showOnlySet.has("auto") && (
            <TooltipButton
              {...tooltipProps}
              place="auto"
              tooltipTitle="Tooltip Title"
              tooltipContent={<p>Tooltip Body</p>}
            />
          )}
          {showOnlySet.has("right") && (
            <TooltipButton
              {...tooltipProps}
              place="right"
              tooltipTitle="Tooltip Title"
              tooltipContent={<p>Tooltip Body</p>}
            />
          )}
        </div>
      )}
      {(["left-end", "auto-end", "right-end"] as TooltipPlace[]).some((it) => showOnlySet.has(it)) && (
        <div className={cn("flex w-full items-start justify-between px-40", rowClassName)}>
          {showOnlySet.has("left-end") && (
            <TooltipButton
              {...tooltipProps}
              place="left-end"
              tooltipTitle="Tooltip Title"
              tooltipContent={<p>Tooltip Body</p>}
            />
          )}
          {showOnlySet.has("auto-end") && (
            <TooltipButton
              {...tooltipProps}
              place="auto-end"
              tooltipTitle="Tooltip Title"
              tooltipContent={<p>Tooltip Body</p>}
            />
          )}
          {showOnlySet.has("right-end") && (
            <TooltipButton
              {...tooltipProps}
              place="right-end"
              tooltipTitle="Tooltip Title"
              tooltipContent={<p>Tooltip Body</p>}
            />
          )}
        </div>
      )}
      {(["bottom-start", "bottom", "bottom-end"] as TooltipPlace[]).some((it) => showOnlySet.has(it)) && (
        <div className={cn("flex w-full items-start justify-between px-64", rowClassName)}>
          {showOnlySet.has("bottom-start") && <TooltipButton {...tooltipProps} place="bottom-start" />}
          {showOnlySet.has("bottom") && <TooltipButton {...tooltipProps} place="bottom" />}
          {showOnlySet.has("bottom-end") && <TooltipButton {...tooltipProps} place="bottom-end" />}
        </div>
      )}
    </div>
  )
}

type TooltipButtonProps = Omit<TooltipTemplateProps, "place"> &
  Pick<TooltipProps, "place"> & {
    tooltipContent?: React.ReactNode
    tooltipTitle?: React.ReactNode
    className?: string
    defaultSide?: TooltipSide
    defaultAlign?: TooltipAlign
  }

export function TooltipButton({
  className,
  content,
  tooltipContent = <span className="font-bold">Tooltip</span>,
  tooltipTitle,
  place,
  ...props
}: TooltipButtonProps) {
  return (
    <Tooltip {...props} place={place}>
      <TooltipTrigger asChild>
        <Button size="small" variant="secondary" className={cn("min-w-20", className)}>
          {content || place}
        </Button>
      </TooltipTrigger>
      <TooltipContent title={tooltipTitle || "Tooltip Title"}>{tooltipContent}</TooltipContent>
    </Tooltip>
  )
}
