type TimeParts = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateTimeUnits = (remainingTime: number): TimeParts => {
  const oneSecond = 1000;
  const oneMinute = 60 * oneSecond;
  const oneHour = 60 * oneMinute;
  const oneDay = 24 * oneHour;
  const oneMonthAvg = 30.44 * oneDay;
  const oneYear = 365.25 * oneDay;

  let remainingMs = remainingTime;

  const years = Math.floor(remainingMs / oneYear);
  remainingMs %= oneYear;

  const months = Math.floor(remainingMs / oneMonthAvg);
  remainingMs %= oneMonthAvg;

  const days = Math.floor(remainingMs / oneDay);
  remainingMs %= oneDay;

  const hours = Math.floor(remainingMs / oneHour);
  remainingMs %= oneHour;

  const minutes = Math.floor(remainingMs / oneMinute);
  remainingMs %= oneMinute;

  const seconds = Math.floor(remainingMs / oneSecond);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
};

const pluralize = (unit: string, count: number): string => {
  return `${count} ${unit}${count === 1 ? '' : 's'}`;
};

export const formatRemainingTime = (remainingTime: number): string => {
  if (remainingTime !== 0) {
    const { years, months, days, hours, minutes, seconds } = calculateTimeUnits(remainingTime);
    const parts: string[] = [];
    let displayLesserUnits = false;
  
    if (years > 0 || displayLesserUnits) {
      parts.push(pluralize('year', years));
      displayLesserUnits = true;
    }
  
    if (months > 0 || displayLesserUnits) {
      parts.push(pluralize('month', months));
      displayLesserUnits = true;
    }
  
    if (days > 0 || displayLesserUnits) {
      parts.push(pluralize('day', days));
      displayLesserUnits = true;
    }
  
    if (hours > 0 || displayLesserUnits) {
      parts.push(pluralize('hour', hours));
      displayLesserUnits = true;
    }
  
    if (minutes > 0 || displayLesserUnits) {
      parts.push(pluralize('minute', minutes));
      displayLesserUnits = true;
    }
  
    parts.push(pluralize('second', seconds));
  
    return parts.join(', ');
  } else {
    return 'No Time Remaining';
  }
};
