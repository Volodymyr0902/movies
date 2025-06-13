import passport from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import dotenv from 'dotenv';
import { SafeUser } from '../../types/safe-user.type';

dotenv.config();

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!,
    },
    async (payload: SafeUser, done: VerifiedCallback): Promise<void> => {
      return done(null, payload);
    }
  )
);

export default passport;
