import noteService from '../services/blogs'
import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser, setMessage, setIsLogged, setMessageClass }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      setTimeout(() => {
        setMessageClass('notification')
      }, 3000)
    }
    setTimeout(() => {
      setMessage('')
      setMessageClass('notification')
    }, 5000)
  }

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

export default LoginForm
