import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import { Checkbox, Radio } from 'antd'
import YupResolverSchema from 'helper'
import { yupResolver } from '@hookform/resolvers/yup'
import usePostFormData from 'hooks/usePostFormData'
import useGet from 'hooks/useGet'
import { ExploreCareerRoute } from 'constants/routes'
import TextinputContainer from 'components/TextInput'
import Button from 'components/Button'
import SelectContainer from 'components/Select'
import TextareaContainer from 'components/TextArea'
import Modal from 'components/Modal'
import SuccessModal from 'views/Modals/SuccessModal'
// import { IJobFieldOption } from 'interfaces'
import Wits from 'assets/images/logoLogin.png'
import JobsIcon from 'assets/svg/JobsIcon'
import LocationIcon from 'assets/svg/LocationIcon'
import BackBlueIcon from 'assets/svg/BackBlueIcon'
import UploadIcon from 'assets/svg/UploadIcon'
import { LogoSection } from 'styles/views/Navbar'
import { TextLabel, JobInputWrapper, ModalButtonWrapper } from 'styles/views/Jobs/JobPostForm'
import { NumberInputWrapper } from 'styles/components/Numberinput'
import { CheckboxWrapper } from 'styles/components/Checkbox'
import { RadioWrapper } from 'styles/components/Radio'
import { ErrorMessage } from 'styles/components/Modal'
import { UploadResume, UploadWrapper, Click, DescriptionUpload } from 'styles/views/Jobs/JobApplication'
import {
  Container,
  NavWrapper,
  VisitWebsite,
  ContentWrapper,
  JobNameWrapper,
  JobTitle,
  JobTypeDetails,
  Type,
  FormContainer,
  FormTitleContainer,
  FormTitle,
  FileName,
  Back,
  FormWrapper,
} from 'styles/pages/Careers/Apply-Now'

