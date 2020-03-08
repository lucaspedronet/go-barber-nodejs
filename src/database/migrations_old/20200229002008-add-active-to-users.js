module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'active', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      // references: { model: 'files', key: 'id' },
      // onUpdate: 'CASCADE',
      // onDelete: 'SET NULL',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'active');
  },
};
