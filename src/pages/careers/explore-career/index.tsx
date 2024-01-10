import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Pagination as AntPagination } from 'antd'
import useGet from 'hooks/useGet'
import { ApplyNow } from 'constants/labels'
import Button from 'components/Button'
import { IPublishedJob } from 'interfaces'
import logo from 'assets/images/WitsLogo.png'
import { Img, NavWrapper, VisitSection } from 'styles/pages/Feedback'
import {
  ExploreCareerContainer,
  SearchWrapper,
  ProcessContainer,
  ProcessTitle,
  ProcessText,
  ProcessDescription,
  ProfileWrapper,
  JobType,
  JobProfiles,
  ButtonBox,
  Location,
  Profile,
  Experience,
  NoJobWrapper,
  PaginationWrapper,
} from 'styles/pages/ExploreCareer'

const ExploreCareer = () => {
  const [publishedJobData, setPublishedJobData] = useState<any>()
  const activeColor = useSelector((state: any) => state?.colorSlice?.activeColor)
  const navigate = useNavigate()
  const itemsPerPage = 4
  const [currentPage, setCurrentPage] = useState(1)

  const { data: getPublishedJob, refetch: refetchPublishedJob } = useGet('published-job', `job/jobpost/career`, {
    token: false,
  })

  useEffect(() => {
    setPublishedJobData(getPublishedJob)
  }, [getPublishedJob])

  useEffect(() => {
    refetchPublishedJob()
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentJobs = publishedJobData?.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(publishedJobData?.length / itemsPerPage)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <ExploreCareerContainer id="jobExplore">
      <NavWrapper>
        <Img src={logo} alt="witslogo" />
        <VisitSection color={activeColor}>Visit out website</VisitSection>
      </NavWrapper>
      <SearchWrapper>
        <ProcessContainer>
          <ProcessText>Current Openings</ProcessText>
          <ProcessTitle>Join our tribe to celebrate!</ProcessTitle>
          <ProcessDescription>At WIL, we dont just hire you, we hire your future.</ProcessDescription>
        </ProcessContainer>
      </SearchWrapper>

      {/* <motion.div initial={{ translateY: '-20vw', opacity: 0 }} animate={jobFilterController}>
        <JobFilter departmentList={departments || []} onClickTab={onClickTab} selectedTab={selectedTab} />
      </motion.div> */}
      <JobProfiles>
        {currentJobs?.length > 0 ? (
          currentJobs?.map((item: IPublishedJob, index: number) => (
            <motion.div key={`data-${String(index)}`}>
              <ProfileWrapper>
                <JobType>
                  <Location>{item?.department?.name}</Location>
                  <Profile>{item?.jobTitle}</Profile>
                  <Experience>
                    {item?.minExperience?.name}({item?.minExperience?.start}-{item?.minExperience?.end})
                    {item?.minExperience?.type}
                  </Experience>
                </JobType>
                <ButtonBox>
                  <Button label={ApplyNow} variant="contained" onClick={() => navigate(`/job/apply/${item?.id}`)} />
                </ButtonBox>
              </ProfileWrapper>
            </motion.div>
          ))
        ) : (
          <NoJobWrapper>
            <h5> No job Openings</h5>
          </NoJobWrapper>
        )}
        <PaginationWrapper>
          {totalPages > 1 && (
            <AntPagination
              current={currentPage}
              total={publishedJobData.length}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
            />
          )}
        </PaginationWrapper>
      </JobProfiles>
    </ExploreCareerContainer>
  )
}

export default ExploreCareer
