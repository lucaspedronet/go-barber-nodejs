import * as Yup from 'yup';
import User from '../models/User';
import Profile from '../models/Profile';
// import Profile from '../models/Profile';

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
      username: Yup.string()
        .min(5)
        .max(20),
      email: Yup.string()
        .email()
        .required(),
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

    const { name, phone, email } = req.body;

    /**
     * @param {valor} len: número de caracteres and decoded for username
     */
    const usernameFort = len => {
      let decodedKey = '';
      do {
        decodedKey = Math.random()
          .toString(36)
          .substr(2);
      } while (decodedKey.length < len);
      decodedKey = decodedKey.substr(0, len);
      return decodedKey;
    };

    /**
     * @template username: personalizando username
     */
    const [decoded] = name.split(' ');
    req.body.username = `${decoded}-${usernameFort(10)}-${usernameFort(5)}`;

    let emailExist;
    try {
      emailExist = await User.findOne({
        where: { email: req.body.email },
      });

      if (emailExist) {
        return res.status(400).json({ error: 'Email already exist.' });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error',
        success: false,
        data: null,
        error: error.message,
      });
    }

    const { id, active, username, profile } = await User.create(req.body);

    /**
     * @query : Verifica se existe algum Profile com mesmo User.id
     */
    const profileExists = await Profile.findOne({ where: { user_id: id } });

    if (profileExists) {
      return res.status(400).json({ error: 'Profile already exist' });
    }

    if (profile === 'provider') {
      req.body.user_id = id;
      const provider = await Profile.create(req.body);
      return res.json({
        id,
        active,
        profile,
        username,
        email,
        phone,
        provider: provider.id,
        address: provider.shipping_address_id,
      });
    }

    if (profile === 'manager') {
      req.body.user_id = id;
      const manager = await Profile.create(req.body);
      return res.json({
        id,
        active,
        profile,
        username,
        email,
        phone,
        manager: manager.id,
        address: manager.shipping_address_id,
      });
    }
    req.body.user_id = id;
    const customer = await Profile.create(req.body);
    return res.json({
      id,
      active,
      profile,
      username,
      email,
      phone,
      customer: customer.id,
      address: customer.shipping_address_id,
    });
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
