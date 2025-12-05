import { cn } from "@/lib/utils"

import { DummyIcon } from "./DummyIcon"

type Props = { size?: number; className?: string; onClick?: React.MouseEventHandler } & React.SVGProps<SVGSVGElement>

export function MagnifyIcon({ className, size = 14, onClick, ...props }: Props) {
  return (
    <DummyIcon className={cn("with-default-stroke", className)} onClick={onClick}>
      <svg {...props} viewBox="0 0 12 12" fill="none" style={{ width: size, height: size, padding: 1 }}>
        <path d="M8 8L12 12" strokeWidth="1.2" fill="none" />
        <circle cx="5" cy="5" r="4.4" strokeWidth="1.2" fill="none" />
      </svg>
    </DummyIcon>
  )
}
