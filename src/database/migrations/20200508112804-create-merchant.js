module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('merchants', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
        trim: true,
      },
      initials: {
        type: Sequelize.STRING(5),
        allowNull: true,
        trim: true,
      },
      branch: {
        type: Sequelize.ENUM(
          'Salão de Beleza',
          'Barbearia',
          'Clínica de Estética',
          'Esmalteria',
          'Centro de Depilação',
          'SPA',
          'Loja de Cosméticos',
          'Maquiadora',
          'Espaço de Beleza',
          'Podologia',
          'Fisioterapia'
        ),
        allowNull: false,
        trim: true,
      },
      cnpj: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true,
      },
      employees: {
        type: Sequelize.JSONB,
        allowNull: true,
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
    return queryInterface.dropTable('merchants');
  },
};
