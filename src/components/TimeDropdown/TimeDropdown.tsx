import React from 'react';
import { TimeDropdownProps } from './TimeDropdwonProps';

const convertToMilliseconds = (value: number, unit: string) => {
    switch (unit) {
        case 'minutes':
            return value * 60 * 1000;
        case 'hours':
            return value * 60 * 60 * 1000;
        case 'days':
            return value * 24 * 60 * 60 * 1000;
        case 'weeks':
            return value * 7 * 24 * 60 * 60 * 1000;
        case 'months':
            return value * 30 * 24 * 60 * 60 * 1000;
        case 'years':
            return value * 365 * 24 * 60 * 60 * 1000;
        default:
            return value;
    }
};
  
const TimeDropdown: React.FC<TimeDropdownProps> = ({ onChange }) => {
  const timeOptions = [
    { label: '5 minutes', value: convertToMilliseconds(5, 'minutes') },
    { label: '10 minutes', value: convertToMilliseconds(10, 'minutes') },
    { label: '15 minutes', value: convertToMilliseconds(15, 'minutes') },
    { label: '30 minutes', value: convertToMilliseconds(30, 'minutes') },
    { label: '1 hour', value: convertToMilliseconds(1, 'hours') },
    { label: '3 hours', value: convertToMilliseconds(3, 'hours') },
    { label: '6 hours', value: convertToMilliseconds(6, 'hours') },
    { label: '12 hours', value: convertToMilliseconds(12, 'hours') },
    { label: '1 day', value: convertToMilliseconds(1, 'days') },
    { label: '3 days', value: convertToMilliseconds(3, 'days') },
    { label: '1 week', value: convertToMilliseconds(1, 'weeks') },
    { label: '2 weeks', value: convertToMilliseconds(2, 'weeks') },
    { label: '1 month', value: convertToMilliseconds(1, 'months') },
    { label: '3 months', value: convertToMilliseconds(3, 'months') },
    { label: '6 months', value: convertToMilliseconds(6, 'months') },
    { label: '1 year', value: convertToMilliseconds(1, 'years') },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <select onChange={handleChange} defaultValue={0}>
      <option value="0" disabled>
        Select time duration
      </option>
      {timeOptions.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default TimeDropdown;
