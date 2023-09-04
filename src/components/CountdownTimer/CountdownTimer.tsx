import React, { useState, useEffect } from 'react';
import { formatRemainingTime } from '@/utils/timeUtils/timeUtils';
import { CountdownTimerProps } from './CountdownTimerProps';

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime, paused = false, clock}) => {
  const [remainingTime, setRemainingTime] = useState<number>(endTime - Date.now());

  useEffect(() => {
    if (paused) {
      return;
    }

    setRemainingTime(endTime - Date.now());

    if ((endTime - Date.now()) >= 0) {
      const intervalId = setInterval(() => {
        if (!paused) {
          setRemainingTime(endTime - Date.now());
        }
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setRemainingTime(0);
    }
  }, [endTime, paused, clock]);




  return (
    <div>
      {formatRemainingTime(remainingTime)}
    </div>
  );
};

export default CountdownTimer;
