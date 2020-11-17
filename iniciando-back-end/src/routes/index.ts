import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRoutes from './sessions.routes';

const routes = Router();

// o use funciona pra qlqr tipo de rota: post, get...
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRoutes);

export default routes;
