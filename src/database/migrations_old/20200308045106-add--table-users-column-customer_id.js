module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'customer_id', {
      type: Sequelize.INTEGER,
      references: { model: 'customers', key: 'id' },
      onUpdate: 'CASCADE',
      onDeleted: 'CASCADE',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'customer_id');
  },
};
