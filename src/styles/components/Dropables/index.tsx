import styled from 'styled-components'
export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`
export const MainContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 70px;
  width: 100%;
  @media (max-width: 1068px) {
    flex-direction: column;
    gap: 20px;
  }
`
export const FieldOptionsContainer = styled.div`
  background: #f3f5ff;
  border-radius: 12px;
  width: 100%;
  max-width: 320px;
  padding: 20px;
  margin-top: 38px;

  @media (max-width: 1068px) {
    width: -webkit-fill-available;
    max-width: 100%;
  }
`
export const DynamicFormTitle = styled.input`
  font-size: 15px;
  max-width: 950px;
  padding: 0 20px;
  height: 40px;
  color: #000;
  outline: none;
  border: 1px solid #b9b9b9;
  border-radius: 8px;
`
export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`
export const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`
export const SearchWrapper = styled.div`
  border-bottom: 1px solid #bcc6fc;
  padding-bottom: 13px;
  .ant-input-affix-wrapper {
    padding: 0 11px;
    background-color: #dce2ff;
    border: none;
    svg {
      path {
        fill: #6b7bce;
      }
    }
  }
  input {
    height: 40px;
    background-color: #dce2ff;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    ::placeholder {
      color: #6b7bce;
    }
  }
`
export const GroupFieldWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  max-width: 314px;
  border-radius: 8px;
  padding: 12px 20px;
  background: #fff;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #151515;
`
export const FieldHeading = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1d1d1d;
`
export const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 151px);
  gap: 16px 8px;
`
export const FieldOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background: #fff;
  padding: 12px 6px;
`
export const FieldIcon = styled.div`
  width: 16px;
  height: 16px;
`
export const FieldTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #4a4a4a;
`
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 90px;
  button {
    max-width: 134px;
  }
`
export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  button {
    width: 133px;
  }
  .back-button {
    background: #f9c51c;
    color: #000;
  }
`

export const Wrapper = styled.div`
  min-height: auto;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  position: relative;
  padding: 15px;

  img {
    padding-right: 15px;
  }
  .required {
    position: absolute;
    top: 0;
    left: 140px;
  }
`
export const CollapseWrapper = styled.div`
  display: flex;
  flex-direction: column;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`

export const CollpaseSection = styled.div`
  text-align: right;
  cursor: pointer;

  .collpaseClose {
    transform: rotate(180deg);
  }
  .collpaseOpen {
  }
  input {
    display: flex;
  }
`
export const InputField = styled.input`
  outline: none;
  border: none;
  font-size: 15px;
  color: #b9b9b9;
`

export const CollpaseHeader = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: center;
  padding: 0px 18px;
  max-width: 983px;
  min-height: 40px;
  border: 1px solid rgb(232, 232, 232);
  border-radius: 8px;
  position: relative;
`

export const CollpaseInputHeading = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: center;
`
export const Heading = styled.div`
  outline: none;
  border: none;
  font-size: 15px;
  color: #b9b9b9;
  .astrick {
    position: absolute;
    top: -3px;
    left: 138px;
  }
`

export const DescriptionPara = styled.div`
  display: flex;
  margin-top: 20px;
  font-weight: 600;
`
export const DescriptionInput = styled.input`
  margin-top: 20px;
  font-size: 15px;
  max-width: 950px;
  padding: 0 10px;
  height: 40px;
  color: #000;
  outline: none;
  border: 1px solid #b9b9b9;
  border-radius: 8px;
`
export const CollapseButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
export const Required = styled.p`
  display: flex;
  gap: 10px;
  color: #1d1d1d;
  font-size: 12px;
  font-weight: 400;
  margin-top: 20px;
`
export const RemoveButton = styled.button`
  width: 71px;
  height: 28px;
  background-color: #d83232;
  color: #fff;
  margin-top: 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`

export const AddOptionWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  cursor: pointer;
  svg {
    path {
      fill: #000;
    }
  }
`
export const OptionWrapper = styled.div``

export const AddButton = styled.button`
  width: 100px;
  height: 28px;
  border: none;
  outline: none;
  background-color: #fff;
  font-size: 15px;
  margin-top: -4px;
`
export const FormButton = styled.div`
  display: flex;
  gap: 10px;
  max-width: 700px;
  gap: 20px;
  border: none;
  outline: none;
  background-color: rgb(255, 255, 255);
  font-size: 15px;
  button {
    max-width: 340px;
  }
  .back-button {
    max-width: 195px;
  }
  .delete-button {
    background-color: rgb(216, 50, 50);
    color: rgb(255, 255, 255);
    border: none;
  }
  @media (max-width: 1535px) {
    max-width: 680px;
  }
  @media (max-width: 1500px) {
    max-width: 610px;
  }
  @media (max-width: 1471px) {
    max-width: 626px;
  }
`
export const ButtonSection = styled.div`
  display: flex;
  align-items: end;
`
