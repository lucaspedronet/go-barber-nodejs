module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('customers', 'user_id');
  },

  down: queryInterface => {
    return queryInterface.removeColumn('customers');
  },
};
