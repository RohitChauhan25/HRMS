import { useEffect } from 'react'
import { Collapse, theme } from 'antd'
import useGet from 'hooks/useGet'
import { useFormFieldsToQuestions } from 'hooks/useScreeningQuestions'
import AccordionPlusIcon from 'assets/svg/AccordionPlusIcon'

const { Panel } = Collapse

const Accordion = () => {
  const { token } = theme.useToken()
  const { screeningQuestions, mapFormFieldsToQuestions } = useFormFieldsToQuestions()

  const { data: screenQuestionsData, refetch: refetchscreenQuestionsData } = useGet(
    'screen-questions',
    `/job/master/fieldtype`,
    {
      token: true,
    },
  )

  useEffect(() => {
    refetchscreenQuestionsData()
  }, [])

  useEffect(() => {
    if (screenQuestionsData) mapFormFieldsToQuestions(screenQuestionsData)
  }, [screenQuestionsData])

  const panelStyle = {
    marginBottom: 14,
    background: 'transparent',
    borderRadius: token.borderRadiusLG,
  }

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <AccordionPlusIcon rotate={isActive ? 90 : 0} />}
      style={{ background: token.colorBgContainer }}
    >
      {screeningQuestions?.map(
        (item: any) =>
          item?.content && (
            <Panel header={item?.header} key={item?.key} style={panelStyle}>
              <div>{item.content}</div>
            </Panel>
          ),
      )}
    </Collapse>
  )
}

export default Accordion
