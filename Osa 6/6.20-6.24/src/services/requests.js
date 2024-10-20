import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data)

export const createAnecdote = (newAnecdote) =>
  axios
    .post(baseUrl, newAnecdote)
    .then((res) => res.data)
    .catch((error) => {
      console.error(
        'Error posting anecdote:',
        error.response ? error.response.data : error.message
      )
    })

export const updateAnecdote = (updatedAnectode) =>
  axios
    .put(`${baseUrl}/${updatedAnectode.id}`, updatedAnectode)
    .then((res) => res.data)
