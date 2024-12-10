export default function Logo({ className, color = "#FCC404" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
    >
      <path
        d="M22.5 15H2L38 84.5H60L97.5 15H75.5L49 64.5L22.5 15Z"
        fill={color}
        stroke={color}
      />
    </svg>
  );
}
