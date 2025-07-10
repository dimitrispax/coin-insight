export const formatMarketData = (coins) => {
  if (!coins) {
    return [];
  }

  return coins.map(
    ({
      id,
      name,
      symbol,
      current_price,
      high_24h,
      low_24h,
      price_change_percentage_24h,
      image,
      market_cap_rank,
    }) => ({
      id,
      name,
      symbol: symbol.toUpperCase(),
      current_price,
      high_24h,
      low_24h,
      price_change_percentage_24h,
      image,
      market_cap_rank,
    })
  );
};
