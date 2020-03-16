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
      // username: Yup.string()
      //   .min(5)
      //   .max(30),
      password: Yup.string().required(),
    });

    /**
     * @Verifica se os parametros de req.body atende o schema
     */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { password, email } = req.body;

    const userExists = await User.findOne({ where: { email } });

    /**
     * @param userExists: verifica se existe algum usuário, caso contrário 'User not found'
     */
    if (!userExists) {
      return res.status(401).json({ error: 'User not found.' });
    }

    /**
     * @param active: verifica se user esta Ativo ou Inativo, se inativo 'User not active.'
     */
    if (!userExists.active) {
      return res.status(401).json({ error: 'User not permissio is active.' });
    }

    /**
     * @function checkPassword()
     */
    if (!(await userExists.checkPassword(password))) {
      return res.status(401).json({ errpr: 'Password not match.' });
    }

    const { id, profile, active, username } = userExists;
    return res.json({
      user: {
        id,
        email,
        active,
        username,
      },
      token: jwt.sign(
        {
          id,
          profile,
        },
        authConfig.secret,
        { expiresIn: authConfig.expiresIn }
      ),
    });
  }
}

export default new SessionController();
