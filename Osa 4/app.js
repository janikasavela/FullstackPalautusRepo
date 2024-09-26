require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const morgan = require('morgan')
const logger = require('./utils/logger')
const blogsRouter = require('./routers/blog')
const usersRouter = require('./routers/user')
const loginRouter = require('./routers/login')
const { tokenExtractor, userExtractor } = require('./middleware/auth')

mongoose.connect(MONGODB_URI).then(() => {
  logger.info('Connected to MongoDB..')
})

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  }

  response.status(500).send('Something failed.')
}

app.use('/api/users', usersRouter)
app.use(tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
