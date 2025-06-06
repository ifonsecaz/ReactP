export const initialState = {
  cards: [],
  selectedCards: [],
  matchedCards: [],
  attempts: 0,
  timer: 0,
  isChecking: false,
  resetCounter:0,
  finished:false
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CARDS':
      return { ...state, cards: action.payload };
    case 'SELECT_CARD':
      return { ...state, selectedCards: [...state.selectedCards, action.payload] };
    case 'RESET_SELECTION':
      return { ...state, selectedCards: [], isChecking: false };
    case 'MATCH_FOUND':
      return {
        ...state,
        matchedCards: [...state.matchedCards, ...state.selectedCards],
        selectedCards: [],
        isChecking: false,
      };
    case 'INCREMENT_ATTEMPTS':
      return { ...state, attempts: state.attempts + 1,
        finished: (state.cards.length<state.matchedCards.length+2),
       };
    case 'START_CHECK':
      return { ...state, isChecking: true };
    case 'TICK_TIMER':
      return { ...state, timer: state.timer + 1 };
    case 'RESET_GAME':
      return {...initialState,resetCounter: state.resetCounter + 1};
    default:
      return state;
  }
};