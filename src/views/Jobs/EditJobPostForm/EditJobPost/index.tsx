import { useState, useEffect } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import usePutFormData from 'hooks/usePutFormData'
import useGet from 'hooks/useGet'
import { RootState } from 'store/store'
import { JOB_POST_FORM } from 'utils/validators/jobPostSchema'
import { Cancel, RemotePosition, SaveAndContinue, AddNewField, Next } from 'constants/labels'
import data from 'constants/jobPostData'
import { PlaceHolder } from 'constants/placeholderData'
import Button from 'components/Button'
import TextinputContainer from 'components/TextInput'
import SelectContainer from 'components/Select'
import UploadContainer from 'components/Upload'
import Modal from 'components/Modal'
import AddDynamicField from 'components/AddDynamicField'
import UseMultiRenderInputs from 'components/MultipleComponents'
import CheckboxContainer from 'components/Checkbox'
import CancelIcon from 'assets/svg/CancelIcon'
import { TextField } from 'styles/views/Jobs/JobApplication'
import { ErrorMessage } from 'styles/components/Modal'
import {
  FormContainer,
  Label,
  Buttons,
  MainContainer,
  RightSection,
  ValidationContainer,
  CorrectField,
  WarningField,
  DescriptionContainer,
  LocationContainer,
  LocationLabel,
  FieldContainer,
  CheckBoxWrapper,
} from 'styles/views/Jobs/JobPostForm'

