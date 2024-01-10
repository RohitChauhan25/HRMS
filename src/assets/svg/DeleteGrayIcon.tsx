import { SVGProps } from 'react'

const DeleteGrayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={18} fill="none" {...props}>
    <path
      fill="#B9B9B9"
      fillRule="evenodd"
      d="M5.165 2.333c0-.92.746-1.666 1.666-1.666h3.334c.92 0 1.666.746 1.666 1.666V4h2.492a.8.8 0 0 1 .015 0h.827a.833.833 0 1 1 0 1.667h-.058l-.667 9.344a2.5 2.5 0 0 1-2.494 2.322H5.05a2.5 2.5 0 0 1-2.494-2.322L1.89 5.667H1.83a.833.833 0 1 1 0-1.667h3.334V2.333ZM3.56 5.666l.659 9.226a.833.833 0 0 0 .83.774h6.897c.437 0 .8-.337.831-.774l.66-9.225H3.56ZM10.165 4H6.83V2.333h3.334V4ZM6.83 7.333c.46 0 .834.373.834.833v5a.833.833 0 0 1-1.667 0v-5c0-.46.373-.833.833-.833Zm3.334 0c.46 0 .833.373.833.833v5a.833.833 0 1 1-1.667 0v-5c0-.46.373-.833.834-.833Z"
      clipRule="evenodd"
    />
  </svg>
)

export default DeleteGrayIcon
