import { SVGProps } from 'react'

const RightArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path
      fill="#151515"
      fillRule="evenodd"
      d="M5.529 13.138a.667.667 0 0 1 0-.943L9.724 8 5.529 3.805a.667.667 0 1 1 .942-.943l4.667 4.667c.26.26.26.682 0 .943l-4.667 4.666a.667.667 0 0 1-.942 0Z"
      clipRule="evenodd"
    />
  </svg>
)

export default RightArrowIcon
