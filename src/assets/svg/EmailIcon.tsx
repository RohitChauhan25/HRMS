import { SVGProps } from 'react'

const EmailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path
      fill="#B9B9B9"
      fillRule="evenodd"
      d="M1.667 6.333a2.5 2.5 0 0 1 2.5-2.5h11.667a2.5 2.5 0 0 1 2.5 2.5v8.333a2.5 2.5 0 0 1-2.5 2.5H4.167a2.5 2.5 0 0 1-2.5-2.5V7.178a.82.82 0 0 1 0-.025v-.82Zm1.667 2.39v5.943c0 .46.373.834.833.834h11.667c.46 0 .833-.373.833-.834V8.723l-5.28 3.52a2.5 2.5 0 0 1-2.773 0l-5.28-3.52ZM16.667 6.72l-6.204 4.137a.833.833 0 0 1-.925 0L3.334 6.72v-.387c0-.46.373-.833.833-.833h11.667c.46 0 .833.373.833.833v.387Z"
      clipRule="evenodd"
    />
  </svg>
)
export default EmailIcon
