import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { documentData } from 'constants/documentData'
import usePostFormData from 'hooks/usePostFormData'
import UploadIcon from 'assets/svg/UploadIcon'
import logo from 'assets/images/WitsLogo.png'
import {
  UploadDocumentWrapper,
  UploadWrapper,
  UploadSection,
  HeadingSection,
  UploadHeading,
  DocumentsWrapper,
  Uploader,
  Heading,
  InputField,
} from 'styles/pages/Candidates/CandidateDetails/jobWorkflow'
import { UploadButton, Butttonwrapper, NavWrapper, VisitSection, Img } from 'styles/pages/Feedback'
import { Click, DescriptionUpload, UploadResume } from 'styles/views/Jobs/JobApplication'
import { ErrorMessage } from 'styles/components/Modal'
import { SubmittedMessage } from 'styles/pages/submit-task'

const UploadDocument = () => {
  const { mutateAsync } = usePostFormData()
  const [submited] = useState(false)
  const { jobPostId, candidateId, token } = useParams()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const {
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })
  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = new FormData()
    Object.keys(data).map((key: any) => {
      formData.append(key, data[`${key}`])
    })

    try {
      const res = await mutateAsync({
        url: `/public/job/candidate/document/upload?jobPostId=${jobPostId}&candidateId=${candidateId}&token=${token}`,
        payload: formData,
      })
      if (res) {
        return res
      }
    } catch (error: any) {
      return { error: error }
    }
  }

  const ShowError: any = errors

  return (
    <UploadDocumentWrapper>
      <NavWrapper>
        <Img src={logo} alt="witslogo" />
        <VisitSection color={activeColor}>Visit out website</VisitSection>
      </NavWrapper>
      <UploadWrapper>
        <UploadSection>
          <HeadingSection>
            <UploadHeading>Upload Your Documents</UploadHeading>
          </HeadingSection>
          {submited ? (
            <SubmittedMessage>Documents Submitted Successfully</SubmittedMessage>
          ) : (
            <DocumentsWrapper onSubmit={handleSubmit(onSubmit)}>
              {documentData.map((item) => {
                const value = item.value
                return (
                  <>
                    <Uploader>
                      <Heading>{item.name}</Heading>
                      <UploadResume>
                        <UploadIcon />
                        <InputField
                          type="file"
                          multiple
                          onChange={(event: any) => {
                            setValue(item.value, event.target.files[0])
                            trigger(item?.value)
                          }}
                          accept="application/pdf,application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        />
                        <Click>Click or drag file to this area to upload</Click>
                        <DescriptionUpload>Amet minim mollit non deserunt</DescriptionUpload>
                      </UploadResume>
                      {errors[value] && <ErrorMessage>{ShowError[item?.value].message}</ErrorMessage>}
                    </Uploader>
                  </>
                )
              })}
              <Butttonwrapper className="uploadbutton">
                <UploadButton>Cancel</UploadButton>
                <UploadButton className="submitbutton">Submit</UploadButton>
              </Butttonwrapper>
            </DocumentsWrapper>
          )}
        </UploadSection>
      </UploadWrapper>
    </UploadDocumentWrapper>
  )
}

export default UploadDocument
