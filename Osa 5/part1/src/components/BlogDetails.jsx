import { useState } from 'react'

const BlogDetails = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleLike = () => {
    // Implement the like functionality here (e.g., updating the blog's likes)
    console.log(`Liked blog: ${blog.title}`)
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
    </div>
  )
}

export default BlogDetails
