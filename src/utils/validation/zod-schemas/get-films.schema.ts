import { z } from 'zod/v4';

export const GetFilmsSchema = z.object({
  star: z.string().trim().nonempty().optional(),
  title: z.string().trim().nonempty().optional(),
  search: z.string().trim().nonempty().optional(),
  sort: z.enum(['id', 'title', 'release_year']).default('id'),
  order: z.enum(['ASC', 'DESC']).default('ASC'),
  limit: z.coerce.number().int().default(20),
  offset: z.coerce.number().int().default(0),
});
