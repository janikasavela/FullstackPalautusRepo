module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reading_lists', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      blog_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
        onDelete: 'CASCADE',
      },
      read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('reading_lists')
  },
}
