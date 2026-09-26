type LogoProps = {
  width?: number
  height?: number
  className?: string
}

/** Logo WAVEBOX — icon equalizer + wordmark, sesuai file wavebox-logo.svg */
export default function Logo({ width = 132, height = 43, className = '' }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 185 60"
      fill="none"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label="WAVEBOX"
    >
      <defs>
        <linearGradient id="wb-wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
      </defs>

      <rect x="0" y="10" width="40" height="40" rx="10" fill="#111111" />
      <rect x="0" y="10" width="40" height="40" rx="10" stroke="#F472B6" strokeOpacity="0.35" />

      <rect x="7" y="28" width="4" height="14" rx="2" fill="url(#wb-wave-grad)" opacity="0.45" />
      <rect x="13" y="22" width="4" height="20" rx="2" fill="url(#wb-wave-grad)" opacity="0.7" />
      <rect x="18" y="16" width="4" height="28" rx="2" fill="url(#wb-wave-grad)" />
      <rect x="23" y="22" width="4" height="20" rx="2" fill="url(#wb-wave-grad)" opacity="0.7" />
      <rect x="29" y="28" width="4" height="14" rx="2" fill="url(#wb-wave-grad)" opacity="0.45" />

      <text
        x="50"
        y="39"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="24"
        fontWeight="900"
        fill="#F5F5F5"
        letterSpacing="-1"
      >
        WAVE
      </text>
      <text
        x="120"
        y="39"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="24"
        fontWeight="900"
        fill="#F472B6"
        letterSpacing="-1"
      >
        BOX
      </text>

      <circle cx="178" cy="35" r="3.5" fill="#F472B6" />
    </svg>
  )
}
