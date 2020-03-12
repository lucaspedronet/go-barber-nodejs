import Sequelize, { Model } from 'sequelize';

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
        category: Sequelize.ENUM(
          'Cabelo',
          'Barba',
          'Depilação',
          'Sombrancelha',
          'Estética corpora',
          'Estética facial',
          'Maquiagem',
          'Maquiagem',
          'Massagem',
          'Podologo'
        ),
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreingKey: 'image_id', as: 'image' });
  }
}

export default Service;
