import { SVGProps } from 'react'

const CancelIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="#D83232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9 15 3-3m0 0 3-3m-3 3L9 9m3 3 3 3"
    />
    <path
      fill="#D83232"
      fillRule="evenodd"
      d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Z"
      clipRule="evenodd"
    />
  </svg>
)

export default CancelIcon
