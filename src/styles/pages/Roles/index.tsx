import styled from 'styled-components'

export const StructureContainer = styled.div`
  background: #f3f5ff;
  min-height: 100vh;
  overflow-x: hidden;
  width: 100%;
`
export const ContentWrapper = styled.div`
  margin: 20px 60px;
`
export const HeadSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px 0;
  button {
    width: 150px;
  }
`
export const Title = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #1d1d1d;
`
export const RolesListContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 30px;
  @media (max-width: 1300px) {
    overflow-x: auto;
  }
`
