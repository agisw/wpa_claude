export const CopyrightIcon = ({ className, color = "#90969D" }: { className?: string; color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 11 11"
      fill="none"
      className={className}
    >
      <rect x="0.5" y="0.5" width="10" height="10" rx="4.5" stroke={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 7C4.67157 7 4 6.32843 4 5.5C4 4.67157 4.67157 4 5.5 4C6.04951 4 6.53001 4.29549 6.79127 4.73624L7.75321 4.4156C7.34935 3.57797 6.49217 3 5.5 3C4.11929 3 3 4.11929 3 5.5C3 6.88071 4.11929 8 5.5 8C6.49217 8 7.34935 7.42203 7.75321 6.5844L6.79127 6.26376C6.77618 6.28922 6.76035 6.3142 6.74382 6.33866C6.47426 6.73767 6.01777 7 5.5 7Z"
        fill={color}
      />
    </svg>
  )
}

CopyrightIcon.displayName = "CopyrightIcon"
