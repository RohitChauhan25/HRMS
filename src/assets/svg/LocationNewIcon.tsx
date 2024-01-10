import * as React from 'react'
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={18} fill="none" {...props}>
    <path
      fill="#1D1D1D"
      fillRule="evenodd"
      d="M12.125 4.042a5.833 5.833 0 1 0-8.25 8.25l3.536 3.536a.832.832 0 0 0 1.178 0l3.536-3.536a5.833 5.833 0 0 0 0-8.25ZM2.697 2.864A7.5 7.5 0 1 1 13.303 13.47l-2.918 2.919-.015.015-.603.602a2.499 2.499 0 0 1-3.534 0L2.697 13.47a7.5 7.5 0 0 1 0-10.606ZM8 6.5a1.667 1.667 0 1 0 0 3.334A1.667 1.667 0 0 0 8 6.5ZM4.667 8.167a3.333 3.333 0 1 1 6.666 0 3.333 3.333 0 0 1-6.666 0Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
