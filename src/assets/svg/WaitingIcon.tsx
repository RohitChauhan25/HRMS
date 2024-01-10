import { SVGProps } from 'react'

const WaitingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <path
      fill="#6B7BCE"
      fillRule="evenodd"
      d="M9 2.333a6.667 6.667 0 1 0 0 13.334A6.667 6.667 0 0 0 9 2.333ZM.667 9a8.333 8.333 0 1 1 16.666 0A8.333 8.333 0 0 1 .667 9ZM9 4.833c.46 0 .833.373.833.833v2.989l2.256 2.256a.833.833 0 0 1-1.178 1.178l-2.5-2.5A.833.833 0 0 1 8.167 9V5.667c0-.46.373-.833.833-.833Z"
      clipRule="evenodd"
    />
  </svg>
)

export default WaitingIcon
