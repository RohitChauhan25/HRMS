import { SVGProps } from 'react'

const CorrectIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <path
      fill="#419E6A"
      fillRule="evenodd"
      d="M9 2.333a6.667 6.667 0 1 0 0 13.334A6.667 6.667 0 0 0 9 2.333ZM.667 9a8.333 8.333 0 1 1 16.666 0A8.333 8.333 0 0 1 .667 9Zm11.422-2.256a.833.833 0 0 1 0 1.178l-3.333 3.334a.833.833 0 0 1-1.179 0L5.911 9.589a.833.833 0 1 1 1.178-1.178l1.078 1.077 2.744-2.744a.833.833 0 0 1 1.178 0Z"
      clipRule="evenodd"
    />
  </svg>
)

export default CorrectIcon
