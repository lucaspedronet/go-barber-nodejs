import { startOfDay, endOfDay, parseISO, differenceInHours } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';
import Profile from '../models/Profile';

class ScheduleController {
  async index(req, res) {
    const { date } = req.query;
    const checkUser = await User.findOne({
      where: { id: req.userId, profile: 'provider' || 'customer' },
    });

    if (!checkUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const parsedDate = parseISO(date);

    /**
     * check todos os agendamento do provider naquele dia
     * startOfDay: Primeira hora do dia 00:00:00
     * endOfDay: Última hora do dia 23:59.59
     * [Op.between] trás todos os agendamentos neste intervalo de horas
     */
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'profile_id'],
          include: [
            {
              model: Profile,
              as: 'profiles',
              attributes: ['name', 'phone'],
            },
          ],
        },
      ],
      order: ['date'],
      attributes: [
        'id',
        'past',
        'cancelable',
        'date',
        'service_provider_id',
        'created_at',
        'updated_at',
        'canceled_at',
      ],
    });

    if (!appointments) {
      return res.status(400).json({ error: 'Appointmets does not' });
    }

    return res.status(200).json(appointments);
  }

  async store(req, res) {
    const userExits = User.findByPk(req.userId);
    if (!userExits) {
      return res.status(401).json({ error: 'User already exists' });
    }

    if (req.isProfile !== 'provider') {
      return res.status(401).json({ error: 'User not permission create hour' });
    }

    return res.status(200).json({
      ok: differenceInHours(
        new Date('2020-03-16T09:30:00-03:00'),
        new Date('2020-03-16T06:00:00-03:00')
      ),
    });
  }
}

export default new ScheduleController();
