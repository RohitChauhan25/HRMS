import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} fill="none" {...props}>
    <rect width={60} height={60} fill="#DCE2FF" rx={8} />
    <path fill="#DCE2FF" d="M10 10h40v40H10z" />
    <rect width={28} height={32} x={12} y={12} fill="#FFFEFF" rx={3} />
    <circle cx={41} cy={41} r={7} fill="#6B7BCE" />
    <rect width={22} height={2} x={15} y={33} fill="#6B7BCE" rx={1} />
    <rect width={13} height={2} x={15} y={37} fill="#6B7BCE" rx={1} />
    <rect width={10} height={2} x={38.172} y={36.758} fill="#FFFEFF" rx={1} transform="rotate(45 38.172 36.758)" />
    <rect width={10} height={2} x={45.242} y={38.172} fill="#FFFEFF" rx={1} transform="rotate(135 45.242 38.172)" />
    <path fill="#6B7BCE" d="M32 29a6 6 0 0 0-12 0 1 1 0 0 0 1 1h10a1 1 0 0 0 1-1Z" />
    <circle cx={26} cy={19} r={3} fill="#6B7BCE" />
  </svg>
)
export default SvgComponent
