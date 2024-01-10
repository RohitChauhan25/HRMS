import type { TabsProps } from 'antd'
import ProfileQuestionsContainer from 'views/Jobs/JobApplication/ProfileQuestions'
import ScreeningQuestionsContainer from 'views/Jobs/JobApplication/ScreeningQuestions'

export const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Profile Questions`,
    children: <ProfileQuestionsContainer />,
  },
  {
    key: '2',
    label: `Screening Questions`,
    children: <ScreeningQuestionsContainer />,
  },
]
