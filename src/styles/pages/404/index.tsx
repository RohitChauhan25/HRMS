import styled from 'styled-components'

export const Container = styled.div`
  background: #f3f5ff;
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const ButtonContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  @media (max-width: 768px) {
    max-width: 300px;
  }
`
export const ImageContainer = styled.div`
  width: 100%;
  margin: 100px auto 0 auto;
  text-align: center;
  img {
    max-width: 600px;
    @media (max-width: 768px) {
      max-width: 350px;
    }
  }
`
