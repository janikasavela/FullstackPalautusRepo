import { useState } from 'react';
import noteService from '../services/blogs';
import { useNotification } from '../contexts/NotificationContext';
import loginService from '../services/login';
import { useUser } from '../contexts/UserContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { showNotificationWithTimeout } = useNotification();
  const { dispatch: userDispatch } = useUser();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));

      console.log(user);
      noteService.setToken(user.token);
      userDispatch({
        type: 'SET_USER',
        payload: { user },
      });
      setUsername('');
      setPassword('');
      showNotificationWithTimeout(
        `${user.name} logged in`,
        'notification',
        5000,
      );
    } catch (exception) {
      showNotificationWithTimeout('wrong username or password', 'error', 5000);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" name="login">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
