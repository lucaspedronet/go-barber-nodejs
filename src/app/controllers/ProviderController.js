import User from '../models/User';
import File from '../models/File';
import Provider from '../models/Provider';

class ProviderController {
  async store(req, res) {
    /**
     * @property atributes: Nos permiter retornar apenas os atributos que desejarmos de uma tabela
     * @property include: Nos permite add uma tabela em consultas de outras tabelas
     */
    const providers = await Provider.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
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
