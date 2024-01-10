import styled from 'styled-components'

export const Container = styled.div`
  background: #f3f5ff;
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
`
export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 10px 100px;
  @media (max-width: 700px) {
    padding: 10px 30px;
  }
`
export const VisitWebsite = styled.div`
  background: #ffffff;
  border: 2px solid #1d2e88;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #1d2e88;
  padding: 10px 16px;
`
export const ContentWrapper = styled.div`
  background: #ffffff;
  border-radius: 0px 0px 16px 16px;
  margin: 80px 15%;
`
export const JobNameWrapper = styled.div`
  background: #1d2e88;
  border-radius: 16px 16px 0px 0px;
  padding: 27px 40px;
`
export const JobTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #ffffff;
`
export const JobTypeDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
`
export const Type = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
`
export const DetailsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 50px;
  padding: 40px;
`
export const ShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  max-width: 350px;
`
export const JobShare = styled.div`
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 12px 0;
  cursor: pointer;
`
export const FormContainer = styled.div`
  padding: 40px;
`
export const FormTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const FormTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #1d1d1d;
`
export const Back = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #1d2e88;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-top: 32px;
`
export const InputLabel = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #1d1d1d;
  margin-top: 30px;
`
export const FileName = styled.div`
  font-size: 16px;
  display: flex;
  color: #1d2e88;
  margin-top: 10px;
`
