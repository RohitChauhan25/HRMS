import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={130} height={129} fill="none" {...props}>
    <circle cx={65} cy={64.5} r={62.5} stroke="#F9C51C" strokeWidth={4} />
    <path
      stroke="#F9C51C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={6.5}
      d="m47.854 65.317 11.43 11.43 22.861-24.494"
    />
  </svg>
)
export default SvgComponent
