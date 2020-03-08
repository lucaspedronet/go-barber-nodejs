import Customer from '../models/Customer';

class CustomerController {
  async store(req, res) {
    let emailExists;
    try {
      emailExists = await Customer.findOne({
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

    let documentExists;
    try {
      documentExists = await Customer.findOne({
        where: { document: req.body.document },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Server internal error', error, data: null });
    }

    if (documentExists) {
      return res
        .status(400)
        .json({ message: 'Document is already in use', error: null });
    }

    const { firt_name, last_name, email, phone } = await Customer.create(
      req.body
    );

    return res.status(201).json({
      message: 'Customer successfully created',
      error: null,
      data: { firt_name, last_name, email, phone },
    });
  }
}

export default new CustomerController();
