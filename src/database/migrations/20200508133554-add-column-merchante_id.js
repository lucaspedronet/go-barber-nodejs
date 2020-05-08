module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('profiles', 'merchant_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: true,
      references: { model: 'merchants', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('profiles');
  },
};
