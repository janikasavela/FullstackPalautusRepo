import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/requests'
import { useNotification } from '../reducers/NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [_, showNoticationWithTimeout] = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNoticationWithTimeout(
        `A new anecdote was created: '${newAnecdote.content}'`,
        5000
      )
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
