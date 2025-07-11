export default function ErrorMessage({ message, onRetry }) {
  const isRateLimitError =
    message.includes('Rate limit exceeded') ||
    message.includes('exceeded the Rate Limit');

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="text-center">
        <div
          className={`text-xl font-semibold mb-4 ${isRateLimitError ? 'text-orange-600' : 'text-red-600'}`}
        >
          {isRateLimitError ? 'Rate Limit Exceeded' : 'Error'}
        </div>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">{message}</p>
        {isRateLimitError && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <p className="text-orange-700 text-sm">
              💡 <strong>Tip:</strong> This happens when too many requests are
              made too quickly. Please wait a moment before trying again.
            </p>
          </div>
        )}
        {onRetry && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onRetry}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 active:scale-95 active:bg-blue-800"
            >
              <img
                src="/assets/images/retry.svg"
                alt="Retry"
                className="h-4 brightness-0 invert"
              />
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
