/**
 * Formats a number as currency (USD)
 * @param {number} price - The price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: price < 1 ? 6 : 2,
  }).format(price);
};

/**
 * Formats a percentage with color styling
 * @param {number} percentage - The percentage to format
 * @returns {JSX.Element|string} Formatted percentage with styling or 'N/A'
 */
export const formatPercentage = (percentage) => {
  if (percentage === null || percentage === undefined) {
    return 'N/A';
  }
  
  const isPositive = percentage >= 0;
  
  return (
    <span
      className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}
    >
      {isPositive ? '+' : ''}
      {percentage.toFixed(2)}%
    </span>
  );
}; 