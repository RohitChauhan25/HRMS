import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { removeShortQuestion } from 'store/slice/screeningQuestion'
import CheckboxContainer from 'components/Checkbox'
import NumberInput from 'components/NumberInput'
import RadioContainer from 'components/Radio'
import SelectContainer from 'components/Select'
import TextareaContainer from 'components/TextArea'
import TextinputContainer from 'components/TextInput'
import UploadIcon from 'assets/svg/UploadIcon'
import RemoveIcon from 'assets/svg/removeIcon'
import {
  NameWrapper,
  UploadResume,
  Click,
  DescriptionUpload,
  LabelAndCrossWrapper,
  WrapperCheck,
  Label2,
} from 'styles/views/Jobs/JobApplication'
import { JobInputWrapper, ScreeningFormLabel, CheckboxQuestionQrapper } from 'styles/views/Jobs/JobPostForm'

const ScreeningQuestionData = () => {
  const screeningQuestions = useSelector((state: any) => state.screeningQuestions)
  const dispatch = useDispatch()
  const { control } = useForm()

  const handleRemove = (id: number) => {
    dispatch(removeShortQuestion(id))
  }

  return (
    <>
      {screeningQuestions?.screeningData?.map((item: any, index: number) => {
        const fieldType = item?.field?.type
        const fieldLabel = item?.isRequired
          ? item?.fieldName + '*' || item?.name + '*'
          : item?.fieldName || item?.name + '*'
        switch (fieldType) {
          case 'text':
            return (
              <NameWrapper key={index}>
                <LabelAndCrossWrapper>
                  <ScreeningFormLabel>{item?.isRequired ? item?.fieldName + '*' : item?.fieldName}</ScreeningFormLabel>
                  <RemoveIcon onClick={() => handleRemove(index)} />
                </LabelAndCrossWrapper>
                <TextinputContainer
                  placeholder={item?.fieldName}
                  required={item?.isRequired}
                  disabled={true}
                  control={control}
                  name={item?.fieldName}
                />
              </NameWrapper>
            )
            break
          case 'url':
            return (
              <NameWrapper key={index}>
                <LabelAndCrossWrapper>
                  <ScreeningFormLabel>{fieldLabel}</ScreeningFormLabel>
                  <RemoveIcon onClick={() => handleRemove(index)} />
                </LabelAndCrossWrapper>
                <TextinputContainer
                  placeholder={item?.fieldName}
                  required={item?.isRequired}
                  disabled={true}
                  control={control}
                  name={item?.fieldName}
                />
                {`${item?.isPrefix && item?.prefixValue === 'url' ? 'li' : ''}`}
              </NameWrapper>
            )
            break
          case 'file':
            return (
              <JobInputWrapper key={index}>
                <LabelAndCrossWrapper>
                  <ScreeningFormLabel>{fieldLabel}</ScreeningFormLabel>
                  <RemoveIcon onClick={() => handleRemove(index)} />
                </LabelAndCrossWrapper>
                <UploadResume>
                  <UploadIcon />
                  <Click>Click or drag file to this area to upload</Click>
                  <DescriptionUpload>
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat
                    duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                  </DescriptionUpload>
                </UploadResume>
              </JobInputWrapper>
            )
            break
          case 'number':
            return (
              <NameWrapper key={index}>
                <LabelAndCrossWrapper>
                  <ScreeningFormLabel>{fieldLabel}</ScreeningFormLabel>
                  <RemoveIcon onClick={() => handleRemove(index)} />
                </LabelAndCrossWrapper>
                <NumberInput disabled={true} />
              </NameWrapper>
            )
            break
          case 'radio':
            return (
              <JobInputWrapper key={index}>
                <LabelAndCrossWrapper>
                  <ScreeningFormLabel>{fieldLabel}</ScreeningFormLabel>
                  <RemoveIcon onClick={() => handleRemove(index)} />
                </LabelAndCrossWrapper>
                <RadioContainer options={item?.options} required={item?.isRequired} disabled={true} />
              </JobInputWrapper>
            )
            break
          case 'checkbox':
            return (
              <JobInputWrapper key={index}>
                <LabelAndCrossWrapper>
                  <CheckboxQuestionQrapper>
                    {item?.fieldName === 'Can travel for Work?' && <CheckboxContainer key={index} disabled={true} />}
                    <ScreeningFormLabel>{fieldLabel}</ScreeningFormLabel>
                  </CheckboxQuestionQrapper>
                  <RemoveIcon onClick={() => handleRemove(index)} />
                </LabelAndCrossWrapper>
                {item?.options?.length ? (
                  item?.options?.map((info: any, index: number) => {
                    return (
                      <WrapperCheck key={index}>
                        <CheckboxContainer disabled={true} />
                        <Label2>{info.label}</Label2>
                      </WrapperCheck>
                    )
                  })
                ) : item?.objectFieldOptions?.value?.length ? (
                  item?.objectFieldOptions?.value?.map((info: any, index: number) => {
                    return (
                      <WrapperCheck key={index}>
                        <CheckboxContainer label={info?.label} disabled={true} />
                        <Label2>{info}</Label2>
                      </WrapperCheck>
                    )
                  })
                ) : (
                  <>{item?.fieldName !== 'Can travel for Work?' && <CheckboxContainer key={index} disabled={true} />}</>
                )}
              </JobInputWrapper>
            )

          case 'select':
            return (
              <JobInputWrapper key={index}>
                <LabelAndCrossWrapper>
                  <ScreeningFormLabel>{fieldLabel}</ScreeningFormLabel>
                  <RemoveIcon onClick={() => handleRemove(index)} />
                </LabelAndCrossWrapper>
                <SelectContainer
                  control={control}
                  defaultValue={item?.options?.[0].label}
                  name={item?.fieldName}
                  options={item.options}
                  disabled={true}
                />
              </JobInputWrapper>
            )
          case 'multi-select':
            return (
              <JobInputWrapper key={index}>
                <LabelAndCrossWrapper>
                  <ScreeningFormLabel>{fieldLabel}</ScreeningFormLabel>{' '}
                  <RemoveIcon onClick={() => handleRemove(index)} />
                </LabelAndCrossWrapper>
                <SelectContainer
                  control={control}
                  defaultValue={item?.options?.[0].label}
                  name={item?.fieldName}
                  options={item.options}
                  disabled={true}
                />
              </JobInputWrapper>
            )
          case 'textarea':
            return (
              <JobInputWrapper key={index}>
                <LabelAndCrossWrapper>
                  <ScreeningFormLabel>{fieldLabel}</ScreeningFormLabel>
                  <RemoveIcon onClick={() => handleRemove(index)} />
                </LabelAndCrossWrapper>
                <TextareaContainer
                  placeholder="Enter Your Explanation"
                  disabled={true}
                  name={item?.fieldName}
                  control={control}
                />
              </JobInputWrapper>
            )
          default:
            break
        }
      })}
    </>
  )
}

export default ScreeningQuestionData
