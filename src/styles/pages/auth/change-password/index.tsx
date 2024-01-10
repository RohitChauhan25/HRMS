import styled from 'styled-components'

export const ChangePasswordWrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 30px;
  min-height: 66vh;
  overflow-x: hidden;
  width: 100%;
  margin: 20px 60px;
`
export const ChangePasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`
export const TitleWrapper = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #1d1d1d;
`
export const PasswordWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 600px;
  width: 100%;
`
export const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
export const FieldTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #1d1d1d;
`
export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 59px;
  position: relative;
  svg {
    height: 18px;
    position: absolute;
    right: 10px;
    top: 14px;
  }
`
export const ErrorMessage = styled.p`
  color: #f40012;
  font-size: 12px;
  font-weight: 400;
`
