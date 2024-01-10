import { SVGProps } from 'react'

const YellowAddIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" {...props}>
    <rect width={36} height={36} fill="#F9C51C" rx={18} />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M18 11a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5h-5a1 1 0 1 1 0-2h5v-5a1 1 0 0 1 1-1Z"
      clipRule="evenodd"
    />
  </svg>
)

export default YellowAddIcon
