import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import CustomerController from './app/controllers/CustomerController';

import authMiddlware from './app/middleware/auth';
import multerConfig from './config/multer';

const routes = new Router();
/**
 * @constant configuração do arquivo multer upload.
 */
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
/**
 * @rotas users
 */
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.post('/customers', CustomerController.store);

routes.use(authMiddlware);
routes.put('/users', UserController.update);
routes.get('/providers', ProviderController.store);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

/**
 * @requires upload.sigle('file') nos diz que apenas um único arquivo será upado por requisição e não vários
 */
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
