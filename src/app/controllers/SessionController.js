import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';

import authConfig from '../../config/auth';
import Customer from '../models/Customer';

class SessionController {
  async store(req, res) {
    /**
     * @constant schema de validação
     */
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      username: Yup.string()
        .min(5)
        .max(15),
      password: Yup.string().required(),
    });

    /**
     * @Verifica se os parametros de req.body atende o schema
     */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const customerExist = await Customer.findOne({ where: { email } });

    /**
     * @param customerExist: verifica se existe algum usuário, caso contrário 'Customer not found'
     */
    if (!customerExist) {
      return res.status(401).json({ error: 'Customer not found.' });
    }

    const user = await User.findByPk(customerExist.user_id);

    /**
     * @param active: verifica se user esta Ativo ou Inativo, se inativo 'User not active.'
     */
    if (!user.active) {
      return res.status(401).json({ error: 'User not active.' });
    }

    /**
     * @function checkPassword()
     */
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ errpr: 'Password not match.' });
    }

    const { id, username, provider, active } = user;
    return res.json({
      user: { id, username },
      token: jwt.sign(
        {
          id,
          username,
          provider,
          active,
        },
        authConfig.secret,
        { expiresIn: authConfig.expiresIn }
      ),
    });
  }
}

export default new SessionController();
