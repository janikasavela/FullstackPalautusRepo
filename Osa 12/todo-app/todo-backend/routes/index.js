const express = require('express')
const router = express.Router()

const { getAsync } = require('../redis')

const redis = require('../redis')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits,
  })
})

router.get('/statistics', async (req, res) => {
  try {
    const addedTodos = (await getAsync('added_todos')) || 0
    res.json({ added_todos: parseInt(addedTodos) })
  } catch (err) {
    res.status(500).send('Error fetching statistics')
  }
})

module.exports = router