const ApplyNow = () => {
  const source = window.location.href.split('?source=')
  const navigate = useNavigate()
  const [successModal, setSuccessModal] = useState(false)
  const [applyJobData, setApplyJobData] = useState<any>()
  const { state } = useLocation()
  const { id } = useParams()

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver<any>(YupResolverSchema(applyJobData)),
  })
  const [resume, setResume] = useState<any>()
  const { mutateAsync } = usePostFormData()
  const formData = async (data: any) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, val]) => {
      if (val !== undefined) {
        formData.append(key, String(val))
      }
    })
    formData.append('resume', resume)
    formData.append('source', source[source?.length - 1])
    if (id) formData.append('jobPostId', id)
    try {
      const response = await mutateAsync({
        url: 'http://sql-dev-india.thewitslab.com:6100/job/candidate',
        payload: formData,
        token: true,
      })
      if (response) {
        reset()
        setSuccessModal(!successModal)
        navigate(`/careers/job-details/${id}?source=${source[source?.length - 1]}`)
      }
    } catch (error: any) {
      return {
        error: error?.response?.data?.message,
      }
    }
  }

  const { data: getCandidateData, refetch: refetchJobData } = useGet(
    'job-apply',
    `job/jobApplication/applyjobForm/${id}`,
    {
      token: true,
    },
  )

  useEffect(() => {
    setApplyJobData(getCandidateData)
  }, [getCandidateData])

  useEffect(() => {
    refetchJobData()
  }, [])

  const ShowError: any = errors

  const fileInputRef: any = useRef(null)

  const handleUploadIconClick = () => {
    // Trigger click event of the file input when UploadIcon is clicked
    fileInputRef.current.click()
  }

  return (
    <Container>
      <NavWrapper>
        <LogoSection>
          <img src={Wits} alt="logo" />
        </LogoSection>
        <VisitWebsite>Visit Our Website</VisitWebsite>
      </NavWrapper>
      <ContentWrapper>
        <JobNameWrapper>
          <JobTitle>{state?.jobTitle}</JobTitle>
          <JobTypeDetails>
            <Type>
              <JobsIcon />
              {state?.employmentType}
            </Type>
            <Type>
              <LocationIcon />
              {state?.location}
            </Type>
          </JobTypeDetails>
        </JobNameWrapper>
        <FormContainer>
          <FormTitleContainer>
            <FormTitle>Apply for this job</FormTitle>
            <Back onClick={() => navigate(ExploreCareerRoute?.path)}>
              <BackBlueIcon />
              Back Job Openings
            </Back>
          </FormTitleContainer>
          <FormWrapper onSubmit={handleSubmit(formData)}>
            {applyJobData?.map((item: any, index: number) => {
              const type: any = item?.field?.type
              switch (type) {
                case 'text':
                  return (
                    <JobInputWrapper key={index}>
                      <TextLabel>{item?.isRequired ? item?.fieldName + '*' : item?.fieldName}</TextLabel>
                      <TextinputContainer placeholder="" control={control} name={item?.fieldName} />
                      {errors[item?.fieldName] && <ErrorMessage>{ShowError[item?.fieldName].message}</ErrorMessage>}
                    </JobInputWrapper>
                  )
                  break
                case 'url':
                  return (
                    <JobInputWrapper key={index}>
                      <TextLabel>{item?.isRequired ? item?.fieldName + '*' : item?.fieldName}</TextLabel>
                      <TextinputContainer placeholder="" control={control} name={item?.fieldName} />
                      {/* {`${item.isPrefix && item.prefixValue === 'url' ? 'li' : ''}`} */}
                      {errors[item?.fieldName] && <ErrorMessage>{ShowError[item?.fieldName].message}</ErrorMessage>}
                    </JobInputWrapper>
                  )
                  break
                case 'file':
                  return (
                    <JobInputWrapper key={index}>
                      <TextLabel>{item?.isRequired ? item?.fieldName + '*' : item?.fieldName}</TextLabel>
                      <UploadResume onClick={handleUploadIconClick}>
                        <UploadWrapper>
                          <UploadIcon />
                          <input
                            type="file"
                            name={item?.fieldName}
                            ref={fileInputRef}
                            style={{ display: 'none' }} // Hide the actual file input
                            onChange={(e: any) => {
                              setValue(item?.fieldName, e?.target.files[0])
                              setResume(e?.target.files[0])
                              trigger(item?.fieldName)
                            }}
                          />
                          <Click>Click or drag file to this area to upload</Click>
                          <DescriptionUpload>Amet minim mollit non deserunt</DescriptionUpload>
                        </UploadWrapper>
                      </UploadResume>
                      <FileName>{resume?.name}</FileName>
                      {errors[item?.fieldName] && <ErrorMessage>{ShowError[item?.fieldName].message}</ErrorMessage>}
                    </JobInputWrapper>
                  )
                  break
                case 'number':
                  return (
                    <JobInputWrapper key={index}>
                      <TextLabel>{item?.isRequired ? item?.fieldName + '*' : item?.fieldName}</TextLabel>
                      <NumberInputWrapper>
                        <PhoneInput
                          country="in"
                          onChange={(e) => {
                            setValue(item?.fieldName, e)
                            trigger(item?.fieldName)
                          }}
                        />
                      </NumberInputWrapper>
                      {errors[item?.fieldName] && <ErrorMessage>{ShowError[item?.fieldName].message}</ErrorMessage>}
                    </JobInputWrapper>
                  )
                  break
                case 'radio':
                  return (
                    <JobInputWrapper key={index}>
                      <TextLabel>{item?.isRequired ? item?.fieldName + '*' : item?.fieldName}</TextLabel>
                      <RadioWrapper>
                        <Radio.Group
                          onChange={(e) => {
                            setValue(item?.fieldName, e.target.value)
                            trigger(item?.fieldName)
                          }}
                        >
                          {item?.options?.map((item: any, index: number) => {
                            return (
                              <Radio key={index} value={item?.value}>
                                {item?.fieldName}
                              </Radio>
                            )
                          })}
                        </Radio.Group>
                      </RadioWrapper>
                      {errors[item?.fieldName] && <ErrorMessage>{ShowError[item?.fieldName].message}</ErrorMessage>}
                    </JobInputWrapper>
                  )
                  break
                case 'checkbox':
                  return (
                    <JobInputWrapper key={index}>
                      <TextLabel>{item?.isRequired ? item?.fieldName + '*' : item?.fieldName}</TextLabel>
                      <CheckboxWrapper>
                        <Checkbox.Group
                          options={item?.options}
                          value={getValues(item?.fieldName) || []}
                          onChange={(e: any) => {
                            setValue(item?.fieldName, e?.toString())
                            trigger(item?.fieldName)
                          }}
                        >
                          {JSON.parse(item?.objectFieldOptions || '[]').map((option: any, index: number) => {
                            return (
                              <Checkbox key={index} value={option?.value}>
                                {option?.label}
                              </Checkbox>
                            )
                          })}
                        </Checkbox.Group>
                      </CheckboxWrapper>
                      {errors[item?.fieldName] && <ErrorMessage>{ShowError[item?.fieldName].message}</ErrorMessage>}
                    </JobInputWrapper>
                  )

                case 'select':
                  return (
                    <JobInputWrapper key={index}>
                      <TextLabel>{item?.isRequired ? item?.fieldName + '*' : item?.fieldName}</TextLabel>
                      <SelectContainer
                        control={control}
                        // defaultValue={item?.options?.[0].label}
                        name={item?.fieldName}
                        options={item.options}
                      />
                      {errors[item?.fieldName] && <ErrorMessage>{ShowError[item?.fieldName].message}</ErrorMessage>}
                    </JobInputWrapper>
                  )
                case 'textarea':
                  return (
                    <JobInputWrapper key={index}>
                      <TextLabel>{item?.isRequired ? item?.fieldName + '*' : item?.fieldName}</TextLabel>
                      <TextareaContainer
                        placeholder="Enter Your Explanation"
                        name={item?.fieldName}
                        control={control}
                        className="apply-textarea"
                      />
                      {errors[item?.fieldName] && <ErrorMessage>{ShowError[item?.fieldName].message}</ErrorMessage>}
                    </JobInputWrapper>
                  )
                default:
                  break
              }
            })}
            <ModalButtonWrapper>
              <Button label={'Apply Now'} variant="contained" type="submit" />
            </ModalButtonWrapper>
          </FormWrapper>
        </FormContainer>
      </ContentWrapper>
      <Modal isOpen={successModal} className="modal">
        <SuccessModal successtoggle={() => setSuccessModal(!successModal)} />
      </Modal>
    </Container>
  )
}

export default ApplyNow
