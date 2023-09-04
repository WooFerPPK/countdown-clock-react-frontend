import { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { verifyClockToken } from '@/api/api';

export const useVerifyToken = (clockId: string, token: string) => {
  const [data, setData] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyToken = useCallback(async () => {
    setLoading(true);
    try {
      const { isValid } = await verifyClockToken({ clockId, token });
      setData(isValid);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [clockId, token]);

  useEffect(() => {
    if (clockId && token) {
      verifyToken();
    }
  }, [clockId, token, verifyToken]);

  return { data, error, loading, refetch: verifyToken }; // Expose the refetch function
};
