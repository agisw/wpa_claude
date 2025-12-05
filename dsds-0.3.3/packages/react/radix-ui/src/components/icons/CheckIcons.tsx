import { cn } from "@/lib/utils"

type Props = { size?: number; className?: string; onClick?: React.MouseEventHandler } & React.SVGProps<SVGSVGElement>

export function CheckedOnIcon({ className, size, onClick, ...props }: Props) {
  size = size || 14
  return (
    <div className={cn(className)} onClick={onClick}>
      <svg {...props} fill="none" style={{ width: size, height: size, position: "relative", left: 2, top: 2 }}>
        <path d="M1 4L3.5 6.5L9 1" strokeWidth="1.8" stroke="#fff" />
      </svg>
    </div>
  )
}

export function IndeterminateIcon({ className, size, onClick, ...props }: Props) {
  size = size || 14
  return (
    <div className={cn(className)} onClick={onClick}>
      <svg {...props} fill="none" style={{ width: size, height: size, position: "relative", left: 2, top: 2 }}>
        <path d="M1 4L9 4" strokeWidth="1.8" stroke="#fff" />
      </svg>
    </div>
  )
}
