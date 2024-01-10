import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutOutlined } from '@ant-design/icons'
import useGet from 'hooks/useGet'
import { AddPermission, AddPermissionEndPoint } from 'store/slice/JobStepper'
import { resetAllState } from 'store/slice/resetState'
import { setActiveColor } from 'store/slice/colorSlice'
import { updateMenu, updateUser } from 'store/slice/user'
import { LoginRoute } from 'constants/routes'
import dynamicThemeData from 'constants/dynamicThemeData'
import { Sidebardata } from 'components/Sidebar/data'
import { IData, IMenu, ISidebar } from 'interfaces'
import CollapseIcon from 'assets/svg/CollapseIcon'
import {
  BasicLinks,
  BasicLinksContainer,
  BasicLinksWrap,
  Category,
  CollapseIconWrapper,
  Collapse,
  CollapseTitle,
  Container,
  DataWrapper,
  Icon,
  Title,
  Wrapper,
} from 'styles/components/Sidebar'

const Sidebar = () => {
  const location = useLocation()
  const navigation = useNavigate()
  const dispatch = useDispatch<any>()
  const [masterData, setMasterData] = useState<any>([])
  const [orgenizationData, setOrgenizationData] = useState<any>([])
  const [isOpen, setIsopen] = useState(false)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const { data: getMaster, refetch: refetchRole } = useGet('auth-rolee', `/auth/user/profile`, {
    token: true,
  })

  useEffect(() => {
    refetchRole()
  }, [])

  useEffect(() => {
    const filteredTheme: any = dynamicThemeData?.find((item: any) => item?.name === getMaster?.theme)
    dispatch(setActiveColor(filteredTheme?.code))
  }, [getMaster])

  useEffect(() => {
    const permitedMaster: (string | undefined)[] = []
    const permitedOrganization: (string | undefined)[] = []
    const per: (string | undefined)[] = []
    const PermissionEndpoint: any = {}

    if (getMaster?.roles?.length > 0) {
      dispatch(
        updateUser({
          Role: getMaster?.roles[0].roleName,
          email: getMaster?.email,
          userName: getMaster?.userName,
        }),
      )
    }

    if (getMaster?.menus?.length > 0) {
      dispatch(updateMenu(getMaster?.menus))

      if (getMaster?.menus?.length > 0) {
        getMaster?.menus?.map((item: IMenu) => {
          PermissionEndpoint[`${item.endpoint}`] = item.permissions // Add endpoint and releted permissions
          if (item?.master && (item?.permissions?.includes('CREATE') || item?.permissions?.includes('DELETE'))) {
            permitedMaster.push(item?.resource) // Add only permited master data for sidebar
          }

          if (
            (item.resource === 'auth' && item.permissions?.includes('CREATE')) ||
            (item.resource === 'role' && item.permissions?.includes('CREATE'))
          ) {
            permitedOrganization.push(item.resource) // Add only permited Organization data for sidebar
          }
        })

        getMaster?.menus?.map((item: IMenu) => {
          if (item?.permissions?.includes('CREATE') || item?.permissions?.includes('DELETE')) {
            per.push(item?.resource)
          }
        })

        dispatch(AddPermission(per))
        dispatch(AddPermissionEndPoint(PermissionEndpoint))
        setMasterData(permitedMaster)
        setOrgenizationData(permitedOrganization)
      }
    }
  }, [getMaster])

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true)
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1050) {
        setIsopen(true)
      } else {
        setIsopen(false)
      }
    }

    if (window.innerWidth <= 1050) {
      setIsopen(true)
    } else {
      setIsopen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const logOut = () => {
    localStorage.clear()
    dispatch(resetAllState())
    navigation(LoginRoute.path)
  }

  return (
    <Container>
      <Wrapper className={`sidebar ${isOpen == true ? 'collapsed' : ''}`} color={activeColor}>
        <Collapse onClick={ToggleSidebar} className={`sidebar ${isOpen ? 'collapsed' : ''}`} color={activeColor}>
          <DataWrapper className="collapsed" color={activeColor}>
            <CollapseIconWrapper className={`sidebar ${isOpen ? 'collapsed' : ''}`} color={activeColor}>
              <CollapseIcon className="collapseIcon" />
            </CollapseIconWrapper>
            <CollapseTitle color={activeColor} className="title">
              Collapse
            </CollapseTitle>
          </DataWrapper>
        </Collapse>

        <BasicLinksContainer>
          {Sidebardata?.length &&
            Sidebardata?.map((item: ISidebar, id: number) => {
              if (item?.category === 'Master') {
                return (
                  <BasicLinksWrap key={id}>
                    <Category color={activeColor} className="title">
                      {masterData?.length > 0 && item?.category}
                    </Category>
                    <BasicLinks>
                      {item?.data?.length &&
                        item?.data?.map((subItem: IData, key: number) => {
                          if (masterData?.includes(subItem.value)) {
                            return (
                              <DataWrapper
                                key={key}
                                color={activeColor}
                                className={
                                  location.pathname?.includes(subItem?.url) ? 'active collapsed' : ' collapsed'
                                }
                                onClick={() => subItem?.url && navigation(subItem?.url)}
                              >
                                <Icon className="icon">{subItem?.icon}</Icon>
                                <Title className="title">{subItem?.title}</Title>
                              </DataWrapper>
                            )
                          }
                        })}
                    </BasicLinks>
                  </BasicLinksWrap>
                )
              } else if (item.category == 'Organization') {
                return (
                  orgenizationData?.length > 0 && (
                    <BasicLinksWrap key={id}>
                      <Category color={activeColor} className="title">
                        {item?.category}
                      </Category>
                      <BasicLinks>
                        {item?.data?.length &&
                          item?.data?.map((subItem: IData, key: number) => (
                            <DataWrapper
                              key={key}
                              color={activeColor}
                              className={location.pathname?.includes(subItem?.url) ? 'active collapsed' : ' collapsed'}
                              onClick={() => subItem?.url && navigation(subItem?.url)}
                            >
                              <Icon className="icon">{subItem?.icon}</Icon>
                              <Title className="title">{subItem?.title}</Title>
                            </DataWrapper>
                          ))}
                      </BasicLinks>
                    </BasicLinksWrap>
                  )
                )
              } else {
                return (
                  <BasicLinksWrap key={id}>
                    <Category color={activeColor} className="title">
                      {item?.category}
                    </Category>
                    <BasicLinks>
                      {item?.data?.length &&
                        item?.data?.map((subItem: IData, key: number) => (
                          <DataWrapper
                            key={key}
                            color={activeColor}
                            className={location.pathname?.includes(subItem?.url) ? 'active collapsed' : ' collapsed'}
                            onClick={() => subItem?.url && navigation(subItem?.url)}
                          >
                            <Icon className="icon">{subItem?.icon}</Icon>
                            <Title className="title">{subItem?.title}</Title>
                          </DataWrapper>
                        ))}
                    </BasicLinks>
                  </BasicLinksWrap>
                )
              }
            })}
          <DataWrapper
            color={activeColor}
            className="collapsed"
            onClick={() => {
              logOut()
            }}
          >
            <Icon>
              <LogoutOutlined style={{ color: '#fff' }} />
            </Icon>
            <Title className="title"> LogOut</Title>
          </DataWrapper>
        </BasicLinksContainer>
      </Wrapper>
    </Container>
  )
}

export default Sidebar
