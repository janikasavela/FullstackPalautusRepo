const { Session } = require('../models')
const tokenExtractor = require('../middleware/authenticateToken')

router.delete('/', tokenExtractor, async (req, res) => {
  await Session.destroy({ where: { user_id: req.user.id } })
  res.status(200).json({ message: 'Logged out successfully' })
})
