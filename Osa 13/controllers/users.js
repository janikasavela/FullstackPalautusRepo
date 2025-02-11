const router = require('express').Router()

const { User, Blog, ReadingList } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.get('/:id', async (req, res) => {
  const { read } = req.query
  const { id } = req.params

  const user = await User.findByPk(id, {
    attributes: ['name', 'username'],
    include: {
      model: Blog,
      as: 'readings',
      attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
      through: {
        model: ReadingList,
        attributes: ['read', 'id'],
        where: read !== undefined ? { read: read === 'true' } : {},
      },
    },
  })

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  const userWithReadingList = {
    name: user.name,
    username: user.username,
    readings: user.readings.map((blog) => ({
      id: blog.id,
      url: blog.url,
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      year: blog.year,
      readinglist: {
        read: blog.reading_list.read,
        id: blog.reading_list.id,
      },
    })),
  }

  res.json(userWithReadingList)
})

module.exports = router
