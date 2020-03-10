module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('providers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      document: {
        type: Sequelize.STRING(15),
        allowNull: true,
        trim: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        trim: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      // relaciona user ao customer
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      avatar_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
      },
      shipping_address_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
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
    return queryInterface.dropTable('providers');
  },
};
