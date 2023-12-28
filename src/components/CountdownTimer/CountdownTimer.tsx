import React, { useState, useEffect } from 'react';
import { formatRemainingTime } from '@/utils/timeUtils/timeUtils';
import { CountdownTimerProps } from './CountdownTimerProps';

const CountdownTimer: React.FC<CountdownTimerProps> = ({ clock, paused = false }) => {
  return (
    <span className='time'>{formatRemainingTime(clock.remainingTime)}</span>
  );
};

export default CountdownTimer;
