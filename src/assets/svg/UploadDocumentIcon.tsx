import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      fill="#4A4A4A"
      fillRule="evenodd"
      d="M4.167 14.167c0 .92.746 1.666 1.666 1.666h8.334c.92 0 1.666-.746 1.666-1.666v-.834a.833.833 0 0 1 1.667 0v.834a3.333 3.333 0 0 1-3.333 3.333H5.833A3.333 3.333 0 0 1 2.5 14.167v-.834a.833.833 0 0 1 1.667 0v.834Zm1.91-6.911a.833.833 0 0 1 0-1.179l3.334-3.333a.833.833 0 0 1 1.178 0l3.334 3.333a.833.833 0 0 1-1.179 1.179l-1.91-1.91v7.987a.833.833 0 1 1-1.667 0V5.345l-1.911 1.91a.833.833 0 0 1-1.179 0Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
