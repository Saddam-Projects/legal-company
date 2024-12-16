import { z } from 'zod';

export const authSchema = z.object({
  username: z.string().min(4),
  password: z.string(),
});
