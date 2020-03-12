import File from '../models/File';
import Profile from '../models/Profile';
import User from '../models/User';

class ProviderController {
  async store(req, res) {
    /**
     * @property atributes: Nos permiter retornar apenas os atributos que desejarmos de uma tabela
     * @property include: Nos permite add uma tabela em consultas de outras tabelas
     */
    const providers = await Profile.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id', 'user_id'],
      order: ['created_at'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username', 'profile', 'active'],
        },
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.status(200).json(providers);
  }
}
export default new ProviderController();
