module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 2000,
    })
  },
}
