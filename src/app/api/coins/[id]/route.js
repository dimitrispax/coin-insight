import { NextResponse } from 'next/server';
import { handleApiError } from '@/app/api/utils/errorHandler.js';
import { COINGECKO_API_BASE, COINGECKO_API_KEY } from '@/app/api/constants.js';
import { formatCoinData } from './format.js';
import { coinRequestSchema, coinResponseSchema } from './schema.js';

export async function GET(_, { params }) {
  try {
    const { id } = coinRequestSchema.parse(await params);

    const url = `${COINGECKO_API_BASE}/coins/${id}`;

    const queryParams = new URLSearchParams({
      localization: 'false',
      tickers: 'false',
      market_data: 'true',
      community_data: 'false',
      developer_data: 'false',
      sparkline: 'false',
    });

    const response = await fetch(`${url}?${queryParams}`, {
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

    const transformedData = formatCoinData(data);

    const responseValidation = coinResponseSchema.parse(transformedData);

    return NextResponse.json(responseValidation, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    return handleApiError(error, 'Fetching coin details');
  }
}
