import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import { ZodError } from 'zod/v4';
import { EmptyResultError, ValidationError } from 'sequelize';
import { HttpStatus } from '../enums/http-status.enum';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  const statusCode: number =
    err instanceof ZodError || err instanceof ValidationError
      ? HttpStatus.BAD_REQUEST
      : err instanceof EmptyResultError
        ? HttpStatus.NOT_FOUND
        : err instanceof HttpError
          ? err.statusCode
          : HttpStatus.INTERNAL_SERVER_ERROR;

  const message: string =
    err instanceof ZodError
      ? err.issues.map((issue) => issue.message).join(', ')
      : err instanceof ValidationError
        ? err.errors.map((error) => error.message).join(', ')
        : err instanceof EmptyResultError
          ? 'Not found'
          : err instanceof HttpError
            ? err.message
            : 'Internal Server Error';

  res.status(statusCode).send({
    message,
    status: 0,
  });
};
