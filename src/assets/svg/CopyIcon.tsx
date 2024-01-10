import * as React from 'react'
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" {...props}>
    <path
      fill="#979797"
      fillRule="evenodd"
      d="M0 2a2 2 0 0 1 2-2h5.333a2 2 0 0 1 2 2v.667H10a2 2 0 0 1 2 2V10a2 2 0 0 1-2 2H4.667a2 2 0 0 1-2-2v-.667H2a2 2 0 0 1-2-2V2Zm4 8c0 .368.298.667.667.667H10a.667.667 0 0 0 .667-.667V4.667A.667.667 0 0 0 10 4H4.667A.667.667 0 0 0 4 4.667V10Zm4-7.333H4.667a2 2 0 0 0-2 2V8H2a.667.667 0 0 1-.667-.667V2c0-.368.299-.667.667-.667h5.333c.369 0 .667.299.667.667v.667Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
