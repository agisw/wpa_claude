type Props = { size?: number; className?: string; onClick?: React.MouseEventHandler } & React.SVGProps<SVGSVGElement>

export function PlusIcon({ className, onClick }: Props) {
  return (
    <div className={className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="6" y="3" width="2" height="8" fill="#767D84" />
        <rect x="3" y="6" width="8" height="2" fill="#767D84" />
      </svg>
    </div>
  )
}
