module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('services_price_providers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      price_base: {
        type: Sequelize.INTEGER,
        trim: true,
      },
      service_time: {
        type: Sequelize.INTEGER,
        trim: true,
      },
      professional_assessment: {
        type: Sequelize.INTEGER,
        trim: true,
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
    return queryInterface.dropTable('services_price_providers');
  },
};
