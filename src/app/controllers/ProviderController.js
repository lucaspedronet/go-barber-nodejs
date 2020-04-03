import File from '../models/File';
import Profile from '../models/Profile';
import User from '../models/User';

class ProviderController {
  async store(req, res) {
    /**
     * @property atributes: Nos permiter retornar apenas os atributos que desejarmos de uma tabela
     * @property include: Nos permite add uma tabela em consultas de outras tabelas
     */
    const providers = await User.findAll({
      where: { profile: 'provider' },
      attributes: ['id', 'username', 'profile', 'active'],
      order: ['created_at'],
      include: [
        {
          model: Profile,
          as: 'profiles',
          attributes: ['id', 'name', 'email', 'avatar_id', 'user_id'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.status(200).json(providers);
  }
}
export default new ProviderController();
