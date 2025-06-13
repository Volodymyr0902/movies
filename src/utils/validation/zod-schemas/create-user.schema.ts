import { z } from 'zod/v4';

export const CreateUserSchema = z.object({
  name: z.string(),
  email: z.email({}),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});
