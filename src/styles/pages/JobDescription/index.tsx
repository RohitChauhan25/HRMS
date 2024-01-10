import styled from 'styled-components'

export const JobTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px auto 20px auto;
`
export const JobNameContainer = styled.div`
  display: grid;
  align-items: center;
  gap: 5px;
`
export const JobName = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #1d1d1d;
`
export const JobType = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #686868;
`
export const JobStatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
export const JobStatus = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #686868;
  white-space: nowrap;
  margin-top: 10px;
`
export const StatusTypeSelect = styled.div`
  width: 100%;
  min-width: 100px;
  .ant-select-selector {
    background: transparent !important;
  }
`
export const TimelineContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const EditJobWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  button {
    padding: 10px 16px;
  }
`
export const TypeName = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #686868;
`
export const DaysNumber = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #1d1d1d;
`
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 350px;
`
export const SideContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: flex-end;
`
export const PreviewButton = styled.div`
  margin: 20px auto 10px auto;
`

export const PreviewJobWrapper = styled.div`
  min-height: 156px;
  background-color: #f3f5ff;
  border-radius: 12px;
`

export const PreviewTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px; /* 120% */
`

export const PreviewHeading = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
`

export const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const TeamMemberDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* background-color: #ffffff; */
  min-height: 64px;
  width: 100%;
  max-width: 315px;
  border-radius: 12px;
`
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  align-items: flex-start;
  gap: 10px;
`
export const PreviewButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  align-items: flex-start;
  gap: 24px;
`
