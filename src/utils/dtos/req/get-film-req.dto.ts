import { z } from 'zod/v4';
import { GetFilmSchema } from '../../validation/zod-schemas/get-film.schema';

export type GetFilmReqDto = z.infer<typeof GetFilmSchema>;
