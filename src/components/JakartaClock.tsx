"use client"

import React, { useState, useEffect } from 'react';

interface JakartaClockProps {
  showSeconds?: boolean;
  className?: string;
}

export const JakartaClock: React.FC<JakartaClockProps> = ({ showSeconds = false, className }) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        ...(showSeconds ? { second: '2-digit' } : {}),
        hour12: true,
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };

    updateClock();
    const intervalId = setInterval(updateClock, showSeconds ? 1000 : 15000);
    return () => clearInterval(intervalId);
  }, [showSeconds]);

  return (
    <span className={className} suppressHydrationWarning>
      {time || '--:--'}
    </span>
  );
};
