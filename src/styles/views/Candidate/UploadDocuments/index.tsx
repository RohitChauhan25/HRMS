import styled from 'styled-components'

export const MainContainer = styled.div`
  gap: 70px;
  width: 100%;
  @media (max-width: 1068px) {
    flex-direction: column;
    gap: 20px;
  }
`
export const Header = styled.div`
  background: rgb(29, 46, 136);
  color: rgb(255, 255, 255);
  display: flex;
  -webkit-box-pack: center;
  justify-content: flex-start;

  padding: 36px;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 10px;
  font-size: 34px;
  font-weight: 600;
`

export const FirstSection = styled.div`
  padding: 43px 0 12px 0;
  font-size: 14px;
  font-weight: 600;
`
export const SecondSection = styled.div`
  display: flex;
  border: 1px dotted rgb(0, 0, 0);
  padding: 32px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  border-radius: 10px;
`
export const ThirdSection = styled.div``
export const Buttons = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  gap: 20px;
  width: 100%;

  margin: 48px 18px -3px auto;
  padding-bottom: 20px;
  justify-content: center;
  text-align: center;
`
export const FourthSection = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 38px;
`
export const FifthSection = styled.div`
  color: #b9b9b9;
  font-size: 12px;
  font-weight: 400;
`
export const SixthSection = styled.div``
