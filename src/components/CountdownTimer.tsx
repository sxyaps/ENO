'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  // Remove endDate prop since we'll use a fixed date
}

export default function CountdownTimer({}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  // Fixed end date - 2 months from July 22, 2025
  const getFixedEndDate = () => {
    // Set a fixed start date to ensure consistency across all users and refreshes
    const startDate = new Date('2025-07-22T00:00:00Z');
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 2); // Add 2 months
    return endDate;
  };

  useEffect(() => {
    const endDate = getFixedEndDate();
    
    const updateTimer = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });
    };

    // Update immediately
    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-2">
      <p className="text-xs uppercase tracking-widest text-accent/60 letter-spacing-wider">Drop closes in</p>
      <div className="flex space-x-4">
        <div className="flex flex-col items-center">
          <div className="font-mono text-2xl md:text-3xl font-light tracking-wider">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <div className="text-[8px] uppercase text-accent/60 mt-1">Days</div>
        </div>
        <div className="font-mono text-2xl md:text-3xl font-thin self-start">:</div>
        <div className="flex flex-col items-center">
          <div className="font-mono text-2xl md:text-3xl font-light tracking-wider">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-[8px] uppercase text-accent/60 mt-1">Hours</div>
        </div>
        <div className="font-mono text-2xl md:text-3xl font-thin self-start">:</div>
        <div className="flex flex-col items-center">
          <div className="font-mono text-2xl md:text-3xl font-light tracking-wider">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-[8px] uppercase text-accent/60 mt-1">Minutes</div>
        </div>
      </div>
    </div>
  );
}
