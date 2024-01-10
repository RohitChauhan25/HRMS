import { SVGProps } from 'react'

const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <path
      fill="#1D1D1D"
      fillRule="evenodd"
      d="M.666 2.333c0-.92.746-1.666 1.667-1.666h13.333c.92 0 1.667.746 1.667 1.666v2.155c0 .442-.176.866-.488 1.178l-5.346 5.346v2.154a.833.833 0 0 1-.244.59l-3.333 3.333a.833.833 0 0 1-1.423-.59v-5.487L1.154 5.666a1.667 1.667 0 0 1-.488-1.178V2.333Zm15 0H2.333v2.155l5.345 5.345c.312.313.488.737.488 1.179v3.476l1.667-1.667v-1.81c0-.441.175-.865.488-1.178l5.345-5.345V2.333Z"
      clipRule="evenodd"
    />
  </svg>
)
export default FilterIcon
