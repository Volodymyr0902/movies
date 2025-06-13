import { z } from 'zod/v4';
import { FilmFormats } from '../../enums/film-formats.enum';

export const CreateFilmSchema = z.object({
  title: z.string(),
  release_year: z.number().int().positive().lte(new Date().getFullYear()),
  format: z.enum(FilmFormats),
  stars: z.array(z.string()),
});
