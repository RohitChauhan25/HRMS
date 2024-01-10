import { SVGProps } from 'react'

const ClosedJobsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={17} fill="none" {...props}>
    <path
      fill="#B9B9B9"
      fillRule="evenodd"
      d="M5.912 5.41a.833.833 0 0 1 1.179 0L9 7.322l1.911-1.91a.833.833 0 0 1 1.179 1.178L10.18 8.5l1.91 1.912a.833.833 0 0 1-1.178 1.178l-1.91-1.91-1.911 1.91a.833.833 0 0 1-1.179-1.178L7.822 8.5l-1.91-1.91a.833.833 0 0 1 0-1.18Z"
      clipRule="evenodd"
    />
    <path
      fill="#B9B9B9"
      fillRule="evenodd"
      d="M9.001 1.833a6.667 6.667 0 1 0 0 13.333 6.667 6.667 0 0 0 0-13.333ZM.668 8.5a8.333 8.333 0 1 1 16.667 0 8.333 8.333 0 0 1-16.667 0Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ClosedJobsIcon
