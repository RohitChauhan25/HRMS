import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useGet from 'hooks/useGet'
import UseMultiRenderInputs from 'components/MultipleComponents'
import TextinputContainer from 'components/TextInput'
import { staticDataInterface } from 'interfaces'
import {
  PreviewHeading,
  PreviewNavbar,
  PreviewWrapper,
  ButttonWrapper,
  OkButton,
  FormContainer,
  Form,
  FormHeading,
  DescriptionWrap,
} from 'styles/components/Preview'
import { FormWrapper } from 'styles/components/Preview'
import { Label } from 'styles/components/TextboxStyle'

const FormPreview = ({ setShowModal }: any) => {
  const unwantedFeilds = ['createdAt', 'updatedAt', 'id']
  const { control } = useForm()
  const [staticForm, setStaticForm] = useState<any>([])
  const [DynamicForm, setDynamicForm] = useState([])
  // const { mutateAsync } = usePost()
  // const navigate = useNavigate()
  const jobid = window.localStorage.getItem('postId')

  // const publishNow = async () => {
  //   const payload = {
  //     jobPostId: jobid,
  //     jobPostStatus: 'PUBLISHED',
  //   }
  //   try {
  //     const response = await mutateAsync({
  //       url: `job/publish/jobPost`,
  //       payload: payload,
  //       token: true,
  //     })
  //     if (response) {
  //       notification.success({
  //         message: '',
  //         description: 'Job Post is Published successful!',
  //         duration: 1, // Duration in seconds
  //       })
  //       navigate('/jobs')
  //       localStorage.setItem('postId', '')
  //       setShowModal(false)
  //     }
  //   } catch (error: any) {
  //     notification.error({
  //       message: '',
  //       description: error?.response?.data?.message[0],
  //       duration: 2,
  //     })
  //     return {
  //       error: error?.response?.data?.message,
  //     }
  //   }
  // }

  const { data: getDynamicForm, refetch: refetchJob } = useGet('job/dynamic', `job/form/all/${jobid}`, {
    token: true,
  })

  const { data: getstaticform, refetch: refetchStaticForm } = useGet('job/jobpost', `job/jobpost/${jobid}`, {
    token: true,
  })

  useEffect(() => {
    refetchJob()
  }, [])

  useEffect(() => {
    refetchStaticForm()
  }, [])

  useEffect(() => {
    setStaticForm(getstaticform)
    const staticData: staticDataInterface[] = []
    if (getstaticform)
      Object?.keys(getstaticform).forEach((key) => {
        const obj = {
          name: key,
          value: getstaticform[key],
        }
        staticData.push(obj)
      })

    setStaticForm(staticData)
  }, [getstaticform])

  useEffect(() => {
    setDynamicForm(getDynamicForm)
  }, [getDynamicForm])

  return (
    <PreviewWrapper>
      <PreviewNavbar>
        <PreviewHeading>{staticForm?.length > 0 && <FormHeading>Job Post Preview </FormHeading>}</PreviewHeading>
        <FormContainer>
          <Form className="form">
            {staticForm?.length > 0 &&
              staticForm?.map((data: any, index: number) => {
                if (!unwantedFeilds.includes(data.name)) {
                  if (data?.name == 'jobDescription') {
                    return (
                      <FormWrapper key={index}>
                        <Label>{data?.name == 'jobDescription' ? 'Job Description' : ''}</Label>
                        <DescriptionWrap>
                          <div dangerouslySetInnerHTML={{ __html: ` ${data.value}` }} />
                        </DescriptionWrap>
                      </FormWrapper>
                    )
                  } else {
                    return (
                      <FormWrapper key={index}>
                        <Label>
                          {data?.name == 'title'
                            ? 'Job Title'
                            : data?.name == 'jobPostStatus'
                            ? 'Job Post Status'
                            : data.name == 'numberOfPositions'
                            ? 'Number Of Positions*'
                            : data.name == 'employmentType'
                            ? 'Employment Type*'
                            : data?.name == 'location'
                            ? 'Location'
                            : data?.name == 'department'
                            ? 'Department'
                            : ''}
                        </Label>
                        {data?.name == 'jobPostStatus' || data.name == 'numberOfPositions' || data.name == 'title' ? (
                          <TextinputContainer
                            placeholder={''}
                            control={control}
                            value={data.value}
                            disabled
                            name={''}
                            defaultValue={data.value}
                          />
                        ) : (
                          <TextinputContainer
                            placeholder={''}
                            control={control}
                            value={data.value.name}
                            disabled
                            name={''}
                            defaultValue={data.value.name}
                          />
                        )}
                      </FormWrapper>
                    )
                  }
                }
              })}
          </Form>
          <Form className="form">
            {DynamicForm?.length > 0 &&
              DynamicForm?.map((data: any) => {
                return data?.formFields?.map((item: any, ind: number) => {
                  return (
                    <div key={ind}>
                      <UseMultiRenderInputs item={item} />
                    </div>
                  )
                })
              })}
          </Form>
          <ButttonWrapper>
            <OkButton color={'white'} background={'#1d2e88'} onClick={() => setShowModal(false)}>
              Ok
            </OkButton>
            {/* <Button color={'#f3f5ff'} onClick={publishNow}>
              Publish Now
            </Button> */}
          </ButttonWrapper>
        </FormContainer>
      </PreviewNavbar>
    </PreviewWrapper>
  )
}

export default FormPreview
