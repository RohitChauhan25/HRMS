import { useForm } from 'react-hook-form'
import { DatePicker, Radio } from 'antd'
import CheckboxContainer from 'components/Checkbox'
import SelectContainer from 'components/Select'
import TextinputContainer from 'components/TextInput'
import SelectTime from 'components/TimePicker'
import UploadIcon from 'assets/svg/UploadIcon'
import { FormWrapper, UploadResume } from 'styles/components/Preview'
import { Label } from 'styles/components/TextboxStyle'
import { Heading, InputField } from 'styles/pages/Candidates/CandidateDetails/jobWorkflow'
import { Click, DescriptionUpload } from 'styles/views/Jobs/JobApplication'

const UseMultiRenderInputs = (item: any) => {
  const { control } = useForm()
  switch (item?.type) {
    case 'text':
      return (
        <FormWrapper>
          <Label>
            {item.name} {item.isRequired ? '*' : ''}
          </Label>
          <TextinputContainer placeholder={''} control={control} name={''} />
        </FormWrapper>
      )
      break

    case 'radio':
      return (
        <FormWrapper>
          <Label>
            {item.name} {item.isRequired ? '*' : ''}
          </Label>
          <Radio.Group>
            {item?.option.map((opt: any, index: number) => {
              return (
                <Radio value={opt.value} key={index} checked={index === 0 ? true : false}>
                  {opt.label}
                </Radio>
              )
            })}
          </Radio.Group>
        </FormWrapper>
      )

    case 'checkbox':
      return (
        <FormWrapper>
          <Label>
            {item.name} {item.isRequired ? '*' : ''}
          </Label>
          {item?.options?.map((data: any, index: number) => {
            return <CheckboxContainer key={index} label={data.value} defaultChecked={index === 0 ? true : false} />
          })}
        </FormWrapper>
      )
    case 'select':
      return (
        <FormWrapper>
          <Label>
            {item.name} {item.isRequired ? '*' : ''}
          </Label>
          <SelectContainer defaultValue={item?.label} name={item?.type} options={item?.options} control={control} />
        </FormWrapper>
      )
    case 'file':
      return (
        <FormWrapper>
          <Heading>
            {item.name} {item.isRequired ? '*' : ''}
          </Heading>
          <UploadResume>
            <UploadIcon />
            <InputField
              type="file"
              multiple
              accept="application/pdf,application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            <Click>Click or drag file to this area to upload</Click>
            <DescriptionUpload>Amet minim mollit non deserunt</DescriptionUpload>
          </UploadResume>
        </FormWrapper>
      )
    case 'date':
      return (
        <FormWrapper>
          <Label>
            {item.name} {item.isRequired ? '*' : ''}
          </Label>
          <DatePicker />
        </FormWrapper>
      )
      break
    case 'time':
      return (
        <FormWrapper>
          <Label>
            {item.name} {item.isRequired ? '*' : ''}
          </Label>
          <SelectTime />
        </FormWrapper>
      )
      break
    default:
      break
  }
}

export default UseMultiRenderInputs
