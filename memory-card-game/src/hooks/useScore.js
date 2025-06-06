import { useMemo } from 'react';

export const useScore = (attempts, timer) => {
  return useMemo(() => {
    if (!attempts || !timer) return 0;
    return Math.max(1000 - (attempts * 10 + timer), 0);
  }, [attempts, timer]);
};
