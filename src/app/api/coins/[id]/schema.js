import { z } from 'zod/mini';

export const coinRequestSchema = z.object({
  id: z.string().check(z.minLength(1), z.regex(/^[a-z0-9-]+$/)),
});

const priceChangesSchema = z.object({
  price_change_percentage_24h: z.number(),
  price_change_percentage_7d: z.number(),
  price_change_percentage_14d: z.number(),
  price_change_percentage_30d: z.number(),
  price_change_percentage_60d: z.number(),
  price_change_percentage_200d: z.number(),
  price_change_percentage_1y: z.number(),
});

export const coinResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  description: z.string(),
  image: z.optional(
    z.string().check(
      z.refine((val) => {
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      })
    )
  ),
  current_price: z.number(),
  high_24h: z.number(),
  low_24h: z.number(),
  price_changes: priceChangesSchema,
  market_cap_rank: z.nullable(z.number()),
});
