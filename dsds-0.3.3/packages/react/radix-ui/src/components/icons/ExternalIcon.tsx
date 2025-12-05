type Props = {
  className?: string
}

export const ExternalIcon = ({ className }: Props) => {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 2.5H11.5V7" stroke="#CCD1D6" />
      <path d="M11.5 2.5L6 8" stroke="#CCD1D6" />
      <path d="M5 2.5H2.5V11.5H11.5V9" stroke="#CCD1D6" />
    </svg>
  )
}
