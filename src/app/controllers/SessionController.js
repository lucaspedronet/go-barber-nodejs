import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    /**
     * @constant schema de validação
     */
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    /**
     * @Verifica se os parametros de req.body atende o schema
     */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    /**
     * @param user: verifica se existe algum usuário, caso contrário 'User not found'
     */
    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

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

    const { id, name } = user;
    return res.json({
      user: { id, name },
      token: jwt.sign(
        {
          id,
          name,
        },
        authConfig.secret,
        { expiresIn: authConfig.expiresIn }
      ),
    });
  }
}

export default new SessionController();
