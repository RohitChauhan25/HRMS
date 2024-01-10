import { SVGProps } from 'react'

const TimeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="none" {...props}>
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M7 1.666a5.333 5.333 0 1 0 0 10.667A5.333 5.333 0 0 0 7 1.666ZM.335 7a6.667 6.667 0 1 1 13.333 0A6.667 6.667 0 0 1 .334 7Zm6.667-3.334c.368 0 .666.299.666.667v2.39l1.805 1.805a.667.667 0 1 1-.943.943l-2-2A.667.667 0 0 1 6.334 7V4.333c0-.368.298-.667.667-.667Z"
      clipRule="evenodd"
    />
  </svg>
)
export default TimeIcon
