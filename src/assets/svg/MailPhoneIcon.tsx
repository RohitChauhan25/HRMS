import * as React from 'react'
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <rect width={20} height={20} fill="#1D2E88" rx={10} />
    <path
      fill="#fff"
      d="M7.283 9.388a7.659 7.659 0 0 0 3.332 3.332l1.112-1.112a.503.503 0 0 1 .516-.122 5.766 5.766 0 0 0 1.805.289c.278 0 .505.227.505.505v1.765a.507.507 0 0 1-.505.505 8.594 8.594 0 0 1-8.595-8.594c0-.278.228-.506.506-.506h1.77c.277 0 .505.228.505.506 0 .632.1 1.238.288 1.805a.507.507 0 0 1-.127.515L7.283 9.388Z"
    />
  </svg>
)
export default SvgComponent
