"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { CloseIconGhost } from "@/components/icons"

export type PopoverContentProps = React.ComponentProps<typeof PopoverPrimitive.Content> & {
  index: number
  className?: string
  title?: React.ReactNode
  titleClassName?: string
  childrenClassName?: string
  isOpen: boolean
  children?: React.ReactNode
  display: (e: boolean, index: number) => void
}

function Popover({
  index,
  className,
  title,
  titleClassName,
  childrenClassName,
  isOpen,
  children,
  display,
  ...props
}: PopoverContentProps) {
  const [shouldRender, setShouldRender] = useState(isOpen)
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
    } else {
      setTimeout(() => setShouldRender(false), 100)
    }
  }, [index, isOpen])

  if (!shouldRender) return null

  return (
    <div data-state={isOpen ? "open" : "close"} className={cn("dsds-popover-container", className)} {...props}>
      <div className={cn("dsds-popover-header", titleClassName)}>
        <div className="dsds-popover-title">{title}</div>
        <button className="dsds-popover-button">
          <CloseIconGhost onClick={() => display(false, index)} />
        </button>
      </div>
      <div className="dsds-popover-divider" />
      <div className={cn("dsds-popover-content", childrenClassName)}>{children}</div>
    </div>
  )
}

export { Popover }
