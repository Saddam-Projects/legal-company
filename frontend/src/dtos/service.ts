import { z } from 'zod';

const serviceFormSchema = z.object({
  name: z.string().min(1, {
    message: 'name must be at least 1 characters.',
  }),
  email: z
    .string({
      required_error: 'email is required',
    })
    .min(1, {
      message: 'email must be at least 1 characters.',
    })
    .email(),
  phone: z.string().max(13).regex(/^\d/, 'Phone number must be digits'),
  message: z.string().min(1, {
    message: 'message must be at least 1 characters.',
  }),
  service: z.string({
    required_error: 'service is required',
  }),
});

export default serviceFormSchema;
