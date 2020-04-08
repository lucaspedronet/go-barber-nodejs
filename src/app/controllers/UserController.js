import * as Yup from 'yup';
import User from '../models/User';
import Profile from '../models/Profile';
import File from '../models/File';

class UserController {
  async index(req, res) {
    const {
      id,
      username,
      guid,
      email,
      profile,
      active,
      profiles,
    } = await User.findByPk(req.userId, {
      include: [
        {
          model: Profile,
          as: 'profiles',
          attributes: [
            'id',
            'name',
            'phone',
            'birth_date',
            'user_id',
            'avatar_id',
            'shipping_address_id',
          ],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url', 'name'],
            },
          ],
        },
      ],
    });

    if (profiles === null) {
      const {
        name,
        phone,
        user_id,
        avata_id,
        birth_date,
        shipping_address_id,
      } = await Profile.findOne({ where: { user_id: id } });

      return res.status(200).json({
        message: 'Registration completed with success!',
        success: true,
        error: null,
        data: [
          {
            id,
            guid,
            email,
            active,
            profile,
            username,
            profiles: {
              name,
              phone,
              user_id,
              avata_id,
              birth_date,
              shipping_address_id,
              avatar: null,
            },
          },
        ],
      });
    }

    return res.status(200).json({
      message: 'Registration completed with success!',
      success: true,
      error: null,
      data: {
        id,
        username,
        guid,
        email,
        profile,
        active,
        profiles,
      },
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      profile: Yup.string().required(),
      active: Yup.boolean().required(),
      name: Yup.string()
        .min(10)
        .max(50)
        .required(),
      guid: Yup.string()
        .min(10)
        .max(50)
        .required(),
      phone: Yup.string()
        .min(9)
        .max(15)
        .required(),
      username: Yup.string()
        .min(5)
        .max(50),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

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
     * @template username: personalizando username e guid
     */
    const [decoded] = req.body.name.split(' ');
    req.body.username = `${decoded}-${usernameFort(8)}-${usernameFort(8)}`;
    req.body.guid = `${usernameFort(8)}.${usernameFort(8)}.${usernameFort(15)}`;

    /**
     * @Verifica se os parametros de req.body atende o schema
     */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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

    const { id } = await User.create(req.body);

    req.body.user_id = id;
    await Profile.create(req.body);

    return res.status(201).json({
      message: 'Registration completed with success!',
      success: true,
      data: 'success',
      error: null,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(10)
        .max(50),
      phone: Yup.string()
        .min(9)
        .max(15),
      username: Yup.string()
        .min(5)
        .max(50),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
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
    const { oldPassword } = req.body;

    const user = await User.findByPk(userId);
    const useProfile = await Profile.findOne({
      where: { user_id: req.userId },
    });

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    if (req.body.email && req.body.email !== user.email) {
      const emailExist = await User.findOne({
        where: { email: req.body.email },
      });
      if (emailExist) {
        return res.status(401).json({
          message: 'Already email exists!',
          success: false,
          data: 'FAILURE',
          error: 'ERROR',
        });
      }
    }

    if (req.body.phone && req.body.phone !== useProfile.phone) {
      const phoneExist = await Profile.findOne({
        where: { phone: req.body.phone },
      });
      if (phoneExist) {
        return res.status(401).json({
          message: 'Already phone exists!',
          success: false,
          data: 'FAILURE',
          error: 'ERROR',
        });
      }
    }

    await user.update(req.body);
    await useProfile.update(req.body);

    const { id, username, profile, active, profiles } = await User.findByPk(
      req.userId,
      {
        include: [
          {
            model: Profile,
            as: 'profiles',
            attributes: ['id', 'name', 'phone'],
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['id', 'path', 'url'],
              },
            ],
          },
        ],
      }
    );

    if (profiles === null) {
      const {
        name,
        email,
        phone,
        user_id,
        avata_id,
        birth_date,
        shipping_address_id,
      } = await Profile.findOne({ where: { user_id: req.userId } });

      return res.status(200).json({
        message: 'Data updated successfully',
        success: true,
        error: null,
        data: {
          user: {
            id,
            email,
            active,
            profile,
            username,
            profiles: {
              name,
              phone,
              user_id,
              avata_id,
              birth_date,
              shipping_address_id,
              avatar: null,
            },
          },
        },
      });
    }

    return res.json({
      message: 'User successfully changed',
      success: true,
      data: { id, username, profile, active, profiles },
      error: null,
    });
  }
}

export default new UserController();
