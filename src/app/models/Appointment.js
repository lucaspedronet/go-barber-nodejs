import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        service_name: Sequelize.STRING,
        service_category: Sequelize.STRING,
        price: Sequelize.INTEGER,
        description: Sequelize.TEXT,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    /**
     * @augments as: 'user' toda tabela que possui mais de um relacionamento deve obrigatoriamente atribuir ap
     * pelidos aos campos relacionados, assim como no exemplo abaixo.
     */
    this.belongsTo(models.Customer, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Provider, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
  }
}
export default Appointment;
