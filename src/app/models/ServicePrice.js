import Sequelize, { Model } from 'sequelize';

class ServicePrice extends Model {
  static init(sequelize) {
    super.init(
      {
        price_base: Sequelize.INTEGER,
        service_time: Sequelize.STRING,
        professional_assessment: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Service, { foreingKey: 'service_id', as: 'service' });
    this.belongsTo(models.Profile, {
      foreingKey: 'provider_id',
      as: 'provider',
    });
  }
}

export default ServicePrice;
