import { SVGProps } from 'react'

const EditMemberIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={19} height={19} fill="none" {...props}>
    <path
      fill="#1D2E88"
      fillRule="evenodd"
      d="M16.707 2.293a1 1 0 0 0-1.414 0L7 10.586V12h1.414l8.293-8.293a1 1 0 0 0 0-1.414ZM13.88.879A3 3 0 1 1 18.12 5.12l-8.585 8.586a1 1 0 0 1-.708.293H6a1 1 0 0 1-1-1v-2.828a1 1 0 0 1 .293-.708L13.879.88ZM3 4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-5a1 1 0 1 1 2 0v5a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h5a1 1 0 0 1 0 2H3Z"
      clipRule="evenodd"
    />
  </svg>
)

export default EditMemberIcon
