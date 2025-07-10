const extractPriceChanges = (marketData) => {
  if (!marketData) {
    return {};
  }

  const {
    price_change_percentage_24h,
    price_change_percentage_7d,
    price_change_percentage_14d,
    price_change_percentage_30d,
    price_change_percentage_60d,
    price_change_percentage_200d,
    price_change_percentage_1y,
  } = marketData;

  return {
    price_change_percentage_24h: price_change_percentage_24h || 0,
    price_change_percentage_7d: price_change_percentage_7d || 0,
    price_change_percentage_14d: price_change_percentage_14d || 0,
    price_change_percentage_30d: price_change_percentage_30d || 0,
    price_change_percentage_60d: price_change_percentage_60d || 0,
    price_change_percentage_200d: price_change_percentage_200d || 0,
    price_change_percentage_1y: price_change_percentage_1y || 0,
  };
};

export const formatCoinData = (coinData) => {
  const { id, name, symbol, description, image, market_data, market_cap_rank } =
    coinData;

  return {
    id,
    name,
    symbol: symbol?.toUpperCase() || '',
    description: description?.en || '',
    image: image?.large || image?.small || '',
    current_price: market_data?.current_price?.usd || 0,
    high_24h: market_data?.high_24h?.usd || 0,
    low_24h: market_data?.low_24h?.usd || 0,
    price_changes: extractPriceChanges(market_data),
    market_cap_rank: market_cap_rank || null,
  };
};
