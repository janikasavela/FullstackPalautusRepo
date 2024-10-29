import { Routes, Route, Link } from 'react-router-dom';
import Show from './Show';
import Add from './Add';
import Users from '../views/Users';
import UserDetails from './UserDetails';
import BlogDetails from './BlogDetails';

const Menu = ({ users, handleNewBlog, blogs }) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>

      <Routes>
        <Route path="/" element={<Show blogs={blogs} />} />
        <Route path="/:id" element={<BlogDetails blogs={blogs} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<UserDetails users={users} />} />
        <Route path="/create" element={<Add handleNewBlog={handleNewBlog} />} />
      </Routes>
    </div>
  );
};

export default Menu;
