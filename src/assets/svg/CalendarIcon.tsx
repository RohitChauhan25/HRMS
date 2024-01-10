import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} fill="none" {...props}>
    <path
      fill="#4A4A4A"
      fillRule="evenodd"
      d="M7.167 1.668c.46 0 .833.373.833.833v.834h5V2.5a.833.833 0 1 1 1.667 0v.834h1.666a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5H4.667a2.5 2.5 0 0 1-2.5-2.5v-10a2.5 2.5 0 0 1 2.5-2.5h1.666V2.5c0-.46.374-.833.834-.833Zm-.834 3.333H4.667a.833.833 0 0 0-.834.834v10c0 .46.374.833.834.833h11.666c.46 0 .834-.373.834-.833v-10A.833.833 0 0 0 16.333 5h-1.666v.834a.833.833 0 1 1-1.667 0V5H8v.834a.833.833 0 0 1-1.667 0V5ZM5.5 9.168c0-.46.373-.833.833-.833h8.334a.833.833 0 1 1 0 1.666H6.333a.833.833 0 0 1-.833-.833Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
