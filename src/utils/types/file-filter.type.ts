import { Request } from 'express';
import multer from 'multer';

export type FileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => void;
