import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Checkbox } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { documentData } from 'constants/documentData'
import usePost from 'hooks/usePost'
import Button from 'components/AntdButton'
import { IHiringData, QueryParamTypes } from 'interfaces'
import TaskFile from 'assets/svg/TaskFileIcon'
import Download from 'assets/svg/Download'
import arrowicon from 'assets/images/arrowIcon.png'
import {
  HeaderSection,
  Heading,
  SubHeading,
  ButtonWrapperSection,
  DocumentSection,
  ChecklistSection,
  DocumentsContentSection,
  TaskSection,
  PdfSection,
  FileNameSection,
  SignOfferWrapper,
  Line,
  ViewMoreSection,
} from 'styles/pages/Candidates/CandidateDetails/jobWorkflow'

const Documents = ({ isDone, data, refetch }: IHiringData) => {
  const [headColor] = useState('#050303')
  const [backgroundColor, setBackgroundColor] = useState('#f3f5ff')
  const [borderLeft, setborderLeft] = useState('16px solid #1d2e88')
  const [docs, setDocs] = useState<any>([])
  const [docsAllData, setDocsAllData] = useState<any>({})
  const { jobPostId, id } = useParams() as QueryParamTypes
  const [borderBottom, setborderBottom] = useState('')
  const [isComment, setIsComment] = useState(true)
  const { mutateAsync } = usePost()
  const { handleSubmit, setValue } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })
  const onChange = (e: CheckboxChangeEvent, name: string) => {
    setValue(name, e.target.checked)
    return `checked = ${e.target.checked}`
  }

  const submitData = async (data: any) => {
    const temp: Array<string> = []
    Object.keys(data).map((key) => {
      if (data[key]) {
        temp.push(key)
      }
    })
    const payload = {
      filesList: temp,
    }

    try {
      const res = await mutateAsync({
        url: `job/candidate/docs/request?jobPostId=${jobPostId}&hiringStageId=4&candidateId=${id}`,
        payload: payload,
        token: true,
      })
      if (res) {
        refetch()
      }
    } catch (error: any) {
      return {
        error: error?.response?.data?.message,
      }
    }
  }

  const toggleComment = () => {
    setIsComment(!isComment)
  }

  // move to next or reject here  -->
  const selectOrReject = async (type: string) => {
    const payload: any = {}
    if (type === 'accept') {
      ;(payload.candidateId = id), (payload.jobPostId = jobPostId), (payload.hiringStageId = 4), (payload.isDone = 1)
    } else {
      ;(payload.candidateId = id),
        (payload.jobPostId = jobPostId),
        (payload.hiringStageId = 4),
        (payload.isRejected = 1)
    }

    try {
      const res = await mutateAsync({
        url: '/job/candidate/jobworkflowdata',
        payload: payload,
        token: true,
      })

      if (res) {
        return res
      }
    } catch (error: any) {
      return {
        error: error?.response?.data?.message,
      }
    }
  }

  useEffect(() => {
    documentData?.map((item) => {
      item.required && setValue(item.value, true)
    })
  }, [documentData])

  useEffect(() => {
    if (data) {
      if (data?.data[3]?.isDone === 1) {
        setBackgroundColor('#E8FCF1')
        setborderLeft('16px solid #419E6A')
        setborderBottom('1px solid #A5E1BF')
      }

      if (data?.data[3]?.isRejected === 1) {
        setBackgroundColor('#FFEBEB')
        setborderLeft('16px solid #D83232')
        setborderBottom('1px solid #FC9595')
      }

      setDocsAllData(data?.data[3])
      const tempDocs = []
      for (const key in data?.data[3]?.data.docs) {
        tempDocs.push({ name: key, file: data?.data[3]?.data?.docs[key] })
      }

      setDocs(tempDocs)
    }
  }, [data])

  return (
    <>
      {!isDone ? (
        <DocumentSection>
          <HeaderSection>
            <Heading>4. Documents</Heading>
          </HeaderSection>
        </DocumentSection>
      ) : (
        <DocumentSection color={backgroundColor} borderleft={borderLeft}>
          {docs?.length > 0 ? (
            <>
              <HeaderSection>
                <Heading>4. Documents</Heading>
                <SubHeading>Ask For Documents to candidate.</SubHeading>
              </HeaderSection>
              <ButtonWrapperSection>
                {docsAllData?.isDone === 1 || docsAllData?.isRejected === 1 ? null : (
                  <>
                    <Button variant="primary" htmlType="submit" onClick={() => selectOrReject('reject')}>
                      Reject
                    </Button>
                    <Button variant="primary" htmlType="submit" onClick={() => selectOrReject('accept')}>
                      Move To Next Step
                    </Button>
                  </>
                )}
              </ButtonWrapperSection>
              <Line borderBottom={borderBottom}></Line>

              <DocumentsContentSection>
                <div>
                  {isComment && (docsAllData?.isDone === 1 || docsAllData?.isRejected === 1) ? (
                    <>
                      <ViewMoreSection onClick={toggleComment}>
                        View Documents
                        <img src={arrowicon} alt="arrowicon" className="arrow" />
                      </ViewMoreSection>
                    </>
                  ) : (
                    <>
                      {!isComment && (docsAllData?.isDone === 1 || docsAllData?.isRejected === 1) && (
                        <ViewMoreSection onClick={toggleComment}>
                          Hide Dcuments
                          <img src={arrowicon} alt="arrowicon" className="lessarrow" />
                        </ViewMoreSection>
                      )}
                      {docs?.map((data: any, index: number) => (
                        <div key={index}>
                          <Heading>{data?.name}</Heading>
                          <TaskSection>
                            <PdfSection>
                              <TaskFile />
                              <FileNameSection>{data?.file}</FileNameSection>
                            </PdfSection>
                            <Download />
                          </TaskSection>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </DocumentsContentSection>
            </>
          ) : (
            <>
              <HeaderSection>
                <Heading color={headColor}>4. Documents</Heading>
                <SubHeading>Ask For Documents to candidate.</SubHeading>
              </HeaderSection>
              <ChecklistSection onSubmit={handleSubmit(submitData)}>
                {documentData.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.required ? (
                        <Checkbox onChange={(e) => onChange(e, item.value)} checked={item?.required}>
                          {item?.name}
                        </Checkbox>
                      ) : (
                        <Checkbox onChange={(e) => onChange(e, item.value)} defaultChecked={item?.required}>
                          {item?.name}
                        </Checkbox>
                      )}
                    </div>
                  )
                })}
                <ButtonWrapperSection>
                  <Button variant="primary" htmlType="submit">
                    Ask For Documents
                  </Button>
                </ButtonWrapperSection>
              </ChecklistSection>
            </>
          )}
        </DocumentSection>
      )}
      <SignOfferWrapper>
        <Heading>5. Submit for Offer Release</Heading>
      </SignOfferWrapper>
    </>
  )
}

export default Documents
