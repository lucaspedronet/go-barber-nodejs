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
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      category: {
        type: Sequelize.ENUM(
          'Barba',
          'Cabelo',
          'Maquiagem',
          'Sombrancelha',
          'Estética corpora',
          'Estética facial',
          'Depilação',
          'Massagem',
          'Podologo'
        ),
      },
      image_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
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
