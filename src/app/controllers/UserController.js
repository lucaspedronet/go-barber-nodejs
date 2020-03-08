import * as Yup from 'yup';
import User from '../models/User';
// import Customer from '../models/Customer';

class UserController {
  async index(req, res) {
    const users = await User.findAll();

    const newUsers = users.map(user => {
      const { id, username, provider, active } = user;
      return { id, username, provider, active };
    });

    return res.json(newUsers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      // email: Yup.string()
      //   .email()
      //   .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    /**
     * @Verifica se os parametros de req.body atende o schema
     */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExist = await User.findOne({
      where: { username: req.body.username },
    });

    if (userExist) {
      return res.status(400).json({ error: 'User already exist.' });
    }

    const { id, username, provider, active } = await User.create(req.body);

    return res.json({ id, username, provider, active });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().max(15),
      oldpassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldpassword', (oldpassword, field) =>
          oldpassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    /**
     * @Verifica se os parametros de req.body atende o schema
     */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { userId } = req;
    const { oldpassword } = req.body;

    const user = await User.findByPk(userId);

    if (oldpassword && !(await user.checkPassword(oldpassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, username, provider, active } = await user.update(req.body);

    return res.json({
      message: 'User successfully changed',
      error: null,
      data: { id, username, provider, active },
    });
  }
}

export default new UserController();
