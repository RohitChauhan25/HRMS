import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} fill="none" {...props}>
    <path
      fill="#151515"
      fillRule="evenodd"
      d="M3 4.167c0-.92.746-1.667 1.667-1.667h11.666c.92 0 1.667.746 1.667 1.667v1.666c0 .92-.746 1.667-1.667 1.667H4.667C3.747 7.5 3 6.754 3 5.833V4.167Zm13.333 0H4.667v1.666h11.666V4.167ZM3 10.833c0-.92.746-1.666 1.667-1.666h5c.92 0 1.666.746 1.666 1.666v5c0 .92-.746 1.667-1.666 1.667h-5C3.747 17.5 3 16.754 3 15.833v-5Zm6.667 0h-5v5h5v-5Zm3.333 0c0-.92.746-1.666 1.667-1.666h1.666c.92 0 1.667.746 1.667 1.666v5c0 .92-.746 1.667-1.667 1.667h-1.666c-.92 0-1.667-.746-1.667-1.667v-5Zm3.333 0h-1.666v5h1.666v-5Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
