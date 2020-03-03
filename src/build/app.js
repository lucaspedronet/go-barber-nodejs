/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express from 'express';
import routes from './routes';
import './database';
var App = /** @class */ (function () {
    function App() {
        this.server = express();
        this.middlewares();
        this.routes();
    }
    App.prototype.middlewares = function () {
        this.server.use(express.json());
    };
    App.prototype.routes = function () {
        this.server.use(routes);
    };
    return App;
}());
export default new App().server;
