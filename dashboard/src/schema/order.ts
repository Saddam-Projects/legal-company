import { z } from 'zod';

export const orderSchema = z.object({
  customer_name: z.string(),
  customer_phone: z.string().max(13).regex(/^\d/, 'Phone number must be digits'),
  customer_email: z.string().email(),
  message: z.string(),
  order_items: z.string(),
});
