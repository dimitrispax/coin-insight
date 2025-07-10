'use client';

import { useEffect, useState, useCallback } from 'react';
import CoinTable from '@/components/CoinTable';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import Pagination from '@/components/Pagination';

const COINS_PER_PAGE = 20;

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchCoins = useCallback(async (page) => {
    try {
      setLoading(true);
      const url = `/api/coins/markets?page=${page}&per_page=${COINS_PER_PAGE}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();

        const errorMessage =
          errorData.error || `HTTP ${response.status}: ${response.statusText}`;

        if (response.status === 429) {
          throw new Error(
            `Rate limit exceeded. Please wait ${errorData.details?.retryAfter || '60'} seconds before trying again.`
          );
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();

      setCoins(data);

      setHasMore(data.length === COINS_PER_PAGE);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoins(currentPage);
  }, [currentPage, fetchCoins]);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({ top: 5, behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage message={error} onRetry={() => fetchCoins(currentPage)} />
    );
  }

  return (
    <div className="grid gap-4 w-full">
      <div>
        <div className="pb-5">
          <h2 className="sm:text-xl lg:text-2xl text-gray-900 font-semibold">
            Today&apos;s Cryptocurrency Prices
          </h2>
        </div>
        <CoinTable coins={coins} />
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        hasMore={hasMore}
      />
    </div>
  );
}
