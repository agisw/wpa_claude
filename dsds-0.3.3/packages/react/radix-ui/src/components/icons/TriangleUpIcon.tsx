type Props = { size?: number; className?: string; onClick?: React.MouseEventHandler } & React.SVGProps<SVGSVGElement>

export function InformationIcon({ className, onClick }: Props) {
  return (
    <div className={className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
        <path d="M0 3.5L2.5 0L5 3.5V4H0V3.5Z" fill="#565E66" />
      </svg>
    </div>
  )
}
