import { cn } from "@/lib/utils"

import { DummyIcon, DummyIconProps } from "./DummyIcon"

export function HamburgerIcon({ className, ...props }: DummyIconProps) {
  return (
    <DummyIcon {...props} className={cn("with-default-fill", className)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" data-testid="hamburger-icon">
        <rect x="1" y="2" width="12" height="2" stroke="none" />
        <rect x="1" y="6" width="12" height="2" stroke="none" />
        <rect x="1" y="10" width="12" height="2" stroke="none" />
      </svg>
    </DummyIcon>
  )
}
