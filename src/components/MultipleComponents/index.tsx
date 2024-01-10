import { useForm } from 'react-hook-form'
import { DatePicker, TimePicker } from 'antd'
import { Checkbox } from 'antd'
import SelectContainer from 'components/Select'
import TextareaContainer from 'components/TextArea'
import TextinputContainer from 'components/TextInput'
import RadioContainer from 'components/Radio'
// import NumberInput from 'components/NumberInput'
import { FormWrapper } from 'styles/components/Preview'
import { Click, DescriptionUpload, UploadResume } from 'styles/views/Jobs/JobApplication'
import { JobInputWrapper, Label } from 'styles/views/Jobs/JobPostForm'
import { NameWrapper } from 'styles/views/Jobs/JobApplication'
import UploadIcon from 'assets/svg/UploadIcon'
const CheckboxGroup = Checkbox.Group

const UseMultiRenderInputs = ({ item, disabled, index, setDynamicData, dynamicData }: any) => {
  const { control } = useForm()
  const handleEndInputChange = (e: any) => {
    const newData = dynamicData
    newData[index].value = e?.target?.value
    setDynamicData(newData)
  }

  // handle Number Input value
  const handleNumberChange = (e: any) => {
    const newData = dynamicData
    newData[index].value = e?.target?.value

    setDynamicData(newData)
  }

  // handle Select and CheckBox value
  const handleValue = (e: any) => {
    const newData = dynamicData
    newData[index].value = e
    setDynamicData(newData)
  }

  const name = (item: any) => {
    if (item?.name) {
      if (item?.isMandatory || item?.isRequired) return `${item?.name}*`
      else return item?.name
    } else {
      if (item?.isMandatory || item?.isRequired) return `${item?.fieldName}*`
      else return item?.fieldName
    }
  }

  const formatOptions = (defaultOptions: []) => {
    const newOptions = []
    for (let i = 0; i < defaultOptions.length; i++) {
      newOptions.push({ label: defaultOptions[i], value: defaultOptions[i] })
    }

    return newOptions
  }

  const Component = (data: any) => {
    switch (data?.type || data?.field?.type || data?.fieldType) {
      case 'text':
        return (
          <NameWrapper key={data?.id}>
            <Label>{name(item)}</Label>
            <TextinputContainer
              placeholder=""
              required={data?.isRequired}
              disabled={disabled}
              control={control}
              name={data?.name || data?.fieldName}
              handleInputChange={handleEndInputChange}
              defaultValue={data?.value?.text}
            />
          </NameWrapper>
        )
        break
      case 'email':
        return (
          <NameWrapper key={data?.id}>
            <Label>{name(item)}</Label>
            <TextinputContainer
              type="email"
              placeholder=""
              required={data?.isRequired}
              disabled={disabled}
              control={control}
              name={data?.name || data?.fieldName}
              handleInputChange={handleEndInputChange}
              defaultValue={data?.value?.text}
            />
          </NameWrapper>
        )
        break
      case 'textarea':
        return (
          <FormWrapper>
            <Label>{name(item)}</Label>
            <TextareaContainer
              placeholder={data?.description}
              name={''}
              control={control}
              disabled={disabled}
              handleInputChange={handleEndInputChange}
              defaultValue={data?.value?.text}
            />
          </FormWrapper>
        )
        break
      case 'number':
        return (
          <FormWrapper>
            <Label>{name(item)}</Label>
            {index === 0 || index ? (
              <>
                <TextinputContainer
                  type="number"
                  placeholder={`Enter ${data?.name}`}
                  control={control}
                  name={data?.name || data?.fieldName}
                  handleInputChange={handleNumberChange}
                  defaultValue={data?.value?.text}
                />
              </>
            ) : (
              <TextinputContainer
                type="number"
                placeholder={`Enter ${data?.name}`}
                control={control}
                name={data?.name || data?.fieldName}
                handleInputChange={handleNumberChange}
                disabled={disabled}
                defaultValue={data?.value?.text}
              />
            )}
          </FormWrapper>
        )
        break
      case 'url':
        return (
          <NameWrapper key={data?.id}>
            <Label>{name(item)}</Label>
            <TextinputContainer
              placeholder=""
              type="url"
              required={data?.isRequired}
              disabled={disabled}
              control={control}
              name={data?.name || data?.fieldName}
              handleInputChange={handleEndInputChange}
              defaultValue={data?.value?.text}
            />
          </NameWrapper>
        )
        break

      case 'radio':
        return (
          <JobInputWrapper key={data?.id}>
            <Label>{name(item)}</Label>
            <RadioContainer
              handleChange={handleEndInputChange}
              options={data?.option}
              required={data?.isMandatory}
              disabled={disabled}
              defaultValue={data?.value}
            />
            {data?.label?.split('+')[1] === 'Explanation' ? (
              <TextareaContainer
                placeholder="Enter Your Explanation"
                disabled={true}
                defaultValue={data?.value}
                name={''}
              />
            ) : null}
          </JobInputWrapper>
        )
      case 'checkbox': {
        const defaultOptions = data?.value?.options ? formatOptions(data?.value?.options) : null
        return (
          <FormWrapper>
            <Label>{name(item)}</Label>
            <CheckboxGroup
              key={index}
              options={defaultOptions ? defaultOptions : data?.option}
              onChange={handleValue}
              defaultValue={data?.value?.selectedOptions ? data?.value?.selectedOptions[0] : null}
            />
          </FormWrapper>
        )
      }

      case 'dropdown':
        return (
          <FormWrapper>
            <SelectContainer
              defaultValue={data?.value}
              name={data?.type}
              options={data?.defaultValue.options}
              control={control}
              disabled={disabled}
            />
          </FormWrapper>
        )
      case 'select': {
        const defaultOptions = data?.value?.options ? formatOptions(data?.value?.options) : null
        return (
          <FormWrapper>
            <Label>{name(item)}</Label>
            <SelectContainer
              name={data?.type}
              options={defaultOptions ? defaultOptions : data?.option}
              control={control}
              disabled={disabled}
              handleValue={handleValue}
              defaultValue={data?.value?.selectedOptions}
            />
          </FormWrapper>
        )
      }

      case 'file':
        return (
          <>
            <Label>{data?.isRequired ? data?.fieldName + '*' : data?.fieldName}</Label>
            <UploadResume>
              <UploadIcon />
              <Click>Click or drag file to this area to upload</Click>
              <DescriptionUpload>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
                enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
              </DescriptionUpload>
            </UploadResume>
          </>
        )
      case 'date':
        return (
          <FormWrapper>
            <Label>{name(item)}</Label>
            <DatePicker disabled={disabled} defaultValue={data?.value} />
          </FormWrapper>
        )
        break
      case 'time':
        return (
          <FormWrapper>
            <Label>{name(item)}</Label>
            <TimePicker
              use12Hours
              format="h:mm a"
              style={{ width: '100%' }}
              disabled={disabled}
              defaultValue={data?.value}
            />
          </FormWrapper>
        )
        break
      default:
        break
    }
  }

  return <div style={{ width: '100%' }}>{Component(item)}</div>
}

export default UseMultiRenderInputs
