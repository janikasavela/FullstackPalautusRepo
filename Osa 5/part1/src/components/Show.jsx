const Show = ({ blogs }) => {
  return (
    <>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <span>
            {blog.title} {blog.author}{' '}
          </span>
        </div>
      ))}
    </>
  )
}

export default Show
