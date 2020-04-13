import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvaliableController from './app/controllers/AvaliableController';
import ServiceController from './app/controllers/ServiceController';
import ShippingAddressController from './app/controllers/ShippingAddressController';

import authMiddlware from './app/middleware/auth';
import multerConfig from './config/multer';
import CategoryServiceController from './app/controllers/CategoryServiceController';

const routes = new Router();
/**
 * @constant configuração do arquivo multer upload.
 */
const upload = multer(multerConfig);

routes.post('/v1/sessions', SessionController.store);
/**
 * @rotas users
 */
routes.post('/v1/users', UserController.store);

routes.use(authMiddlware);
routes.get('/v1/users', UserController.index);
routes.put('/v1/users', UserController.update);
routes.get('/v1/providers', ProviderController.store);
routes.get('/v1/providers/:providerId/available', AvaliableController.store);
/**
 * @access /v1/appointments
 */
routes.get('/v1/appointments', AppointmentController.index);
routes.post('/v1/appointments', AppointmentController.store);
routes.delete('/v1/appointments/:id', AppointmentController.delete);
/**
 * @access /v1/schedule
 */
routes.get('/v1/schedule', ScheduleController.index);
routes.post('/v1/schedule', ScheduleController.store);
/**
 * @access /v1/notifications
 */
routes.get('/v1/notifications', NotificationController.index);
routes.put('/v1/notifications/:id', NotificationController.update);

/**
 * @requires upload.sigle('file') nos diz que apenas um único arquivo será upado por requisição e não vários
 */
routes.post('/v1/files', upload.single('file'), FileController.store);

routes.post('/v1/services', ServiceController.store);
routes.get('/v1/services', ServiceController.index);

routes.post('/v1/shipping/address', ShippingAddressController.store);

routes.get('/v1/category/services', CategoryServiceController.index);
routes.post('/v1/category/services', CategoryServiceController.store);

export default routes;
