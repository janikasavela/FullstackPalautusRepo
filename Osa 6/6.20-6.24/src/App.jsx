import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/requests'
import { useNotification } from './reducers/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const [_, showNoticationWithTimeout] = useNotification()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    console.log('VOTE')
    console.log(anecdote)
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    showNoticationWithTimeout(`You voted for '${anecdote.content}'`, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isPending) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return (
      <div>Error: anecdote service not available due to problems in server</div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
