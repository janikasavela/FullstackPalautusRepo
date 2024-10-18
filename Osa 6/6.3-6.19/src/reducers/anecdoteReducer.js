import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../../services/anecdotes'

/* const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
] */

/* const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
} */

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
    },
    appendAnectode(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

//action creators
export const { addVote, appendAnectode, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnectode(newAnecdote))
  }
}

export const updateAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState().anecdotes
    const anecdoteToUpdate = state.find((anecdote) => anecdote.id === id)
    if (anecdoteToUpdate) {
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      }
      const response = await anecdoteService.updateAnecdote(id, updatedAnecdote)

      dispatch(
        setAnecdotes(
          state.map((anecdote) => (anecdote.id !== id ? anecdote : response))
        )
      )
    }
  }
}

//reducer
export default anecdoteSlice.reducer
