module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'username', {
      type: Sequelize.STRING(15),
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'username');
  },
};
