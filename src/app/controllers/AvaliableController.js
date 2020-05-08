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

    // searches for all available appointments and a set date
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: { [Op.between]: [startOfDay(seachDate), endOfDay(seachDate)] },
      },
    });

    // check which day of the week
    const weekDay = week.find(d => d.key === getISODay(seachDate));

    const schedules = await Schedule.findOne({
      where: { profile_id: req.profileId },
      attributes: [weekDay.value.week],
    });

    const scheduleWeek = schedules.dataValues[weekDay.value.week][0]
      ? schedules.dataValues[weekDay.value.week][0].split(',')
      : null;

    if (!scheduleWeek)
      return res.status(200).json({ availiable: [], scheduleWeek: [] });

    const availiable = scheduleWeek.map(time => {
      const [hour, minute] = time.split(':');
      const checkDate = setMilliseconds(
        setSeconds(setMinutes(setHours(seachDate, hour), minute), 0),
        0
      );
      return {
        time: `${hour}:${minute}`,
        value: format(checkDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        availiable:
          isAfter(checkDate, new Date()) &&
          !appointments.find(a => format(a.date, 'HH:mm') === time),
      };
    });

    return res.status(200).json({ availiable, scheduleWeek });
  }
}

export default new AvaliableController();
