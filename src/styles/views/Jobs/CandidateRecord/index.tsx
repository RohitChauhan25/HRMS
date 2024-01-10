import { getTabColor } from 'constants/dynamicTheme'
import { TabProps } from 'interfaces'
import styled from 'styled-components'

export const RecordContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`
export const CardContainer = styled.div`
  width: 100%;
  max-width: 236px;
  display: flex;
  gap: 20px;
  background: #f3f5ff;
  border-radius: 8px;
  padding: 16px;
  @media (max-width: 768px) {
    padding: 17.5px 10px 17.5px 10px;
    gap: 6px;
  }
`

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 150px;
  width: 100%;
`
export const TiltleWrapper = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #1d1d1d;
  width: max-content;
`
export const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f3f5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`
export const CountWrapper = styled.div`
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  color: #1d1d1d;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`

/*********Candidate Table CSS ************/

export const CandidateDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const HeadSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px 0;
  button {
    max-width: 178px;
    padding: 10px;
  }
`
export const TitleWrapper = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #1d1d1d;
`
export const RightSection = styled.div`
  display: flex;
  gap: 20px;
  .ant-input {
    height: 30px;
  }
  .filter-button {
    flex-direction: row-reverse;
    max-width: 95px;
    height: 40px;
    gap: 8px;
  }
  button {
    height: 40px;
  }
`
export const DetailWrapper = styled.div<TabProps>`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => getTabColor(props)};
`
