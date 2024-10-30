import styled from 'styled-components';
import { useState } from 'react';
import noteService from '../services/blogs';
import { useNotification } from '../contexts/NotificationContext';
import loginService from '../services/login';
import { useUser } from '../contexts/UserContext';

const FormContainer = styled.div`
  max-width: 400px;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #005fa3;
  }
`;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { showNotificationWithTimeout } = useNotification();
  const { dispatch: userDispatch } = useUser();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      noteService.setToken(user.token);
      userDispatch({ type: 'SET_USER', payload: { user } });
      setUsername('');
      setPassword('');
      showNotificationWithTimeout(
        `${user.name} logged in`,
        'notification',
        5000,
      );
    } catch {
      showNotificationWithTimeout('wrong username or password', 'error', 5000);
    }
  };

  return (
    <FormContainer>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <InputField
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <label>Password</label>
        <InputField
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
    </FormContainer>
  );
};

export default LoginForm;
