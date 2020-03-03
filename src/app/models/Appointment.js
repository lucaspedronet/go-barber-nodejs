import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
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
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}
export default Appointment;
