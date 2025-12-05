import { cn } from "@/lib/utils"

import { DummyIcon } from "./DummyIcon"

type Props = { size?: number; className?: string; onClick?: React.MouseEventHandler } & React.SVGProps<SVGSVGElement>

export function CalendarIcon({ className, size = 14, onClick, ...props }: Props) {
  return (
    <DummyIcon className={cn("with-default-color", className)} onClick={onClick}>
      <svg {...props} viewBox="0 0 14 14" fill="none" style={{ width: size, height: size }}>
        <path
          d="M1.5 3.5C1.5 2.94772 1.94772 2.5 2.5 2.5H11.5C12.0523 2.5 12.5 2.94772 12.5 3.5V10.5C12.5 11.0523 12.0523 11.5 11.5 11.5H2.5C1.94771 11.5 1.5 11.0523 1.5 10.5V3.5Z"
          fill="none"
          strokeWidth="1.001"
        />
        <rect x="2" y="5" width="10" height="1" stroke="none" strokeWidth="1.001" />
        <rect x="4" y="1" width="1" height="1" stroke="none" strokeWidth="1.001" />
        <rect x="9" y="1" width="1" height="1" stroke="none" strokeWidth="1.001" />
      </svg>
    </DummyIcon>
  )
}
