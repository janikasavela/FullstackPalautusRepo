import { render, screen } from '@testing-library/react'
import BlogDetails from './BlogDetails'
import userEvent from '@testing-library/user-event'
import { describe, test, beforeEach, vi } from 'vitest'
import Add from './Add'
import noteService from '../services/blogs'

const user = {
  username: 'testuser',
}

const userE = userEvent.setup()

describe('<BlogDetails />', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10,
    user: { username: 'testuser' },
  }

  let container
  const setBlogsMock = vi.fn()

  // Mock noteService
  beforeEach(() => {
    vi.clearAllMocks() // Nollaa kaikki mockit ennen jokaista testiä
    noteService.update = vi.fn() // Mockaa update-metodi
    container = render(
      <BlogDetails
        blog={blog}
        user={user}
        setMessage={() => {}}
        setMessageClass={() => {}}
        setBlogs={setBlogsMock}
        blogs={[]}
      />
    ).container
  })

  test('renders title and author but not url or likes by default', () => {
    expect(screen.getByText(/Test Blog/)).toBeDefined()
    expect(screen.getByText(/by Test Author/)).toBeDefined()

    const urlElement = screen.queryByText('http://testurl.com')
    const likesElement = screen.queryByText('Likes: 10')

    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()
  })

  test('renders all details if view button is pressed', async () => {
    const button = screen.getByText('view')
    await userE.click(button)

    expect(screen.getByText(/testurl/)).toBeDefined()
    expect(screen.getByText(/10/)).toBeDefined()
    expect(screen.getByText(/testuser/)).toBeDefined()
  })

  test('calls the like handler twice when like button is clicked twice', async () => {
    const viewButton = screen.getByText('view')
    await userE.click(viewButton)

    const likeButton = screen.getByText('like')

    // Mock noteService.update to resolve
    noteService.update.mockResolvedValue(blog)

    await userE.click(likeButton)
    await userE.click(likeButton)

    expect(setBlogsMock).toHaveBeenCalledTimes(2)
  })
})

describe('<Add />', () => {
  const setMessageMock = vi.fn()
  const setMessageClassMock = vi.fn()
  const setBlogsMock = vi.fn()
  const setAddVisibleMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    noteService.create = vi.fn()
    render(
      <Add
        setMessage={setMessageMock}
        setMessageClass={setMessageClassMock}
        setBlogs={setBlogsMock}
        setAddVisible={setAddVisibleMock}
        user={user}
      />
    )
  })

  test('calls setBlogs with correct data when a new blog is added', async () => {
    noteService.create.mockResolvedValue({
      title: 'New Blog Title',
      author: 'New Author',
      url: 'http://newblogurl.com',
      user: { username: 'testuser' },
    })

    const titleInput = screen.getByPlaceholderText('add title')
    const authorInput = screen.getByPlaceholderText('add author')
    const urlInput = screen.getByPlaceholderText('give a url')
    const submitButton = screen.getByText('add')

    await userE.type(titleInput, 'New Blog Title')
    await userE.type(authorInput, 'New Author')
    await userE.type(urlInput, 'http://newblogurl.com')

    await userE.click(submitButton)

    // Get the function that was passed to setBlogsMock
    const setBlogsCall = setBlogsMock.mock.calls[0][0] // Get the first argument (which should be a function)

    // Call that function with an empty array to simulate the previous state
    setBlogsCall([])

    expect(setBlogsMock).toHaveBeenCalledTimes(1)
    expect(setBlogsMock).toHaveBeenCalledWith(expect.any(Function))

    // Now we can check that it returns the correct value when called
    const result = setBlogsCall([]) // Call the function to get the new state

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'New Blog Title',
          author: 'New Author',
          url: 'http://newblogurl.com',
          user: { username: 'testuser' },
        }),
      ])
    )
  })
})
