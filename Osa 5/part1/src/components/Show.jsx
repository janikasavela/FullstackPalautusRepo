import BlogDetails from './BlogDetails'

const Show = ({ blogs }) => {
  return (
    <>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <BlogDetails key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default Show
