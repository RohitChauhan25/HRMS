import { useState } from 'react'
import type { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'
import { IJobFieldOption, IRadioprops } from 'interfaces'
import { RadioWrapper } from 'styles/components/Radio'

const RadioContainer = (props: IRadioprops) => {
  const [value, setValue] = useState(props.defaultValue?.selectedOptions)

  const onChange = (e: RadioChangeEvent) => {
    props.handleChange(e)
    setValue(e.target.value)
  }

  const opt = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ]

  return (
    <RadioWrapper>
      <Radio.Group onChange={onChange} value={value}>
        {props?.options?.length
          ? props?.options?.map((item: IJobFieldOption, index: number) => {
              return (
                <Radio key={index} value={item?.value} disabled={props.disabled}>
                  {item?.label}
                </Radio>
              )
            })
          : opt?.map((item: IJobFieldOption, index: number) => {
              return (
                <Radio key={index} value={item?.value} disabled={props.disabled}>
                  {item?.label}
                </Radio>
              )
            })}
      </Radio.Group>
    </RadioWrapper>
  )
}

export default RadioContainer
