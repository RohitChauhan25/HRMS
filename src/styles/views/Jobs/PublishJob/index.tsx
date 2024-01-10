import styled from 'styled-components'

export const PublishFlowContainer = styled.div`
  max-width: 740px;
  width: 100%;
  background-color: #fff;
  padding: 0 40px 0 40px;
`

export const FlowContainer = styled.div`
  display: flex;
  gap: 32px;
  padding: 40px;
  background-color: #fff;
  .previewJob {
    max-width: 348px;
  }
  .viewJobDetail {
    max-width: fit-content;
  }
  .viewJobTitle {
    color: #000;
  }
`
export const JobFlowWrapper = styled.div`
  display: flex;
  gap: 32px;
  background-color: #fff;

  .viewJobDetail {
    max-width: fit-content;
  }
  .viewJobTitle {
    color: #000;
  }
`
export const JobTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #fff;
`
export const JobLocation = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #1d1d1d;
`
export const Heading = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1d1d1d;
`

export const JobHeading = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1d1d1d;
  margin-top: 25px;
`

export const Description = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #4a4a4a;
`
export const HeadingDescription = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  margin-top: -2px;
`
export const GetText = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #1d1d1d;
  margin-bottom: 10px;
`
export const JobPlatform = styled.div`
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 10px 20px 20px 10px;
  margin: 12px 0;
  cursor: pointer;
`
export const IconContainer = styled.div`
  margin-left: 10px;
`
export const Buttons = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  /* max-width: 200px; */
  margin-top: 20px;
  padding-bottom: 20px;
  .deleteButton {
    background-color: #d83232;
    color: #fff;
    height: 56px;
  }
`

export const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export const ApplyJobWrapper = styled.div`
  width: 100%;
  max-width: 300px;
`

export const ViewJobRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 348px;
`
export const JobDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
`
export const PrivateWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  margin-top: 20px;
  align-items: center;
  min-height: 55px;
  @media (max-width: 968px) {
    display: flex;
    flex-direction: column;
    align-items: normal;
  }
  .ant-input {
    min-width: 160px;
  }
  .ant-select {
    min-width: 160px;
  }
`
