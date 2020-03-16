import ShippingAddress from '../models/ShippingAddress';
import User from '../models/User';

class ShippingAddressController {
  async store(req, res) {
    const userExists = await User.findByPk(req.userId);

    if (!userExists) {
      return res.status(401).json({ error: 'User not exists' });
    }

    const address = await ShippingAddress.create(req.body);
    return res.status(200).json(address);
  }
}

export default new ShippingAddressController();
