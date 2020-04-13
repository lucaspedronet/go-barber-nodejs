import CategoryService from '../models/CategoryService';

class CategoryServiceController {
  async index(req, res) {
    if (req.isProfile !== 'provider') {
      return res
        .status(401)
        .json({ error: "You can only 'create category' with provider" });
    }

    const categoryAll = await CategoryService.findAll({
      attributes: ['id', 'title'],
      order: ['title'],
    });

    return res
      .status(200)
      .json({ error: null, messager: 'success', data: categoryAll });
  }

  async store(req, res) {
    if (req.isProfile !== 'provider') {
      return res
        .status(401)
        .json({ error: "You can only 'create category' with provider" });
    }

    const categoryExists = await CategoryService.findOne({
      where: { title: req.body.title },
    });

    if (categoryExists) {
      return res.status(401).json({ error: 'Category already not exists' });
    }

    const { id, title } = await CategoryService.create(req.body);

    return res
      .status(201)
      .json({ error: null, messager: 'success', data: { id, title } });
  }

  async update(req, res) {}
}

export default new CategoryServiceController();
