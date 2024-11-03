import { gql, useQuery } from '@apollo/client'

const FAVORITE_GENRE_BOOKS = gql`
  query {
    me {
      favoriteGenre
      id
    }
    allBooks {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

const Recommend = (props) => {
  const { loading, error, data } = useQuery(FAVORITE_GENRE_BOOKS, {
    fetchPolicy: 'network-only',
  })

  console.log(data)
  console.log(props.token)

  if (!props.show) {
    return null
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const favoriteGenre = data.me ? data.me.favoriteGenre : null

  if (!favoriteGenre) {
    return <p>To see recommand add your favoriteGente to your profile.</p>
  }

  const books = data.allBooks.filter((book) =>
    book.genres.includes(favoriteGenre)
  )

  return (
    <div>
      <h2>Books in Your Favorite Genre: {favoriteGenre}</h2>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.length === 0 ? (
            <tr>
              <td colSpan='3'>No books found in this genre.</td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
