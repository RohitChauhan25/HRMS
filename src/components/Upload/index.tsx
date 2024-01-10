/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { UploadProps, UploadFile } from 'antd'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import { UploadWrapper, Label } from 'styles/components/Upload'

interface IUploadContainer {
  getData: (data: string) => void
  setValue: any
  fileLink?: string
}

const UploadContainer = ({ getData, setValue, fileLink }: IUploadContainer) => {
  // eslint-disable-next-line no-unused-vars
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const token = window.localStorage.getItem('token')
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  getData
  const uploadFileToAPI = async (fileContent: any) => {
    const formData = new FormData()
    formData.set('file', fileContent)

    try {
      const response = await axios.post(
        'http://sql-india.thewitslab.com:7777/job/filehandling',

        formData, // Send the file content or any other data you need

        {
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data; boundary=AaB03x',
            // 'content-length': null, // Include your token here
          },
        },
      )
      const uploadedFileUrl = response.data.filename
      setFileUrl(uploadedFileUrl)
      //  // Handle the response from the API as needed

      // You can also update your state or perform other actions based on the API response
    } catch (error) {
      // Handle any API request errors here
    }
  }
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      return
    }
  }

  // const handlePreviewClick = (name: string) => {
  //   const file: any = {
  //     url: values?.[name],
  //   }
  //   setViewModal(true)
  //   setFilePath(file.url)
  //   handlePreview(file)
  // }

  const props: UploadProps = {
    name: 'file',
    fileList,
    accept: '.docx, .pdf',
    customRequest: ({ onSuccess }) => {
      if (onSuccess) onSuccess('ok')
    },
    multiple: false,
    method: 'POST',
    onChange(info: any) {
      setValue('file', info.file)
      uploadFileToAPI(info.file.originFileObj)
      setFileList([...info.fileList])
    },
  }

  const handleViewFileClick = () => {
    if (fileLink) {
      if (fileLink.slice(-3) === 'pdf') {
        window.open(fileLink, '_blank')
      } else {
        const googleDocsViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(fileLink)}`
        window.open(googleDocsViewerUrl, '_blank')
      }
    }
  }

  return (
    <UploadWrapper color={activeColor}>
      <Upload {...props} onPreview={handlePreview}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
        <div>Upload Documents (.docx, .pdf Format)*</div>
      </Upload>
      {fileLink && <Label onClick={handleViewFileClick}>View Job Descrption File</Label>}
    </UploadWrapper>
  )
}

export default UploadContainer
