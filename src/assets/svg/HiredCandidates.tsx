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
    <rect width={5.814} height={2} x={37.395} y={39.81} fill="#FFFEFF" rx={1} transform="rotate(44.174 37.395 39.81)" />
    <rect
      width={9.587}
      height={2}
      x={46.889}
      y={38.394}
      fill="#FFFEFF"
      rx={1}
      transform="rotate(134.174 46.889 38.394)"
    />
    <path fill="#6B7BCE" d="M32 29a6 6 0 0 0-12 0 1 1 0 0 0 1 1h10a1 1 0 0 0 1-1Z" />
    <circle cx={26} cy={19} r={3} fill="#6B7BCE" />
  </svg>
)
export default SvgComponent
