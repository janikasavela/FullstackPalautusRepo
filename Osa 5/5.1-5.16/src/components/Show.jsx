import BlogDetails from './BlogDetails'

const Show = ({ blogs, user, setMessage, setMessageClass, setBlogs }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <>
      <h2>Blogs</h2>
      {sortedBlogs.map((blog) => (
        <BlogDetails
          key={blog.id}
          blog={blog}
          user={user}
          setMessage={setMessage}
          setMessageClass={setMessageClass}
          setBlogs={setBlogs}
          blogs={blogs}
        />
      ))}
    </>
  )
}

export default Show
