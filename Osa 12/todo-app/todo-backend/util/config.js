require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL || undefined
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'

module.exports = {
  MONGO_URL,
  REDIS_URL,
}
