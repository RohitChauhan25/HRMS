import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} fill="none" {...props}>
    <rect width={60} height={60} fill="#DCE2FF" rx={8} />
    <path fill="#DCE2FF" d="M10 10h40v40H10z" />
    <rect width={28} height={34} x={16} y={12} fill="#FFFEFF" rx={3} />
    <rect width={24} height={2} x={18} y={36} fill="#6B7BCE" rx={1} />
    <rect width={14} height={2} x={18} y={40} fill="#6B7BCE" rx={1} />
    <path fill="#6B7BCE" d="M36 29a6 6 0 0 0-12 0 1 1 0 0 0 1 1h10a1 1 0 0 0 1-1Z" />
    <circle cx={30} cy={19} r={3} fill="#6B7BCE" />
    <path
      fill="#6B7BCE"
      d="M21.571 29.286a4.286 4.286 0 1 0-8.571 0c0 .394.32.714.714.714h7.143c.395 0 .714-.32.714-.714Z"
    />
    <circle cx={17.285} cy={22.143} r={2.143} fill="#6B7BCE" />
    <path
      fill="#6B7BCE"
      d="M46.571 29.286a4.286 4.286 0 1 0-8.571 0c0 .394.32.714.714.714h7.143c.395 0 .714-.32.714-.714Z"
    />
    <circle cx={42.285} cy={22.143} r={2.143} fill="#6B7BCE" />
  </svg>
)
export default SvgComponent
