import { useSelector } from 'react-redux'
// import SearchInput from 'components/SearchInput'
import ResourcesData from 'views/Structure/Resources/Resources'
// import SearchIcon from 'assets/svg/SearchIcon'
import { RolesWrapper, TableWrapper, TitleSection, WrapperTitle } from 'styles/views/Structure'

const ResourcesTables = () => {
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  return (
    <RolesWrapper>
      <TitleSection>
        <WrapperTitle>View Resources</WrapperTitle>
        {/* <SearchSection>
          <SearchFilterWrapper>
            <SearchInput placeholder="Search" prefix={<SearchIcon />} />
          </SearchFilterWrapper>
        </SearchSection> */}
      </TitleSection>
      <TableWrapper color={activeColor}>
        <ResourcesData />
      </TableWrapper>
    </RolesWrapper>
  )
}

export default ResourcesTables
