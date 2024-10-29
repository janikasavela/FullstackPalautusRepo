import User from '../components/User';

const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px' }}>Username</th>
            <th style={{ textAlign: 'right', padding: '8px' }}>
              Blogs Created
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
