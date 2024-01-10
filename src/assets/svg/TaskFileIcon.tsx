import * as React from 'react'
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path fill="#fff" d="M6.667 10.417a.833.833 0 0 0 0 1.667h6.667a.833.833 0 0 0 0-1.667H6.667Z" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M3.334 3.334c0-.92.746-1.667 1.666-1.667h7.318c.51 0 .993.234 1.31.635l2.681 3.403c.232.294.358.657.358 1.032V7.5c.92 0 1.667.747 1.667 1.667v4.167c0 .92-.747 1.666-1.667 1.666v1.667c0 .92-.746 1.667-1.667 1.667H5c-.92 0-1.666-.747-1.666-1.667V15c-.92 0-1.667-.746-1.667-1.666V9.167c0-.92.746-1.667 1.667-1.667V3.334ZM15 6.737V7.5H5V3.334h7.318L15 6.737ZM5 15h10v1.667H5V15Zm11.667-5.833H3.334v4.167h13.333V9.167Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
