import { SVGProps } from 'react'

const LocationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={14} fill="none" {...props}>
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M9.3 3.033a4.667 4.667 0 1 0-6.6 6.6l2.83 2.829c.26.26.68.26.941 0L9.3 9.631a4.667 4.667 0 0 0 0-6.599ZM1.757 2.09a6 6 0 1 1 8.486 8.486L7.908 12.91c-.021.02.009-.01-.012.011l-.482.482c-.78.781-2.046.782-2.828 0l-2.829-2.828a6 6 0 0 1 0-8.486ZM6 5a1.333 1.333 0 1 0 0 2.666A1.333 1.333 0 0 0 6 5ZM3.333 6.333a2.667 2.667 0 1 1 5.334 0 2.667 2.667 0 0 1-5.334 0Z"
      clipRule="evenodd"
    />
  </svg>
)
export default LocationIcon
