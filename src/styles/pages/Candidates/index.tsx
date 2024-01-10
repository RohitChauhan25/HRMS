import styled from 'styled-components'

export const CandidatesTypesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`
export const AddCandidateButton = styled.div`
  margin-top: 16px;
  min-width: 165px;
  button {
    font-size: 14px;
  }
`
export const CandidateTypeWrapper = styled.div`
  background: #f3f5ff;
  border-radius: 8px;
  width: 100%;
  max-width: 240px;
  padding: 16px;
  display: flex;
  gap: 5px;
  align-items: flex-start;
  justify-content: space-between;
`
export const CandidateType = styled.div`
  display: grid;
  gap: 5px;
`
export const CandidateTypeName = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #1d1d1d;
`
export const CandidateTypeNumber = styled.div`
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  color: #1d1d1d;
`
