import { SVGProps } from 'react'

const ThreeDotsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={19} height={4} fill="none" {...props}>
    <path
      stroke="#1D2E88"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.002 2h.01m6.99 0h.01m6.99 0h.01M3.002 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
    />
  </svg>
)
export default ThreeDotsIcon
