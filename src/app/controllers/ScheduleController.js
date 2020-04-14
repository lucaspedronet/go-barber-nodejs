import { startOfDay, endOfDay, parseISO } from 'date-fns';
import * as Yup from 'yup';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';
import Profile from '../models/Profile';
import Schedule from '../models/Schedule';
import Service from '../models/Service';
import File from '../models/File';

class ScheduleController {
  async index(req, res) {
    const checkUser = await User.findOne({
      where: { id: req.userId, profile: 'provider' || 'customer' },
    });

    if (!checkUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const parsedDate = parseISO(req.query.date);

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
      include: [
        {
          model: Profile,
          as: 'profiles',
          attributes: ['id', 'name', 'email', 'phone', 'user_id'],
        },
        {
          model: Service,
          as: 'service',
          attributes: ['title', 'description', 'category'],
          include: [
            {
              model: File,
              as: 'image',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    if (!appointments) {
      return res.status(400).json({ error: 'Appointmets does not' });
    }

    return res.status(200).json([...appointments]);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      monday: Yup.string(),
      tuesday: Yup.string(),
      wednesday: Yup.string(),
      thursday: Yup.string(),
      friday: Yup.string(),
      saturday: Yup.string(),
      sunday: Yup.string(),
    });

    if (req.isProfile !== 'provider') {
      return res
        .status(401)
        .json({ error: "User not permission 'create schedules'" });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    } = req.body;

    const schedule = await Schedule.create({
      monday: [monday],
      tuesday: [tuesday],
      wednesday: [wednesday],
      thursday: [thursday],
      friday: [friday],
      saturday: [saturday],
      sunday: [sunday],
      profile_id: req.profileId,
    });

    return res.status(200).json(schedule);
  }
}

export default new ScheduleController();
