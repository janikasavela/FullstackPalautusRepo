import { useEffect, useState } from 'react';
import Add from './components/Add';
import Show from './components/Show';
import './App.css';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import noteService from './services/blogs';
import { useUser } from './contexts/UserContext';

const App = () => {
  const [addVisible, setAddVisible] = useState(false);
  const { isLogged, dispatch } = useUser();

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    noteService.setToken(null);
    dispatch({
      type: 'CLEAR_USER',
    });
  };

  return (
    <>
      <Notification />
      {!isLogged && <LoginForm />}
      {isLogged && !addVisible && (
        <button onClick={() => setAddVisible(true)}>add blog</button>
      )}
      {isLogged && addVisible && <Add setAddVisible={setAddVisible} />}
      {isLogged && addVisible && (
        <button onClick={() => setAddVisible(false)}>cancel</button>
      )}
      {isLogged && <Show />}
      {isLogged && <button onClick={handleLogout}>logout</button>}
    </>
  );
};

export default App;
