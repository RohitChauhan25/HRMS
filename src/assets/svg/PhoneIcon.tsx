import * as React from 'react'
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <path
      fill="#1D1D1D"
      fillRule="evenodd"
      d="M.667 3.167a2.5 2.5 0 0 1 2.5-2.5h2.732c.718 0 1.355.459 1.581 1.14L8.73 5.55a1.667 1.667 0 0 1-.836 2.018l-1.13.565a8.378 8.378 0 0 0 3.103 3.104l.565-1.13a1.667 1.667 0 0 1 2.018-.836l3.745 1.248c.68.227 1.14.864 1.14 1.581v2.733a2.5 2.5 0 0 1-2.5 2.5H14C6.636 17.334.667 11.364.667 4v-.833Zm2.5-.833a.833.833 0 0 0-.834.833V4c0 6.444 5.224 11.667 11.667 11.667h.833c.46 0 .834-.373.834-.833V12.1l-3.745-1.248-.94 1.88c-.2.4-.68.572-1.088.388a10.035 10.035 0 0 1-5.015-5.014.833.833 0 0 1 .387-1.088l1.881-.94L5.9 2.333H3.167Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent