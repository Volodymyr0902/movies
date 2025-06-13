import { User } from '../models/user';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

class UsersRepository {
  async exists(email: string): Promise<boolean> {
    const user: User | null = await User.findOne({
      where: {
        [Op.or]: [{ email }],
      },
    });

    return !!user;
  }

  async createWithHashedPass(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const salt: string = await bcrypt.genSalt();
    const hashedPass: string = await bcrypt.hash(password, salt);

    return User.create({
      name,
      email,
      password: hashedPass,
    });
  }

  async findOneByEmailOrFail(email: string): Promise<User> {
    return User.findOne({
      where: { email },
      rejectOnEmpty: createHttpError(404, `User not found.`),
    });
  }
}

export default new UsersRepository();
