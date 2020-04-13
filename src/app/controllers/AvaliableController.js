import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import Schedule from '../models/Schedule';

class AvaliableController {
  async store(req, res) {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const seachDate = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: { [Op.between]: [startOfDay(seachDate), endOfDay(seachDate)] },
      },
    });

    const schedules = await Schedule.findOne({
      where: { profile_id: req.profileId },
      attributes: [
        'id',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
        'profile_id',
        'object',
      ],
    });

    console.log(req.profileId);
    console.log(req.userId);
    console.log(schedules);

    const schedule = [
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
    ];

    const availiable = schedule.map(time => {
      const [hour, minute] = time.split(':');
      const value = setSeconds(
        setMinutes(setHours(seachDate, hour), minute),
        0
      );
      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        availiable:
          isAfter(value, new Date()) &&
          !appointments.find(a => format(a.date, 'HH:mm') === time),
      };
    });

    return res.status(200).json(availiable);
  }
}

export default new AvaliableController();
