import Category from '../models/Category';

class CategoryController {
  async index(req, res) {
    if (req.isProfile !== 'provider') {
      return res
        .status(401)
        .json({ error: "You can only 'create category' with provider" });
    }

    const categoryAll = await Category.findAll({
      attributes: ['id', 'title', 'type'],
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

    const categoryExists = await Category.findOne({
      where: { title: req.body.title },
    });

    if (categoryExists) {
      return res.status(401).json({ error: 'Category already not exists' });
    }

    const { id, title, type } = await Category.create(req.body);

    return res
      .status(201)
      .json({ error: null, messager: 'success', data: { id, title, type } });
  }
}

export default new CategoryController();
