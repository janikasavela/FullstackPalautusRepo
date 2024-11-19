import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders todo text', () => {
  const todo = { text: 'Complete Exercise 12.14' }
  render(<Todo todo={todo} />)
  expect(screen.getByText('Complete Exercise 12.14')).toBeInTheDocument()
})
