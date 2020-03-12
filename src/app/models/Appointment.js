import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            /**
             * @return verifica: Verifica se data atual é maior que data a data de this.date (agendamento)
             */
            return isBefore(this.date, new Date());
          },
        },
        /**
         * @returns verifica: Subitrai a data do agendamento passada por this.date por 02:00h e
         * compara se é igual ou menor que a data atual em new Date().
         */
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            // if (this.cancelable) {
            //   return false;
            // }
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
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
  }
}
export default Appointment;
