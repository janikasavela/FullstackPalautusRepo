const express = require('express')
const router = express.Router()
const { Blog } = require('../models/blog')
const { User } = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../middleware/auth')

router.get('/', async (req, res) => {
  const blogs = await Blog.find().populate('user')
  res.send(blogs)
})

router.post('/', userExtractor, async (req, res) => {
  const { title, author, url, likes, userId } = req.body
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!title || !author || !url)
    return res
      .status(400)
      .send('Title, author and url are all required information')

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ? likes : 0,
    user: user._id,
    comments: [],
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  res.status(201).send(blog)
})

router.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user

  let blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).send('The blog with the given ID was not found')
  }

  if (blog.user.toString() !== user._id.toString()) {
    return res
      .status(403)
      .json({ error: 'only the creator can delete this blog' })
  }

  await Blog.findByIdAndDelete(req.params.id)

  res.send(blog)
})

router.put('/:id', async (req, res) => {
  if (!req.body.likes)
    return res.status(400).send('Likes field is required for updating')

  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      likes: req.body.likes,
    },
    { new: true, runValidators: true, context: 'query' }
  )

  if (!blog) res.status(404).send('The blog with the given ID was not found')

  res.send(blog)
})

router.post('/:id/comments', async (req, res) => {
  const { comment } = req.body
  if (!comment) {
    return res.status(400).json({ error: 'Comment is required' })
  }

  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).send('Blog not found')
  }

  blog.comments = blog.comments.concat(comment)
  const updatedBlog = await blog.save()

  res.status(201).send(updatedBlog)
})

module.exports = router
