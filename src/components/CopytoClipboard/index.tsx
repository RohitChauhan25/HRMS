import { Button, message } from 'antd'
import CopytoClipboard from 'assets/svg/ClipBoard'

function CopyToClipboardButton() {
  const textToCopy = 'Hello, world!'

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy)
    message.success('Text copied to clipboard')
  }

  return (
    <Button
      icon={<CopytoClipboard />}
      onClick={handleCopy}
      style={{ background: 'unset', border: 'unset', paddingTop: '9px', outline: 'unset' }}
    ></Button>
  )
}

export default CopyToClipboardButton
