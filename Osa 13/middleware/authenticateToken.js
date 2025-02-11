const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Session, User } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const token = authorization.replace('bearer ', '')

      const decodedToken = jwt.verify(token, SECRET)

      const session = await Session.findOne({ where: { token } })
      if (!session) {
        return res.status(401).json({ error: 'Token is expired or invalid' })
      }

      const user = await User.findByPk(decodedToken.id)
      if (!user || user.disabled) {
        return res.status(403).json({ error: 'User account is disabled' })
      }

      req.decodedToken = decodedToken
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'Token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'Token missing' })
  }

  next()
}

module.exports = tokenExtractor
