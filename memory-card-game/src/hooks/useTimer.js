import { useEffect } from 'react';

export const useTimer = (dispatch, isGameActive) => {
  useEffect(() => {
    if (!isGameActive) return;
    const interval = setInterval(() => dispatch({ type: 'TICK_TIMER' }), 1000);
    return () => clearInterval(interval);
  }, [dispatch, isGameActive]);
};