import Sequelize, { Model } from 'sequelize';

class DayShift extends Model {
  static init(sequelize) {
    super.init(
      {
        start_time_morning: Sequelize.DATE,
        end_time_morning: Sequelize.DATE,

        start_time_late: Sequelize.DATE,
        end_time_late: Sequelize.DATE,

        start_time_night: Sequelize.DATE,
        end_time_night: Sequelize.DATE,
        week_single: Sequelize.STRING(3),
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
export default DayShift;
