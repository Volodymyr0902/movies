import { z } from 'zod/v4';
import { CreateUserSchema } from '../../validation/zod-schemas/create-user.schema';

export type CreateUserReqDto = z.infer<typeof CreateUserSchema>;
