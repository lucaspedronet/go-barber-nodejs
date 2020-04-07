import Sequelize, { Model } from 'sequelize';
// import jwt from 'jsonwebtoken'
import bcript from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: Sequelize.STRING,
        guid: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        profile: Sequelize.ENUM('customer', 'provider', 'manager'),
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcript.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Profile, {
      foreignKey: 'profile_id',
      as: 'profiles',
    });
  }

  checkPassword(password) {
    return bcript.compare(password, this.password_hash);
  }
}

export default User;
