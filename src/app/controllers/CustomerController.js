import Profile from '../models/Profile';
import User from '../models/User';

class CustomerController {
  async store(req, res) {
    const { name, email, phone } = req.body;
    const userExist = await User.findOne({
      where: { username: req.bode.username },
    });

    if (userExist) {
      return res.status(401).json({
        message: 'Username is allready in use',
      });
    }

    let emailExists;
    try {
      emailExists = await Profile.findOne({
        where: { email: req.body.email },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Server internal error', error, data: null });
    }

    if (emailExists) {
      return res
        .status(400)
        .json({ message: 'Email is already in use', error: null });
    }

    const { id } = await User.create(req.body);

    const customer = await Profile.create({
      name,
      email,
      phone,
      user_id: id,
    });

    return res.status(201).json({
      message: 'Profile successfully created',
      error: null,
      data: customer,
    });
  }
}

export default new CustomerController();
