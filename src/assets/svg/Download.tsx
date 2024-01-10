import * as React from 'react'
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      fill="#1D2E88"
      fillRule="evenodd"
      d="M4.167 14.167c0 .92.746 1.666 1.666 1.666h8.334c.92 0 1.666-.746 1.666-1.666v-.834a.833.833 0 0 1 1.667 0v.834a3.333 3.333 0 0 1-3.333 3.333H5.833A3.333 3.333 0 0 1 2.5 14.167v-.834a.833.833 0 0 1 1.667 0v.834Zm1.91-4.756a.833.833 0 0 1 1.179 0l1.91 1.91V3.333a.833.833 0 0 1 1.667 0v7.989l1.911-1.911a.833.833 0 1 1 1.179 1.178l-3.334 3.334a.833.833 0 0 1-1.178 0l-3.334-3.334a.833.833 0 0 1 0-1.178Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
