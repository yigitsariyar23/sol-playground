'use client';
import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

export const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  interface TimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="font-pixel text-xl md:text-4xl text-white text-center mb-8">
      {timeLeft.days !== undefined ? (
          <div>
            {timeLeft.days}d:{timeLeft.hours}h:{timeLeft.minutes}m:{timeLeft.seconds}s left
          </div>
      ) : (
        <span>Time is up!</span>
      )}
    </div>
  );
};
