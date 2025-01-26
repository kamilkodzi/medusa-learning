import { z } from 'zod';

export const PostStoreCustomSchema = z.object({
  a: z.number().min(1),
  b: z.number().min(1),
});
