import { cn } from "@/lib/utils"

import { DummyIcon } from "./DummyIcon"

type Props = {
  size?: number
  className?: string
  onClick?: React.MouseEventHandler
  disabled?: boolean
} & React.SVGProps<SVGSVGElement>

export function CloseIcon({ className, size = 14, onMouseDown, ...props }: Props) {
  return (
    <DummyIcon {...props} className={cn("with-default-stroke", className)} onClick={onMouseDown}>
      <svg
        viewBox="0 0 14 14"
        fill="none"
        style={{ width: size, height: size }}
        // style={{ width: size, height: size, padding: 1 }}
      >
        <path d="M3.5 3.5L10.5 10.5" strokeWidth="1.2" fill="none" />
        <path d="M10.5 3.5L3.5 10.5" strokeWidth="1.2" fill="none" />
      </svg>
    </DummyIcon>
  )
}

export function CloseIconGhost({ className, size, onClick, disabled, ...props }: Props) {
  size = size || 14
  const sizePx = `w-[${size}px] h-[${size}px]`
  return (
    <div
      className={cn(
        "p-[1px] [&>svg]:stroke-[var(--color-icon-default-1st)]",
        className,
        disabled && "cursor-not-allowed opacity-30"
      )}
      onClick={onClick}
    >
      <svg {...props} viewBox="0 0 14 14" fill="none" className={sizePx}>
        <path d="M2 12L12 2" strokeWidth="1.2" />
        <path d="M2 2L12 12" strokeWidth="1.2" />
      </svg>
    </div>
  )
}
