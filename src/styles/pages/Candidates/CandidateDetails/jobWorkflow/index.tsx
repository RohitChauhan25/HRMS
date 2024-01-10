import styled from 'styled-components'

interface IProps {
  color?: string
  background?: string
  borderleft?: string
  borderBottom?: string
  bgcolor?: string
  signcolor?: string
}

export const ScreeningWrapper = styled.div<IProps>`
  width: 100%;
  max-width: 624px;
  border-radius: 12px;
  padding: 20px;
  display: grid;
  grid-gap: 28px;
  background-color: ${(props) => props.color || '#f3f5ff'};
  border-left: ${(props) => props.borderleft || '16px solid #1d2e88'};
`
export const InterviewWrapper = styled.div<IProps>`
  width: 100%;
  max-width: 624px;
  border-radius: 12px;
  padding: 20px;
  display: grid;
  grid-gap: 28px;
  background-color: ${(props) => props.color || '#E8E8E8'};
  border-left: ${(props) => props.borderleft || '16px solid #B9B9B9'};
  margin-top: 20px;
`
export const SignOffSection = styled.div<IProps>`
  width: 100%;
  max-width: 624px;
  border-radius: 12px;
  padding: 20px;
  display: grid;
  grid-gap: 28px;
  background-color: ${(props) => props.color || '#E8E8E8'};
  border-left: ${(props) => props.borderleft || '16px solid #B9B9B9'};
  margin-top: 20px;
`
export const HeaderSection = styled.div`
  max-height: 56px;
  display: grid;
  grid-gap: 12px;
`

export const ProfileContentSection = styled.div``

export const Heading = styled.h4`
  margin: 0;
  font-size: 16px;
  padding: 6px 0 3px 0;
  color: ${(props) => props.color || '#b9b9b9'};
`

export const SubHeading = styled.p`
  color: rgb(74, 74, 74);
  font-weight: 400;
  font-size: 14px;
  width: 100%;
  max-width: 589px;
  overflow-wrap: break-word;
`
export const DocumentSection = styled.div<IProps>`
  width: 100%;
  max-width: 624px;
  border-radius: 12px;
  padding: 20px;
  display: grid;
  grid-gap: 28px;
  background-color: ${(props) => props.color || '#E8E8E8'};
  border-left: ${(props) => props.borderleft || '16px solid #B9B9B9'};
  margin-top: 20px;
`

export const ChecklistSection = styled.form<IProps>`
  display: flex;
  flex-direction: column;
  label {
    padding: 10px 0;
    font-weight: 600;
    font-size: 16px;
    color: #1d1d1d;
    .ant-checkbox-wrapper + .ant-checkbox-wrapper {
      margin-inline-start: 0;
    }
  }
  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-inline-start: 0;
  }
`
export const Form = styled.form`
  display: grid;
  grid-gap: 28px;
`

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  grid-gap: 20px;
  justify-content: end;

  button {
    width: 100%;
    max-width: 171px;
  }
`
export const RejectButton = styled.button`
  width: 100%;
  height: 44px;
  background-color: #f3f5ff;
  color: ${(props) => props.color || '#b9b9b9'};
  border: ${(props) => `2px solid ${props.color}` || '2px solid #b9b9b9'};
  border-radius: 8px;
  padding: 10px, 16px, 10px, 16px;
  font-weight: 600;
  font-size: 14px;
  outline: none;
  cursor: pointer;
`
export const RejectInterviewButton = styled.button`
  width: 100%;
  height: 44px;
  background-color: #f3f5ff;
  color: #1d2e88;
  border: 2px solid #1d2e88;
  border-radius: 8px;
  padding: 10px, 16px, 10px, 16px;
  font-weight: 600;
  font-size: 14px;
  outline: none;
  cursor: pointer;
`

export const MoveInterviewButton = styled.button`
  width: 100%;
  height: 44px;
  background-color: #1d2e88;
  color: #ffffff;
  border-radius: 8px;
  padding: 10px, 16px, 10px, 16px;
  font-weight: 600;
  font-size: 14px;
  outline: none;
  border: none;
  cursor: pointer;
