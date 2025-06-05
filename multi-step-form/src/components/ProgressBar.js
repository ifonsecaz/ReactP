import { useMemo } from 'react';
import './style.css';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = useMemo(() => 
    ((currentStep) / (totalSteps)) * 100
  , [currentStep, totalSteps]);

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
      <div className="steps">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div 
            key={i} 
            className={`step ${i < currentStep ? 'completed' : ''}`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;