import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Notification from '../schemas/Notification';

import Appointment from '../models/Appointment';
import File from '../models/File';
import User from '../models/User';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
  async index(req, res) {
    const { page } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'url', 'path'],
            },
          ],
        },
      ],
    });

    return res.status(200).json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;
    let checkProvider;
    try {
      checkProvider = await User.findOne({
        where: { id: provider_id, provider: true },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.message, meassger: 'Internal fails', data: null });
    }

    if (!checkProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointment with provider' });
    }

    if (req.userId === provider_id) {
      return res
        .status(400)
        .json({ error: 'Im not possible agender is provider' });
    }

    /**
     * check for past dates
     */
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past date ware not permitted' });
    }

    /**
     * check date avaliability
     */
    const checkAvaliability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvaliability) {
      return res.status(400).json({ error: 'Appointment is not available' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    /**
     * NOtify appointment provider
     */
    const formatter = format(hourStart, "'dia' dd 'de' MMMM', às' H:mm'h'", {
      locale: ptBR,
    });

    Notification.create({
      content: `Novo agendamento de ${req.userName} para o ${formatter}`,
      user: req.userId,
    });

    return res.status(201).json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    /**
     * check: verifica se o usuário que esta logado é dono do agendamento
     */
    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancell this appointment",
      });
    }

    /**
     * checkSubHours: Verifica se o harário atual esta a menos de 2h do horário do agendamento
     * se sim, NÂO será possível realizar o cancelamento.
     */
    const dateWithSubHor = subHours(appointment.date, 2);

    if (isBefore(dateWithSubHor, new Date())) {
      return res
        .status(401)
        .json({ error: 'Not possible cancell appointment' });
    }

    /**
     * recebe o horário do cancelamento
     */
    appointment.canceled_at = new Date();
    await appointment.save();

    /**
     * Adiciona o jobs 'CancellationMail' a Fila passando appointment como dados a ser processados
     */
    await Queue.add(CancellationMail.key, { appointment });

    return res.status(200).json({
      error: null,
      messager: 'success',
      data: appointment,
    });
  }
}
export default new AppointmentController();
