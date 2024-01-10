import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 1068px) {
    flex-direction: column;
  }
`
export const InfoRightSection = styled.div`
  display: grid;
  min-width: 340px;
  margin-right: 30px;
  @media (max-width: 1068px) {
    width: 100%;
  }
`
export const PdfContainer = styled.div`
  margin-top: 30px;
  width: 100%;
`

export const DetailsWrapper = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #8896e1;
  :last-child {
    border: none;
  }
`
export const TitleLabel = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #686868;
`
export const DetailsText = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #1d1d1d;
`
export const Rating = styled.div`
  margin: 12px 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #686868;
`
