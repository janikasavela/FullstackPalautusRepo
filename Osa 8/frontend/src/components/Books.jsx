import { useState, useEffect } from 'react'
import { gql, useQuery, useSubscription } from '@apollo/client'

const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
        born
        id
      }
      id
      genres
    }
  }
`

const ALL_GENRES = gql`
  query {
    allBooks {
      genres
    }
  }
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
        born
        id
      }
      id
      genres
    }
  }
`

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [allGenres, setAllGenres] = useState([])

  const {
    loading: booksLoading,
    error: booksError,
    data: booksData,
    refetch,
  } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
    pollInterval: 2000,
  })

  const { loading: genresLoading, data: genresData } = useQuery(ALL_GENRES)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const newBook = data.data.bookAdded
      if (newBook) {
        alert(`New book added: ${newBook.title} by ${newBook.author.name}`)
        refetch() // Refetch kirjalista kun uus kirja lisatty
      }
    },
  })

  useEffect(() => {
    if (genresData) {
      const uniqueGenres = [
        ...new Set(genresData.allBooks.flatMap((book) => book.genres)),
      ]
      setAllGenres(uniqueGenres)
    }
  }, [genresData])

  if (!props.show) {
    return null
  }

  if (booksLoading || genresLoading) {
    return <p>Loading...</p>
  }

  if (booksError) {
    return <p>Error loading books: {booksError.message}</p>
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        <label htmlFor='genre-select'>Filter by genre: </label>
        <select
          id='genre-select'
          value={selectedGenre || ''}
          onChange={(e) => setSelectedGenre(e.target.value || null)}
        >
          <option value=''>All</option>
          {allGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData.allBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
