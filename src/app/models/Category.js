import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING(30),
        type: Sequelize.ENUM('merchant', 'service'),
      },
      { sequelize }
    );
    return this;
  }
}

export default Category;
