import * as React from 'react'
import { SVGProps } from 'react'
const RemoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <path
      fill="#D83232"
      fillRule="evenodd"
      d="M5.911 5.91a.833.833 0 0 1 1.179 0L9 7.82l1.911-1.91A.833.833 0 0 1 12.09 7.09l-1.911 1.91 1.91 1.911a.833.833 0 0 1-1.178 1.179l-1.91-1.911-1.911 1.91A.833.833 0 0 1 5.91 10.91L7.821 9l-1.91-1.911a.833.833 0 0 1 0-1.179Z"
      clipRule="evenodd"
    />
    <path
      fill="#D83232"
      fillRule="evenodd"
      d="M9 2.333a6.667 6.667 0 1 0 0 13.333A6.667 6.667 0 0 0 9 2.333ZM.667 8.999a8.333 8.333 0 1 1 16.667 0A8.333 8.333 0 0 1 .667 9Z"
      clipRule="evenodd"
    />
  </svg>
)
export default RemoveIcon
