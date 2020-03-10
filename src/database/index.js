/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';
import Customer from '../app/models/Customer';
import Provider from '../app/models/Provider';

import databaseConfig from '../config/database';

const models = [User, File, Appointment, Customer, Provider];

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
    this.mongoConnection = mongoose.connect(
      'mongodb://lucaspedro:lucas015@ds058548.mlab.com:58548/mongobarber',
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}
export default new DataBase();
