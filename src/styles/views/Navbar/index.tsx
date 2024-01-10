import styled from 'styled-components'

interface IProps {
  activeColor?: string
}

export const NavbarContainer = styled.div`
  padding: 10px;
  background: ${({ theme }) => theme.WHITE};
  display: flex;
`
export const LeftSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 0 30px;
`
export const LogoSection = styled.div`
  img {
    height: 60px;
  }
`
export const NameSection = styled.div`
  display: grid;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
`
export const User = styled.div`
  font-weight: 400;
  font-size: 18px;
`
export const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding: 0 40px 0 20px;

  .ant-input-affix-wrapper-focused {
    border: 1px solid #b9b9b9 !important;
    box-shadow: none;
  }
  .ant-input-affix-wrapper {
    padding: 0 3px 0 5px !important;
  }
  .ant-input-prefix {
    height: 44px;
  }
`

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: space-between;
`
export const UserRole = styled.div`
  font-size: 10px;
  color: #686868;
  margin-top: 5px;
  text-transform: capitalize;
`
export const Username = styled.div`
  font-size: 14px;
  font-weight: bold;
  div::first-letter {
    text-transform: uppercase;
  }
`
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 20px;
  gap: 5px;
  a.active {
    color: #f9c51c;
  }
  a {
    color: #1d1d1d;
  }
  svg {
    width: 15px;
    height: 15px;
    path {
      fill: #1d1d1d;
    }
  }
  .navbarSection {
    border-top: 1px solid #8896e1;
    padding-top: 15px;
  }
`
export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px;
  svg {
    width: 15px;
    height: 15px;
  }
  :hover {
    background-color: #fff;
    color: #1d1d1d;
  }
`

export const ContentTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
  text-align: start;
`
export const ColorWrapper = styled.div`
  display: flex;
  gap: 10px;
  border-radius: 10px;
  text-align: start;
  .FirstColor {
    background-color: #b2416e;
  }
  .SecondColor {
    background-color: #419e6a;
  }
  .DefaultColor {
    background-color: #1d2e88;
  }
`
export const ColorButton = styled.button<IProps>`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 6px;
  border: 2px solid ${(props) => (props.activeColor ? '#f9c51c' : 'transparent')};
  scale: ${(props) => (props.activeColor ? '1.2' : null)};
`
