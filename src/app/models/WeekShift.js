import Sequelize, { Model } from 'sequelize';

class WeekShift extends Model {
  static init(sequelize) {
    super.init(
      {
        monday: Sequelize.INTEGER,
        tuesday: Sequelize.INTEGER,
        wednesday: Sequelize.INTEGER,
        thursday: Sequelize.INTEGER,
        friday: Sequelize.INTEGER,
        saturday: Sequelize.INTEGER,
        sunday: Sequelize.INTEGER,
        profile_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
export default WeekShift;
