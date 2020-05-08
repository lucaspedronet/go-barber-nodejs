import Sequelize, { Model } from 'sequelize';

class Profile extends Model {
  static init(sequelize) {
    super.init(
      {
        document: Sequelize.STRING,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        birth_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    // Model de Profile possui um campo 'avatar_id' que faz referência ao models File
    // O campo 'avatar_id' da tabela Providers é uma foreignKey pra coluna 'id' da tabela files.
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.ShippingAddress, {
      foreignKey: 'shipping_address_id',
      as: 'shipping_address',
    });
    this.belongsTo(models.Merchant, {
      foreignKey: 'merchant_id',
      as: 'owner_boss',
    });
  }
}

export default Profile;
