import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import useGet from 'hooks/useGet'
import usePost from 'hooks/usePost'
import { PUBLISH_JOB } from 'utils/validators/publishJob'
import SelectContainer from 'components/Select'
import AntCheckbox from 'components/AntCheckbox'
import TextinputContainer from 'components/TextInput'
import Button from 'components/Button'
import { currencyOptions } from 'views/Jobs/JobPostForm/data'
import { IPublishModal, UserData } from 'interfaces/job'
import { PlaceHolder } from 'constants/placeholderData'
import { isPrivate } from 'constants/labels'
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

const PublishJobModal = ({ rejectToggle, id, setModal, setPublishModal, jobId, status }: IPublishModal) => {
  const [userData, setUserData] = useState([])
  const [assigneeData, setAssigneeData] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [jobStatus, setjobStatus] = useState()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  const { mutateAsync } = usePost()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(PUBLISH_JOB),
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

  const { data: getAssignUsers, refetch: refetchAssignUsers } = useGet('getAssignUsers', `auth/user/assignee`, {
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
            value: user.userName,
          }
        }),
      )
    }
  }, [getAssignUsers])

  // For Job Publishing
  const publishJob = async (data: any) => {
    const payload: any = {
      currency: data?.currency,

      salarystartvalue: Number(data?.startSalary),
      salaryendvalue: Number(data?.endSalary),
      jobPostId: id ? id : jobId,
      isPrivate: data?.isPrivatee ? data?.isPrivatee : false,
      viewerIds: data?.users ? data?.users : [],
      status: jobStatus ? jobStatus : status,
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
        <TimelineModalTitle>Add Salary Range (LPA)</TimelineModalTitle>
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
            <SalaryWrapper>
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
            </SalaryWrapper>
          </AssigneeWrapper>

          <PrivateContainer style={{ display: 'grid', gridTemplateColumns: '150px auto', width: '100%' }}>
            <AntCheckbox
              control={control}
              name="isPrivatee"
              label={isPrivate}
              handleChange={(e: any) => setIsChecked(e.target.checked)}
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

export default PublishJobModal
