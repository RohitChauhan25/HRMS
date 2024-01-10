import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import ReactModal from 'react-modal'
import { useSelector } from 'react-redux'
import { Input } from 'antd'
import useGet from 'hooks/useGet'
import ItemType from 'constants/dynamicFormFields'
import { theme as Theme } from 'constants/themes'
import AntCheckbox from 'components/AntCheckbox'
import Button from 'components/Button'
import { IFormFields, MyComponentProps, SpecialFeildsData } from 'interfaces/dynamicFieldModal'
import CheckboxIcon from 'assets/svg/CheckboxIcon'
import DownArrowIcon from 'assets/svg/DownArrowIcon'
import PhoneIcon from 'assets/svg/PhoneIcon'
import RadioButtonIcon from 'assets/svg/RadioButtonIcon'
import TextAreaIcon from 'assets/svg/TextAreaIcon'
import CalendarIcon from 'assets/svg/CalendarIcon'
import AddIcon from 'assets/svg/AddIcon'
import Email from 'assets/svg/EmailNewIcon'
import Cancel from 'assets/svg/CancelIcon'
import {
  FieldsWrapper,
  Title,
  BoxContainer,
  FieldOptionWrapper,
  FieldIcon,
  FieldTitle,
  SpecialFieldContainer,
  AddOption,
  ModalContainer,
  Label,
  SpecialFieldWrapper,
  Response,
  ButtonContainer,
} from 'styles/components/AddDynamicField'

const AddDynamicField = ({ setFromData, toggle, setToggle, dynamicData }: MyComponentProps) => {
  const { data: formFields, refetch } = useGet('getField', '/job/master/fieldtype', { token: true })
  const { control, handleSubmit, setValue } = useForm({})
  const [isSpecialType, setIsSpecialType] = useState(false)
  const [returnData, setReturnData] = useState<IFormFields>()
  const [optionsFilled, setOptionsFilled] = useState(false)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const [inputValue, setInputValue] = useState('')

  const { append, fields, remove } = useFieldArray({
    name: 'multipleChoiceOption',
    control,
  })

  const [highlightField, setHighlightField] = useState<number>(-1)

  useEffect(() => {
    refetch()
  }, [])

  // clear input value on the change of field
  useEffect(() => {
    setInputValue('')
  }, [highlightField])

  // Click handler when user clicks on any field
  const handleFieldClick = (item: IFormFields, index: number) => {
    setHighlightField(index)
    if (
      item.type == ItemType.CHECKBOX ||
      item.type == ItemType.DROPDOWN ||
      // item.type == ItemType.RADIO ||
      item.type == ItemType.SELECT
    ) {
      setReturnData({ ...item, option: [] })
      setIsSpecialType(true)
    } else {
      setReturnData(item)
      setIsSpecialType(false)
    }
  }

  // set the label for the field
  const handleOptions = (e: React.ChangeEvent<HTMLInputElement>, index: number) =>
    setValue(`multipleChoiceOption.${index}`, {
      label: e.target.value,
      value: e.target.value,
    })

  // Cases for Handling Formfields Icon
  const renderIcon = (type: string) => {
    switch (type) {
      case ItemType.TEXT:
        return <TextAreaIcon />
      case ItemType.TEXTAREA:
        return <TextAreaIcon />
      case ItemType.NUMBER:
        return <PhoneIcon />
      case ItemType.DATE:
        return <CalendarIcon />
      case ItemType.RADIO:
        return <RadioButtonIcon />
      case ItemType.CHECKBOX:
        return <CheckboxIcon />
      case ItemType.DROPDOWN:
        return <DownArrowIcon />
      case ItemType.SELECT:
        return <DownArrowIcon />
      case ItemType.EMAIL:
        return <Email />
      case ItemType.URL:
        return <TextAreaIcon />
      default:
        return null
    }
  }

  // submit handler for setting options of a given field
  const formData = (data: SpecialFeildsData) => {
    setReturnData({ ...returnData, option: data?.multipleChoiceOption })
    setOptionsFilled(!!data?.multipleChoiceOption?.length)
  }

  // Section for special field which accpets the options
  const specialField = (
    <SpecialFieldContainer>
      <div>
        <Label>Options</Label>
        {fields.map((field, index) => {
          return (
            <Response key={field.id}>
              <Input
                placeholder="Enter options"
                onChange={(e) => handleOptions(e, index)}
                name={'multipleChoiceOptions'}
              />
              <Cancel onClick={() => remove(index)} />
            </Response>
          )
        })}
        <AddOption
          onClick={() =>
            append({
              label: '',
              value: '',
            })
          }
        >
          <AddIcon />
          Add Option
        </AddOption>
      </div>
      <Button label={'Submit Options'} variant={'text'} className="submitOption" />
    </SpecialFieldContainer>
  )

  return (
    <ReactModal isOpen={toggle}>
      <ModalContainer>
        <form onSubmit={handleSubmit(formData)} className="form">
          <FieldsWrapper>
            <Title>Fields</Title>
            <BoxContainer>
              {formFields?.map((item: any, index: number) => {
                if (!Object.values(ItemType).includes(item.type)) {
                  return null
                }

                return (
                  <FieldOptionWrapper
                    backgroundColor={highlightField === index ? Theme.YELLOWCOLOR : ''}
                    onClick={() => handleFieldClick(item, index)}
                    key={index}
                  >
                    <FieldIcon>{renderIcon(item.type ? item?.type : '')}</FieldIcon>
                    <FieldTitle>{item.label}</FieldTitle>
                  </FieldOptionWrapper>
                )
              })}
            </BoxContainer>
          </FieldsWrapper>
          {highlightField > -1 ? (
            <SpecialFieldWrapper>
              <Label>Label</Label>
              <Input
                onChange={(e) => {
                  setReturnData({ ...returnData, name: e.target.value })
                  setInputValue(e.target.value)
                }}
                value={inputValue}
              />
              {isSpecialType ? specialField : null}
              <AntCheckbox
                control={control}
                name={'checkbox'}
                label={'Mandatory'}
                handleChange={(e: any) => setReturnData({ ...returnData, isMandatory: e.target.checked })}
              />
            </SpecialFieldWrapper>
          ) : null}
          <ButtonContainer>
            <Button
              style={{ backgroundColor: activeColor }}
              variant="contained"
              label="Add Field"
              className="addField"
              // disabled={returnData && (!returnData?.hasOwnProperty('name') || returnData.name === '')}
              disabled={
                // highlightField < 0 ||
                (returnData && (!returnData?.hasOwnProperty('name') || returnData.name === '')) ||
                highlightField < 0 ||
                (isSpecialType && !optionsFilled)
              }
              onClick={() => {
                dynamicData?.length > 0 ? setFromData([...dynamicData, returnData]) : setFromData([returnData])
                setIsSpecialType(false)
                setToggle(false)
              }}
            />
            <Button
              variant="text"
              className="close"
              onClick={() => {
                setToggle(false)
                setIsSpecialType(false)
              }}
              label="Close"
            />
          </ButtonContainer>
        </form>
      </ModalContainer>
    </ReactModal>
  )
}

export default AddDynamicField
