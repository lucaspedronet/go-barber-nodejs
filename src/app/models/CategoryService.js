import Sequelize, { Model } from 'sequelize';

class CategoryService extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING(30),
      },
      { sequelize }
    );
    return this;
  }
}

export default CategoryService;
