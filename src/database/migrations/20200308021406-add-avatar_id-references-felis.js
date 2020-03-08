module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('customers', 'avatar_id', {
      type: Sequelize.INTEGER,
      // Foreikey todo 'avatar_id' da tabela customers faz referência ao como 'id' da tabela files.
      references: { model: 'files', key: 'id' },
      // caso o id na tabela file seja aterado o onUpdate='CASCADE' também irá atualizar na o campo 'avatar_id' na tabela customers
      onUpdate: 'CASCADE',
      // caso o id na tabela file seja DELETADO o onDelete='SET NULL' irá setar NULL para o campo 'avatar_id' na tabela customers.
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('customers', 'avatar_id');
  },
};
