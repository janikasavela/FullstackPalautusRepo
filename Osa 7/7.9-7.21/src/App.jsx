import { useEffect, useState } from 'react';
import './App.css';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import noteService from './services/blogs';
import { useUser } from './contexts/UserContext';
import Menu from './components/Menu';
import userService from './services/users';
import { useNotification } from './contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #2a78de;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 30px;
  max-width: 100px;

  &:hover {
    background-color: #4888db;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
`;

const App = () => {
  const { isLogged, dispatch } = useUser();
  const [users, setUsers] = useState([]);
  const { showNotificationWithTimeout } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      dispatch({
        type: 'SET_USER',
        payload: { user },
      });

      noteService.setToken(user.token);
    }
  }, []);

  useEffect(function () {
    userService
      .getAll()
      .then((res) => setUsers(res))
      .catch((error) => {
        showNotificationWithTimeout(
          `Error fetching users ${error}`,
          'error',
          5000,
        );
      });
  }, []);

  const {
    data: blogs,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: noteService.getAll,
  });

  // Logataan haetut blogit
  console.log('Fetched blogs:', blogs);
  if (isPending) {
    return <div>loading data...</div>;
  }

  if (isError) {
    showNotificationWithTimeout(`Error fetching blogs`, 'error', 5000);
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    noteService.setToken(null);
    dispatch({
      type: 'CLEAR_USER',
    });
    navigate('/');
  };

  const handleNewBlog = async () => {
    try {
      const res = await userService.getAll();
      setUsers(res);
    } catch (error) {
      showNotificationWithTimeout(
        `Error updating users: ${error}`,
        'error',
        5000,
      );
    }
  };

  return (
    <Container>
      {!isLogged && (
        <>
          <Notification />
          <LoginForm />
        </>
      )}
      {isLogged && (
        <Menu users={users} handleNewBlog={handleNewBlog} blogs={blogs} />
      )}
      {isLogged && <Button onClick={handleLogout}>logout</Button>}
    </Container>
  );
};

export default App;
