import { SVGProps } from 'react'

const WarningIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={16} fill="none" {...props}>
    <path
      fill="#F9C51C"
      fillRule="evenodd"
      d="M6.835 1.917c.962-1.667 3.368-1.667 4.33 0l5.774 10c.962 1.666-.241 3.75-2.165 3.75H3.226c-1.925 0-3.128-2.084-2.166-3.75l5.774-10Zm2.887.833a.833.833 0 0 0-1.444 0l-5.773 10A.833.833 0 0 0 3.227 14h11.547a.833.833 0 0 0 .721-1.25l-5.773-10ZM9 5.667c.46 0 .833.373.833.833v1.666a.833.833 0 1 1-1.666 0V6.5c0-.46.373-.833.833-.833ZM8.167 11.5c0-.46.373-.834.833-.834h.008a.833.833 0 1 1 0 1.667H9a.833.833 0 0 1-.833-.833Z"
      clipRule="evenodd"
    />
  </svg>
)

export default WarningIcon
