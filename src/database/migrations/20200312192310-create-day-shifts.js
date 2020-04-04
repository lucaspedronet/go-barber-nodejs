module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('day_shifts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      start_time_morning: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_time_morning: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      start_time_late: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_time_late: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      start_time_night: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_time_night: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      week_single: {
        type: Sequelize.STRING(3),
        allowNull: false,
      },
      object: {
        type: Sequelize.STRING,
        defaultValue: 'day_shifts',
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
    return queryInterface.dropTable('day_shifts');
  },
};