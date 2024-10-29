import { Link } from 'react-router-dom';

const User = ({ user }) => {
  return (
    <tr>
      <td style={{ padding: '8px', textAlign: 'left' }}>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
      </td>
      <td style={{ padding: '8px', textAlign: 'center' }}>
        {user.blogs.length}
      </td>
    </tr>
  );
};

export default User;
