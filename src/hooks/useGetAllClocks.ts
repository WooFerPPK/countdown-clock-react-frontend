import { useState, useEffect } from 'react';
import { getAllClocks } from '@/api/api';
import { Clock } from '@/interfaces/Clock';

const sortByEndTime = (a: Clock, b: Clock) => (a.endTime < b.endTime) ? 1 : -1;

export const useGetAllClocks = () => {
  const [data, setData] = useState<Clock[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClocks = async () => {
      setLoading(true);
      try {
        let clocksList = await getAllClocks();
        // Sort by end time
        clocksList.sort(sortByEndTime);
        setData(clocksList);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchClocks();
  }, []);

  return { data, error, loading };
};