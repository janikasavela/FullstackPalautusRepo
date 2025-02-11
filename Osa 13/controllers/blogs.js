const router = require('express').Router()
const tokenExtractor = require('../middleware/authenticateToken')
const { Op } = require('sequelize')

const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  const { search } = req.query

  let filter = {}
  if (search) {
    filter[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } },
      { author: { [Op.iLike]: `%${search}%` } },
    ]
  }

  const blogs = await Blog.findAll({
    where: filter,
    include: {
      model: User,
      attributes: ['name'],
    },
    order: [['likes', 'DESC']],
  })

  res.status(200).json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  res.status(201).json(blog)
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) return res.status(404).json({ error: 'Blog not found' })

  if (blog.userId !== req.decodedToken.id) {
    return res
      .status(403)
      .json({ error: 'You are not authorized to delete this blog' })
  }

  await blog.destroy()
  res.status(200).json({ message: 'Blog deleted successfully' })
})

router.put('/:id', async (req, res) => {
  const { likes } = req.body

  if (likes === undefined || typeof likes !== 'number') {
    throw new Error('Likes must be a number')
  }
  const blog = await Blog.findByPk(req.params.id)
  if (!blog) return res.status(404).json({ error: 'Blog not found' })
  blog.likes = likes
  await blog.save()
  res.json(blog)
})

module.exports = router
