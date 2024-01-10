import { SVGProps } from 'react'

const MyDraftsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
    <path
      fill="#B9B9B9"
      fillRule="evenodd"
      d="M13.833 1.833H2.167v13.334h11.666V1.832ZM2.167.167C1.247.167.5.913.5 1.833v13.334c0 .92.746 1.666 1.667 1.666h11.666c.92 0 1.667-.746 1.667-1.666V1.832c0-.92-.746-1.666-1.667-1.666H2.167Z"
      clipRule="evenodd"
    />
    <path
      fill="#B9B9B9"
      fillRule="evenodd"
      d="M5.5 5.166c0-.46.373-.833.833-.833h3.334a.833.833 0 0 1 0 1.667H6.333a.833.833 0 0 1-.833-.834ZM3.834 8.5c0-.46.373-.833.833-.833h6.667a.833.833 0 0 1 0 1.666H4.667a.833.833 0 0 1-.833-.833ZM3.834 11c0-.46.373-.834.833-.834h4.167a.833.833 0 1 1 0 1.667H4.667A.833.833 0 0 1 3.834 11Z"
      clipRule="evenodd"
    />
  </svg>
)
export default MyDraftsIcon
