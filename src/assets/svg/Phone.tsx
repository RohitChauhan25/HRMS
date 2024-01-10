import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      fill="#4A4A4A"
      fillRule="evenodd"
      d="M1.667 4.168a2.5 2.5 0 0 1 2.5-2.5h2.732c.718 0 1.355.459 1.582 1.14l1.248 3.744a1.667 1.667 0 0 1-.836 2.018l-1.13.565a8.379 8.379 0 0 0 3.103 3.104l.566-1.13a1.667 1.667 0 0 1 2.017-.836l3.745 1.248c.68.227 1.14.864 1.14 1.58v2.734a2.5 2.5 0 0 1-2.5 2.5H15C7.636 18.335 1.667 12.365 1.667 5v-.833Zm2.5-.833a.833.833 0 0 0-.834.833v.833c0 6.444 5.224 11.667 11.667 11.667h.833c.46 0 .834-.373.834-.833v-2.733l-3.745-1.248-.94 1.88c-.2.4-.68.572-1.088.388A10.035 10.035 0 0 1 5.88 9.108a.833.833 0 0 1 .387-1.088l1.88-.94L6.9 3.334H4.167Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent