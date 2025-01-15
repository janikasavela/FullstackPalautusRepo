import React from 'react'
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native'
import { SignInContainer } from '../components/SignInContainer'

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const mockOnSubmit = jest.fn()
      render(<SignInContainer onSubmit={mockOnSubmit} />)

      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'testuser')
      fireEvent.changeText(
        screen.getByPlaceholderText('Password'),
        'password123'
      )

      fireEvent.press(screen.getByText('Sign in'))

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1)

        const firstArgument = mockOnSubmit.mock.calls[0][0]

        expect(firstArgument).toEqual({
          username: 'testuser',
          password: 'password123',
        })
      })
    })
  })
})
