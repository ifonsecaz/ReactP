import React, { useContext, useCallback } from 'react';
import { GameContext } from '../GameContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = React.memo(({ card, index }) => {
  const { state, dispatch } = useContext(GameContext);
  const isFlipped = state.selectedCards.includes(index) || state.matchedCards.includes(index);

  const handleClick = useCallback(() => {
    if (state.isChecking || isFlipped || state.selectedCards.length === 2) return;
    dispatch({ type: 'SELECT_CARD', payload: index });

    if (state.selectedCards.length === 1) {
      dispatch({ type: 'START_CHECK' });
      setTimeout(() => {
        const [firstIdx] = state.selectedCards;
        const isMatch =
          state.cards[firstIdx].image === state.cards[index].image;
        dispatch({ type: isMatch ? 'MATCH_FOUND' : 'RESET_SELECTION' });
        dispatch({ type: 'INCREMENT_ATTEMPTS' });
        console.log("Res");
        console.log(state.finished);
      }, 1000);
    }
  }, [dispatch, index, isFlipped, state]);

return (
    <div
      className={`col mb-3 d-flex justify-content-center align-items-center ${isFlipped ? 'bg-white' : 'bg-primary'}`}
      style={{
        cursor: (state.isChecking || isFlipped || state.selectedCards.length === 2) ? 'not-allowed' : 'pointer',
        transform: isFlipped ? 'rotateY(180deg) scaleX(-1)' : 'rotateY(0)'
      }}
      onClick={handleClick}
    >
      {isFlipped ? (
        <img 
          src={card.image} 
          alt="card" 
          className="img-fluid p-2" 
        />
      ) : (
        <div
        className="d-flex justify-content-center align-items-center bg-secondary text-white"
        style={{ width: '100%', height: '100%', aspectRatio: '3/4' }} 
        >
        <span className="display-4">?</span>
        </div>
      )}
    </div>
  );
});


export default Card;