import styled from 'styled-components'

export const ExploreCareerContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f3f5ff;
`

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4.028vw;
  align-items: center;
  margin-left: 10vw;
  margin-right: 9.861vw;

  @media (max-width: 767px) {
    margin: 0 5.556vw;
    flex-direction: column;
    gap: 6.111vw;
    .revealRight.active {
      display: flex;
      gap: 2.778vw;
      width: 100%;
      svg {
        width: 5.278vw;
        height: 5.278vw;
      }
    }
  }
`
export const ProcessContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 57.292vw;
  margin-top: 20px;
  @media (max-width: 767px) {
    width: 100%;
  }
`
export const ProcessTitle = styled.h2`
  font-weight: 700;
  font-size: 2.778vw;
  line-height: 3.333vw;
  color: #1d1d1d;
  z-index: 1;
  text-transform: capitalize;
  @media (max-width: 767px) {
    font-size: 8.889vw;
    line-height: 11.111vw;
  }
`
export const ProcessDescription = styled.h4`
  font-weight: 700;
  font-size: 1.25vw;
  line-height: 1.667vw;
  color: #282828;
  margin-top: 1.111vw;

  @media (max-width: 767px) {
    font-size: 4.167vw;
    line-height: 6.111vw;
    max-width: 87%;
  }
`
export const ProcessText = styled.h5`
  font-weight: 500;
  font-size: 1.042vw;
  line-height: 1.667vw;
  color: #828282;
  @media (max-width: 767px) {
    font-size: 3.333vw;
    line-height: 8.333vw;
  }
`

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  padding: 2.222vw 3.472vw;
  background: #ffffff;
  margin-bottom: 1.806vw;
  align-items: center;
  border-radius: 0.833vw;
  button {
    width: 10.972vw;
    height: 3.611vw;
    font-size: 1.042vw;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 9.722vw 8.056vw;
    gap: 5.278vw;
    margin-bottom: 6.111vw;
    border-radius: 3.333vw;
    button {
      width: 35vw;
      height: 12.5vw;
      border-radius: 2.222vw;
      font-size: 4.167vw;
      line-height: 6.667vw;
    }
  }
`
export const JobType = styled.div`
  display: grid;
  align-items: center;
  max-width: 100%;
  width: 100%;
  @media (max-width: 767px) {
    width: 100%;
  }
`
export const Location = styled.h5`
  font-weight: 500;
  font-size: 1.042vw;
  line-height: 1.667vw;
  color: #828282;
  @media (max-width: 767px) {
    font-size: 4.167vw;
    line-height: 6.667vw;
  }
`
export const Profile = styled.h2`
  font-weight: 700;
  font-size: 1.667vw;
  line-height: 2.222vw;
  color: #1d1d1d;
  @media (max-width: 767px) {
    font-size: 5.556vw;
    line-height: 8.889vw;
  }
`
export const Experience = styled.p`
  font-weight: 700;
  font-size: 1.25vw;
  line-height: 1.667vw;
  color: #282828;
  @media (max-width: 767px) {
    font-size: 4.167vw;
    line-height: 5.556vw;
  }
`
export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.694vw;
  width: 100%;
  button {
    width: 10.903vw;
    min-height: 3.056vw;
    font-weight: 600;
    font-size: 1.042vw;
    line-height: 1.389vw;
    transition: all 0.8s, color 0.3s 0.1s;

    :hover {
      box-shadow: 0 -150px 0 0 #d3a305 inset;
      color: #ffffff;
    }
  }
  @media (max-width: 767px) {
    margin-top: 2.278vw;
    justify-content: flex-start;
    button {
      width: 35vw;
      min-height: 13.333vw;
      border-radius: 2.222vw;
      font-size: 4.167vw;
      line-height: 5.556vw;
    }
  }
`
export const JobProfiles = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.389vw;
  width: 100%;
  max-width: 70vw;
  /* margin: 0 auto; */
  padding: 2.431vw 10vw 0;
  @media (max-width: 767px) {
    padding: 11.944vw 5.556vw 0;
  }
`

export const UploadWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  justify-items: center;
  text-align: center;
  background: #ffffff;
  margin: 0 10vw;
  width: calc(100% - 20vw);
  padding: 3.333vw 2vw;
  border-radius: 0.833vw;
  @media (max-width: 767px) {
    width: calc(100% - 11.111vw);
    margin: 0 auto;
    padding: 15.833vw 3.944vw;
    gap: 1.667vw;
    border-radius: 3.333vw;
  }
`

export const NoJobWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  justify-items: center;
  margin-bottom: 3.75vw;
  svg {
    width: 40.278vw;
    height: 24.444vw;
  }
  h5 {
    font-weight: 700;
    font-size: 2.222vw;
    line-height: 2.778vw;
  }
  @media (max-width: 767px) {
    margin-bottom: 8.611vw;
    svg {
      width: 88.889vw;
      height: 71.944vw;
    }
    h5 {
      font-size: 8.889vw;
      line-height: 11.111vw;
    }
  }
`

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;

  .ant-pagination .ant-pagination-item-active {
    background-color: #1d2e88;
  }

  .ant-pagination .ant-pagination-item-active a {
    color: #fff;
  }

  .ant-pagination .ant-pagination-item {
    min-width: 40px;
    height: 40px;
    line-height: 38px;
  }
`
