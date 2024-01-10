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
export const VisitSection = styled.button`
  background-color: #ffffff;
  color: #1d2e88;
  border-radius: 8px;
  width: 140px;
  height: 35px;
  border: 2px solid #1d2e88;
  margin-right: 70px;
  margin-top: 5px;
`

export const ContainerWrapper = styled.div`
  width: 100%;
  height: 100vh;

  background-color: #f3f5ff;
  display: flex;
  justify-content: center;
`
export const ContainseSection = styled.div`
  width: 820px;
  height: 480px;
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

export const MainHeading = styled.div`
  width: 820px;
  height: 101px;
  background-color: #1d2e88;
  color: #f3f5ff;
  display: flex;
  align-items: center;
  border-radius: 10px 10px 0 0;
  /* @media (max-width: 768px) {
    width: 420px;
  } */
`
export const H4 = styled.h1`
  margin-left: 48px;
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
  gap: 25px;
  margin-top: 40px;
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
