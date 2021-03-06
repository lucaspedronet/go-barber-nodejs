import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        // campo virtual o get() retorna uma string e pode acessar o this.
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3000/files/${this.path}`;
          },
        },
      },
      { sequelize }
    );
    return this;
  }
}
export default File;
