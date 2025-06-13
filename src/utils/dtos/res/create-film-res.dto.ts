import { Film } from '../../../models/film';

export type CreateFilmResDto = {
  data: Film;
  status: number;
};
