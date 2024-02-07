import { useState } from 'react';
import { createNewClock } from '@/api/api';
import { CreateNewClockParams } from './useCreateNewClockTypes';

export const useCreateNewClock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createClock = async (params: CreateNewClockParams) => {
    setLoading(true);
    try {
      await createNewClock(params);
      setSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    createClock,
    loading,
    error,
    success
  };
};
