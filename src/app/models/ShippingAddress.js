import Sequelize, { Model } from 'sequelize';

class ShippingAddress extends Model {
  static init(sequelize) {
    super.init(
      {
        zipcode: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        complement: Sequelize.STRING,
        state: {
          type: Sequelize.ENUM('MA', 'BA', 'DF', 'RJ', 'SP', 'TO'),
          defaultValue: 'TO',
        },
        country: {
          type: Sequelize.ENUM('USA', 'ARG', 'BRA'),
          defaultValue: 'BRA',
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default ShippingAddress;
