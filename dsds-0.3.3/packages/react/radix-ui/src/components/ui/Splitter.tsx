"use client"

import * as React from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

import { cn } from "@/lib/utils"
import { UnionIcon } from "@/components/icons"

export function SplitterGroup({
  direction = "horizontal",
  className,
  ...props
}: {
  direction?: "horizontal" | "vertical"
} & React.ComponentProps<typeof PanelGroup>) {
  return (
    <PanelGroup
      direction={direction}
      className={cn("flex h-full w-full", direction === "vertical" && "flex-col", className)}
      {...props}
    />
  )
}

export function SplitterPanel({
  minSize = 10,
  ...props
}: {
  minSize?: number
} & React.ComponentProps<typeof Panel>) {
  return <Panel minSize={minSize} {...props} />
}

export function SplitterHandle({
  direction = "horizontal",
  className,
  ...props
}: {
  direction?: "horizontal" | "vertical"
} & React.ComponentProps<typeof PanelResizeHandle>) {
  const isVertical = direction === "vertical"

  return (
    <PanelResizeHandle
      className={cn(
        "relative flex items-center justify-center bg-[var(--colors-neutral-neutral-01)]",
        "transition-colors",
        "border-[var(--colors-neutral-neutral-08)]",
        "hover:border-[var(--colors-neutral-neutral-09)]",
        "active:border-[var(--colors-neutral-neutral-09)]",
        !isVertical && "w-[6px] cursor-col-resize border-r border-l",
        isVertical && "h-[6px] border-t border-b",
        className
      )}
      {...props}
    >
      <div
        className={cn("pointer-events-none flex items-center justify-center", !isVertical ? "rotate-0" : "rotate-90")}
      >
        <UnionIcon />
      </div>
    </PanelResizeHandle>
  )
}
