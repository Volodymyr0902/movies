import { z } from 'zod/v4';

export const GetFilmSchema = z.object({
  id: z.coerce.number().int().positive(),
});
