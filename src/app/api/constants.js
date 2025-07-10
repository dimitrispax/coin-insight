export const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

/* CoinGecko API Key - Replace with your actual API key */
export const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

export const HTTP_STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const ERROR_MESSAGES = {
  RESOURCE_NOT_FOUND: 'Resource not found',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded - please try again later',
  EXTERNAL_SERVICE_UNAVAILABLE: 'External service temporarily unavailable',
  REQUEST_TIMEOUT: 'Request timeout - external API is not responding',
  INVALID_REQUEST_DATA: 'Invalid request data',
  INTERNAL_SERVER_ERROR: 'Internal server error',
};
