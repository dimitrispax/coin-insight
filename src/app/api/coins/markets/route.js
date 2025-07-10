import { NextResponse } from 'next/server';
import { handleApiError } from '@/app/api/utils/errorHandler.js';
import { COINGECKO_API_BASE, COINGECKO_API_KEY } from '@/app/api/constants.js';
import { formatMarketData } from './format.js';
import { marketRequestSchema, marketResponseSchema } from './schema.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    /* Convert search params to object for proper parsing */
    const params = Object.fromEntries(searchParams.entries());

    const {
      page = '1',
      per_page: perPage = '20',
      ids,
    } = marketRequestSchema.parse(params);

    const baseUrl = `${COINGECKO_API_BASE}/coins/markets`;

    const queryParams = new URLSearchParams({
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page: page,
      sparkline: 'false',
      price_change_percentage: '24h',
    });

    if (ids) {
      queryParams.set('ids', ids);
    }

    const url = `${baseUrl}?${queryParams}`;

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'coin-insight-app',
        'x-cg-demo-api-key': COINGECKO_API_KEY,
      },
    });

    const data = await response.json();

    /* Check for CoinGecko API specific error codes */
    if (data.status?.error_code) {
      throw new Error(`CoinGecko API Error: ${data.status.error_message}`);
    }

    const transformedData = formatMarketData(data);

    const responseValidation = marketResponseSchema.parse(transformedData);

    return NextResponse.json(responseValidation, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=30',
        Vary: 'page, per_page',
        'X-Page': page,
        'X-Per-Page': perPage,
      },
    });
  } catch (error) {
    return handleApiError(error, 'Fetching coins markets');
  }
}
