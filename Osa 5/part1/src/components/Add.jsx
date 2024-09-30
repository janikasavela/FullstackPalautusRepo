import noteService from '../services/blogs'
import { useState } from 'react'

const Add = ({
  setMessage,
  setMessageClass,
  setBlogs,
  setAddVisible,
  user,
}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = { title: newTitle, author: newAuthor, url: newUrl }
    noteService
      .create(newBlog)
      .then((res) => {
        setBlogs((oldBlogs) => [
          ...oldBlogs,
          { ...res, user: { username: user.username } },
        ])
        setMessage(`${newBlog.title} was added succesfully`)
      })
      .catch((error) => {
        setMessageClass('error')
        setMessage(
          'Error occured when trying to add a new blog post. ERROR: ' + error
        )
        setTimeout(() => {
          setMessage('')
          setMessageClass('notification')
        }, 5000)
      })

    setAddVisible(false)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

    setTimeout(() => {
      setMessage('')
    }, 5000)
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
