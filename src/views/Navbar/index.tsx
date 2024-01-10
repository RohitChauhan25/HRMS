// import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import { Avatar, Popover, notification } from 'antd'
import { EditOutlined, LogoutOutlined } from '@ant-design/icons'
import { resetAllState } from 'store/slice/resetState'
import { setActiveColor } from 'store/slice/colorSlice'
import usePatch from 'hooks/usePatch'
import { ChangePasswordRoute, LoginRoute, ProfileDetailRoute } from 'constants/routes'
import AvatarImage from 'assets/images/Avatar.png'
// import BellIcon from 'assets/svg/BellIcon'
import DownIcon from 'assets/svg/DownArrowIcon'
import CandidatesNumberIcon from 'assets/svg/CandidatesNumberIcon'
import Wits from 'assets/images/logoLogin.png'
import {
  NavbarContainer,
  LogoSection,
  LeftSection,
  RightSection,
  UserSection,
  ProfileSection,
  UserRole,
  Username,
  ContentContainer,
  ContentWrapper,
  ContentTitle,
  ColorWrapper,
  ColorButton,
} from 'styles/views/Navbar'

const Navbar = () => {
  const userData = useSelector((state: any) => state.user?.user)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const dispatch = useDispatch<any>()
  const navigate = useNavigate()
  const { mutateAsync } = usePatch()

  const handleColorChange = async (color: any, name: any) => {
    const payload = {
      theme: name,
    }

    try {
      const res = await mutateAsync({
        url: `auth/user/theme`,
        payload: payload,
        token: true,
      })
      if (res?.message === 'Theme is updated.') {
        dispatch(setActiveColor(color))
        notification.success({
          message: '',
          description: res?.message,
        })
      }
    } catch (error: any) {
      notification.error({
        message: '',
        description: 'Could Not Update Theme.',
        duration: 2,
      })
      return {
        error: error?.response?.data?.message,
      }
    }
  }

  const logOut = () => {
    localStorage.clear()
    dispatch(resetAllState())
    window.location.reload()
    navigate(LoginRoute?.path)
  }

  const content = (
    <ContentContainer>
      <ContentWrapper>
        <CandidatesNumberIcon />
        <ContentTitle
          onClick={() => {
            navigate(ProfileDetailRoute?.path)
            window.location.reload()
          }}
        >
          <NavLink to={`${ProfileDetailRoute?.path}`}>Profile</NavLink>
        </ContentTitle>
      </ContentWrapper>

      <ContentWrapper>
        <EditOutlined />
        <ContentTitle>
          <NavLink to={`${ChangePasswordRoute?.path}`}>Change Password</NavLink>
        </ContentTitle>
      </ContentWrapper>

      <ContentWrapper>
        <LogoutOutlined />
        <ContentTitle onClick={logOut}>Logout</ContentTitle>
      </ContentWrapper>

      <ContentWrapper className="navbarSection">
        <ColorWrapper>
          <ColorButton
            onClick={() => handleColorChange('#B2416E', 'PINK')}
            className="FirstColor"
            activeColor={activeColor === '#B2416E' ? activeColor : null}
          ></ColorButton>
          <ColorButton
            onClick={() => handleColorChange('#419E6A', 'GREEN')}
            className="SecondColor"
            activeColor={activeColor === '#419E6A' ? activeColor : null}
          ></ColorButton>
          <ColorButton
            onClick={() => handleColorChange('#1D2E88', 'BLUE')}
            className="DefaultColor"
            activeColor={activeColor === '#1D2E88' ? activeColor : null}
          ></ColorButton>
        </ColorWrapper>
      </ContentWrapper>
    </ContentContainer>
  )
  return (
    <NavbarContainer>
      <LeftSection>
        <LogoSection>
          <img src={Wits} alt="logo" />
        </LogoSection>
      </LeftSection>
      <RightSection>
        <UserSection>
          {/* <BellIcon /> */}
          <Popover placement="bottomRight" content={content} trigger="click">
            <ProfileSection>
              <Username>
                Welcome {userData?.userName}
                <UserRole>
                  {userData?.role?.roleName === 'superadmin'
                    ? 'Super Admin'
                    : userData?.role?.roleName === 'teammember'
                    ? 'Team Member'
                    : userData?.role?.roleName}
                </UserRole>
              </Username>
              <DownIcon />
              <Avatar src={<img src={AvatarImage} alt="avatar" />} />
            </ProfileSection>
          </Popover>
        </UserSection>
      </RightSection>
    </NavbarContainer>
  )
}

export default Navbar
