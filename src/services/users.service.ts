import { CreateUserReqDto } from '../utils/dtos/req/create-user-req.dto';
import UsersRepository from '../repositories/users.repository';
import createHttpError from 'http-errors';
import SessionsService from './sessions.service';
import { CreateUserResDto } from '../utils/dtos/res/create-user-res.dto';
import { SafeUser } from '../utils/types/safe-user.type';

class UsersService {
  async create(createUserReqDto: CreateUserReqDto): Promise<CreateUserResDto> {
    const { name: nameDto, email: emailDto, password } = createUserReqDto;
    const exists: boolean = await UsersRepository.exists(nameDto);

    if (exists) {
      createHttpError(400, 'User already exists');
    }

    const { id, name, email } = await UsersRepository.createWithHashedPass(
      nameDto,
      emailDto,
      password
    );
    const payload: SafeUser = { id, name, email };
    const token: string = await SessionsService.generateToken(payload);

    return {
      token,
      status: 1,
    };
  }
}

export default new UsersService();
