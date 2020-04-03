/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';
import ShippingAddress from '../app/models/ShippingAddress';
import Profile from '../app/models/Profile';
import ServicePrice from '../app/models/ServicePrice';
import Service from '../app/models/Service';
import WeekShift from '../app/models/WeekShift';
import DayShift from '../app/models/DayShift';

import databaseConfig from '../config/database';

const models = [
  ShippingAddress,
  ServicePrice,
  Appointment,
  WeekShift,
  DayShift,
  Service,
  Profile,
  File,
  User,
];

class DataBase {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
    // model.associate ela só é executada se existir no model, isso graças a condição &&
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}
export default new DataBase();
