import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Rate } from 'antd'
import { RatingProps } from 'interfaces'
import { Container, Label } from 'styles/components/RatingStyle'

const Rating: React.FC<RatingProps> = ({ label, name, control, rules, defaultValue, disabled }) => {
  return (
    <Container>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Rate value={field.value} onChange={(value) => field.onChange(value)} disabled={disabled ? true : false} />
        )}
      />
    </Container>
  )
}

Rating.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  rules: PropTypes.any.isRequired,
  defaultValue: PropTypes.any.isRequired,
  disabled: PropTypes.any,
}

export default Rating
