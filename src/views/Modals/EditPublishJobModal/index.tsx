import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import useGet from 'hooks/useGet'
import usePost from 'hooks/usePost'
import SelectContainer from 'components/Select'
import AntCheckbox from 'components/AntCheckbox'
import TextinputContainer from 'components/TextInput'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from 'components/Button'
import { currencyOptions } from 'views/Jobs/JobPostForm/data'
import { UserData } from 'interfaces/job'
import { PlaceHolder } from 'constants/placeholderData'
import { isPrivate } from 'constants/labels'
import { EDIT_PUBLISH_JOB } from 'utils/validators/publishJob'
import CrossIcon from 'assets/svg/CrossIcon'
import {
  PublishModalContainer,
  Cross,
  TimelineModalTitle,
  PublishHeadSection,
  Buttons,
  ReasonWrapper,
  PrivateWrapper,
  ErrorMessage,
} from 'styles/components/Modal'
import {
  SalaryContainer,
  UserListWrapper,
  SalaryWrapper,
  AssigneeWrapper,
  PrivateContainer,
} from 'styles/views/Jobs/JobPostForm'
import { Label } from 'styles/pages/Master'

const EditPublishJobModal = ({ rejectToggle, id, setModal, setPublishModal }: any) => {
  const [userData, setUserData] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [assigneeData, setAssigneeData] = useState([])
  const [jobStatus, setjobStatus] = useState()
  const { mutateAsync } = usePost()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(EDIT_PUBLISH_JOB),
    defaultValues: {
      startSalary: undefined,
      endSalary: undefined,
      currency: '',
      assignee: '',
      isPrivatee: false,
      users: [],
    },
  })

  const { data: getUserData, refetch: refetchUserData } = useGet('getUserData', `auth/user`, {
    token: true,
  })

  const { data: getJobData, refetch: refetchJobData } = useGet('getJobData', `job/jobpost/${id}`, {
    token: true,
  })

  const { data: getAssignUsers, refetch: refetchAssignUsers } = useGet('getAssignUsersInEdit', `auth/user/assignee`, {
    token: true,
  })

  useEffect(() => {
    refetchJobData()
    refetchUserData()
    refetchAssignUsers()
  }, [])

  useEffect(() => {
    setjobStatus(getJobData?.JobStatus?.status)
  }, [getJobData])

  useEffect(() => {
    if (getUserData?.length > 0) {
      setUserData(
        getUserData?.map((user: UserData) => {
          return {
            label: user.userName,
            value: user.id,
          }
        }),
      )
    }
  }, [getUserData])

  useEffect(() => {
    if (getAssignUsers?.length > 0) {
      setAssigneeData(
        getAssignUsers?.map((user: UserData) => {
          return {
            label: user.userName,
            value: user.id,
          }
        }),
      )
    }
  }, [getAssignUsers])

  useEffect(() => {
    setValue('startSalary', getJobData?.JobPostSalary[0]?.salarystartvalue)
    setValue('endSalary', getJobData?.JobPostSalary[0]?.salaryendvalue)
    setValue('currency', getJobData?.JobPostSalary[0]?.currency)
    setValue('assignee', getJobData?.Assignors?.length > 0 ? getJobData?.Assignors[0] : null)
    setValue('isPrivatee', getJobData?.JobPostSalary?.length > 0 ? getJobData?.JobPostSalary[0]?.isPrivate : false)
    setValue(
      'users',
      getJobData?.JobPostSalary?.JobPostUsers?.length > 0 ? getJobData?.JobPostSalary?.JobPostUsers[0] : null,
    )
  }, [getJobData])

  // For Job Publishing
  const publishJob = async (data: any) => {
    const payload: any = {
      currency: data?.currency,
      salarystartvalue: parseInt(data?.startSalary),
      salaryendvalue: parseInt(data?.endSalary),
      jobPostId: id,
      isPrivate: data?.isPrivatee ? data?.isPrivatee : false,
      viewerIds: data?.users ? data?.users : [],
      status: jobStatus,
      assignors: data?.assignee,
    }

    try {
      const res = await mutateAsync({
        url: 'job/publish',
        payload: payload,
        token: true,
      })

      if (res) {
        setPublishModal(false)
        setModal(true)
      }
    } catch (error: any) {
      return { error: error?.response?.data?.message }
    }
  }

  return (
    <PublishModalContainer>
      <PublishHeadSection>
        <TimelineModalTitle>Edit Salary Range (LPA)</TimelineModalTitle>
        <Cross onClick={rejectToggle}>
          <CrossIcon />
        </Cross>
      </PublishHeadSection>
      <form onSubmit={handleSubmit(publishJob)}>
        <ReasonWrapper>
          <SalaryContainer>
            <SalaryWrapper>
              <Label>Minimum Salary*</Label>
              <TextinputContainer
                type="number"
                placeholder={PlaceHolder?.startSalary}
                control={control}
                name="startSalary"
              />
              <ErrorMessage>
                {errors?.startSalary && <span className="error">{errors?.startSalary?.message}</span>}
              </ErrorMessage>
            </SalaryWrapper>

            <SalaryWrapper>
              <Label>Maximum Salary*</Label>
              <TextinputContainer
                type="number"
                placeholder={PlaceHolder?.endSalary}
                control={control}
                name="endSalary"
              />
              <ErrorMessage>
                {errors?.endSalary && <span className="error">{errors?.endSalary?.message}</span>}
              </ErrorMessage>
            </SalaryWrapper>
            <SalaryWrapper>
              <Label>Currency*</Label>
              <SelectContainer
                control={control}
                name="currency"
                placeholder={PlaceHolder?.defaultOption}
                options={currencyOptions}
              />
              <ErrorMessage>
                {errors?.currency && <span className="error">{errors?.currency?.message}</span>}
              </ErrorMessage>
            </SalaryWrapper>
          </SalaryContainer>
          <AssigneeWrapper>
            <Label>Assignee</Label>
            <SelectContainer
              control={control}
              name="assignee"
              placeholder={PlaceHolder?.defaultHiringOption}
              options={assigneeData}
            />
            <ErrorMessage>
              {errors?.assignee && <span className="error">{errors?.assignee?.message}</span>}
            </ErrorMessage>
          </AssigneeWrapper>
          <PrivateContainer>
            <AntCheckbox
              control={control}
              name="isPrivatee"
              label={isPrivate}
              handleChange={(e: any) => setIsChecked(e.target.checked)}
              defaultChecked={getJobData?.JobPostSalary?.length > 0 ? getJobData?.JobPostSalary[0]?.isPrivate : false}
            />
            <PrivateWrapper>
              {isChecked && (
                <UserListWrapper>
                  <SalaryWrapper>
                    <SelectContainer
                      control={control}
                      mode="multiple"
                      name="users"
                      placeholder={PlaceHolder?.defaultUserOption}
                      options={userData}
                    />
                    <ErrorMessage>
                      {errors?.users && <span className="error">{errors?.users?.message}</span>}
                    </ErrorMessage>
                  </SalaryWrapper>
                </UserListWrapper>
              )}
            </PrivateWrapper>
          </PrivateContainer>
        </ReasonWrapper>
        <Buttons>
          <Button label="Cancel" variant="text" onClick={rejectToggle} />
          <Button label="Submit" variant="contained" type="submit" style={{ backgroundColor: activeColor }} />
        </Buttons>
      </form>
    </PublishModalContainer>
  )
}

export default EditPublishJobModal
