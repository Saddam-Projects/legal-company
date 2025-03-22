import { z } from 'zod';

export const blogSchema = z.object({
  title: z.string(),
  content: z.string(),
  image: z.string(),
  file: z.any(),
  category: z.string(),
  author: z.string(),
  slug: z.string(),
  keywords: z.string().optional(),
  description: z.string().optional(),
});
