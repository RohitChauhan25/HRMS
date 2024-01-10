import styled from 'styled-components'

export const MainContainer = styled.div`
  width: 100%;
`
export const AddTeam = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
`
export const Note = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #4a4a4a;
  max-width: 500px;
  margin: 10px auto;
`
export const ImageContainer = styled.div`
  text-align: center;
  margin: 20px 0;
  img {
    width: 100%;
    max-width: 440px;
    margin: 0 auto;
  }
`
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  width: 100%;
  max-width: 700px;
  margin: 30px auto;
`
export const TableContainer = styled.div`
  a {
    font-weight: 600;
    font-size: 14px;
    color: #1d1d1d !important;
  }
`
export const TabeleHeadSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`
export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #1d1d1d;
  width: 100%;
`
export const HeadButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  justify-content: flex-end;
  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
export const AddMember = styled.div`
  background: #1d2e88;
  border-radius: 8px;
  width: 100%;
  max-width: 150px;
  padding: 17px;
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
`
export const HrTag = styled.div`
  padding: 6px 12px;
  width: max-content;
  background: #ffffff;
  border: 2px solid #bcc6fc;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  color: #1d2e88;
  text-align: center;
`
export const DepartmentTag = styled.div`
  padding: 6px 12px;
  width: max-content;
  background: #ffffff;
  border: 2px solid #f9c51c;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  color: #f9c51c;
  text-align: center;
`
export const Delete = styled.button`
  background: #ffffff;
  border: 2px solid #d83232;
  border-radius: 8px;
  width: 100%;
  max-width: 130px;
  padding: 15px;
  display: flex;
  font-weight: 600;
  gap: 10px;
  align-items: center;
  justify-content: center;
  color: #d83232;
  :hover {
    cursor: pointer;
  }

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg > path {
    fill: rgb(216, 50, 50);
  }
`
