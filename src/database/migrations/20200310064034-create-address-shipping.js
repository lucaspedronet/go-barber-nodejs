module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shipping_address', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      zipcode: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      street: {
        type: Sequelize.STRING(50),
        allowNull: false,
        trim: true,
      },
      number: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      neighborhood: {
        type: Sequelize.STRING(45),
      },
      complement: {
        type: Sequelize.STRING(128),
      },
      state: {
        type: Sequelize.ENUM('MA', 'BA', 'DF', 'RJ', 'SP', 'TO'),
        defaultValue: 'TO',
        allowNull: false,
      },
      country: {
        type: Sequelize.ENUM('USA', 'ARG', 'BRA'),
        defaultValue: 'BRA',
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
    return queryInterface.dropTable('shipping_address');
  },
};
