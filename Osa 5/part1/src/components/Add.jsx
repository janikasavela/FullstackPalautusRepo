const Add = ({
  addBlog,
  newTitle,
  setNewTitle,
  newAuthor,
  setNewAuthor,
  newUrl,
  setNewUrl,
}) => {
  return (
    <form onSubmit={addBlog}>
      <h2>Add a new blog post</h2>
      <div>
        title:
        <input
          type='text'
          value={newTitle}
          placeholder='add title'
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={newAuthor}
          placeholder='add author'
          onChange={(e) => setNewAuthor(e.target.value)}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={newUrl}
          placeholder='give a url'
          onChange={(e) => setNewUrl(e.target.value)}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default Add
