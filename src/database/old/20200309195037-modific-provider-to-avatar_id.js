module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('providers', 'avatar_id', {
      type: Sequelize.INTEGER,
      // Foreikey todo 'avatar_id' da tabela providers faz referência ao como 'id' da tabela files.
      references: { model: 'files', key: 'id' },
      // caso o id na tabela file seja aterado o onUpdate='CASCADE' também irá atualizar na o campo 'avatar_id' na tabela providers
      onUpdate: 'CASCADE',
      // caso o id na tabela file seja DELETADO o onDelete='SET NULL' irá setar NULL para o campo 'avatar_id' na tabela providers.
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('providers', 'avatar_id');
  },
};
