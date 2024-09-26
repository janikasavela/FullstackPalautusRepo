const bcrypt = require('bcrypt')
const { User } = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('User creation tests', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await api.get('/api/users')

    const newUser = {
      username: 'User123',
      name: 'New User',
      password: 'password123',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')

    assert.strictEqual(usersAtStart.body.length + 1, usersAtEnd.body.length)
    assert.deepStrictEqual(response.body.username, newUser.username)
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    const newUser = {
      username: 'root', // Username already exists from the `beforeEach` setup
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    assert(result.body.error.includes('expected `username` to be unique'))
  })

  test('creation fails with proper status code if username is too short', async () => {
    const newUser = {
      username: 'ro',
      name: 'Short User',
      password: 'password123',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    assert(
      result.body.error.includes(
        'Username and password should both be more than 2 characters long'
      )
    )
  })

  test('creation fails with proper status code if password is too short', async () => {
    const newUser = {
      username: 'validuser',
      name: 'Valid User',
      password: 'pw',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    assert(
      result.body.error.includes(
        'Username and password should both be more than 2 characters long'
      )
    )
  })
})

after(async () => {
  await mongoose.connection.close()
})
