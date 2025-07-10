import { NextResponse } from 'next/server';
import { HTTP_STATUS_CODES, ERROR_MESSAGES } from '../constants.js';

const createErrorResponse = (message, status, details = null) => {
  const errorBody = { error: message };

  if (details) {
    errorBody.details = details;
  }

  return NextResponse.json(errorBody, { status });
};

export const handleApiError = (error, context) => {
  console.error(`Error in ${context}:`, error);

  if (error.name === 'AbortError') {
    return createErrorResponse(
      ERROR_MESSAGES.REQUEST_TIMEOUT,
      HTTP_STATUS_CODES.GATEWAY_TIMEOUT
    );
  }

  /* Check for the specific rate limit errors in error message coming from CoinGecko API */
  if (error.message?.includes('exceeded the Rate Limit')) {
    return createErrorResponse(
      ERROR_MESSAGES.RATE_LIMIT_EXCEEDED,
      HTTP_STATUS_CODES.TOO_MANY_REQUESTS,
      { retryAfter: '60' }
    );
  }

  if (error.response || error.status) {
    const status = error.response?.status || error.status;

    const statusText = error.response?.statusText || error.statusText;

    switch (status) {
      case HTTP_STATUS_CODES.NOT_FOUND:
        return createErrorResponse(
          ERROR_MESSAGES.RESOURCE_NOT_FOUND,
          HTTP_STATUS_CODES.NOT_FOUND
        );

      case HTTP_STATUS_CODES.TOO_MANY_REQUESTS:
        return createErrorResponse(
          ERROR_MESSAGES.RATE_LIMIT_EXCEEDED,
          HTTP_STATUS_CODES.TOO_MANY_REQUESTS,
          { retryAfter: error.response?.headers?.get('retry-after') || '60' }
        );

      case HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR:
      case HTTP_STATUS_CODES.BAD_GATEWAY:
      case HTTP_STATUS_CODES.SERVICE_UNAVAILABLE:
        return createErrorResponse(
          ERROR_MESSAGES.EXTERNAL_SERVICE_UNAVAILABLE,
          HTTP_STATUS_CODES.BAD_GATEWAY
        );

      default:
        return createErrorResponse(
          `External API error: ${status} ${statusText}`,
          HTTP_STATUS_CODES.BAD_GATEWAY
        );
    }
  }

  if (error.name === 'ZodError' || error.errors) {
    return createErrorResponse(
      ERROR_MESSAGES.INVALID_REQUEST_DATA,
      HTTP_STATUS_CODES.BAD_REQUEST,
      error.errors || error.issues
    );
  }

  return createErrorResponse(
    ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
  );
};
