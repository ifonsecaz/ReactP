import React, { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { GameProvider } from './components/GameContext';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Board = lazy(() => import('./components/Board/Board'));
const ScoreBoard = lazy(() => import('./components/ScoreBoard/ScoreBoard'));

function App() {
  return (
    <ErrorBoundary>
      <GameProvider>
        <div className="min-vh-100 bg-light d-flex flex-column align-items-center p-4">
          <h1 className="display-4 fw-bold mb-4 text-center">Memory Card Game</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <ScoreBoard />
            <Board />
          </Suspense>
        </div>
      </GameProvider>
    </ErrorBoundary>
  );
}

export default App;
