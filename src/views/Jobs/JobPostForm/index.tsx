import { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { yupResolver } from '@hookform/resolvers/yup'
import { message, notification, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import useGet from 'hooks/useGet'
import usePostFormData from 'hooks/usePostFormData'
import usePutFormData from 'hooks/usePutFormData'
import { AddJobPostId } from 'store/slice/jobPost'
import { updateValue } from 'store/slice/jobApplicationSwitch'
import { RootState } from 'store/store'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
import SelectContainer from 'components/Select'
import { Divv, UploadWrapper } from 'styles/components/Upload'
import { Button as Buttonantd } from 'antd'
import Modal from 'components/Modal'
import AddDynamicField from 'components/AddDynamicField'
import UseMultiRenderInputs from 'components/MultipleComponents'
import CheckboxContainer from 'components/Checkbox'
import { JOB_POST_FORM } from 'utils/validators/jobPostSchema'
import data from 'constants/jobPostData'
import { Cancel, RemotePosition, SaveAndContinue, AddNewField, Next } from 'constants/labels'
import { PlaceHolder } from 'constants/placeholderData'
import { IDepartment, IEmployeeType, IExperience, IFormData, ILocation, IOptions } from 'interfaces'
import CancelIcon from 'assets/svg/CancelIcon'
import { ErrorMessage } from 'styles/components/Modal'
import {
  FormContainer,
  Label,
  Buttons,
  MainContainer,
  RightSection,
  ValidationContainer,
  CorrectField,
  JobTitleContent,
  WarningField,
  DescriptionContainer,
  LocationContainer,
  LocationLabel,
  FieldContainer,
  CheckBoxWrapper,
} from 'styles/views/Jobs/JobPostForm'
import { TextField } from 'styles/views/Jobs/JobApplication'

const JobPostForm = ({ next }: any) => {
  const [statusTitle, setStatusTitle] = useState(data)
  const [isRemote, setIsRemote] = useState(false)
  const [verify, setVerify] = useState<any>([])
  const [dynamicData, setDynamicData] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const { mutateAsync } = usePostFormData()
  const { mutateAsync: mutateAsyncPut } = usePutFormData()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [file, setFile] = useState<any>()
  const jobPostId = useSelector((state: RootState) => state.JobPostData.id)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const { data: getJobData, refetch: refetchJobData } = useGet('job', `job/jobpost/${jobPostId}`, {
    token: true,
  })
  const { data: getLocation, refetch: refetchLocation } = useGet('job-location', `job/masters/location`, {
    token: true,
  })
  const { data: getDepartment, refetch: refetchDepartment } = useGet('job-department', `job/masters/department`, {
    token: true,
  })
  const { data: getEmploymentType, refetch: refetchEmploymentType } = useGet(
    'employment-type',
    `job/masters/employmenttype`,
    {
      token: true,
    },
  )
  const { data: getExperience, refetch: refetchExperience } = useGet('experience', `job/masters/Minimumexperience`, {
    token: true,
  })

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(JOB_POST_FORM),
    defaultValues: {
      jobTitle: '',
      employmentType: '',
      department: '',
      numberOfPositions: undefined,
      jobDescription: '',
      location: '',
      minExperience: '',
      isRemote: false,
    },
  })

  useEffect(() => {
    if (getJobData) {
      reset({
        jobTitle: getJobData?.jobTitle,
        employmentType: getJobData?.employmentType?.id,
        department: getJobData?.department?.id,
        numberOfPositions: getJobData?.numberOfPositions,
        jobDescription: getJobData?.jobDescription,
        location: getJobData?.location?.id,
        minExperience: getJobData?.minExperience?.id,
        isRemote: getJobData?.isRemote,
      })

      const newData = statusTitle.map((item: any) => {
        if (getJobData[item.key]) return { ...item, hasValue: true }
        return { ...item }
      })

      setStatusTitle(newData)

      setIsRemote(getJobData?.isRemote)
    }
  }, [getJobData, jobPostId])

  useEffect(() => {
    refetchJobData()
  }, [jobPostId])

  const checkFileSize = (file: any) => {
    const fileSize = file.size / 1024 / 1024 // Get file size in MB
    if (fileSize > 1) {
      message.error('File size must be 1MB or less')
      return false // Prevent the file from being uploaded
    }

    return true // Allow the upload
  }

  const allFields: any = useWatch({ control })

  const employmentTypes = getEmploymentType?.map((data: IEmployeeType) => ({
    value: data?.id,
    label: data?.name,
    employmenTypeId: data?.id,
  }))

  const departmentList = getDepartment?.map((data: IDepartment) => ({
    value: data?.id,
    label: data?.name,
    departmentId: data?.id,
  }))

  const locationData = getLocation?.map((data: ILocation) => ({
    value: data?.id,
    label: data?.name,
    locationID: data?.id,
  }))

  const experienceData = getExperience?.map((item: IExperience) => {
    return {
      label: `${item.name} (${item.start}-${item.end}) ${item.type}`,
      id: item?.id,
      value: item?.id,
    }
  })

  const handleFieldFocus = (fieldName: string) => {
    const updatedStatusTitle = statusTitle?.map((item) => {
      if (item.key === fieldName) {
        return { ...item, focused: true }
      } else {
        return { ...item, focused: false }
      }
    })
    setStatusTitle(updatedStatusTitle)
  }

  const array: any[] = []

  array.push(allFields)

  const formData = async (data: IFormData) => {
    let isError = false
    const newData: any = dynamicData?.map((item) => {
      if (!item.value) {
        isError = true
        return {
          ...item,
          error: `field is required`,
        }
      } else {
        return {
          ...item,
          error: '',
        }
      }
    })

    setDynamicData(newData)

    //if there is error in dynamic feild then block api call
    if (isError) {
      return
    }

    const dynamicDataPayload: any = dynamicData?.map((item, index) => {
      const options = item?.option?.map((field: IOptions) => {
        return field?.value
      })
      return {
        label: item?.label,
        fieldName: item?.name,
        seqNumber: index,
        fieldType: item?.type,
        hasOption: item?.hasOwnProperty('option'),
        fieldValue:
          item?.hasOwnProperty('option') === true
            ? { options: options, selectedOptions: item?.value }
            : { text: item.value },
      }
    })

    const formData = new FormData()
    formData.set('jobTitle', data?.jobTitle)
    formData.set('jobDescription', data?.jobDescription)
    formData.set('numberOfPositions', `${data?.numberOfPositions}`)
    formData.set('departmentId', data?.department)
    formData.set('employmentTypeId', data?.employmentType)
    formData.set('locationId', data?.location)
    formData.set('minExperianceId', data?.minExperience)
    formData.set('isRemote', data?.isRemote ? 'true' : 'false')
    dynamicDataPayload?.length > 0 && formData.set('JobPostField', JSON.stringify(dynamicDataPayload))
    file && formData.set('file', file)

    try {
      const res = jobPostId
        ? await mutateAsyncPut({
            url: `job/jobpost/${jobPostId}`,
            payload: formData,
            token: true,
          })
        : await mutateAsync({
            url: 'job/jobpost',
            payload: formData,
            token: true,
          })
      if (res) {
        notification.success({
          message: '',
          description: 'Job Post Is Created successfully!',
        })
        localStorage.setItem('postId', res.id)
        dispatch(AddJobPostId(res.id)) // saving recieved jobpost ID
        next?.()
      } else throw new Error('ID not found')
    } catch (error: any) {
      if (error?.response?.data?.statusCode) {
        notification.error({
          message: '',
          description: error?.response?.data?.message,
          duration: 2,
        })
      }
    }
  }

  const handleCancel = () => {
    navigate('/jobs')
  }

  const removeField = (index: number) => {
    setDynamicData(dynamicData?.filter((item, ind) => index !== ind))
  }

  const ShowError: any = errors

  useEffect(() => {
    for (let i = 0; i < statusTitle?.length; i++) {
      if (
        allFields[statusTitle[i]?.key] === '' ||
        allFields[statusTitle[i]?.key] === undefined ||
        allFields[statusTitle[i]?.key] === '<p><br></p>'
      ) {
        statusTitle[i].hasValue = false
      }
    }
  }, [allFields])

  useEffect(() => {
    const updatedVerify = [...verify]
    Object.keys(allFields).map((key) => {
      if (allFields[key] && allFields[key] !== '<p><br></p>') {
        const matchingObject = statusTitle?.find((obj) => obj.key === key)
        if (matchingObject) {
          matchingObject.hasValue = true
          const index = updatedVerify?.findIndex((obj) => obj.key === key)
          if (index !== -1) {
            updatedVerify[index] = matchingObject
          }
        }
      }
    })

    setVerify(updatedVerify)
  }, [allFields])

  const uploadFile = (info: any) => {
    setFile(info)
  }

  useEffect(() => {
    refetchLocation()
    refetchDepartment()
    refetchEmploymentType()
    refetchExperience()
    dispatch(updateValue('1'))

    if (jobPostId) {
      refetchJobData()
    }
  }, [])

  useEffect(() => {
    setDynamicData([])
    const savedDynamicData = getJobData?.JobPostField?.map((item: any) => {
      return {
        id: item?.id,
        label: item?.label,
        name: item?.fieldName,
        type: item?.fieldType,
        value: item?.fieldValue,
      }
    })
    setDynamicData(savedDynamicData)
  }, [getJobData])
  return (
    <MainContainer>
      <FormContainer>
        <form onSubmit={handleSubmit(formData)} className="form">
          <FieldContainer>
            <Label>Job Title*</Label>
            <TextinputContainer
              placeholder="Job Title"
              control={control}
              name="jobTitle"
              value={allFields.jobTitle}
              onFocus={() => handleFieldFocus('jobTitle')}
            />
            <ErrorMessage>
              {errors?.jobTitle && <span className="error">{ShowError?.jobTitle?.message}</span>}
            </ErrorMessage>
          </FieldContainer>
          <FieldContainer>
            <Label>Employment Type*</Label>
            <SelectContainer
              control={control}
              name="employmentType"
              placeholder={PlaceHolder?.defaultOption}
              options={employmentTypes}
              onFocus={() => handleFieldFocus('employmentType')}
              defaultValue={getJobData?.employmentType ? getJobData?.employmentType : ''}
            />
            <ErrorMessage>
              {errors?.employmentType && <span className="error">{ShowError?.employmentType?.message}</span>}
            </ErrorMessage>
          </FieldContainer>
          <FieldContainer>
            <Label>Department*</Label>
            <SelectContainer
              control={control}
              name="department"
              placeholder={PlaceHolder?.defaultOption}
              options={departmentList}
              onFocus={() => handleFieldFocus('department')}
              defaultValue={getJobData?.department?.id ? getJobData?.department?.id : ''}
            />
            <ErrorMessage>
              {errors?.department && <span className="error">{ShowError?.department?.message}</span>}
            </ErrorMessage>
          </FieldContainer>
          <FieldContainer>
            <Label>Number Of Positions*</Label>
            <TextinputContainer
              placeholder={PlaceHolder?.NoOfPosition}
              type="number"
              onFocus={() => handleFieldFocus('numberOfPositions')}
              onWheel={(e) => {
                e.target.blur()
              }}
              control={control}
              name={'numberOfPositions'}
              min={1}
              max={20}
            />
            <ErrorMessage>
              {errors?.numberOfPositions && <span className="error">{ShowError?.numberOfPositions?.message}</span>}
            </ErrorMessage>
          </FieldContainer>
          <FieldContainer>
            <Label>Minimum Experience*</Label>
            <SelectContainer
              control={control}
              name="minExperience"
              placeholder="Select experience"
              options={experienceData}
              onFocus={() => handleFieldFocus('minExperience')}
              defaultValue={getJobData?.minExperience?.id ? getJobData?.minExperience?.id : ''}
            />
            <ErrorMessage>
              {errors?.minExperience && <span className="error">{ShowError?.minExperience?.message}</span>}
            </ErrorMessage>
          </FieldContainer>

          <Label>Job Description*</Label>
          <DescriptionContainer>
            <ReactQuill
              // {...field}
              placeholder={PlaceHolder?.jobDescription}
              onChange={(text) => {
                if (text.slice(3, -4).trim() && text.slice(3, -4).trim() !== '<br>') {
                  setValue('jobDescription', text)
                  trigger('jobDescription')
                } else {
                  setValue('jobDescription', '')
                }
              }}
              onFocus={() => handleFieldFocus('jobDescription')}
            />
            {/* <Controller
              name="jobDescription"
              control={control}
              render={({ field }: any) => (
                
              )}
            /> */}
          </DescriptionContainer>
          <ErrorMessage>
            {errors?.jobDescription && <span className="error">{ShowError?.jobDescription?.message}</span>}
          </ErrorMessage>
          <UploadWrapper color={activeColor}>
            <Upload
              beforeUpload={checkFileSize}
              showUploadList={false}
              accept=".docx, .pdf"
              onChange={(info) => uploadFile(info?.file.originFileObj)}
              maxCount={1}
            >
              <Buttonantd icon={<UploadOutlined />}>Click to Upload</Buttonantd>
              <div>Upload Documents (.docx, .pdf Format)*</div>
            </Upload>
            {file && <Divv className="colorChange">{file.name}</Divv>}
          </UploadWrapper>

          <LocationContainer>
            <LocationLabel>Location*</LocationLabel>
            <SelectContainer
              control={control}
              mode="single"
              placeholder={PlaceHolder?.locationPlaceholder}
              name="location"
              options={locationData}
              onFocus={() => handleFieldFocus('location')}
              defaultValue={getJobData?.location?.id ? getJobData?.location?.id : ''}
            />
            <ErrorMessage>
              {errors?.location && <span className="error">{ShowError?.location?.message}</span>}
            </ErrorMessage>

            {/* <div>
              <CheckBox
                name="isRemote"
                type="checkbox"
                checked={isRemote}
                onChange={(e) => {
                  setIsRemote(e.target.checked)
                  setValue('isRemote', e.target.checked)
                }}
              />
              {' ' + RemotePosition}
            </div> */}
            <CheckBoxWrapper>
              <CheckboxContainer
                // name="isRemote"
                // type="checkbox"
                checked={isRemote}
                onChange={(e) => {
                  setIsRemote(e.target.checked)
                  setValue('isRemote', e.target.checked)
                }}
              />
              {' ' + RemotePosition}
            </CheckBoxWrapper>
          </LocationContainer>

          {dynamicData?.length > 0 &&
            dynamicData?.map((item, index) => (
              <div key={index}>
                <TextField>
                  <UseMultiRenderInputs
                    item={item}
                    index={index}
                    setDynamicData={setDynamicData}
                    dynamicData={dynamicData}
                  />
                  <CancelIcon onClick={() => removeField(index)} />
                </TextField>
                <ErrorMessage>{item?.error && <span className="error">{item?.error}</span>}</ErrorMessage>
              </div>
            ))}

          <Buttons>
            <Button type="reset" label={Cancel} variant="text" onClick={handleCancel} />
            {jobPostId && <Button type="reset" label={Next} variant="text" onClick={() => next?.()} />}
            <Button
              type="submit"
              label={SaveAndContinue}
              variant="contained"
              style={{ backgroundColor: activeColor }}
            />
          </Buttons>
        </form>
      </FormContainer>
      <RightSection>
        <ValidationContainer>
          <>
            {statusTitle?.map((item, index) => {
              return item?.focused ? (
                <CorrectField key={index}>
                  <div>{item?.hasValue ? item?.correctIcon : item.warningIcon}</div>
                  <JobTitleContent color={activeColor}>{item?.title}</JobTitleContent>
                </CorrectField>
              ) : (
                <WarningField key={index}>
                  <div>{item?.hasValue ? item?.correctIcon : item.waitingIcon}</div>
                  <div color={activeColor}>{item?.title}</div>
                </WarningField>
              )
            })}
          </>
        </ValidationContainer>
        <Button
          label={AddNewField}
          variant="contained"
          type="submit"
          onClick={() => setShowModal(true)}
          style={{ backgroundColor: activeColor }}
        />
      </RightSection>
      <Modal isOpen={showModal}>
        <AddDynamicField
          toggle={showModal}
          setToggle={setShowModal}
          setFromData={setDynamicData}
          dynamicData={dynamicData}
        />
      </Modal>
    </MainContainer>
  )
}

export default JobPostForm
