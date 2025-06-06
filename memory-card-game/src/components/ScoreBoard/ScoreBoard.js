import React, { useContext } from 'react';
import { GameContext } from '../GameContext';
import { useScore } from '../../hooks/useScore';
import { useTimer } from '../../hooks/useTimer';
import 'bootstrap/dist/css/bootstrap.min.css';

const ScoreBoard = () => {
  const { state, dispatch } = useContext(GameContext);
  useTimer(dispatch, !state.finished);
  const score = useScore(state.attempts, state.timer);
    

  return (
    <div className="container my-3 p-3 bg-light border rounded d-flex justify-content-between align-items-center">
      <div className="fw-bold">Attempts: {state.attempts}</div>
      <div className="fw-bold">Time: {state.timer}s</div>
      <div className="fw-bold">Score: {score}</div>
      <button
        className="btn btn-danger ms-3"
        onClick={() => dispatch({ type: 'RESET_GAME' })}
      >
        Restart
      </button>
    </div>
  );
};

export default ScoreBoard;