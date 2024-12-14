import { z } from 'zod';

export const referenceSchema = z.object({
  company_name: z.string(),
  company_phone: z.string().max(13).regex(/^\d/, 'Phone number must be digits'),
  company_email: z.string().email(),
  address: z.string(),
  address_lat: z.string().optional(),
  company_logo: z.string(),
  address_long: z.string().optional(),
});
