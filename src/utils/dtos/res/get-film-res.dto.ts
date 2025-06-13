import { Film } from '../../../models/film';

export type GetFilmResDto = {
  data: Film;
  status: number;
};
