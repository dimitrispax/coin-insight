import { z } from 'zod/mini';

export const marketRequestSchema = z.object({
  page: z.optional(z.string()),
  per_page: z.optional(z.string()),
  ids: z.optional(z.string()),
});

const coinMarketItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  current_price: z.nullable(z.number()),
  high_24h: z.nullable(z.number()),
  low_24h: z.nullable(z.number()),
  price_change_percentage_24h: z.nullable(z.number()),
  image: z.string().check(
    z.refine((val) => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    })
  ),
  market_cap_rank: z.nullable(z.number()),
});

export const marketResponseSchema = z.array(coinMarketItemSchema);
