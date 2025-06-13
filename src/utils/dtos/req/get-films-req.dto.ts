import { z } from 'zod/v4';
import { GetFilmsSchema } from '../../validation/zod-schemas/get-films.schema';

export type GetFilmsReqDto = z.infer<typeof GetFilmsSchema>;
