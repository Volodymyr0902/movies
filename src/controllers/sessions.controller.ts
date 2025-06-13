import { Request, Response, NextFunction } from 'express';
import SessionsService from '../services/sessions.service';
import { CreateSessionResDto } from '../utils/dtos/res/create-session-res.dto';
import { SafeUser } from '../utils/types/safe-user.type';
import { HttpStatus } from '../utils/enums/http-status.enum';

class SessionsController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const safeUser = req.user as SafeUser;
      const createSessionResDto: CreateSessionResDto =
        SessionsService.create(safeUser);
      res.status(HttpStatus.CREATED).send(createSessionResDto);
    } catch (e) {
      next(e);
    }
  }
}

export default new SessionsController();
