import React, { useContext, useEffect } from 'react';
import { GameContext } from '../GameContext';
import { useShuffleCards } from '../../hooks/useShuffleCards';
import { useScore } from '../../hooks/useScore';
import Card from '../Card/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const defaultCards = [
  { image: 'https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/1280x1280/products/123/442/AS__68652__03825.1681313264.png?c=1' },
  { image: 'https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/1280x1280/products/123/446/KH__01216__30660.1681470474.png?c=1' },
  { image: 'https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/1280x1280/products/123/448/QD__14920__31462.1681313265.jpg?c=1' },
  { image: 'https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/1280x1280/products/123/447/JC__86231__74895.1681313265.jpg?c=1' },
  { image: 'https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/1280x1280/products/123/439/10H__11470__91447.1681313264.jpg?c=1' },
  { image: 'https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/1280x1280/products/123/438/9D__67286__64203.1681313264.jpg?c=1' },
];

const Board = () => {
  const { state, dispatch } = useContext(GameContext);
  const shuffled = useShuffleCards(defaultCards);
  const score = useScore(state.attempts, state.timer);
  
  useEffect(() => {
    dispatch({ type: 'SET_CARDS', payload: shuffled });
  }, [dispatch, state.resetCounter]);

  return (
    <div className="container mt-4">
        {state.finished && (
        <div className="alert alert-success fw-bold">
          Game Completed! Attempts: {state.attempts}, Time: {state.timer}s, Score: {score}
        </div>
      )}
      <div className="row g-3">
        {state.cards.map((card, index) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-3" key={card.id}>
            <Card card={card} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
