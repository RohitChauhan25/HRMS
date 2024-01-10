import * as React from 'react'
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={20} fill="none" {...props}>
    <path
      fill="#F9C51C"
      fillRule="evenodd"
      d="M3 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7.414L8.586 2H3ZM0 3a3 3 0 0 1 3-3h5.586A2 2 0 0 1 10 .586L15.414 6A2 2 0 0 1 16 7.414V17a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
