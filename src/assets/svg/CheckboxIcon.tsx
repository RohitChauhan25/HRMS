import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <rect width={13} height={13} x={1.5} y={1.5} stroke="#1D1D1D" strokeWidth={2} rx={2} />
  </svg>
)
export default SvgComponent