`
export const MoveButton = styled.button<IProps>`
  width: 100%;
  height: 44px;
  background-color: ${(props) => props.color || ' #e8e8e8'};
  color: ${(props) => props.background || ' #b9b9b9'};
  border-radius: 8px;
  padding: 10px, 16px, 10px, 16px;
  font-weight: 600;
  font-size: 14px;
  outline: none;
  border: none;
  cursor: pointer;
`
export const ButtonWrapperSection = styled.div`
  display: flex;
  width: 100%;

  grid-gap: 20px;
  justify-content: end;
  Button {
    color: #fff !important;
    border-color: unset !important;
  }
`
export const FooterSection = styled.div``

export const Line = styled.div<IProps>`
  border-bottom: ${(props) => props.borderBottom || '1px solid #bcc6fc'};
`
export const ScreeningLine = styled.div<IProps>`
  border-bottom: ${(props) => props.borderBottom || '1px solid #1d2e88'};
`
export const Time = styled.h4`
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #979797;
  padding: 0;
  margin: 0;
`
export const UserInterviewSection = styled.div``
export const ContentSection = styled.div`
  padding: 0 0 0 46px;
  margin-top: 10px;
`

export const DocumentsContentSection = styled.div``
export const ViewMoreSection = styled.h4`
  text-align: center;
  cursor: pointer;
  .lessarrow {
    margin-left: 10px;
    transform: rotate(180deg);
  }
  .arrow {
    margin-left: 10px;
  }
`

export const AvatarSectionn = styled.div``
export const SignOfferWrapper = styled.div`
  background-color: #e8e8e8;
  width: 100%;
  max-width: 624px;
  border-radius: 12px;
  padding: 20px;
  border-left: 16px solid #b9b9b9;
  color: #b9b9b9;
  display: grid;
  grid-gap: 28px;
  margin-top: 20px;
`

export const AvatarSection = styled.div`
  display: flex;
  gap: 14px;
`

export const TaskSection = styled.div`
  display: flex;
  gap: 14px;
  justify-content: space-between;
  .download {
    margin-top: 10px;
  }
`
export const LinkSection = styled.div`
  display: flex;
  margin-top: 10px;
`

export const LinkData = styled.a`
  margin-left: 15px;
  margin-top: 8px;
`
export const PdfSection = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 10px;
  svg {
    background: #8896e1;
    padding: 10px;
    border-radius: 10px;
  }
`

export const FileNameSection = styled.div`
  font-weight: 600;
  font-size: 12px;
  color: #4a4a4a;
  margin-top: 9px;
`
export const Size = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #979797;
`

export const LeadWrapper = styled.div`
  display: flex;
  gap: 20px;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const UserSection = styled.div``
export const UserEmail = styled.div``

export const SubmitApproveButton = styled.button<IProps>`
  width: 100%;
  height: 44px;
  background-color: ${(props) => props.bgcolor || ' #e8e8e8'};
  color: ${(props) => props.signcolor || ' #b9b9b9'};
  border-radius: 8px;
  padding: 10px, 16px, 10px, 16px;
  font-weight: 600;
  font-size: 14px;
  outline: none;
  border: none;
  cursor: pointer;
`
export const UploadDocumentWrapper = styled.div`
  width: 100%;
  height: 100vh;
`
export const UploadWrapper = styled.div`
  width: 100%;
  background-color: #f3f5ff;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  margin: 20px auto;
  align-items: center;
`
export const UploadSection = styled.div`
  width: 100%;
  max-width: 984px;
  background-color: #fff;
  margin-top: 53px;
`
export const HeadingSection = styled.div`
  width: 100%;
  max-width: 984px;
  height: 96px;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  border-radius: 12px 12px 0 0px;
  background-color: #1d2e88;
`
export const UploadHeading = styled.h2`
  color: #fff;
  padding-left: 25px;
`
export const Uploader = styled.div`
  padding: 30px;
`
export const DocumentsWrapper = styled.form``
export const InputField = styled.input``
