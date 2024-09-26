import { useEffect, useState } from 'react'
import Filter from './Filter'
import Add from './Add'
import Show from './Show'
import noteService from './services/persons'
import './App.css'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')
  const [messageClass, setMessageClass] = useState('notification')

  useEffect(() => {
    noteService
      .getAll()
      .then((res) => {
        setPersons(res)
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

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    if (persons.filter((obj) => obj.name === newName).length > 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const id = persons.find((person) => person.name === newName).id

        noteService
          .update(id, newPerson)
          .then((res) => {
            setPersons((prevPersons) =>
              prevPersons.map((person) => (person.id !== res.id ? person : res))
            )
            setMessage(`${newPerson.name}'s phonenumber updated`)
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
    } else {
      noteService
        .create(newPerson)
        .then((res) => {
          setPersons((oldNames) => [...oldNames, res])
          setMessage(`${newPerson.name} was added to a phonebook`)
        })
        .catch((error) => {
          setMessageClass('error')
          setMessage(
            'Error occured when trying to add a new person. ERROR: ' + error
          )
          setTimeout(() => {
            setMessage('')
            setMessageClass('notification')
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message} className={messageClass} />}
      <Filter query={query} setQuery={setQuery} />
      <Add
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <Show
        filteredPersons={filteredPersons}
        persons={persons}
        query={query}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App
