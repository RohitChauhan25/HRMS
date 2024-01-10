import { ReactElement } from 'react'
import CheckboxIcon from 'assets/svg/CheckboxIcon'
import DownArrowIcon from 'assets/svg/DownArrowIcon'
import PhoneIcon from 'assets/svg/PhoneIcon'
import RadioButtonIcon from 'assets/svg/RadioButtonIcon'
import TextAreaIcon from 'assets/svg/TextAreaIcon'
import UploadDocumentIcon from 'assets/svg/UploadDocumentIcon'
import CalendarIcon from 'assets/svg/CalendarIcon'

export interface IFieldData {
  id?: number
  icon?: ReactElement | null
  label?: string
  type?: string
  isRequired?: boolean
  seqNumber?: number
  pattern?: string
  defaultValue?: string
  name: string
  description: string
  scalarFieldId?: string
  scalarFieldValue?: string
  options?: any[]
  isPrefix?: boolean
  prefixValue?: string
}
export const formFields: IFieldData[] = [
  {
    id: 1,
    icon: <TextAreaIcon />,
    label: 'Text Field',
    type: 'text',
    isRequired: true,
    seqNumber: 1,
    pattern: '^[^\\s].*',
    defaultValue: '',
    name: 'Text Field',
    description: '',
    scalarFieldId: 'scalarField',
    scalarFieldValue: 'value',
  },
  {
    id: 2,
    icon: <TextAreaIcon />,
    label: 'Text Area',
    type: 'textarea',
    isRequired: true,
    seqNumber: 1,
    pattern: '^[^\\s].*',
    defaultValue: '',
    name: 'Text Area',
    description: '',
    scalarFieldId: 'scalarField',
    scalarFieldValue: 'value',
  },
  {
    id: 3,
    icon: <RadioButtonIcon />,
    label: 'Radio Button',
    type: 'radio',
    isRequired: true,
    seqNumber: 1,
    pattern: '',
    defaultValue: '',
    name: 'Radio Button',
    description: '',
    scalarFieldId: 'scalarField',
    scalarFieldValue: 'value',
    options: [
      { value: 'label1 val', label: 'label1' },
      { value: 'label2 val', label: 'label2' },
      { value: 'label3 val', label: 'label3' },
    ],
  },
  {
    id: 4,
    icon: <CheckboxIcon />,
    label: 'Checkbox',
    type: 'checkbox',
    isRequired: true,
    seqNumber: 0,
    pattern: '',
    defaultValue: '',
    name: 'checkbox',
    description: '',
    scalarFieldId: 'scalarField',
    scalarFieldValue: 'value',
    options: [
      { value: 'a', label: 'l1' },
      { value: 'b', label: 'l2' },
      { value: 'c', label: 'l3' },
    ],
  },
  {
    id: 5,
    icon: <DownArrowIcon />,
    label: 'Dropdown',
    type: 'dropdown',
    isRequired: true,
    seqNumber: 1,
    pattern: '',
    defaultValue: '',
    name: 'Dropdown',
    description: '',
    scalarFieldId: 'scalarField',
    scalarFieldValue: 'value',
    options: [
      { value: 'a', label: 'l1' },
      { value: 'b', label: 'l2' },
      { value: 'c', label: 'l3' },
    ],
  },
  {
    id: 6,
    icon: <UploadDocumentIcon />,
    label: 'Upload',
    type: 'file',
    isRequired: true,
    seqNumber: 1,
    pattern: '',
    defaultValue: '',
    name: 'Upload',
    description: '',
    scalarFieldId: 'scalarField',
    scalarFieldValue: 'value',
  },
  {
    id: 7,
    icon: <PhoneIcon />,
    label: 'Phone',
    type: 'number',
    isRequired: true,
    seqNumber: 1,
    pattern: '^[0-9]{0,}$',
    defaultValue: '',
    name: 'Phone',
    description: '',
    scalarFieldId: 'scalarField',
    scalarFieldValue: 'value',
  },
  {
    id: 8,
    icon: <DownArrowIcon />,
    label: 'Select',
    type: 'select',
    isRequired: true,
    seqNumber: 1,
    pattern: '',
    defaultValue: '',
    name: 'Select',
    description: '',
    scalarFieldId: 'scalarField',
    scalarFieldValue: 'value',
    options: [
      { value: 'a', label: 'l1' },
      { value: 'b', label: 'l2' },
      { value: 'c', label: 'l3' },
    ],
  },
  {
    id: 9,
    icon: <CalendarIcon />,
    label: 'Date Picker',
    type: 'date',
    isRequired: true,
    seqNumber: 1,
    pattern: '',
    defaultValue: '',
    name: 'Date Picker',
    description: '',
    scalarFieldId: 'scalarField',
    scalarFieldValue: 'value',
  },
  {
    id: 10,
    icon: <CalendarIcon />,
    label: 'Time Picker',
    type: 'date',
    isRequired: true,
    seqNumber: 0,
    pattern: '',
    defaultValue: '',
    name: 'Time Picker',
    description: '',
    scalarFieldId: 'scalarField',
    scalarFieldValue: 'value',
  },
  {
    id: 11,
    icon: <UploadDocumentIcon />,
    label: 'Drag and Upload',
    type: 'dragfile',
    isRequired: true,
    seqNumber: 0,
    pattern: '',
    defaultValue: '',
    name: 'Drag and Upload',
    description: '',
    scalarFieldId: 'scalarField',
    scalarFieldValue: 'value',
  },
]

export default formFields
