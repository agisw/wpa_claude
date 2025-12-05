type Props = { size?: number; className?: string; onClick?: React.MouseEventHandler } & React.SVGProps<SVGSVGElement>

export function InformationIcon({ className, onClick }: Props) {
  return (
    <div className={className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M0.5 1.5C0.5 0.947715 0.947715 0.5 1.5 0.5H14.5C15.0523 0.5 15.5 0.947715 15.5 1.5V14.5C15.5 15.0523 15.0523 15.5 14.5 15.5H1.5C0.947715 15.5 0.5 15.0523 0.5 14.5V1.5Z"
          fill="white"
          stroke="#E4E9ED"
        />
        <path
          d="M9.19974 5.00005C9.19974 5.66279 8.66248 6.20005 7.99974 6.20005C7.337 6.20005 6.79974 5.66279 6.79974 5.00005C6.79974 4.33731 7.337 3.80005 7.99974 3.80005C8.66248 3.80005 9.19974 4.33731 9.19974 5.00005Z"
          fill="#767D84"
        />
        <path d="M7 7H9V12H7V7Z" fill="#767D84" />
      </svg>{" "}
    </div>
  )
}
