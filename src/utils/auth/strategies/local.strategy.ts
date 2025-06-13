import passport from 'passport';
import { Strategy } from 'passport-local';
import SessionsService from '../../../services/sessions.service';
import createHttpError from 'http-errors';
import { SafeUser } from '../../types/safe-user.type';
import { HttpStatus } from '../../enums/http-status.enum';

passport.use(
  new Strategy(
    { usernameField: 'email' },
    async (email: string, password: string, done): Promise<void> => {
      try {
        const user: SafeUser | null = await SessionsService.validatePassword(
          email,
          password
        );

        if (!user) {
          return done(
            createHttpError(HttpStatus.UNAUTHORIZED, 'Invalid password.'),
            false
          );
        }

        return done(null, user);
      } catch (e) {
        done(e);
      }
    }
  )
);

export default passport;
