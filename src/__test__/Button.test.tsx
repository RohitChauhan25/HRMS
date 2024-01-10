import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Button from 'components/Button'
// import 'jest-styled-components'

describe('testing button', () => {
  test('Sign-in Button', async () => {
    render(<Button type="submit" label="Sign In" variant="contained" />)
    const renderButton = await screen.findByRole('button')
    expect(renderButton).toBeInTheDocument()
    fireEvent.click(screen.getByText('Sign In'))
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  test('Cancel Button for create-job page', async () => {
    render(<Button type="reset" label="Cancel" variant="text" />)
    const renderButton = await screen.findByRole('button')
    expect(renderButton).toBeInTheDocument()
    expect(renderButton).toBeEnabled()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  test('Submit button for the create-job page', async () => {
    render(<Button type="submit" label="Save & Continue" variant="contained" />)
    const renderButton = await screen.findByRole('button')
    expect(renderButton).toBeEnabled()
    expect(renderButton).toBeInTheDocument()
    expect(screen.getByText('Save & Continue')).toBeInTheDocument()
  })
  test('Preview button', async () => {
    const handleClick = jest.fn()
    render(<Button type="button" label="Preview" variant="outline" onClick={handleClick} />)
    fireEvent.click(screen.getByText('Preview'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
