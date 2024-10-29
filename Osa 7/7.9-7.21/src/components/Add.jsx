import { useState } from 'react'
import { useNotification } from '../contexts/NotificationContext'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import noteService from '../services/blogs'

const Add = ({ setAddVisible, user }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const { dispatch } = useNotification()

  const queryClient = useQueryClient() // Hanki queryClient tänne

  const newBlogMutation = useMutation({
    mutationFn: noteService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })

      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `${newBlog.title} was added successfully`,
          className: 'notification',
        },
      })
      setAddVisible(false)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    },
    onError: (error) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `Error occurred when trying to add a new blog post. ERROR: ${error.message}`,
          className: 'error',
        },
      })
    },
  })

  const addBlog = (e) => {
    e.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    newBlogMutation.mutate(newBlog)

    setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Add a new blog post</h2>
      <div>
        title:
        <input
          data-testid='title'
          type='text'
          value={newTitle}
          placeholder='add title'
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div>
        author:
        <input
          data-testid='author'
          type='text'
          value={newAuthor}
          placeholder='add author'
          onChange={(e) => setNewAuthor(e.target.value)}
        />
      </div>
      <div>
        url:
        <input
          data-testid='url'
          type='text'
          value={newUrl}
          placeholder='give a url'
          onChange={(e) => setNewUrl(e.target.value)}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default Add
