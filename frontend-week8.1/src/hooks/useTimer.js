import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for managing a countdown timer
 * @param {number} initialMinutes - Initial timer duration in minutes
 * @returns {Object} Timer state and controls
 */
export function useTimer(initialMinutes = 25) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            setIsActive(false);
            clearInterval(intervalRef.current);
            // Play notification sound or show alert
            if (typeof window !== 'undefined' && 'Notification' in window) {
              if (Notification.permission === 'granted') {
                new Notification('Timer Complete!', {
                  body: 'Your pomodoro session has ended.',
                  icon: '/vite.svg',
                });
              }
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, minutes, seconds]);

  const start = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pause = () => {
    setIsPaused(true);
  };

  const resume = () => {
    setIsPaused(false);
  };

  const reset = () => {
    setIsActive(false);
    setIsPaused(false);
    setMinutes(initialMinutes);
    setSeconds(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const setTime = (mins) => {
    setMinutes(mins);
    setSeconds(0);
    setIsActive(false);
    setIsPaused(false);
  };

  const progress = ((initialMinutes * 60 - (minutes * 60 + seconds)) / (initialMinutes * 60)) * 100;

  return {
    minutes,
    seconds,
    isActive,
    isPaused,
    start,
    pause,
    resume,
    reset,
    setTime,
    progress,
  };
}
