module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('customers', 'avatar_id');
  },

  down: queryInterface => {
    return queryInterface.removeColumn('customers');
  },
};
