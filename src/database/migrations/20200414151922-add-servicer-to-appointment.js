module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('appointments', 'service_provider_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'services', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('appointments');
  },
};
