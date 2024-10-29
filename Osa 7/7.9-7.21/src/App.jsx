import { useEffect, useState } from 'react'
import Add from './components/Add'
import Show from './components/Show'
import './App.css'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useNotification } from './contexts/NotificationContext'
import noteService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [addVisible, setAddVisible] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const { state } = useNotification()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setIsLogged(true)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    noteService.setToken(null)
    setUser(null)
    setIsLogged(false)
  }

  return (
    <>
      {state.message && (
        <Notification message={state.message} className={state.className} />
      )}
      {!isLogged && <LoginForm setUser={setUser} setIsLogged={setIsLogged} />}
      {isLogged && !addVisible && (
        <button onClick={() => setAddVisible(true)}>add blog</button>
      )}
      {isLogged && addVisible && (
        <Add setAddVisible={setAddVisible} user={user} />
      )}
      {isLogged && addVisible && (
        <button onClick={() => setAddVisible(false)}>cancel</button>
      )}
      {isLogged && <Show user={user} />}
      {isLogged && <button onClick={handleLogout}>logout</button>}
    </>
  )
}

export default App
