import { cn } from "@/lib/utils"
import { type ButtonVariantProps } from "@/components/ui/Button"

import { ButtonStates } from "./_components/ButtonStates"
import { DemoRowTitle } from "./_components/DemoRowTitle"

type ButtonDemoProps = {
  className?: string
  hideSpinnerIcon?: boolean
}

export function ButtonsDemo({ className, hideSpinnerIcon }: ButtonDemoProps) {
  const variants = [
    { label: "Brand (Primary)", variant: "primary" },
    { label: "Warning", variant: "warning" },
    { label: "Danger", variant: "danger" },
    { label: "2ndary", variant: "secondary", showExtraState: true },
    { label: "Ghost", variant: "ghost", showExtraState: true },
    { label: "Ghost (Link)", variant: "ghostLink" },
  ] as { variant: ButtonVariantProps["variant"]; label: string; showExtraState?: boolean }[]

  return (
    <div className={cn("flex flex-col gap-10", className)}>
      {variants.map((state, index) => (
        <ul key={index} className="flex flex-col gap-5">
          <DemoRowTitle title={state.label} />
          <ButtonStates
            variant={state.variant}
            size="large"
            showExtraState={state.showExtraState}
            showStateLabel
            hideSpinnerIcon={hideSpinnerIcon}
          />
          <ButtonStates
            variant={state.variant}
            size="medium"
            showExtraState={state.showExtraState}
            hideSpinnerIcon={hideSpinnerIcon}
          />
          <ButtonStates
            variant={state.variant}
            size="small"
            showExtraState={state.showExtraState}
            hideSpinnerIcon={hideSpinnerIcon}
          />
        </ul>
      ))}
    </div>
  )
}
