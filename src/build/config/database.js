"use strict";
module.exports = {
    dialect: 'postgres',
    host: '192.168.99.100',
    username: 'postgres',
    password: 'docker',
    database: 'gobarber',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
// const Sequelize = require('sequelize');
// // Option 1: Passing parameters separately
// const database = new Sequelize('database', 'username', 'password', {
//   dialect: 'postgres',
//   host: '192.168.99.100',
//   username: 'postgres',
//   password: 'docker',
//   database: 'gobarber',
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// });
// export default database;
