module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('users', 'name');
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users');
  },
};
