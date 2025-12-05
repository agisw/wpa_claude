import { cn } from "@/lib/utils"

import { DummyIcon, DummyIconProps } from "./DummyIcon"

export function GearIcon({ className, ...props }: DummyIconProps) {
  return (
    <DummyIcon {...props} className={cn("with-default-color", className)}>
      <svg
        className={className}
        width={18}
        height={18}
        viewBox="2 2 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9" cy="9" r="2.5" fill="none" />
        <path d="M3 9H7V10H3V9Z" stroke="none" />
        <path d="M11 8H15V9H11V8Z" stroke="none" />
        <rect x="8" y="3" width="1" height="4" stroke="none" />
        <rect x="9" y="11" width="1" height="4" stroke="none" />
        <path d="M4.75745 13.2427L7.58587 10.4142L8.29298 11.1214L5.46455 13.9498L4.75745 13.2427Z" stroke="none" />
        <path d="M9.70715 6.87866L12.5356 4.05024L13.2427 4.75734L10.4143 7.58577L9.70715 6.87866Z" stroke="none" />
        <rect x="4.05029" y="5.46436" width="1" height="4" transform="rotate(-45 4.05029 5.46436)" stroke="none" />
        <rect x="10.4143" y="10.4143" width="1" height="4" transform="rotate(-45 10.4143 10.4143)" stroke="none" />
      </svg>
    </DummyIcon>
  )
}
