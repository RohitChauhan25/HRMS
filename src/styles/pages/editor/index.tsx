import styled from 'styled-components'

export const EditorSection = styled.div`
  width: 100%;
  padding-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f5ff;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const SubjectField = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`
export const Label = styled.label`
  font-weight: 650;
`
export const Input = styled.input`
  width: 1480px;
  border-radius: 5px;
  padding: 14px 9px 12px 9px;
  @media (max-width: 768px) {
    width: 450px;
  }
  @media (max-width: 1024px) {
    max-width: 574px;
  }
  @media (max-width: 1710px) {
    max-width: 655px;
  }
  @media (max-width: 1024px) {
    max-width: 643px;
  }
`
export const EditorContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  .ql-container {
    min-height: 200px;
    max-width: 1520px;
    height: '100%';
    width: '100%';
    background: #fff;
    border-radius: 0 0 10px 10px;
    /* font-family: 'Inter'; */
  }
  .ql-toolbar.ql-snow {
    border-radius: 10px 10px 0 0;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  button {
    max-width: 190px;
  }
`
interface Props {
  background?: string
  color?: string
}
export const Button = styled.button<Props>`
  width: 200px;
  height: 50px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color};
  background-color: ${(props) => (props.background ? props.background : '#1d2e88')};
`
