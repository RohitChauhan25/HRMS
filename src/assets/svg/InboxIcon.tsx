import * as React from 'react'
import { SVGProps } from 'react'
const InboxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 4A2 2 0 0 1 4 2h8A2 2 0 0 1 14 4v8a2 2 0 0 1 -2 2H4A2 2 0 0 1 2 12V4ZM4 3.334A0.666 0.666 0 0 0 3.334 4v4h1.057c0.354 0 0.693 0.141 0.943 0.39L6.943 10h2.114l1.609 -1.61A1.334 1.334 0 0 1 11.61 8h1.057V4A0.666 0.666 0 0 0 12 3.334H4Zm8.666 6h-1.057L10 10.942a1.334 1.334 0 0 1 -0.942 0.391H6.942c-0.354 0 -0.693 -0.141 -0.943 -0.391l-1.61 -1.609H3.334V12c0 0.368 0.298 0.666 0.666 0.666h8c0.368 0 0.666 -0.298 0.666 -0.666v-2.666Z"
      fill="white"
    />
  </svg>
)
export default InboxIcon
