import jwt from 'jsonwebtoken';
import UsersRepository from '../repositories/users.repository';
import bcrypt from 'bcrypt';
import { SafeUser } from '../utils/types/safe-user.type';
import { CreateSessionResDto } from '../utils/dtos/res/create-session-res.dto';
import { JWT_EXPIRES_IN } from '../utils/constants/constants';

class SessionsService {
  create(userPayload: SafeUser): CreateSessionResDto {
    const token: string = this.generateToken(userPayload);
    return {
      token,
      status: 1,
    };
  }

  generateToken(userPayload: SafeUser): string {
    const secret: string = process.env.JWT_SECRET!;
    return jwt.sign(userPayload, secret, { expiresIn: JWT_EXPIRES_IN });
  }

  async validatePassword(
    emailDto: string,
    passwordDto: string
  ): Promise<SafeUser | null> {
    const { password, id, email, name } =
      await UsersRepository.findOneByEmailOrFail(emailDto);
    const isMatch: boolean = await bcrypt.compare(passwordDto, password);
    return isMatch ? { id, email, name } : null;
  }
}

export default new SessionsService();
