module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('category', 'type', {
      type: Sequelize.ENUM('merchant', 'service'),
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('category');
  },
};
