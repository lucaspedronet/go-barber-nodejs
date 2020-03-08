module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('companys', {
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
      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
        trim: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        trim: true,
      },
      sponsor: {
        type: Sequelize.STRING(45),
        allowNull: false,
        trim: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING(255),
        allowNull: true,
        trim: true,
      },
      category: {
        type: Sequelize.STRING(25),
        allowNull: false,
        trim: true,
      },
      // relaciona user ao customer
      sponsor_user_id: {
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
    return queryInterface.dropTable('companys');
  },
};
