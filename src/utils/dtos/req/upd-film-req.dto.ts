import { z } from 'zod/v4';
import { UpdateFilmSchema } from '../../validation/zod-schemas/update-film.schema';

export type UpdFilmReqDto = z.infer<typeof UpdateFilmSchema>;
