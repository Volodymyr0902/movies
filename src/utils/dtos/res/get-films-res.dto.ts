import { Film } from '../../../models/film';

export type GetFilmsResDto = {
  data: Film[];
  meta: {
    total: number;
  };
  status: number;
};
