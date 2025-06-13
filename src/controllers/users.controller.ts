import { Request, Response, NextFunction } from 'express';
import { CreateUserSchema } from '../utils/validation/zod-schemas/create-user.schema';
import { CreateUserReqDto } from '../utils/dtos/req/create-user-req.dto';
import UsersService from '../services/users.service';
import { CreateUserResDto } from '../utils/dtos/res/create-user-res.dto';
import { HttpStatus } from '../utils/enums/http-status.enum';

class UsersController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createUserReqDto: CreateUserReqDto = CreateUserSchema.parse(
        req.body
      );
      const createUserResDto: CreateUserResDto =
        await UsersService.create(createUserReqDto);
      res.status(HttpStatus.CREATED).send(createUserResDto);
    } catch (e) {
      next(e);
    }
  }
}

export default new UsersController();
