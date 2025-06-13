import { z } from 'zod/v4';
import { FilmFormats } from '../../enums/film-formats.enum';

export const UpdateFilmSchema = z.object({
  title: z.string().optional(),
  release_year: z
    .number()
    .int()
    .positive()
    .lte(new Date().getFullYear())
    .optional(),
  format: z.enum(FilmFormats).optional(),
  stars: z.array(z.string()).optional(),
});
