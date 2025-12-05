import { cn } from "@/lib/utils"

type Props = { size?: number; className?: string; onClick?: React.MouseEventHandler } & React.SVGProps<SVGSVGElement>

export function ToastSuccessIcon({ className, size = 16, onClick }: Props) {
  return (
    <div className={cn(className)} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: size, height: size }} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="8" fill="#239B2F" />
        <path d="M4 8L6.5 10.5L12 5" stroke="white" strokeWidth="1.8" />
      </svg>{" "}
    </div>
  )
}

export function ToastFailIcon({ className, size = 16, onClick }: Props) {
  return (
    <div className={cn(className)} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: size, height: size }} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="8" fill="#FF4337" />
        <path d="M11 5L5 11" stroke="white" strokeWidth="1.8" />
        <path d="M5 5L11 11" stroke="white" strokeWidth="1.8" />
      </svg>{" "}
    </div>
  )
}

export function ToastWarningIcon({ className, size = 16, onClick }: Props) {
  return (
    <div className={cn(className)} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: size, height: size }} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="8" fill="#FFB546" />
        <path
          d="M9.20071 11.2C9.20071 11.8627 8.66346 12.4 8.00071 12.4C7.33797 12.4 6.80071 11.8627 6.80071 11.2C6.80071 10.5373 7.33797 10 8.00071 10C8.66346 10 9.20071 10.5373 9.20071 11.2Z"
          fill="white"
        />
        <path d="M7 4H9V9H7V4Z" fill="white" />
      </svg>{" "}
    </div>
  )
}

export function ToastInformIcon({ className, size = 16, onClick }: Props) {
  return (
    <div className={cn(className)} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: size, height: size }} viewBox="0 0 16 16" fill="none">
        <path
          d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z"
          fill="#767D84"
        />
        <path
          d="M9.24993 5C9.24993 5.69036 8.69029 6.25 7.99993 6.25C7.30957 6.25 6.74993 5.69036 6.74993 5C6.74993 4.30964 7.30957 3.75 7.99993 3.75C8.69029 3.75 9.24993 4.30964 9.24993 5Z"
          fill="white"
        />
        <path d="M6.99989 6.99997H8.99989V12H6.99989V6.99997Z" fill="white" />
      </svg>
    </div>
  )
}
