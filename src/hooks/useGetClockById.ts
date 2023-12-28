import { useState, useEffect, useCallback } from 'react';
import { getClockById } from '@/api/api';
import { Clock } from '@/interfaces/Clock';

export const useGetClockById = (id: string) => {
  const [data, setData] = useState<Clock | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Explicitly type intervalId as number or null
  let intervalId: any = null; 

  const fetchClock = useCallback(async () => {
    setLoading(true);
    try {
      let clock = await getClockById(id);
      setData(clock);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchClock();

    // Set up the interval and store its ID
    intervalId = setInterval(() => fetchClock(), 1000);

    // Cleanup function to clear the interval
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [fetchClock]);

  // Define stopFetching function using intervalId
  const stopFetching = () => {
    if (intervalId) clearInterval(intervalId);
  };

  // Return all necessary states and functions
  return { data, error, loading, fetchClock, stopFetching };
};
