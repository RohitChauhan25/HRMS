import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} fill="none" {...props}>
    <rect width={60} height={60} fill="#DCE2FF" rx={8} />
    <path fill="#DCE2FF" d="M10 10h40v40H10z" />
    <rect width={27} height={31} x={18} y={12} fill="#FFFEFF" rx={3} />
    <path fill="#6B7BCE" d="M24 29a6 6 0 0 0-12 0 1 1 0 0 0 1 1h10a1 1 0 0 0 1-1Z" />
    <circle cx={18} cy={19} r={3} fill="#6B7BCE" />
    <rect width={14} height={2} x={26} y={24} fill="#6B7BCE" rx={1} />
    <rect width={8} height={2} x={26} y={20} fill="#6B7BCE" rx={1} />
    <circle cx={41} cy={41} r={7} fill="#6B7BCE" />
    <path
      fill="#fff"
      d="M40.723 36.66a.3.3 0 0 1 .554 0l.981 2.344a.3.3 0 0 0 .252.183l2.531.209a.3.3 0 0 1 .172.526l-1.925 1.658a.3.3 0 0 0-.097.296l.584 2.472a.3.3 0 0 1-.448.325l-2.171-1.318a.3.3 0 0 0-.312 0l-2.17 1.318a.3.3 0 0 1-.449-.325l.584-2.472a.3.3 0 0 0-.096-.296l-1.925-1.658a.3.3 0 0 1 .17-.526l2.532-.21a.3.3 0 0 0 .252-.182l.981-2.343Z"
    />
  </svg>
)
export default SvgComponent
