import { AccountRoutes } from '@modules/accounts/infra/http/routes';
import { Router } from 'express';

const routes = Router();

routes.use('/accounts', AccountRoutes);

export default routes;