import React from "react"

import { cn } from "@/lib/utils"

type SpinnerSize = "xs" | "small" | "medium" | "large" | "xl"

const SPINNER_CONFIG = {
  xs: { size: 8, r: 2.0, stroke: 2 },
  small: { size: 16, r: 6.0, stroke: 2 },
  medium: { size: 24, r: 9.5, stroke: 3 },
  large: { size: 48, r: 20.0, stroke: 4 },
  xl: { size: 96, r: 40.0, stroke: 8 },
} as const

type SpinnerIconProps = React.SVGProps<SVGSVGElement> & {
  size?: SpinnerSize
  color?: string
}

export const SpinnerIcon: React.FC<SpinnerIconProps> = ({ size = "small", color = "white", className, ...rest }) => {
  const config = SPINNER_CONFIG[size]
  const center = config.size / 2
  const mergedClassName = cn(["dsds-spinner", className])

  return (
    <svg
      width={config.size}
      height={config.size}
      stroke={color}
      viewBox={`0 0 ${config.size} ${config.size}`}
      className={mergedClassName}
      {...rest}
    >
      <g className={`dsds-spinner-animation dsds-spinner-${size}`}>
        <circle cx={center} cy={center} r={config.r} fill="none" strokeWidth={config.stroke} />
      </g>
    </svg>
  )
}
