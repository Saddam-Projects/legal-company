import { z } from 'zod';

export const serviceSchema = z.object({
  file: z.any(),
  name: z.string(),
  price: z.string(),
  description: z.string(),
});
