import React from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { message, Upload } from 'antd'
import UPLOADSTATUS from 'constants/status'
import { SuccessMessage, ErrorMessage } from 'constants/messages'

const { Dragger } = Upload

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file
    if (status !== UPLOADSTATUS.UPLOADING) {
      info.file
    }

    if (status === UPLOADSTATUS.UPLOADED) {
      message.success(`${info.file.name} ${SuccessMessage}`)
    } else if (status === UPLOADSTATUS.FAILED) {
      message.error(`${info.file.name} ${ErrorMessage}`)
    }
  },
  onDrop(e) {
    e.dataTransfer.files
  },
}

const DragFile: React.FC = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
    </p>
  </Dragger>
)

export default DragFile
