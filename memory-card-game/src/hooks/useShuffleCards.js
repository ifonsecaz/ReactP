import { useMemo } from 'react';

export const useShuffleCards = (cards) => {
  const pairedCards = [...cards, ...cards].map((card, i) => ({
    ...card,
    id: `${i}-${Math.random().toString(36).substring(2, 9)}`, 
  }));

  const shuffled = [...pairedCards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};
