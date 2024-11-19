const express = require('express')
const { Todo } = require('../mongo')
const router = express.Router()
const { getAsync, setAsync } = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: false,
    })

    let addedTodos = await getAsync('added_todos')
    addedTodos = addedTodos ? parseInt(addedTodos) : 0
    await setAsync('added_todos', addedTodos + 1)

    res.send(todo)
  } catch (err) {
    res.status(500).send('Error creating todo')
  }
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      return res.status(404).send('The todo with the given ID was not found')
    }
    res.send(todo)
  } catch (err) {
    res.status(500).send('Error fetching todo')
  }
})

/* PUT todo. */
singleRouter.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true, context: 'query' }
    )

    if (!todo) {
      return res.status(404).send('The todo with the given id was not found')
    }
    res.send(todo)
  } catch (err) {
    res.status(500).send('Error updating todo')
  }
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
