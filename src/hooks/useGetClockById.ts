import { useState, useEffect, useCallback } from 'react';
import { getClockById } from '@/api/api';
import { Clock } from '@/interfaces/Clock';

export const useGetClockById = (id: string) => {
  const [data, setData] = useState<Clock | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

    const intervalId = setInterval(() => fetchClock(), 10000);

    return () => clearInterval(intervalId);
  }, [fetchClock]);

  return { data, error, loading, fetchClock };
};