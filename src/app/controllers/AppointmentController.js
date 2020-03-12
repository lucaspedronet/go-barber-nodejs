import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Notification from '../schemas/Notification';

import Appointment from '../models/Appointment';
import File from '../models/File';
import User from '../models/User';
import Profile from '../models/Profile';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
  async index(req, res) {
    try {
      const { page } = req.query;

      const appointments = await Appointment.findAll({
        where: { user_id: req.userId, canceled_at: null },
        order: ['date'],
        attributes: ['id', 'date', 'past', 'cancelable'],
        limit: 20,
        offset: (page - 1) * 20,
        include: [
          {
            model: User,
            as: 'provider',
            attributes: ['username'],
            include: [
              {
                model: Profile,
                as: 'profiles',
                attributes: ['id', 'name', 'phone', 'shipping_address_id'],
                include: [
                  {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url'],
                  },
                ],
              },
            ],
          },
        ],
      });

      return res.status(200).json({
        message: 'Success request',
        success: true,
        data: appointments,
        error: null,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error',
        success: false,
        data: null,
        error: error.message,
      });
    }
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

    try {
      const checkProvider = await User.findOne({
        where: { id: provider_id, profile: 'provider' },
      });

      if (!checkProvider) {
        return res
          .status(401)
          .json({ error: 'You can only create appointment with provider' });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error',
        success: false,
        data: null,
        error: error.message,
      });
    }

    if (req.userId === provider_id) {
      return res
        .status(401)
        .json({ error: 'You cannot be a provider on your own schedule' });
    }

    /**
     * check for past dates
     */
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past date ware not permitted' });
    }

    try {
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
        return res.status(401).json({ error: 'Appointment is not available' });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error',
        success: false,
        data: null,
        error: error.message,
      });
    }

    try {
      const user = await Profile.findOne({ where: { user_id: req.userId } });

      const appointment = await Appointment.create({
        user_id: req.userId,
        provider_id,
        date: hourStart,
        service_provider_id: 2,
      });

      /**
       * Format notify appointment provider
       */
      const formatter = format(hourStart, "'dia' dd 'de' MMMM', às' H:mm'h'", {
        locale: ptBR,
      });

      /**
       * @constructs Schema: Notification push para prestador
       */
      Notification.create({
        content: `Novo agendamento de ${user.name} para o ${formatter}`,
        user: req.userId,
      });

      return res.status(201).json(appointment);
      /**
       * retorna appointment
       */
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error',
        success: false,
        data: null,
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const appointment = await Appointment.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: 'provider',
            attributes: ['id', 'username', 'profile'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'profile'],
          },
        ],
      });

      if (!appointment) {
        return res.status(401).json({
          error: 'Appointment already not exists',
        });
      }

      /**
       * check: verifica se o usuário que esta logado é dono do agendamento/compromisso
       */
      if (appointment && appointment.user_id !== req.userId) {
        return res.status(401).json({
          error: "You don't have permission to cancell this appointment",
        });
      }

      /**
       * check: verifica se o usuário pode realizar o cancelamento do agendamento/compromisso
       */
      if (appointment && !appointment.cancelable) {
        return res.status(401).json({
          error: 'This appointment cannot be canceled',
        });
      }

      /**
       * dateWithSubHor: Remove duas 02:00h da data do agendamento
       */
      const dateWithSubHor = subHours(appointment && appointment.date, 2);

      /**
       * checkSubHours: Verifica se o harário atual esta a menos de 2h do horário do agendamento
       * se sim, NÂO será possível realizar o cancelamento.
       */
      if (isBefore(dateWithSubHor, new Date())) {
        return res
          .status(401)
          .json({ error: 'Not possible cancell appointment in 02:00 hours' });
      }

      /**
       * recebe o horário do cancelamento & cancelable recebe false.
       */
      appointment.canceled_at = new Date();
      appointment.cancelable = false;
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
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error',
        success: false,
        data: null,
        error: error.message,
      });
    }
  }
}
export default new AppointmentController();
