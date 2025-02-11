const { ReadingList, Blog, User } = require('../models')
const router = require('express').Router()

const tokenExtractor = require('../middleware/authenticateToken')

router.post('/', async (req, res) => {
  const { blog_id, user_id } = req.body

  const blog = await Blog.findByPk(blog_id)
  const user = await User.findByPk(user_id)

  if (!blog || !user) {
    return res.status(404).json({ error: 'Blog or user not found' })
  }

  const readingList = await ReadingList.create({
    blog_id,
    user_id,
    read: false,
  })

  res.status(201).json(readingList)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const { id } = req.params
  const { read } = req.body

  if (typeof read !== 'boolean') {
    return res.status(400).json({ error: 'read must be a boolean value' })
  }
  const readingListEntry = await ReadingList.findByPk(id)

  if (!readingListEntry) {
    return res.status(404).json({ error: 'Blog not found from reading list' })
  }

  if (readingListEntry.user_id !== req.decodedToken.id) {
    return res
      .status(403)
      .json({ error: 'Cannot update someone elses readinglist!' })
  }

  readingListEntry.read = read
  await readingListEntry.save()

  res.json({
    id: readingListEntry.id,
    read: readingListEntry.read,
    user_id: readingListEntry.user_id,
    blog_id: readingListEntry.blog_id,
  })
})

module.exports = router
