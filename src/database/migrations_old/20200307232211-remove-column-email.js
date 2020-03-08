module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar');
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users');
  },
};
