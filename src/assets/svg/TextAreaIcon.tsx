import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.125 14.61 5.344 3.36l4.218 11.25m-1.476-3.938H2.602m8.859-2.25c.428-1.009 1.441-1.688 2.601-1.688 1.618 0 2.813 1.125 2.813 2.813v5.062"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.25 12.605c0 1.266.944 2.04 2.11 2.04 1.898 0 3.515-.95 3.515-3.727v-.527c-.703 0-2.04.035-3.234.175-1.152.136-2.391.668-2.391 2.04Z"
    />
  </svg>
)
export default SvgComponent
