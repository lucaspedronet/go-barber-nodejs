/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import User from '../app/models/User';
var Sequelize = require('sequelize');
var databaseConfig = require('../config/database');
var models = [User];
var DataBase = /** @class */ (function () {
    function DataBase() {
        this.init();
        this.dataConfig = databaseConfig;
    }
    DataBase.prototype.init = function () {
        var _this = this;
        this.connection = new Sequelize(this.dataConfig);
        models.map(function (model) { return model.init(_this.connection); });
    };
    return DataBase;
}());
export default new DataBase();
