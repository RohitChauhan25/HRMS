import { useState, useEffect } from 'react'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { PlaceHolder } from 'constants/placeholderData'
import SearchInput from 'components/SearchInput'
import GroupFieldIcon from 'assets/svg/GroupFieldIcon'
import SearchIcon from 'assets/svg/SearchIcon'
import CheckboxIcon from 'assets/svg/CheckboxIcon'
import DownArrowIcon from 'assets/svg/DownArrowIcon'
import PhoneIcon from 'assets/svg/PhoneIcon'
import RadioButtonIcon from 'assets/svg/RadioButtonIcon'
import TextAreaIcon from 'assets/svg/TextAreaIcon'
import UploadDocumentIcon from 'assets/svg/UploadDocumentIcon'
import CalendarIcon from 'assets/svg/CalendarIcon'
import {
  FieldsWrapper,
  Title,
  SearchWrapper,
  GroupFieldWrapper,
  FieldHeading,
  BoxContainer,
  FieldOptionWrapper,
  FieldIcon,
  FieldTitle,
} from 'styles/components/Dropables'

const Dropables = ({ fields }: any) => {
  const [formFields, setFormFields] = useState<any>([])
  const handleOnDrag = (e: React.DragEvent, widgetType: any) => {
    e.dataTransfer.setData('widgetType', JSON.stringify(widgetType))
  }

  // Creating Meta Data for Formfields
  useEffect(() => {
    if (fields) {
      const nonScalarFields = fields?.objectField
      const scalarFields = fields?.scalarField
      const formFields = [...nonScalarFields, ...scalarFields]
      setFormFields(formFields)
    }
  }, [fields])

  // Cases for Handling Formfields Icon
  const renderIcon = (type: any) => {
    switch (type) {
      case 'text':
        return <TextAreaIcon />
      case 'number':
        return <PhoneIcon />
      case 'file':
        return <UploadDocumentIcon />
      case 'date':
        return <CalendarIcon />
      case 'radio':
        return <RadioButtonIcon />
      case 'checkbox':
        return <CheckboxIcon />
      case 'dropdown':
        return <DownArrowIcon />
      case 'select':
        return <DownArrowIcon />
      default:
        return null
    }
  }

  return (
    <FieldsWrapper>
      <Title>Fields</Title>
      <SearchWrapper>
        <SearchInput placeholder={PlaceHolder?.searchPlaceholder} prefix={<SearchIcon />} />
      </SearchWrapper>
      <GroupFieldWrapper>
        <GroupFieldIcon />
        Add Group Field
      </GroupFieldWrapper>
      <FieldHeading>Drag & Drop Field</FieldHeading>
      <BoxContainer>
        {formFields?.map((item: any, index: number) => {
          return (
            <FieldOptionWrapper draggable="true" onDragStart={(e) => handleOnDrag(e, item)} key={index}>
              <FieldIcon>{renderIcon(item.type)}</FieldIcon>
              <FieldTitle>{item.label}</FieldTitle>
            </FieldOptionWrapper>
          )
        })}
      </BoxContainer>
    </FieldsWrapper>
  )
}

export default Dropables
