import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const UsersRouter: Router = Router();

UsersRouter.post('/', UsersController.create);

export default UsersRouter;
