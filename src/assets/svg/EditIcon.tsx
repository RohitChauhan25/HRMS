import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} fill="none" {...props}>
    <path
      fill="#1D2E88"
      fillRule="evenodd"
      d="M16.424 3.579a.833.833 0 0 0-1.178 0l-6.91 6.91v1.179h1.178l6.91-6.91a.833.833 0 0 0 0-1.18ZM14.068 2.4a2.5 2.5 0 0 1 3.535 3.536l-7.155 7.155a.834.834 0 0 1-.589.244H7.502a.833.833 0 0 1-.833-.834v-2.357c0-.22.087-.433.244-.589L14.068 2.4ZM5.002 5.001a.833.833 0 0 0-.833.834V15c0 .46.373.834.833.834h9.167c.46 0 .833-.374.833-.834v-4.166a.833.833 0 1 1 1.667 0V15a2.5 2.5 0 0 1-2.5 2.5H5.002a2.5 2.5 0 0 1-2.5-2.5V5.835a2.5 2.5 0 0 1 2.5-2.5h4.167a.833.833 0 1 1 0 1.666H5.002Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
