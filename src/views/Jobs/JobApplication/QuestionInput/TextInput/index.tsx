import CheckboxContainer from 'components/Checkbox'
import NumberInput from 'components/NumberInput'
import RadioContainer from 'components/Radio'
import TextinputContainer from 'components/TextInput'
import { IJobField } from 'interfaces'
import UploadIcon from 'assets/svg/UploadIcon'
import { Click, DescriptionUpload, NameContainer, NameWrapper, UploadResume } from 'styles/views/Jobs/JobApplication'
import { JobInputWrapper, Label } from 'styles/views/Jobs/JobPostForm'

const options = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
]
const TextApplicationInput = ({ question, control }: any) => {
  const Component = (data: any) => {
    switch (data?.field?.type) {
      case 'text':
        return (
          <NameWrapper key={data?.id}>
            <Label>{data?.isRequired ? data?.fieldName + '*' : data?.fieldName}</Label>
            <TextinputContainer
              type="text"
              placeholder=""
              required={data?.isRequired}
              disabled={true}
              control={control}
              name={data?.fieldName}
            />
          </NameWrapper>
        )
        break
      case 'email':
        return (
          <NameWrapper key={data?.id}>
            <Label>{data?.isRequired ? data?.fieldName + '*' : data?.fieldName}</Label>
            <TextinputContainer
              placeholder=""
              required={data?.isRequired}
              disabled={true}
              control={control}
              type="email"
              name={data?.fieldName}
            />
          </NameWrapper>
        )
        break
      case 'textarea':
        return (
          <NameWrapper key={data?.id}>
            <Label>{data?.isRequired ? data?.fieldName + '*' : data?.fieldName}</Label>
            <TextinputContainer
              placeholder=""
              required={data?.isRequired}
              disabled={true}
              control={control}
              name={data?.fieldName}
            />
          </NameWrapper>
        )
        break
      case 'number':
        return (
          <NameWrapper key={data?.id}>
            <Label>{data?.isRequired ? data?.fieldName + '*' : data?.fieldName}</Label>
            <NumberInput disabled={true} />
          </NameWrapper>
        )
        break

      case 'file':
        return (
          <JobInputWrapper key={data?.id}>
            <Label>{data?.isRequired ? data?.fieldName + '*' : data?.fieldName}</Label>
            <UploadResume>
              <UploadIcon />
              <Click>Click or drag file to this area to upload</Click>
              <DescriptionUpload>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
                enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
              </DescriptionUpload>
            </UploadResume>
          </JobInputWrapper>
        )
        break

      case 'url':
        return (
          <NameWrapper key={data?.id}>
            <Label>{data?.isRequired ? data?.fieldName + '*' : data?.fieldName}</Label>
            <TextinputContainer
              placeholder=""
              required={data?.isRequired}
              disabled={true}
              control={control}
              name={data?.fieldName}
            />
            {`${data.isPrefix && data.prefixValue === 'url' ? 'li' : ''}`}
          </NameWrapper>
        )
        break
      case 'radio+textarea':
        return (
          <JobInputWrapper key={data?.id}>
            <Label>{data?.isRequired ? data?.fieldName + '*' : data?.fieldName}</Label>
            <RadioContainer options={options} required={data?.isRequired} disabled={true} />
            {/* {data?.label.split('+')[1] === 'Explanation' ? (
              <TextareaContainer placeholder="Enter Your Explanation" disabled={true} name={''} />
            ) : null} */}
          </JobInputWrapper>
        )
        break
      case 'checkbox':
        return (
          <JobInputWrapper key={data?.id}>
            {data.label === 'Can travel for work' ? null : (
              <Label>{data?.isRequired ? data?.fieldName + '*' : data?.fieldName}</Label>
            )}
            {data?.options?.map((info: any, index: number) => {
              return <CheckboxContainer key={index} label={info?.label} disabled={true} />
            })}
          </JobInputWrapper>
        )
      default:
        break
    }
  }

  return (
    <>
      <NameContainer>
        {question?.slice(0, 2).map((item: IJobField) => {
          if (item?.isSelected) return Component(item)
        })}
      </NameContainer>
      <NameContainer>
        {question?.slice(2, 4).map((item: IJobField) => {
          if (item?.isSelected) return Component(item)
        })}
      </NameContainer>

      {question?.slice(4).map((item: IJobField) => {
        if (item?.isSelected) return Component(item)
      })}
    </>
  )
}

export default TextApplicationInput
