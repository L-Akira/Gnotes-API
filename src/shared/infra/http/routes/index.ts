import { AccountRoutes } from '@modules/accounts/infra/http/routes';
import { AuthRoutes } from '@modules/auth/infra/http/routes';
import { Router } from 'express';

const routes = Router();

routes.use('/accounts', AccountRoutes);
routes.use('/auth', AuthRoutes);

export default routes;