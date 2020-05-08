module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('category_services', 'category');
  },

  down: queryInterface => {
    return queryInterface.dropTable('category_services');
  },
};
