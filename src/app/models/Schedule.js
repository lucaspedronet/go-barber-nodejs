import Sequelize, { Model } from 'sequelize';

class Schedule extends Model {
  static init(sequelize) {
    super.init(
      {
        monday: Sequelize.ARRAY(Sequelize.STRING),
        tuesday: Sequelize.ARRAY(Sequelize.STRING),
        wednesday: Sequelize.ARRAY(Sequelize.STRING),
        thursday: Sequelize.ARRAY(Sequelize.STRING),
        friday: Sequelize.ARRAY(Sequelize.STRING),
        saturday: Sequelize.ARRAY(Sequelize.STRING),
        sunday: Sequelize.ARRAY(Sequelize.STRING),
      },
      { sequelize }
    );

    return this;
  }

  static associate(modals) {
    this.belongsTo(modals.Profile, {
      foreignKey: 'profile_id',
      as: 'profiles',
    });
  }
}

export default Schedule;
