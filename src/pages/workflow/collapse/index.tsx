import { useState } from 'react'
import { Switch } from 'antd'
import { PlaceHolder } from 'constants/placeholderData'
import arrowicon from 'assets/images/arrowIcon.png'
import PlusIcon from 'assets/svg/PlusIcon'
import {
  Wrapper,
  CollpaseSection,
  InputField,
  Heading,
  CollapseWrapper,
  DescriptionPara,
  DescriptionInput,
  CollpaseHeader,
  CollpaseInputHeading,
  CollapseButtonWrapper,
  Required,
  RemoveButton,
  AddOptionWrapper,
  AddButton,
  OptionWrapper,
} from 'styles/components/Dropables'

const CollapseFun = ({ handleDelete, index, onRequiredChange, widget, all, setAll }: any) => {
  const [heading] = useState(PlaceHolder.formHeadingPlaceholder)
  const [isExpanded, setIsExpanded] = useState(false)
  const [id, setId] = useState(2)
  const [options, SetOptions] = useState<JSX.Element[]>([])
  const [mandatory, setMandatory] = useState(false)

  const toggleContent = () => {
    setIsExpanded(!isExpanded)
  }

  const handleCheck = (value: boolean) => {
    setMandatory(value)
    onRequiredChange(value)
  }

  // Create Formfield Add Option
  const addOptions = (type: any) => {
    setId((re) => re + 1)
    SetOptions((prev) => {
      const newArr = [...prev]
      newArr?.push(
        <CollapseWrapper className="optionwrapper">
          <DescriptionInput
            type="text"
            placeholder={`Option ${id}`}
            onBlur={(e) => handleDefaultValueChange(e, type)}
          />
        </CollapseWrapper>,
      )
      return newArr
    })
  }

  // Callback function for Formfield's Title
  const handleTitleChange = (e: any) => {
    const data = all
    data[index].name = e.target.value
    setAll(data)
  }

  // Callback function for Formfield's Description
  const handleDescChange = (e: any) => {
    const data = all
    data[index].description = e.target.value
    setAll(data)
  }

  // Callback function for Formfield's DefaultValue
  const handleDefaultValueChange = (e: any, type: string) => {
    const inputType = ['select', 'radio', 'dropdown', 'checkbox']
    const data = all
    if (inputType.includes(type)) {
      const prev = data[index]?.defaultValue?.options
      const defaultValues = {
        options: [
          {
            label: e.target.value,
            value: e.target.value,
          },
        ],
      }
      if (prev) {
        defaultValues.options = [...prev, ...defaultValues.options]
      }

      data[index].defaultValue = defaultValues

      setAll(data)
    } else {
      const defaultValues = {
        value: e.target.value,
      }
      data[index].defaultValue = defaultValues
      setAll(data)
    }
  }

  return (
    <>
      {isExpanded ? (
        <CollpaseSection>
          <CollpaseHeader>
            <Heading>
              {heading} {mandatory && <p className="astrick">*</p>}
            </Heading>
            <div>
              <img src={arrowicon} alt="arrowicon" className="collpaseClose" onClick={toggleContent} />
            </div>
          </CollpaseHeader>
        </CollpaseSection>
      ) : (
        <>
          <div>
            <Wrapper>
              <CollpaseSection>
                <CollpaseInputHeading>
                  <InputField
                    type="text"
                    placeholder={PlaceHolder.formHeadingPlaceholder}
                    required={mandatory}
                    onChange={(e) => handleTitleChange(e)}
                    defaultValue={widget?.name}
                  />
                  <img src={arrowicon} alt="arrowicon" className="collpaseOpen" onClick={toggleContent} />
                </CollpaseInputHeading>
                {mandatory && <p className="required">*</p>}
                <CollapseWrapper>
                  <DescriptionPara>Description</DescriptionPara>
                  <DescriptionInput
                    type="text"
                    placeholder={PlaceHolder.formDescriptionPlaceholder}
                    required={mandatory}
                    onChange={(e) => handleDescChange(e)}
                    defaultValue={widget?.description ? widget?.description : ''}
                  />
                  {widget?.type === 'dropdown' ||
                  widget?.type === 'checkbox' ||
                  widget?.type === 'select' ||
                  widget?.type === 'radio' ? (
                    <>
                      <div>
                        <DescriptionPara>Options</DescriptionPara>
                        <CollapseWrapper>
                          {widget?.defaultValue?.options ? (
                            widget?.defaultValue?.options?.map((option: any, index: number) => {
                              return (
                                <DescriptionInput
                                  type="text"
                                  placeholder={PlaceHolder.formOptionPlaceholder}
                                  onBlur={(e) => handleDefaultValueChange(e, widget?.type)}
                                  key={index}
                                  defaultValue={option?.value}
                                />
                              )
                            })
                          ) : (
                            <DescriptionInput
                              type="text"
                              placeholder={PlaceHolder.formOptionPlaceholder}
                              onBlur={(e) => handleDefaultValueChange(e, widget?.type)}
                            />
                          )}
                        </CollapseWrapper>
                        {options?.map((element, index) => {
                          return <OptionWrapper key={index}>{element}</OptionWrapper>
                        })}
                      </div>
                      <AddOptionWrapper>
                        <PlusIcon onClick={() => addOptions(widget.type)} />
                        <AddButton type="button">Add Option</AddButton>
                      </AddOptionWrapper>
                    </>
                  ) : (
                    <>
                      <DescriptionPara>Default Value</DescriptionPara>
                      <DescriptionInput
                        type="number"
                        placeholder={PlaceHolder.formDefaultPlaceholder}
                        onChange={(e) => handleDefaultValueChange(e, widget?.type)}
                        defaultValue={widget?.defaultValue?.value ? widget?.defaultValue?.value : ''}
                      />
                    </>
                  )}
                </CollapseWrapper>
                <CollapseButtonWrapper>
                  <Required>
                    <Switch
                      size="small"
                      defaultChecked={widget?.isRequired ? widget?.isRequired : mandatory}
                      onChange={(e: any) => handleCheck(e)}
                    />
                    Required
                  </Required>
                  <RemoveButton onClick={() => handleDelete(index)}>Remove</RemoveButton>
                </CollapseButtonWrapper>
              </CollpaseSection>
            </Wrapper>
          </div>
        </>
      )}
    </>
  )
}

export default CollapseFun
