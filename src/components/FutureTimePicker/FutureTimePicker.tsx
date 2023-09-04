import React, { useState, useEffect } from 'react';
import { FutureTimePickerProps } from './FutureTimePickerProps';

const FutureTimePicker: React.FC<FutureTimePickerProps> = ({ minTimeMillis, onSelect, onError }) => {
  const [selectedDateTime, setSelectedDateTime] = useState<string>('');
  const [timeError, setTimeError] = useState<string | null>(null);

  const toLocalDateTimeString = (millis: number) => {
    const date = new Date(millis);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };
  
  const minDateTimeLocalString = toLocalDateTimeString(minTimeMillis);

  useEffect(() => {
    if (!selectedDateTime) {
      setSelectedDateTime(minDateTimeLocalString);
    }
  }, [minDateTimeLocalString, selectedDateTime]);
  

  useEffect(() => {
    onError(!!timeError);
  }, [timeError, onError]);

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedTime = new Date(e.target.value).getTime();
    setSelectedDateTime(e.target.value);
    if (newSelectedTime >= Date.now()) {
      onSelect(newSelectedTime);
      setTimeError(null);
    } else {
      setTimeError('You cannot select a time in the past.');
    }
  };
  
  return (
    <>
      <input
        type="datetime-local"
        min={minDateTimeLocalString}
        value={selectedDateTime}
        onChange={handleDateTimeChange}
      />
      {timeError && <p className="error-message">{timeError}</p>}
    </>
  );
};

export default FutureTimePicker;
