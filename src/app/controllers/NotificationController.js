import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, profile: 'provider' },
    });

    if (!checkIsProvider) {
      return res
        .status(400)
        .json({ error: 'Only provider can loand notification!' });
    }

    const notifications = await Notification.find({
      provider: req.userId,
    }).sort({
      createdAt: 'desc',
    });
    return res.json(notifications);
  }

  async update(req, res) {
    let notification;

    try {
      notification = await Notification.findByIdAndUpdate(
        req.params.id,
        { read: true },
        { new: true }
      );
    } catch (error) {
      return res.status(400).json({
        messager: 'Notification does not exists',
        error: error.message,
      });
    }

    return res.status(200).json(notification);
  }
}

export default new NotificationController();
