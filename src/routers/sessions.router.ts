import { Router } from 'express';
import SessionsController from '../controllers/sessions.controller';
import passport from '../utils/auth/strategies/local.strategy';

const SessionsRouter: Router = Router();

SessionsRouter.post(
  '/',
  passport.authenticate('local', { session: false }),
  SessionsController.create
);

export default SessionsRouter;
