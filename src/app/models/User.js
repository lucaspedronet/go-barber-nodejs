import Sequelize, { Model } from 'sequelize';
// import jwt from 'jsonwebtoken'
import bcript from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        document: Sequelize.STRING,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
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
    // Model de User possui um campo 'avatar_id' que faz referência ao models File
    // O campo 'avatar_id' da tabela users é uma foreignKey pra coluna 'id' da tabela files.
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcript.compare(password, this.password_hash);
  }
}

export default User;
