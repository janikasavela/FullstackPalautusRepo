import { gql, useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`
const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      id
    }
  }
`

const Authors = (props) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [born, setBorn] = useState('')
  const [changeAuthor] = useMutation(EDIT_AUTHOR)

  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  })

  const submit = async (event) => {
    event.preventDefault()

    if (!selectedAuthor || !born) return

    changeAuthor({
      variables: { name: selectedAuthor.value, born: parseInt(born) },
    })

    setSelectedAuthor(null)
    setBorn('')
  }

  const options = authors.data
    ? authors.data.allAuthors.map((a) => ({
        value: a.name,
        label: a.name,
      }))
    : []

  if (authors.loading) {
    return <p>loading authors..</p>
  }

  if (!props.show) {
    return null
  }

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {props.token && (
        <>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <div>
              name
              <Select
                value={selectedAuthor}
                onChange={setSelectedAuthor}
                options={options}
                placeholder='Select author'
              />
            </div>
            <div>
              born
              <input
                type='number'
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button>update author</button>
          </form>
        </>
      )}
    </>
  )
}

export default Authors
