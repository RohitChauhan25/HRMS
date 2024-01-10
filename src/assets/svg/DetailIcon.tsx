import * as React from 'react'
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} fill="none" {...props}>
    <path
      fill="#B9B9B9"
      fillRule="evenodd"
      d="M.664 1c0-.46.373-.833.833-.833h9.167a.833.833 0 0 1 0 1.667H2.331v13.333h8.333a.833.833 0 0 1 0 1.667H1.497A.833.833 0 0 1 .664 16V1Zm7.5 3.334c0-.46.373-.834.833-.834h3.334a.833.833 0 1 1 0 1.667H8.997a.833.833 0 0 1-.833-.833ZM4.831 7.667c0-.46.373-.833.833-.833h10a.833.833 0 0 1 0 1.666h-10a.833.833 0 0 1-.833-.833Zm0 2.5c0-.46.373-.833.833-.833h10a.833.833 0 0 1 0 1.666h-10a.833.833 0 0 1-.833-.833Zm0 2.5c0-.46.373-.833.833-.833h10a.833.833 0 0 1 0 1.666h-10a.833.833 0 0 1-.833-.833Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
