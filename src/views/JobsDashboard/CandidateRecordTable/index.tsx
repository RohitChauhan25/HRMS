import { useState } from 'react'
import { useSelector } from 'react-redux'
import { AddCandidate } from 'constants/labels'
import Button from 'components/Button'
import SearchInput from 'components/SearchInput'
import Modal from 'components/Modal'
import CandidateList from 'views/JobsDashboard/CandidateRecordTable/candidateList'
import AddCandidateModal from 'views/Modals/AddCandidateModal'
import FilterIcon from 'assets/svg/FilterIcon'
import SearchIcon from 'assets/svg/SearchIcon'
import { CandidateDetailWrapper, HeadSection, TitleWrapper, RightSection } from 'styles/views/Jobs/CandidateRecord'
import { TableWrapper } from 'styles/views/Employees'

const CandidateTable = () => {
  const [searchedValue, setSearchedValue] = useState('')
  const [addCandidateModal, setAddCandidateModal] = useState(false)
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)

  return (
    <CandidateDetailWrapper>
      <HeadSection>
        <TitleWrapper>Candidates</TitleWrapper>
        <RightSection>
          <SearchInput
            placeholder="Search Jobs"
            prefix={<SearchIcon />}
            onChange={(e) => {
              setSearchedValue(e.target.value)
            }}
          />
          <Button label="Filter" variant="text" className="filter-button">
            <FilterIcon />
          </Button>
          <Button
            label={AddCandidate}
            variant="contained"
            type="submit"
            onClick={() => setAddCandidateModal(true)}
            style={{ backgroundColor: activeColor }}
          />
        </RightSection>
      </HeadSection>
      <TableWrapper color={activeColor}>
        <CandidateList searchedValue={searchedValue} />
      </TableWrapper>
      <Modal isOpen={addCandidateModal} hideModal={() => setAddCandidateModal(false)}>
        <AddCandidateModal showModal={(value: boolean) => setAddCandidateModal(value)} />
      </Modal>
    </CandidateDetailWrapper>
  )
}

export default CandidateTable
