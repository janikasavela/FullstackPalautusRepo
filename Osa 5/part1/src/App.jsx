import { useEffect, useState } from 'react'
import Add from './components/Add'
import Show from './components/Show'
import noteService from './services/blogs'
import './App.css'
import Notification from './components/Notification'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState('')
  const [messageClass, setMessageClass] = useState('notification')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = { title: newTitle, author: newAuthor, url: newUrl }

    /*   if (blogs.filter((obj) => obj.title === newTitle).length > 0) {
      if (
        window.confirm(
          `${newTitle} is already added, replace the old blog post with a new one?`
        )
      ) {
        const id = blogs.find((blog) => blog.title === newTitle).id

        noteService
          .update(id, newBlog)
          .then((res) => {
            setBlogs((prevblogs) =>
              prevblogs.map((blog) => (blog.id !== res.id ? blog : res))
            )
            setMessage(`${newBlog.title}'s informations updated`)
          })
          .catch((error) => {
            setMessageClass('error')
            setMessage('Error occured when updating data. ERROR: ' + error)
            setTimeout(() => {
              setMessage('')
              setMessageClass('notification')
            }, 5000)
          })
      }
    } else { */
    noteService
      .create(newBlog)
      .then((res) => {
        setBlogs((oldBlogs) => [...oldBlogs, res])
        setMessage(`${newBlog.title} was added succesfully`)
      })
      .catch((error) => {
        setMessageClass('error')
        setMessage(
          'Error occured when trying to add a new blog post. ERROR: ' + error
        )
        setTimeout(() => {
          setMessage('')
          setMessageClass('notification')
        }, 5000)
      })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  function handeLogout() {
    window.localStorage.removeItem('loggedNoteappUser')
    noteService.setToken(null)
    setUser(null)
    setIsLogged(false)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      console.log(user)
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`${user.name} logged in`)
      setIsLogged(true)
    } catch (exception) {
      setMessageClass('error')
      // setMessage('wrong credentials. ERROR: ' + exception)
      setMessage('wrong username or password')
    }
    setTimeout(() => {
      setMessage('')
      setMessageClass('notification')
    }, 5000)
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const showBlogs = () => {
    return (
      <div>
        <h2>Blogs</h2>
        {/*       <Add
  addPerson={addPerson}
  newName={newName}
  setNewName={setNewName}
  newNumber={newNumber}
  setNewNumber={setNewNumber}
/> */}
        <Show blogs={blogs} />
      </div>
    )
  }

  return (
    <>
      {message && <Notification message={message} className={messageClass} />}
      {!isLogged && loginForm()}
      {isLogged && (
        <Add
          addBlog={addBlog}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newAuthor={newAuthor}
          setNewAuthor={setNewAuthor}
          setNewUrl={setNewUrl}
          newUrl={newUrl}
        />
      )}
      {isLogged && showBlogs()}
      {isLogged && <button onClick={handeLogout}>logout</button>}
    </>
  )
}

export default App
