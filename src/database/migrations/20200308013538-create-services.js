module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('services', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(45),
        allowNull: false,
        trim: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        trim: true,
      },
      image_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: {
        // campos que irão armazena data/hora dos registros.
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        // campo que fará o controle de version registra todas as alterações.
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('services');
  },
};
