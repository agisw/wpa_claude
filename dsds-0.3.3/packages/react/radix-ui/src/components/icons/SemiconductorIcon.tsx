export const SemiconductorIcon = ({ color }: { color?: string }) => {
  color = color || "#767D84"
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3.5" y="3.5" width="9" height="9" stroke={color} />
      <rect x="6.5" y="6.5" width="3" height="3" stroke={color} />
      <rect x="6" y="1" width="1" height="2" fill={color} />
      <rect x="6" y="13" width="1" height="2" fill={color} />
      <rect x="9" y="1" width="1" height="2" fill={color} />
      <rect x="9" y="13" width="1" height="2" fill={color} />
      <rect x="15" y="6" width="1" height="2" transform="rotate(90 15 6)" fill={color} />
      <rect x="3" y="6" width="1" height="2" transform="rotate(90 3 6)" fill={color} />
      <rect x="15" y="9" width="1" height="2" transform="rotate(90 15 9)" fill={color} />
      <rect x="3" y="9" width="1" height="2" transform="rotate(90 3 9)" fill={color} />
    </svg>
  )
}
