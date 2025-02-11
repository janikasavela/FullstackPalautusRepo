const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
const Session = require('./session')

User.belongsToMany(Blog, { through: ReadingList })
Blog.belongsToMany(User, { through: ReadingList })

User.hasMany(Session, { foreignKey: 'user_id', onDelete: 'CASCADE' })
Session.belongsTo(User, { foreignKey: 'user_id' })

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
}
