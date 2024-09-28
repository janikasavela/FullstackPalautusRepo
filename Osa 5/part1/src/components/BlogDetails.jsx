import { useState } from 'react'
import noteService from '../services/blogs'

const BlogDetails = ({
  blog,
  user,
  setMessage,
  setMessageClass,
  setBlogs,
  blogs,
}) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    noteService
      .update(blog.id, { likes: blog.likes + 1 })
      .then(setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b))))
      .catch((error) => {
        setMessageClass('error')
        setMessage('Error occured when updating data. ERROR: ' + error)
        setTimeout(() => {
          setMessage('')
          setMessageClass('notification')
        }, 5000)
      })
  }

  function handleDelete() {
    if (window.confirm(`Delete ${blog.title} ?`)) {
      noteService
        .deleteBlog(blog.id)
        .then(setBlogs(blogs.filter((b) => b.id !== blog.id)))
        .catch((error) => {
          setMessageClass('error')
          setMessage('Error occured when deleting data. ERROR: ' + error)
          setTimeout(() => {
            setMessage('')
            setMessageClass('notification')
          }, 5000)
        })
    }
  }

  return (
    <div>
      <span>
        "{blog.title}"" by {blog.author}{' '}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </span>
      {showDetails && (
        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
          <p>URL: {blog.url}</p>
          <p>
            Likes: {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>Added by: {blog.user ? blog.user.username : 'Unknown'}</p>
          <p></p>
        </div>
      )}

      {user.username === blog.user?.username && (
        <button onClick={handleDelete}>delete</button>
      )}
    </div>
  )
}

export default BlogDetails
