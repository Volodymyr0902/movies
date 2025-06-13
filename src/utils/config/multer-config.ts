import multer, { Multer, StorageEngine } from 'multer';
import { Request } from 'express';
import { FileFilter } from '../types/file-filter.type';
import {
  ALLOWED_MIME_TYPE,
  MAX_FILE_SIZE_BYTES,
  TEMP_LOCAL_FILE_PATH,
} from '../constants/constants';
import createHttpError from 'http-errors';
import { HttpStatus } from '../enums/http-status.enum';

const storage: StorageEngine = multer.diskStorage({
  destination: TEMP_LOCAL_FILE_PATH,
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter: FileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  if (file.mimetype === ALLOWED_MIME_TYPE) {
    cb(null, true);
  } else {
    cb(createHttpError(HttpStatus.BAD_REQUEST, 'Only .txt files are allowed'));
  }
};

export const upload: Multer = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
  },
});
