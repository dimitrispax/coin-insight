'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import BackButton from '@/components/BackButton';
import CoinHeader from '@/components/CoinHeader';
import PriceChangeGrid from '@/components/PriceChangeGrid';
import CoinDescription from '@/components/CoinDescription';

export default function CoinDetails() {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const coinId = params.id;

  const handleRetry = () => {
    setError(null);
    setCoin(null);
    setLoading(true);
  };

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/coins/${coinId}`);

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage =
            errorData.error ||
            `HTTP ${response.status}: ${response.statusText}`;

          if (response.status === 429) {
            throw new Error(
              `Rate limit exceeded. Please wait ${errorData.details?.retryAfter || '60'} seconds before trying again.`
            );
          }

          throw new Error(errorMessage);
        }

        const data = await response.json();
        setCoin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (coinId) {
      fetchCoinDetails();
    }
  }, [coinId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  if (!coin) {
    return <ErrorMessage message="Coin not found" onRetry={handleRetry} />;
  }

  return (
    <div className="grid gap-4">
      <BackButton />
      <CoinHeader coin={coin} />
      <PriceChangeGrid priceChanges={coin.price_changes} />
      <CoinDescription coin={coin} />
    </div>
  );
}
