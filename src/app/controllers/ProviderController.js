import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async store(req, res) {
    /**
     * @property atributes: Nos permiter retornar apenas os atributos que desejarmos de uma tabela
     * @property include: Nos permite add uma tabela em consultas de outras tabelas
     */
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'provider', 'avatar_id'],
      include: {
        model: File,
        as: 'avatar',
        attributes: ['id', 'name', 'path', 'url'],
      },
    });

    return res.status(200).json(providers);
  }
}
export default new ProviderController();
