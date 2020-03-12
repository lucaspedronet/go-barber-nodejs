module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'profile_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'profiles', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
