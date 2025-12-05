type Props = { size?: number; className?: string; onClick?: React.MouseEventHandler } & React.SVGProps<SVGSVGElement>

export function UnionIcon({ className, onClick }: Props) {
  return (
    <div className={className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="2" height="11" viewBox="0 0 2 11" fill="none">
        <path
          d="M2 8.5L2 10.5L0 10.5L-8.74225e-08 8.5L2 8.5ZM2 4.5L2 6.5L-1.74846e-07 6.5L-2.62268e-07 4.5L2 4.5ZM2 0.5L2 2.5L-3.49691e-07 2.5L-4.37114e-07 0.5L2 0.5Z"
          fill="#B2B6BB"
        />
      </svg>
    </div>
  )
}
