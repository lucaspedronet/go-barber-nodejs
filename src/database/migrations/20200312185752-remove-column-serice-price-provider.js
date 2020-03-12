module.exports = {
  up: queryInterface => {
    return queryInterface.dropTable('service_price_provider');
  },

  down: queryInterface => {
    return queryInterface.dropTable('service_price_provider');
  },
};
