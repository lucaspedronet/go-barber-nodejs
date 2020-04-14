import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
  getISODay,
  setMilliseconds,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import Schedule from '../models/Schedule';
import { week } from '../../lib/SchedulesWeek';

class AvaliableController {
  async store(req, res) {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const seachDate = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: { [Op.between]: [startOfDay(seachDate), endOfDay(seachDate)] },
      },
    });

    const weekDay = week.find(d => d.key === getISODay(seachDate));

    const schedules = await Schedule.findOne({
      where: { profile_id: req.profileId },
      attributes: [weekDay.value.week],
    });

    const scheduleWeek = schedules.dataValues[weekDay.value.week][0].split(',');

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

    const availiable = scheduleWeek.map(time => {
      const [hour, minute] = time.split(':');
      const value = setSeconds(
        setMinutes(setHours(seachDate, hour), minute),
        0
      );
      const checkDate = setMilliseconds(
        setSeconds(setMinutes(setHours(seachDate, hour), minute), 0),
        0
      );
      return {
        time,
        value: format(checkDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        availiable:
          isAfter(checkDate, new Date()) &&
          !appointments.find(a => format(a.date, 'HH:mm') === time),
      };
    });

    return res.status(200).json(availiable);
  }
}

export default new AvaliableController();
