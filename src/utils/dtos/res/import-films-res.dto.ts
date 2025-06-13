import { GetFilmsResDto } from './get-films-res.dto';

export type ImportFilmsResDto = GetFilmsResDto & {
  meta: {
    imported: number;
  };
};
