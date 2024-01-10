import { SVGProps } from 'react'

const AddOptionIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={17} fill="none" {...props}>
    <path
      fill="#B9B9B9"
      fillRule="evenodd"
      d="M.168 4.75a2.5 2.5 0 0 1 2.5-2.5h2.5v1.667h-2.5a.833.833 0 0 0-.833.833v7.917c0 .46.373.833.833.833h2.5v1.667h-2.5a2.5 2.5 0 0 1-2.5-2.5V4.75Z"
      clipRule="evenodd"
    />
    <path
      fill="#B9B9B9"
      fillRule="evenodd"
      d="m6.003 2.244 4.166.926v10.66l-4.166.926V2.244Zm4.528-.7c.762.169 1.305.845 1.305 1.626v10.66c0 .781-.543 1.457-1.305 1.627l-4.167.926a1.667 1.667 0 0 1-2.028-1.627V2.244c0-1.066.987-1.858 2.028-1.626l4.167.925Z"
      clipRule="evenodd"
    />
    <circle cx={7.669} cy={8.5} r={0.833} fill="#B9B9B9" />
  </svg>
)

export default AddOptionIcon
