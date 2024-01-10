import styled from 'styled-components'

export const ProfileContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 30px;
  min-height: 66vh;
  overflow-x: hidden;
  width: 100%;
  margin: 20px 60px;
`
export const ProfileDetailWrapper = styled.form`
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
export const DetailWrapper = styled.div`
  display: grid;
  /* grid-template-columns: repeat(2, 500px); */
  gap: 20px;

  .fceDlU .ant-input-disabled {
    background-color: rgba(0, 0, 0, 0.04) !important;
  }
  input {
    max-width: 500px;
    width: 100%;
  }
  @media (max-width: 1400px) {
    display: flex;
    flex-direction: column;
  }
`
export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
export const Heading = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #1d1d1d;
`
export const ProfileButttonwrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 25px;
  button {
    max-width: 238px;
  }
`
