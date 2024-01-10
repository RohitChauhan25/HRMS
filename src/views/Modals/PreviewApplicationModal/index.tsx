import UseMultiRenderInputs from 'components/MultipleComponents'
import { IJobField } from 'interfaces'
import { PreviewTitle } from 'styles/components/Modal'
import { SaveButton, ModalButtonWrapper } from 'styles/views/Jobs/JobPostForm'
import {
  FormContainer,
  NameContainer,
  PreviewModalContainer,
  Title,
} from 'styles/views/Jobs/JobApplication/PreviewForm'

const PreviewModal = ({ toggle, profileQuestion, dynamicField, screeningQuestions }: any) => {
  return (
    <PreviewModalContainer>
      <PreviewTitle>Preview Application Questions</PreviewTitle>
      <FormContainer>
        <NameContainer>
          {profileQuestion?.slice(0, 2)?.map((item: IJobField, index: number) => {
            if (item?.isDefault)
              return (
                <div key={index}>
                  <UseMultiRenderInputs item={item} disabled={true} />
                </div>
              )
          })}
        </NameContainer>
        <NameContainer>
          {profileQuestion?.slice(2, 4)?.map((item: IJobField, index: number) => {
            if (item?.isDefault)
              return (
                <div key={index}>
                  <UseMultiRenderInputs item={item} disabled={true} />
                </div>
              )
          })}
        </NameContainer>
        {profileQuestion?.slice(4)?.map((item: IJobField, index: number) => {
          if (item?.isDefault)
            return (
              <div key={index}>
                <UseMultiRenderInputs item={item} disabled={true} />
              </div>
            )
        })}
        {dynamicField?.map((item: IJobField, index: number) => {
          return (
            <div key={index}>
              <UseMultiRenderInputs item={item} disabled={true} />
            </div>
          )
        })}
        {screeningQuestions?.screeningData?.length > 0 && <Title>Screening Questions</Title>}
        {screeningQuestions?.screeningData?.map((item: IJobField, index: number) => {
          return (
            <div key={index}>
              <UseMultiRenderInputs item={item} disabled={true} />
            </div>
          )
        })}
        <ModalButtonWrapper>
          <SaveButton onClick={toggle}>Ok</SaveButton>
        </ModalButtonWrapper>
      </FormContainer>
    </PreviewModalContainer>
  )
}

export default PreviewModal
