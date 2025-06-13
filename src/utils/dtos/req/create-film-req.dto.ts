import { z } from 'zod/v4';
import { CreateFilmSchema } from '../../validation/zod-schemas/create-film.schema';

export type CreateFilmReqDto = z.infer<typeof CreateFilmSchema>;
