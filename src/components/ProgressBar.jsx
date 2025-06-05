import React from 'react';
import './../styles/Dashboard.css';
import './../styles/ProgressBar.css'; 

const ProgressBar = ({ step, totalSteps }) => {
  const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="progress-bar-steps">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`progress-bar-step ${
              index < step ? 'completed' : ''
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
