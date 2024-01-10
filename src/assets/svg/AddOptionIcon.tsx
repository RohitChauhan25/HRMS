import { SVGProps } from 'react'

const AddOptionIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="none" {...props}>
    <path
      fill="#1D2E88"
      fillRule="evenodd"
      d="M7 1.667a5.333 5.333 0 1 0 0 10.666A5.333 5.333 0 0 0 7 1.667ZM.333 7a6.667 6.667 0 1 1 13.334 0A6.667 6.667 0 0 1 .333 7ZM7 4.333c.368 0 .667.299.667.667v1.333H9a.667.667 0 0 1 0 1.334H7.667V9a.667.667 0 0 1-1.334 0V7.667H5a.667.667 0 0 1 0-1.334h1.333V5c0-.368.299-.667.667-.667Z"
      clipRule="evenodd"
    />
  </svg>
)

export default AddOptionIcon
