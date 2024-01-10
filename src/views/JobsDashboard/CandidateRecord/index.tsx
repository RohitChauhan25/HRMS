import ActiveCandidates from 'assets/svg/ActiveCandidates'
import HiredCandidates from 'assets/svg/HiredCandidates'
import RejectedCandidates from 'assets/svg/RejectedCandidates'
import TotalCandidates from 'assets/svg/TotalCandidates'
import {
  RecordContainer,
  CardContainer,
  DetailContainer,
  TiltleWrapper,
  CountWrapper,
  IconWrapper,
} from 'styles/views/Jobs/CandidateRecord'

const RecordSection = () => {
  const cardData = [
    {
      id: 1,
      icon: <TotalCandidates />,
      title: 'Total Candidates',
      number: '24',
    },
    {
      id: 2,
      icon: <ActiveCandidates />,
      title: 'Active',
      number: '19',
    },
    {
      id: 3,
      icon: <HiredCandidates />,
      title: 'Hired',
      number: '1',
    },
    {
      id: 4,
      icon: <RejectedCandidates />,
      title: 'Rejected',
      number: '4',
    },
  ]

  return (
    <RecordContainer>
      {cardData?.map((items) => {
        return (
          <CardContainer key={items?.id}>
            <DetailContainer>
              <TiltleWrapper>{items?.title}</TiltleWrapper>
              <CountWrapper>{items?.number}</CountWrapper>
            </DetailContainer>
            <IconWrapper>{items?.icon}</IconWrapper>
          </CardContainer>
        )
      })}
    </RecordContainer>
  )
}

export default RecordSection
