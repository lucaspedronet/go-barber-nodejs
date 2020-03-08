module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      document: {
        type: Sequelize.STRING(11),
        allowNull: false,
        trim: true,
        unique: true,
      },
      firts_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        trim: true,
      },
      last_name: {
        type: Sequelize.STRING(45),
        allowNull: false,
        trim: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: {
          name: 'customers',
          msg: 'Ops, infelizmente esse email já foi cadastrado...',
        },
        trim: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      // relaciona user ao customer
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('customers');
  },
};