const EditJobPost = ({ next, getJobData, refetchJobData }: any) => {
  const [statusTitle, setStatusTitle] = useState(data)
  const [verify, setVerify] = useState<any>([])
  const navigate = useNavigate()
  const { mutateAsync } = usePutFormData()
  const postId = localStorage.getItem('postId')
  const [dynamicData, setDynamicData] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [isRemote, setIsRemote] = useState(false)
  const menu = useSelector((state: RootState) => state?.user?.menu)
  const [permission, setPermission] = useState<any>([])
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const {
    resetField,
    control,
    reset,
    handleSubmit,
    setValue,
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
      // file: '',
      isRemote: false,
      // JobPostField: [] || '' || undefined,
    },
  })

  useEffect(() => {
    const menuItem: any = menu?.find((item: any) => item?.resource === 'jobPost')
    if (menuItem) {
      setPermission(menuItem?.permissions)
    }
  }, [menu])

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
    }
  }, [getJobData, postId])

  const allFields: any = useWatch({ control })

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

  const employmentTypes = getEmploymentType?.map((data: any) => ({
    value: data?.id,
    label: data?.name,
    employmenTypeId: data?.id,
  }))

  // create object formate for departmentList
  const departmentList = getDepartment?.map((data: any) => ({
    value: data?.id,
    label: data?.name,
    departmentId: data?.id,
  }))

  // create object formate for locationData
  const locationData = getLocation?.map((data: any) => ({
    value: data?.id,
    label: data?.name,
    locationID: data?.id,
  }))

  // create object formate for experienceData
  const experienceData = getExperience?.map((item: any) => {
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

  const array: any[] = []

  array.push(allFields)

  const formData = async (data: any) => {
    let isError = false
    const errorData: any = dynamicData?.map((item) => {
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

    setDynamicData(errorData)

    //if there is error in dynamic feild then block api call
    if (isError) {
      return
    }

    const newData: any = dynamicData?.map((item, index) => {
      const options = item?.option?.map((field: any) => {
        return field?.value
      })
      return {
        label: item.label,
        fieldName: item.name,
        seqNumber: index,
        fieldType: item.type,
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
    formData.set('numberOfPositions', data?.numberOfPositions)
    formData.set('departmentId', data?.department)
    formData.set('employmentTypeId', data?.employmentType)
    formData.set('locationId', data?.location)
    formData.set('minExperianceId', data?.minExperience)
    formData.set('isRemote', data?.isRemote ? data?.isRemote : false)
    formData.set('JobPostField', JSON.stringify(newData))
    if (data?.file?.originFileObj) formData.set('file', data?.file.originFileObj)

    try {
      const res = await mutateAsync({
        url: `job/jobpost/${getJobData?.id}`,
        payload: formData,
        token: true,
      })

      if (res) {
        notification.success({
          message: '',
          description: 'Job Post Is Updated successfully!',
        })
        setDynamicData([])
        refetchJobData()
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

  const resetForm = () => {
    resetField('jobTitle')
    resetField('employmentType')
    resetField('department')
    resetField('jobDescription')
    resetField('numberOfPositions')
    resetField('location')
    resetField('isRemote')
  }

  useEffect(() => {
    return () => {
      resetForm()
    }
  }, [])

  const handleCancel = () => {
    navigate('/jobs')
    resetForm()
    window.location.reload()
  }

  const foundNegativePositions = array?.some((item: { numberOfPositions: string }) =>
    item.numberOfPositions?.toString()?.includes('-'),
  )

  const removeField = (index: number) => {
    setDynamicData(dynamicData?.filter((item, ind) => index !== ind))
  }

  const ShowError: any = errors

  useEffect(() => {
    const updatedVerify = [...verify]
    array.forEach((item) => {
      for (const key in item) {
        if (item[key] !== undefined) {
          const matchingObject = statusTitle?.find((obj) => obj.key === key)
          if (matchingObject) {
            matchingObject.hasValue = true
            const index = updatedVerify?.findIndex((obj) => obj.key === key)
            if (index !== -1) {
              updatedVerify[index] = matchingObject
            }
          }
        }
      }
    })

    setVerify(updatedVerify)
  }, [allFields])

  useEffect(() => {
    setIsRemote(getJobData?.isRemote)
  }, [getJobData?.isRemote])

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
    refetchLocation()
    refetchDepartment()
    refetchEmploymentType()
    refetchExperience()
  }, [])

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
              defaultValue={getJobData?.employmentType ? getJobData?.employmentType?.id : ''}
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
              value={getJobData?.department ? getJobData?.department?.id : ''}
              // defaultValue={getJobData?.department?.id ? getJobData?.department?.id : ''}
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
            />

            {foundNegativePositions && <div>- not allowed</div>}
            <ErrorMessage>
              {errors.numberOfPositions && <span className="error">{ShowError?.numberOfPositions?.message}</span>}
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
              value={getJobData?.minExperience?.id ? getJobData?.minExperience?.id : ''}
              // defaultValue={getJobData?.minExperience?.id ? getJobData?.minExperience?.id : ''}
            />
            <ErrorMessage>
              {errors?.minExperience && <span className="error">{ShowError?.minExperience?.message}</span>}
            </ErrorMessage>
          </FieldContainer>
          <Label>Job Description*</Label>
          <DescriptionContainer>
            <Controller
              name="jobDescription"
              control={control}
              render={({ field }: any) => (
                <ReactQuill
                  {...field}
                  placeholder={PlaceHolder?.jobDescription}
                  onChange={(text) => {
                    field?.onChange(text)
                  }}
                  onFocus={() => handleFieldFocus('jobDescription')}
                />
              )}
            />
          </DescriptionContainer>
          <ErrorMessage>
            {errors?.jobDescription && <span className="error">{ShowError?.jobDescription?.message}</span>}
          </ErrorMessage>

          <UploadContainer
            getData={(item: string) => {
              item
              setValue('jobDescription', item)
            }}
            setValue={setValue}
            fileLink={getJobData?.fileLink}
          />
          <LocationContainer>
            <LocationLabel>Location*</LocationLabel>
            <SelectContainer
              control={control}
              mode="single"
              placeholder={PlaceHolder?.locationPlaceholder}
              name="location"
              options={locationData}
              onFocus={() => handleFieldFocus('location')}
              value={getJobData?.location?.id ? getJobData?.location?.id : ''}
              // defaultValue={getJobData?.location?.id ? getJobData?.location?.id : ''}
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
              <div key={item?.id}>
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
            <Button type="reset" label={Next} variant="text" onClick={() => next?.()} />
            {permission?.includes('CREATE') && (
              <Button
                type="submit"
                label={SaveAndContinue}
                variant="contained"
                style={{ backgroundColor: activeColor }}
              />
            )}
          </Buttons>
        </form>
      </FormContainer>
      <RightSection>
        <ValidationContainer>
          <>
            {statusTitle?.map((item, index) =>
              item?.focused ? (
                <CorrectField key={index}>
                  <div>{item?.hasValue ? item?.correctIcon : item?.warningIcon}</div>
                  <div>{item?.title}</div>
                </CorrectField>
              ) : (
                <WarningField key={index}>
                  <div>{item?.hasValue ? item.correctIcon : item?.waitingIcon}</div>
                  <div>{item?.title}</div>
                </WarningField>
              ),
            )}
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

export default EditJobPost
