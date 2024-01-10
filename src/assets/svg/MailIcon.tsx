import * as React from 'react'
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={14} fill="none" {...props}>
    <path
      fill="#1D1D1D"
      fillRule="evenodd"
      d="M.664 2.833a2.5 2.5 0 0 1 2.5-2.5h11.667a2.5 2.5 0 0 1 2.5 2.5v8.333a2.5 2.5 0 0 1-2.5 2.5H3.164a2.5 2.5 0 0 1-2.5-2.5V2.833Zm1.667 2.39v5.943c0 .46.373.834.833.834h11.667c.46 0 .833-.373.833-.834V5.223l-5.28 3.52a2.5 2.5 0 0 1-2.773 0l-5.28-3.52ZM15.664 3.22 9.46 7.357a.833.833 0 0 1-.925 0L2.331 3.22v-.387c0-.46.373-.833.833-.833h11.667c.46 0 .833.373.833.833v.387Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
