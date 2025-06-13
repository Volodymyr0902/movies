import { Film } from '../../models/film';

export type FindManyFilmsResult = {
  rows: Film[];
  count: number;
};
