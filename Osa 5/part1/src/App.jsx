import { useEffect, useState } from 'react'
import Add from './components/Add'
import Show from './components/Show'
import noteService from './services/blogs'
import './App.css'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [messageClass, setMessageClass] = useState('notification')
  const [user, setUser] = useState(null)
  const [addVisible, setAddVisible] = useState(false)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setIsLogged(true)
      noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    noteService
      .getAll()
      .then((res) => {
        setBlogs(res)
      })
      .catch((error) => {
        setMessageClass('error')
        setMessage('Error occured when fetching data. ERROR: ' + error)
        setTimeout(() => {
          setMessage('')
          setMessageClass('notification')
        }, 5000)
      })
  }, [])

  function handeLogout() {
    window.localStorage.removeItem('loggedNoteappUser')
    noteService.setToken(null)
    setUser(null)
    setIsLogged(false)
  }

  return (
    <>
      {message && <Notification message={message} className={messageClass} />}
      {!isLogged && (
        <LoginForm
          setUser={setUser}
          setMessage={setMessage}
          setIsLogged={setIsLogged}
          setMessageClass={setMessageClass}
        />
      )}
      {isLogged && !addVisible && (
        <button onClick={() => setAddVisible(true)}>add blog</button>
      )}
      {isLogged && addVisible && (
        <Add
          setMessage={setMessage}
          setMessageClass={setMessageClass}
          setBlogs={setBlogs}
          setAddVisible={setAddVisible}
        />
      )}
      {isLogged && addVisible && (
        <button onClick={() => setAddVisible(false)}>cancel</button>
      )}
      {isLogged && <Show blogs={blogs} />}
      {isLogged && <button onClick={handeLogout}>logout</button>}
    </>
  )
}

export default App
