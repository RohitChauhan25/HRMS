import styled from 'styled-components'

export const AddRolesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`
export const AddRolesField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 623px;
  width: 100%;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`
export const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 624px;

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
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`
export const AddRoleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
`

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const Label = styled.label`
  font-size: 20px;
  font-weight: 700;
`
export const Input = styled.input`
  width: 600px;
  height: 40px;
  border-radius: 8px;
`
export const Button = styled.button`
  width: 610px;
  height: 48px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  background-color: #1d2e88;
  color: #ffffff;
  color: ${(props) => props.color};
`
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const ModalWrapper = styled.div`
  width: 650px;
  padding: 30px;
`
export const PoliciesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`
