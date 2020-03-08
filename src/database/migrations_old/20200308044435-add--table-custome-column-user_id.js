module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('customers', 'user_id', {
      type: Sequelize.INTEGER,
      // Foreikey todo 'user_id' da tabela customers faz referência ao como 'id' da tabela files.
      references: { model: 'users', key: 'id' },
      // caso o id na tabela file seja aterado o onUpdate='CASCADE' também irá atualizar na o campo 'user_id' na tabela customers
      onUpdate: 'CASCADE',
      // caso o id na tabela file seja DELETADO o onDelete='SET NULL' irá setar NULL para o campo 'user_id' na tabela customers.
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('customers', 'user_id');
  },
};
