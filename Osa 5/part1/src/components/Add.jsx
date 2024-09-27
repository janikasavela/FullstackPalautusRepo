import noteService from '../services/blogs'
import { useState } from 'react'

const Add = ({ setMessage, setMessageClass, setBlogs, setAddVisible }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = { title: newTitle, author: newAuthor, url: newUrl }

    /*   if (blogs.filter((obj) => obj.title === newTitle).length > 0) {
      if (
        window.confirm(
          `${newTitle} is already added, replace the old blog post with a new one?`
        )
      ) {
        const id = blogs.find((blog) => blog.title === newTitle).id
  
        noteService
          .update(id, newBlog)
          .then((res) => {
            setBlogs((prevblogs) =>
              prevblogs.map((blog) => (blog.id !== res.id ? blog : res))
            )
            setMessage(`${newBlog.title}'s informations updated`)
          })
          .catch((error) => {
            setMessageClass('error')
            setMessage('Error occured when updating data. ERROR: ' + error)
            setTimeout(() => {
              setMessage('')
              setMessageClass('notification')
            }, 5000)
          })
      }
    } else { */
    noteService
      .create(newBlog)
      .then((res) => {
        setBlogs((oldBlogs) => [...oldBlogs, res])
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
          type='text'
          value={newTitle}
          placeholder='add title'
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={newAuthor}
          placeholder='add author'
          onChange={(e) => setNewAuthor(e.target.value)}
        />
      </div>
      <div>
        url:
        <input
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
