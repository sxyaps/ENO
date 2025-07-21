'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  endDate: Date;
}

export default function CountdownTimer({ endDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="flex flex-col items-center space-y-2">
      <p className="text-xs uppercase tracking-widest text-accent/60 letter-spacing-wider">Drop closes in</p>
      <div className="flex space-x-4">
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
        <div className="font-mono text-2xl md:text-3xl font-thin self-start">:</div>
        <div className="flex flex-col items-center">
          <div className="font-mono text-2xl md:text-3xl font-light tracking-wider">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-[8px] uppercase text-accent/60 mt-1">Seconds</div>
        </div>
      </div>
    </div>
  );
}
