import { useParams } from 'react-router-dom';

const UserDetail = ({ users }) => {
  const { id } = useParams();
  const user = users.find((user) => user.id === id);

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Blogs created:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
