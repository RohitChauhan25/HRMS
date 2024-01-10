import { getTabColor } from 'constants/dynamicTheme'
import { TabProps } from 'interfaces'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
`

export const NavWrapper = styled.div`
  background-color: white;
  height: 80px;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-between;
`

export const Img = styled.img`
  width: 156px;
  height: 50px;
  margin-left: 70px;
`
export const VisitSection = styled.button<TabProps>`
  background-color: #ffffff;
  color: ${(props) => getTabColor(props)};
  border-radius: 8px;
  width: 140px;
  height: 35px;
  border: 2px solid ${(props) => getTabColor(props)};
  margin-right: 70px;
  margin-top: 5px;
`

export const ContainerWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f3f5ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f3f5ff;
`
export const ContainseSection = styled.div`
  width: 820px;
  height: 590px;
  margin-top: 100px;
  background-color: white;
  border-radius: 10px;
`
export const ContainerItems = styled.div`
  margin-left: 52px;
  margin-top: 30px;
  /* @media (max-width: 768px) {
    margin-left: 10px;
  } */
`
export const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const MainHeading = styled.div<TabProps>`
  /* max-width: 740px;
  width: 100%;
  height: 101px; */
  background-color: ${(props) => getTabColor(props)};
  color: rgb(243, 245, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 40px;
  gap: 16px;
`

export const HybridSection = styled.div`
  display: flex;
  gap: 8px;
`
export const H4 = styled.h1`
  margin-left: 48px;
`
export const TextHeading = styled.text`
  font-size: 28px;
  font-weight: 700;
`
export const Form = styled.form``
export const Ratingstar = styled.h4`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
`
interface Props {
  width?: string
}

export const Butttonwrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 25px;
  button {
    max-width: 190px;
  }
`
interface Props {
  background?: string
  color?: string
}
export const Button = styled.button<Props>`
  width: 346px;
  height: 50px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color};
  background-color: ${(props) => (props.background ? props.background : '#1d2e88')};
`
export const JobTitle = styled.text`
  font-size: 20px;
  margin-top: 12px;
`

export const UploadButton = styled.button`
  width: 100%;
  max-width: 457px;
  height: 56px;
  font-weight: 600;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background-color: rgb(232, 232, 232);
  border-radius: 8px;
`

export const ContentSection = styled.div`
  height: auto;
  border-radius: 16px;
  overflow: hidden;
`
