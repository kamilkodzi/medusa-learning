import { z } from 'zod';

export const PostStoreCustomSchema = z.object({
  a: z.preprocess((val) => {
    if (val && typeof val === 'string') {
      return parseInt(val);
    }
    return val;
  }, z.number()),
  b: z.preprocess((val) => {
    if (val && typeof val === 'string') {
      return parseInt(val);
    }
    return val;
  }, z.number()),
});
