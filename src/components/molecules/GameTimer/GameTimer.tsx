import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface GameTimerProps {
  duration: number; // durée en secondes
  onTimeUp?: () => void;
  className?: string;
}

export const GameTimer: React.FC<GameTimerProps> = ({
  duration,
  onTimeUp,
  className,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / duration) * 100;

  return (
    <div className={twMerge('w-full max-w-xs mx-auto', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-text">
          Temps restant
        </span>
        <span className="text-sm font-medium text-text">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>

      <div className="h-2 bg-surface-light rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-1000 ease-linear rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="text-center mt-2 text-sm text-text/60">
        {isRunning ? 'En cours...' : 'Temps écoulé !'}
      </div>
    </div>
  );
}; 