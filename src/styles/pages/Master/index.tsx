import styled from 'styled-components'

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 90px;
  z-index: 9999;
  padding: 30px;
  width: 800px;
  button {
    width: 190px;
  }
  @media (max-width: 878px) {
    width: 600px;
    gap: 10px;
  }
`
export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 90px;
  z-index: 9999;
  padding: 30px;
  /* width: 600px; */
  button {
    width: 190px;
  }
  @media (max-width: 878px) {
    width: 600px;
    gap: 10px;
  }
`
export const Label = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  text-align: start;
`
export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: 6px;
  @media (max-width: 514px) {
    svg {
      width: 80px;
      height: 80px;
    }
  }
`

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 30px;

  @media (max-width: 514px) {
    max-width: 300px;
  }
`

export const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 624px;

  svg {
    cursor: pointer;
  }
  @media (max-width: 767px) {
    max-width: 284px;
  }
`

export const HeadingWrapper = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  @media (max-width: 514px) {
    font-size: 18px;
    line-height: 24px;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: end;
`
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`
export const EmployeeFormWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 390px);
  gap: 20px;
`
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 83px;
  gap: 10px;
  .description-area {
    min-height: 100px !important;
  }
`
export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`
