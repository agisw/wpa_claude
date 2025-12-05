type Props = {
  className?: string
  color?: "light" | "dark" | "red"
}

export function ConfidentialIcon({ color, className }: Props) {
  const fillColor = color === "red" ? "#C13737" : color === "dark" ? "#000000" : "#FFFFFF"
  const textColor = color === "red" ? "#FFFFFF" : color === "dark" ? "#FFFFFF" : "#000000"
  const strokeColor = color === "light" ? "#efefef" : undefined
  const fillOpacity = color === "dark" ? "0.3" : undefined
  const textOpacity = color === "dark" ? "0.8" : undefined

  return (
    <svg
      className={className}
      width="72"
      height="14"
      viewBox="0 0 72 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_221_52959)">
        <rect
          opacity={fillOpacity}
          width="72"
          height="14"
          rx={strokeColor ? "1.5" : "2"}
          fill={fillColor}
          stroke={strokeColor}
        />
        <g opacity={textOpacity}>
          <rect x="57" y="5" width="1" height="5" fill={textColor} />
          <rect x="58" y="4" width="3" height="1" fill={textColor} />
          <rect x="58" y="7" width="3" height="1" fill={textColor} />
          <rect x="61" y="5" width="1" height="5" fill={textColor} />
          <rect x="6" y="4" width="4" height="1" fill={textColor} />
          <rect x="5" y="5" width="1" height="4" fill={textColor} />
          <rect x="6" y="9" width="4" height="1" fill={textColor} />
          <rect x="31" y="4" width="4" height="1" fill={textColor} />
          <rect x="31" y="5" width="1" height="4" fill={textColor} />
          <rect x="31" y="9" width="4" height="1" fill={textColor} />
          <rect x="35" y="5" width="1" height="4" fill={textColor} />
          <rect x="29" y="4" width="1" height="6" fill={textColor} />
          <rect x="55" y="4" width="1" height="6" fill={textColor} />
          <rect x="63" y="9" width="4" height="1" fill={textColor} />
          <rect x="63" y="4" width="1" height="5" fill={textColor} />
          <rect x="17" y="4" width="1" height="6" fill={textColor} />
          <rect x="21" y="4" width="1" height="6" fill={textColor} />
          <rect x="19" y="6" width="1" height="2" fill={textColor} />
          <rect x="18" y="5" width="1" height="1" fill={textColor} />
          <rect x="20" y="8" width="1" height="1" fill={textColor} />
          <rect x="11" y="5" width="1" height="4" fill={textColor} />
          <rect x="15" y="5" width="1" height="4" fill={textColor} />
          <rect x="12" y="9" width="3" height="1" fill={textColor} />
          <rect x="12" y="4" width="3" height="1" fill={textColor} />
          <rect x="49" y="4" width="5" height="1" fill={textColor} />
          <rect x="51" y="5" width="1" height="5" fill={textColor} />
          <rect x="37" y="4" width="5" height="1" fill={textColor} />
          <rect x="37" y="5" width="1" height="4" fill={textColor} />
          <rect x="37" y="9" width="5" height="1" fill={textColor} />
          <rect x="38" y="6" width="3" height="1" fill={textColor} />
          <rect x="23" y="4" width="5" height="1" fill={textColor} />
          <rect x="23" y="5" width="1" height="5" fill={textColor} />
          <rect x="24" y="7" width="3" height="1" fill={textColor} />
          <rect x="43" y="4" width="1" height="6" fill={textColor} />
          <rect x="47" y="4" width="1" height="6" fill={textColor} />
          <rect x="45" y="6" width="1" height="2" fill={textColor} />
          <rect x="44" y="5" width="1" height="1" fill={textColor} />
          <rect x="46" y="8" width="1" height="1" fill={textColor} />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_221_52959">
          <rect width="72" height="14" rx="2" fill={textColor} />
        </clipPath>
      </defs>
    </svg>
  )
}
