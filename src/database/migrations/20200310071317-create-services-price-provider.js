module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('service_price_provider', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      price_base: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10,
      },
      professional_assessment: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      procedure_time: {
        type: Sequelize.DATE,
      },
      service_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: { model: 'services', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      provider_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: { model: 'profiles', key: 'id' },
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
    return queryInterface.dropTable('service_price_provider');
  },
};
