import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const { date } = req.query;
    const checkUser = await User.findOne({
      where: { id: req.userId, provider: true },
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
      order: ['date'],
    });

    if (!appointments) {
      return res.status(400).json({ error: 'Appointmets does not' });
    }

    return res.status(200).json(appointments);
  }
}

export default new ScheduleController();
