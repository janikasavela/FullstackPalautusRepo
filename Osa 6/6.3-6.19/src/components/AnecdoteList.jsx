import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateAnecdote(anecdote.id))
    dispatch(showNotification(`You voted '${anecdote.content}'`, 5))
  }
  const sortedAnectodes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <>
      {sortedAnectodes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
