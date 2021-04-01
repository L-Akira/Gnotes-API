import { Router } from 'express';
import { AccountController } from '../controllers/';


const router = Router();

const accountController = new AccountController;

router.post('/create', accountController.store);

router.get('/user/:id', accountController.index);

router.delete('/delete/:id', accountController.delete);

export default router;