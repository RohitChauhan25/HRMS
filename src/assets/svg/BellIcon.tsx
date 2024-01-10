import { SVGProps } from 'react'

const BellIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="#151515"
      fillRule="evenodd"
      d="M9.018 4.665a3 3 0 0 1 5.964 0A7 7 0 0 1 19 11v3.159c0 .273.109.535.302.729l1.405 1.405A1 1 0 0 1 20 18h-4a4 4 0 1 1-8 0H4a1 1 0 0 1-.707-1.707l1.405-1.405c.193-.194.302-.456.302-.73V11a7 7 0 0 1 4.018-6.335ZM10 18a2 2 0 0 0 4 0h-4Zm2-14a1 1 0 0 0-1 1v.341a1 1 0 0 1-.667.943A5.002 5.002 0 0 0 7 11v3.159c0 .669-.221 1.315-.623 1.841h11.246A3.032 3.032 0 0 1 17 14.159V11a5.002 5.002 0 0 0-3.333-4.716A1 1 0 0 1 13 5.341V5a1 1 0 0 0-1-1Z"
      clipRule="evenodd"
    />
  </svg>
)

export default BellIcon
