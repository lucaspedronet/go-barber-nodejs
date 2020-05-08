import Sequelize, { Model } from 'sequelize';

class Merchant extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        initials: Sequelize.STRING,
        branch: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        owner: Sequelize.INTEGER,
        employees: Sequelize.JSONB,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Merchant;
