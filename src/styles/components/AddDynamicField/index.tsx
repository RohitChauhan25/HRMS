import styled from 'styled-components'
import { theme as Theme } from 'constants/themes'

interface IProps {
  backgroundColor?: string
}

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
  background: ${Theme.SECONDARYWHITECOLOR};
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
  color: ${Theme.BLACKCOLOR};
  outline: none;
  border: 1px solid ${Theme.NEUTRALGREYCOLOR};
  border-radius: 8px;
`
export const FieldsWrapper = styled.div`
  padding: 20px 0px;
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
  border-bottom: 1px solid ${Theme.BLUEBORDERCOLOR};
  padding-bottom: 13px;
  .ant-input-affix-wrapper {
    padding: 0 11px;
    background-color: ${Theme.SECONDARYBLUECOLOR};
    border: none;
    svg {
      path {
        fill: ${Theme.TERTIARYBLUECOLOR};
      }
    }
  }
  input {
    height: 40px;
    background-color: ${Theme.SECONDARYBLUECOLOR};
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    ::placeholder {
      color: ${Theme.TERTIARYBLUECOLOR};
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
  background: ${Theme.WHITE};
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${Theme.DARKBLACKCOLOR};
`
export const FieldHeading = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${Theme.PRIMARYBLACKCOLOR};
`
export const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 8px;
`
export const FieldOptionWrapper = styled.div<IProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid ${Theme.GREYCOLOR};
  border-radius: 8px;
  background: ${Theme.WHITE};
  padding: 12px 6px;
  background-color: ${(props) => props.backgroundColor};
`
export const FieldIcon = styled.div`
  display: grid;
  place-items: center;
`
export const FieldTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${Theme.DARKGREYCOLOR};
`
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 90px;
  button {
    max-width: 134px;
  }
`

export const Wrapper = styled.div`
  min-height: auto;
  border: 1px solid ${Theme.GREYCOLOR};
  border-radius: 8px;
  position: relative;
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
  padding: 0 20px;
  .optionwrapper {
    margin-left: 0;
  }

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
  color: ${Theme.NEUTRALGREYCOLOR};
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
  padding: 15px 10px 0 18px;
`
export const Heading = styled.div`
  outline: none;
  border: none;
  font-size: 15px;
  color: ${Theme.NEUTRALGREYCOLOR};
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
  color: ${Theme.BLACKCOLOR};
  outline: none;
  border: 1px solid ${Theme.NEUTRALGREYCOLOR};

  border-radius: 8px;
`
export const CollapseButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
export const Required = styled.p`
  display: flex;
  gap: 10px;
  color: ${Theme.PRIMARYBLACKCOLOR};
  font-size: 12px;
  font-weight: 400;
  margin-top: 20px;
`
export const RemoveButton = styled.button`
  width: 71px;
  height: 28px;
  background-color: ${Theme.REDCOLOR};
  color: ${Theme.WHITE};
  margin-top: 10px;
  margin-right: 24px;
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
      fill: ${Theme.BLACKCOLOR};
    }
  }
`
export const OptionWrapper = styled.div``

export const AddButton = styled.button`
  width: 100px;
  height: 28px;
  border: none;
  outline: none;
  background-color: ${Theme.WHITE};
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
export const Button = styled.button`
  border-radius: 8px;
  max-width: 115px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${Theme.GREYCOLOR};
  color: ${Theme.PRIMARYBLACKCOLOR};
  cursor: pointer;
`
export const SpecialFieldContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;

  .submitOption {
    max-width: 115px;
    max-height: 30px;
    font-size: small;
    margin: 5px 0;
    font-weight: normal;
  }
`
export const SpecialFieldWrapper = styled.div`
  margin-bottom: 20px;
`
export const AddOption = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  max-width: 100px;
  font-size: small;
`
export const ModalContainer = styled.div`
  padding: 30px;
  width: 600px;
  .close,
  .addField {
    max-width: 120px;
    max-height: 40px;
    font-size: 14px;
    margin: 5px 0;
    font-weight: 550px;
    margin: 0 5px;
  }
`
export const Label = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 7px;
`
export const Response = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  margin: 5px 0;
`
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`
export const CheckboxContainer = styled.div`
  margin: 10px 0;
`
