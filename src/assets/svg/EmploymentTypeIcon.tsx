import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M4.667 2.667a2 2 0 0 1 2-2h2.667a2 2 0 0 1 2 2v.667h1.334a2 2 0 0 1 2 2V12a2 2 0 0 1-2 2H3.334a2 2 0 0 1-2-2V5.334a2 2 0 0 1 2-2h1.333v-.667Zm-1.333 2a.667.667 0 0 0-.667.667V8.38a15.3 15.3 0 0 0 5.334.953 15.3 15.3 0 0 0 5.333-.953V5.334a.667.667 0 0 0-.666-.667H3.334Zm6.667-1.333H6v-.667C6 2.299 6.299 2 6.667 2h2.667c.368 0 .667.299.667.667v.667Zm3.333 6.461a16.65 16.65 0 0 1-5.333.872 16.65 16.65 0 0 1-5.334-.872V12c0 .368.299.667.667.667h9.333a.667.667 0 0 0 .667-.667V9.795ZM7.334 8c0-.368.299-.666.667-.666h.006a.667.667 0 1 1 0 1.333h-.006A.667.667 0 0 1 7.334 8Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
