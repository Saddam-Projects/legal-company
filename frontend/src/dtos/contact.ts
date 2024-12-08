import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  email: z.string().email(),
  phone: z.string().max(13).regex(/^\d/, 'Phone number must be digits'),
  message: z.string(),
});

export default contactSchema;
