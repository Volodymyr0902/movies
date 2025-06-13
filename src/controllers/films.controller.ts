import { NextFunction, Request, Response } from 'express';
import FilmsService from '../services/films.service';
import { CreateFilmReqDto } from '../utils/dtos/req/create-film-req.dto';
import { CreateFilmResDto } from '../utils/dtos/res/create-film-res.dto';
import { GetFilmResDto } from '../utils/dtos/res/get-film-res.dto';
import { DelFilmResDto } from '../utils/dtos/res/del-film-res.dto';
import { GetFilmsResDto } from '../utils/dtos/res/get-films-res.dto';
import { UpdFilmResDto } from '../utils/dtos/res/upd-film-res.dto';
import { UpdFilmReqDto } from '../utils/dtos/req/upd-film-req.dto';
import { GetFilmsReqDto } from '../utils/dtos/req/get-films-req.dto';
import { GetFilmsSchema } from '../utils/validation/zod-schemas/get-films.schema';
import { GetFilmSchema } from '../utils/validation/zod-schemas/get-film.schema';
import { CreateFilmSchema } from '../utils/validation/zod-schemas/create-film.schema';
import { UpdateFilmSchema } from '../utils/validation/zod-schemas/update-film.schema';
import createHttpError from 'http-errors';
import { GetFilmReqDto } from '../utils/dtos/req/get-film-req.dto';
import { HttpStatus } from '../utils/enums/http-status.enum';
import { ImportFilmsResDto } from '../utils/dtos/res/import-films-res.dto';

export class FilmsController {
  async find(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const getFilmsReqDto: GetFilmsReqDto = GetFilmsSchema.parse(req.query);
      const allFilmsResult: GetFilmsResDto =
        await FilmsService.find(getFilmsReqDto);
      res.send(allFilmsResult);
    } catch (e) {
      next(e);
    }
  }

  async findOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id }: GetFilmReqDto = GetFilmSchema.parse(req.params);
      const oneFilmResult: GetFilmResDto = await FilmsService.findOne(+id);
      res.send(oneFilmResult);
    } catch (e) {
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createFilmDto: CreateFilmReqDto = CreateFilmSchema.parse(req.body);
      const createFilmResult: CreateFilmResDto =
        await FilmsService.create(createFilmDto);
      res.status(HttpStatus.CREATED).send(createFilmResult);
    } catch (e) {
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = GetFilmSchema.parse(req.params);
      const updateFilmDto: UpdFilmReqDto = UpdateFilmSchema.parse(req.body);
      const updateFilmResult: UpdFilmResDto = await FilmsService.update(
        +id,
        updateFilmDto
      );
      res.send(updateFilmResult);
    } catch (e) {
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = GetFilmSchema.parse(req.params);
      const deleteFilmResult: DelFilmResDto = await FilmsService.delete(+id);
      res.send(deleteFilmResult);
    } catch (e) {
      next(e);
    }
  }

  async import(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.file) {
      throw createHttpError(HttpStatus.BAD_REQUEST, 'No file uploaded');
    }

    try {
      const importResult: ImportFilmsResDto = await FilmsService.import(
        req.file
      );
      res.status(HttpStatus.CREATED).send(importResult);
    } catch (e) {
      next(e);
    }
  }
}

export default new FilmsController();
