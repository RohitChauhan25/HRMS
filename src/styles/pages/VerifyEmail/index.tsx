import styled from 'styled-components'

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 60px;
`
export const Logo = styled.img``

export const FormContainer = styled.div`
  width: 50%;
  @media (max-width: 1068px) {
    width: 100%;
  }
`
export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  height: calc(100vh - 270px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: flex-start;
  align-items: center;
  padding-top: 70px;
  @media (max-height: 650px) {
    padding-top: 20px;
  }
`
export const ContentTitle = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #1d1d1d;
`
export const ContentDescription = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #4a4a4a;
`
export const ImageContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #1d2e88;
  width: 50%;
  @media (max-width: 1068px) {
    display: none;
  }
`
export const Back = styled.div`
  width: 100%;
  max-width: 90px;
  padding: 10px;
  text-align: center;
  border: 2px solid #1d2e88;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  color: #1d2e88;
  svg {
    transform: rotate(90deg);
    margin-right: 10px;
    fill: #1d2e88;
  }
`
