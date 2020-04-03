import ShippingAddress from '../models/ShippingAddress';

import User from '../models/User';

class ShippingAddressController {
  async store(req, res) {
    const {
      zipcode,
      street,
      number,
      neighborhood,
      complement,
      state,
      country,
    } = req.body;
    const userExists = await User.findByPk(req.userId);

    if (!userExists) {
      return res.status(401).json({ error: 'User not exists' });
    }

    const address = await ShippingAddress.create({
      zipcode,
      street,
      number,
      neighborhood,
      complement,
      state,
      country,
    });
    return res.status(201).json(address);
  }
}

export default new ShippingAddressController();
