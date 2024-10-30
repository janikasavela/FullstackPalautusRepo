import { Routes, Route, NavLink as BaseNavLink } from 'react-router-dom';
import styled from 'styled-components';
import Show from './Show';
import Add from './Add';
import Users from '../views/Users';
import UserDetails from './UserDetails';
import BlogDetails from './BlogDetails';
import Notification from './Notification';

const Navbar = styled.nav`
  background-color: #333;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const NavLink = styled(BaseNavLink)`
  color: #fff;
  padding: 10px;
  text-decoration: none;
  margin-right: 10px;
  &:hover {
    background-color: #555;
    border-radius: 5px;
    color: #4888db;
  }
  &.active {
    font-weight: bold;
    color: #ffdd57;
  }
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

const LogoutButton = styled.button`
  background-color: #d73f8c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
  &:hover {
    background-color: violet;
  }
`;

const Menu = ({ users, handleNewBlog, blogs, handleLogout }) => {
  return (
    <>
      <Navbar>
        <NavLink to="/">Blogs</NavLink>
        <NavLink to="/create">Create New</NavLink>
        <NavLink to="/users">Users</NavLink>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Navbar>
      <Notification />
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<Show blogs={blogs} />} />
          <Route path="/:id" element={<BlogDetails blogs={blogs} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/users/:id" element={<UserDetails users={users} />} />
          <Route
            path="/create"
            element={<Add handleNewBlog={handleNewBlog} />}
          />
        </Routes>
      </ContentWrapper>
    </>
  );
};

export default Menu;
