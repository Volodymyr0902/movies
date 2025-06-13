import { Router } from 'express';
import FilmsRouter from './films.router';
import UsersRouter from './users.router';
import SessionsRouter from './sessions.router';
import passport from '../utils/auth/strategies/jwt.strategy';

const ApiRouter: Router = Router();

ApiRouter.use(
  '/films',
  passport.authenticate('jwt', { session: false }),
  FilmsRouter
);
ApiRouter.use('/users', UsersRouter);
ApiRouter.use('/sessions', SessionsRouter);

export default ApiRouter;
