import * as React from 'react'
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={19} height={18} fill="none" {...props}>
    <path
      fill="#1D1D1D"
      fillRule="evenodd"
      d="M2.914 14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 1 1 2 0v1a4 4 0 0 1-4 4h-10a4 4 0 0 1-4-4v-1a1 1 0 1 1 2 0v1Zm2.293-5.707a1 1 0 0 1 1.414 0l2.293 2.293V1a1 1 0 0 1 2 0v9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
