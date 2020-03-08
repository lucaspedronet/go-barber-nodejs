module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn(
      'users',
      'document',
      'name',
      'email',
      'avatar_id'
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users');
  },
};
