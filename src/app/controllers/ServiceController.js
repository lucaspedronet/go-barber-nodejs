import Service from '../models/Service';
import ServicePrice from '../models/ServicePrice';
import File from '../models/File';

class ServiceController {
  async index(req, res) {
    const services = await Service.findAll({
      order: ['title'],
      attributes: ['id', 'title', 'description', 'category'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url', 'name'],
        },
      ],
    });

    return res.status(200).json(services);
  }

  async store(req, res) {
    if (!req.isProfile === 'provider') {
      return res.status(400).json({ error: 'User not permission provider' });
    }

    // const { title } = req.body;
    // const serviceExists = await Service.findOne({ where: { title } });

    // if (serviceExists) {
    //   return res.status(400).json({ error: 'Service in title exists' });
    // }

    // const { id } = await Service.create(req.body);
    // req.body.service_id = 3;

    const service = await ServicePrice.create(req.body);

    return res.status(200).json(service);
  }
}

export default new ServiceController();
