import type React from "react"

import { cn } from "@/lib/utils"

export type DummyIconProps = {
  className?: string
  disabled?: boolean
  size?: number
  onClick?: React.MouseEventHandler
  children?: React.ReactNode
  "data-testid"?: string
  "aria-label"?: string
}

export function DummyIcon({
  className,
  disabled,
  "data-testid": dataTestId,
  "aria-label": ariaLabel,
  onClick,
  children,
}: DummyIconProps) {
  const Comp = onClick ? "button" : "div"
  return (
    <Comp
      disabled={disabled}
      className={cn("dsds-icon", onClick && "cursor-pointer", disabled && "disabled", className)}
      onClick={onClick}
      data-testid={dataTestId}
      aria-label={ariaLabel}
    >
      {children ? children : <div className="dsds-dummy-icon-placeholder" />}
    </Comp>
  )
}
