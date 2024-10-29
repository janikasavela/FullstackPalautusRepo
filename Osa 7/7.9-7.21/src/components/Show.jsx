import { Link } from 'react-router-dom';

const Show = ({ blogs }) => {
  const sortedBlogs = blogs?.sort((a, b) => b.likes - a.likes) || [];

  return (
    <>
      <h2>Blogs</h2>
      {sortedBlogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/${blog.id}`}>{blog.title}</Link> by {blog.author}
        </div>
      ))}
    </>
  );
};

export default Show;
