import { z } from 'zod';

export function createZodSchema<T extends Record<string, any>>(typeShape: {
  [K in keyof T]: z.ZodTypeAny;
}): z.ZodObject<{
  [K in keyof T]: z.ZodTypeAny;
}> {
  return z.object(typeShape);
}
