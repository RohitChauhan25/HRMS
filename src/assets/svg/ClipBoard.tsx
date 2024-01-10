import * as React from 'react'
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path
      fill="#979797"
      fillRule="evenodd"
      d="M2 4a2 2 0 0 1 2-2h5.333a2 2 0 0 1 2 2v.667H12a2 2 0 0 1 2 2V12a2 2 0 0 1-2 2H6.667a2 2 0 0 1-2-2v-.667H4a2 2 0 0 1-2-2V4Zm4 8c0 .368.298.667.667.667H12a.667.667 0 0 0 .667-.667V6.667A.667.667 0 0 0 12 6H6.667A.667.667 0 0 0 6 6.667V12Zm4-7.333H6.667a2 2 0 0 0-2 2V10H4a.667.667 0 0 1-.667-.667V4c0-.368.299-.667.667-.667h5.333c.369 0 .667.299.667.667v.667Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
