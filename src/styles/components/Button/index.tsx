import styled from 'styled-components'

interface IStyledButton {
  variant?: 'contained' | 'text' | 'outline'
}

const getButtonStyles = ({ variant }: IStyledButton) => {
  switch (variant) {
    case 'contained':
      return `
      background: #1d2e88;
      color: #ffffff;
      border: none;
      `
    case 'outline':
      return `
      background:transparent;
      color: #1D2E88;
      border: 2px solid #1D2E88
      `
    case 'text':
      return `
      background: #E8E8E8;
      color: none;
      border: none;
      `
    default:
      return `
      background: #1d2e88;
      color: #ffffff;
      border: none;
  `
  }
}

export const StyledButton = styled.button<IStyledButton>`
  ${({ variant }) => getButtonStyles({ variant })};
  width: 100%;
  height: 48px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;

  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
